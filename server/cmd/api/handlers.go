package main

import (
	"fmt"
	"net/http"
)

func (app *application) createTodo(w http.ResponseWriter, r *http.Request) {
	err := app.todos.AddTodo("This is the database")
	if err != nil {
		app.serverError(w, err)
		return
	}

	fmt.Fprint(w, "Successfully added todo to database")
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
