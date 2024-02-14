FROM golang:1.22.0-alpine3.18

WORKDIR /app

COPY . .

RUN go get -d -v .

RUN go build -o api .

EXPOSE 8080

CMD ["./api"]
