package main

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func (app *application) routes() http.Handler {

	router := httprouter.New()

	router.HandlerFunc(http.MethodGet, "/v1/healthcheck", app.healthCheckHandler)
	router.HandlerFunc(http.MethodGet, "/v1/todos", app.getTodos)
	router.HandlerFunc(http.MethodPost, "/v1/todos", app.createTodo)

	return app.enableCORS(router)
}
