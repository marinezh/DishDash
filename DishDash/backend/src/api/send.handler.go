package api

import (
	"encoding/json"
	"net/http"
	"log"
	"os"
	"fmt"

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

	body := formatShoppingList(list)
	to := []string{req.Email, os.Getenv("SMTP_USER")}
	if err := engine.SendShoppingListEmail(to, "Your Shopping List", body); err != nil {
		log.Println("EMAIL ERROR:", err)
		http.Error(w, "send email failed", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func formatShoppingList(list models.ShoppingList) string {
	body := "Your shopping list 🛒:\n\n"

	for _, ing := range list.Items {
		body += fmt.Sprintf("- %s: %g %s\n", ing.Name, ing.Quantity, ing.Unit)
	}

	body += "\nHappy cooking! 🍳\n"
	return body
}
