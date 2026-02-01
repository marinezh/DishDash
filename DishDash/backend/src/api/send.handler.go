package api

import (
	"encoding/json"
	"net/http"

	"DishDash/src/engine"
	"DishDash/src/storage"
	"DishDash/src/models"
)

func SendShoppingHandler(w http.ResponseWriter, r *http.Request) {
	var req models.SendShoppingRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	if req.Email == "" {
		http.Error(w, "email is required", http.StatusBadRequest)
		return
	}

	list, err := storage.LoadShopping()
	if err != nil {
		http.Error(w, "failed to load shopping list", http.StatusInternalServerError)
		return
	}

	if err := engine.SendShoppingListEmail(req.Email, list); err != nil {
		http.Error(w, "failed to send email", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
