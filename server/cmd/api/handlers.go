package main

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"
)

func (app *application) createTodo(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Task string `json:"task"`
	}

	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		app.serverError(w, err)
		return
	}

	err = app.todos.AddTodo(input.Task)
	if err != nil {
		app.serverError(w, err)
		return
	}

	err = app.writeJSON(w, http.StatusCreated, map[string]string{"data": "Successfully Sent"}, nil)
	if err != nil {
		app.serverError(w, err)
	}
}

func (app *application) getTodos(w http.ResponseWriter, r *http.Request) {

	todos, err := app.todos.GetAllTodos()
	if err != nil {
		app.serverError(w, err)
		return
	}

	env := map[string]any{
		"todolist": todos,
	}

	err = app.writeJSON(w, http.StatusOK, env, nil)
	if err != nil {
		app.serverError(w, err)
	}

}

func (app *application) deleteTodo(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())

	id, err := strconv.ParseInt(params.ByName("id"), 10, 64)
	if err != nil || id < 1 {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}

	err = app.todos.DeleteTodo(id)
	if err != nil {
		app.serverError(w, err)
		return
	}

	err = app.writeJSON(w, http.StatusOK, map[string]any{"message": "todo successfully deleted"}, nil)
	if err != nil {
		app.serverError(w, err)

	}

}
