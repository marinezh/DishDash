package api

import (
	"encoding/json"
	"net/http"
	"strconv"

	"DishDash/src/models"
	"DishDash/src/storage"
)

func GetCookHandler(w http.ResponseWriter, r *http.Request) {
	// URL: /recipes/{id}, extract id manually
	path := r.URL.Path
	// "/recipes/" is 9 chars
	if len(path) <= len("/recipes/") {
		http.Error(w, "recipe id missing", http.StatusBadRequest)
		return
	}

	idStr := path[len("/recipes/"):]
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "invalid recipe id", http.StatusBadRequest)
		return
	}

	recipes, err := storage.LoadRecipes()
	if err != nil {
		http.Error(w, "failed to load recipes", http.StatusInternalServerError)
		return
	}

	var recipe *models.Recipe
	for _, r := range recipes {
		if r.ID == id {
			recipe = &r
			break
		}
	}

	if recipe == nil {
		http.Error(w, "recipe not found", http.StatusNotFound)
		return
	}

	// load fridge
	fridge, err := storage.LoadFridge()
	if err != nil {
		http.Error(w, "failed to load fridge", http.StatusInternalServerError)
		return
	}

	allIngredients := append([]models.Ingredient{}, fridge.Fresh...)
	allIngredients = append(allIngredients, fridge.Pantry...)
	allIngredients = append(allIngredients, fridge.Rare...)

	type IngredientWithMissing struct {
		Name     string  `json:"name"`
		Quantity float64 `json:"quantity"`
		Unit     string  `json:"unit"`
		Missing  float64 `json:"missing"`
	}

	var ingredients []IngredientWithMissing
	availableCount := 0
	missingCount := 0

	for _, ing := range recipe.Ingredients {
		missing := ing.Quantity
		for _, f := range allIngredients {
			if f.Name == ing.Name {
				if f.Quantity >= missing {
					missing = 0
					break
				} else {
					missing -= f.Quantity
				}
			}
		}

		if missing > 0 {
			missingCount++
		} else {
			availableCount++
		}

		ingredients = append(ingredients, IngredientWithMissing{
			Name:     ing.Name,
			Quantity: ing.Quantity,
			Unit:     ing.Unit,
			Missing:  missing,
		})
	}

	resp := struct {
		ID          int                     `json:"id"`
		MealType    string                  `json:"mealType"`
		Ingredients []IngredientWithMissing `json:"ingredients"`
		Description string                  `json:"description"`
		Summary     struct {
			Available int `json:"available"`
			Missing   int `json:"missing"`
		} `json:"summary"`
	}{
		ID:          recipe.ID,
		MealType:    recipe.MealType,
		Ingredients: ingredients,
		Description: recipe.Description,
	}

	resp.Summary.Available = availableCount
	resp.Summary.Missing = missingCount

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}
