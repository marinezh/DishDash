package api

import (
	"encoding/json"
	"net/http"

	"DishDash/src/models"
	"DishDash/src/storage"
)

func IncreaseListHandler(w http.ResponseWriter, r *http.Request) {
	var list []models.Ingredient

	if err := json.NewDecoder(r.Body).Decode(&list); err != nil {
		http.Error(w, "invalid body", http.StatusBadRequest)
		return
	}

	if err := storage.IncreaseList(list); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func DecreaseListHandler(w http.ResponseWriter, r *http.Request) {
	var list []models.Ingredient

	if err := json.NewDecoder(r.Body).Decode(&list); err != nil {
		http.Error(w, "invalid body", http.StatusBadRequest)
		return
	}

	if err := storage.DecreaseList(list); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
