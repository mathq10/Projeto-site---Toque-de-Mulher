package main

import (
    "log"
    "net/http"
    "gitlab.com/mathq10/ps-backend-Joao-Holanda-Matheus-Queiros/handlers"
    "gitlab.com/mathq10/ps-backend-Joao-Holanda-Matheus-Queiros/db"
    "github.com/gorilla/mux"
)

func main() {
    r := mux.NewRouter()
    db.Init()

    r.HandleFunc("/api/users", handlers.GetUsers).Methods("GET")
    r.HandleFunc("/api/users", handlers.CreateUser).Methods("POST")
    r.HandleFunc("/api/users/{id}", handlers.GetUser).Methods("GET")
    r.HandleFunc("/api/users/{id}", handlers.UpdateUser).Methods("PUT")
    r.HandleFunc("/api/users/{id}", handlers.DeleteUser).Methods("DELETE")

    log.Println("Server is running on port 8080")
    log.Fatal(http.ListenAndServe(":8080", r))
}
