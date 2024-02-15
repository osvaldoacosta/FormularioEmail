package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

// Modelos dos dados
type User struct {
	Id    int    `json:"id"`
	Email string `json:"email"`
}

type UserDTO struct {
	Email string `json:"email"`
}

// Funcoes de criar e pegar todos os emails de usuarios
func createUser(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var user UserDTO
		json.NewDecoder(r.Body).Decode(&user) // Convertendo o body para o tipo User que definimos no struct

		log.Println("New user email received: " + user.Email)
		err := db.QueryRow("INSERT INTO RUS_REDWAY_USER (email) values ($1) RETURNING email", user.Email).Scan(&user.Email)
		if err != nil {
			log.Println(err)
			http.Error(w, "Failed to create user", http.StatusBadRequest)
			return
		}
		json.NewEncoder(w).Encode(user)
	}
}

func getUsers(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := db.Query("SELECT * FROM RUS_REDWAY_USER")
		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()

		users := []UserDTO{}
		for rows.Next() {
			var u User
			if err := rows.Scan(&u.Id, &u.Email); err != nil {
				log.Println(err)
			}
			users = append(users, UserDTO{Email: u.Email})
		}
		if err := rows.Err(); err != nil {
			log.Println(err)
		}

		json.NewEncoder(w).Encode(users)

	}
}

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*") // Allow any origin
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func jsonContentTypeMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set JSON Content-Type
		w.Header().Set("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}

func main() {
	log.SetOutput(os.Stdout) //Para melhor visualizacao dos logs no docker compose
	log.SetFlags(log.LstdFlags | log.Lshortfile)
	log.Println("Starting database:" + os.Getenv("POSTGRES_DB"))

	psqlInfo := fmt.Sprintf("host=%s port=5432 user=%s "+
		"password=%s dbname=%s sslmode=disable",
		os.Getenv("POSTGRES_HOST"), os.Getenv("POSTGRES_USER"), os.Getenv("POSTGRES_PASSWORD"), os.Getenv("POSTGRES_DB"))

	db, err := sql.Open("postgres", psqlInfo)

	if err != nil {
		log.Println("Nao foi possivel se conectar ao banco de dados")
		log.Fatal(err)
	}

	defer db.Close() //Fechando a conexao com o banco posteriormente
	log.Println("Connected to the database successfully!")
	router := mux.NewRouter()

	router.HandleFunc("/user", getUsers(db)).Methods("GET")
	router.HandleFunc("/user", createUser(db)).Methods("POST")

	enhancedRouter := enableCORS(jsonContentTypeMiddleware(router))
	log.Fatal(http.ListenAndServe(":8080", enhancedRouter))

}
