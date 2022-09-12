package models

import (
	"database/sql"
	"time"
)

type TodoModel struct {
	DB *sql.DB
}

type TodoItem struct {
	ID           int
	Task         string
	Done         bool
	Created_At   time.Time
	Completed_At time.Time
}

func (m *TodoModel) AddTodo(task string) error {
	query := `INSERT INTO todos (task, done, created) VALUES ($1, false, current_timestamp)`

	_, err := m.DB.Exec(query, task)
	if err != nil {
		return err
	}

	return nil
}
