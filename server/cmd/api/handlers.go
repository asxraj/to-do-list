package main

import (
	"fmt"
	"net/http"
)

func (app *application) todoPost(w http.ResponseWriter, r *http.Request) {
	err := app.todos.AddTodo("Add this to the todo")
	if err != nil {
		app.serverError(w, err)
		return
	}

	fmt.Fprint(w, "Successfully added todo to database")
}
