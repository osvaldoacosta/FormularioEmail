"use client";

import React, { useState } from "react";

import { sendEmailToServer } from "./serverConn";
const Form = () => {
  const [email, setEmail] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [isPopUpError, setIsPopupError] = useState(false);
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    try {
      const responseData = await sendEmailToServer(email);
      console.log("Server response:", responseData);
      setEmail("");
      setIsPopupError(false);
      //Caso de erro o pop up nao desaparecera
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
        setIsPopupError(true);
      }
    }

    setShowPopup(true);
  };

  return (
    <div className="mx-auto mt-8 max-w-md rounded-md bg-gray-500 p-8 shadow-md">
      <h2 className="mb-4 text-2xl text-white">Formulario de email</h2>{" "}
      {/* Title for container */}
      <form onSubmit={handleSubmit}>
        <div className="flex items-center border-b-2 border-red-500 py-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-white-700 mr-3 w-full appearance-none border-none bg-transparent px-2 py-1 leading-tight focus:outline-none"
            placeholder="Escreva o seu email"
            required
          />
          <button
            type="submit"
            className="flex-shrink-0 rounded border-4 border-red-500 bg-red-500 px-2 py-1 text-sm text-white hover:border-blue-700 hover:bg-blue-700"
          >
            Enviar
          </button>
        </div>
      </form>
      {showPopup && (
        <div
          className={`absolute bottom-4 right-4 rounded-md px-4 py-2 text-gray-200 shadow-md ${
            isPopUpError ? "bg-orange-400" : "bg-green-400" // Change background color based on success
          }`}
        >
          {isPopUpError
            ? "Email já em uso, por favor tente novamente"
            : "Formulario enviado com sucesso!"}
          <button
            className="ml-2 text-white"
            onClick={() => setShowPopup(false)}
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
};

export default Form;
