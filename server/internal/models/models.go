package models

import (
	"database/sql"
	"time"
)

type TodoModel struct {
	DB *sql.DB
}

type TodoItem struct {
	ID           int          `json:"id"`
	Task         string       `json:"task"`
	Done         bool         `json:"done"`
	Created_At   time.Time    `json:"created_at"`
	Completed_At sql.NullTime `json:"completed_at"`
}

func (m *TodoModel) GetAllTodos() ([]*TodoItem, error) {
	query := "SELECT id, task, done, created, completed FROM todos"

	rows, err := m.DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	todos := []*TodoItem{}

	for rows.Next() {
		t := &TodoItem{}

		err := rows.Scan(&t.ID, &t.Task, &t.Done, &t.Created_At, &t.Completed_At)
		if err != nil {
			return nil, err
		}

		todos = append(todos, t)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return todos, nil
}

func (m *TodoModel) AddTodo(task string) error {
	query := `INSERT INTO todos (task, done, created) VALUES ($1, false, current_timestamp)`

	_, err := m.DB.Exec(query, task)
	if err != nil {
		return err
	}

	return nil
}
