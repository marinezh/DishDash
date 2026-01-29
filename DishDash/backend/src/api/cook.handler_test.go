package api_test

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"DishDash/src/api"
	"DishDash/src/models"
	"DishDash/src/storage"
	"DishDash/src/utils"
)

func setupRecipeData(t *testing.T) {
	// temp data dir so tests don't overwrite real files
	utils.SetDataDir(t.TempDir())

	// Recipes
	recipes := []models.Recipe{
		{
			ID:          1,
			Name:        "Tomato Soup",
			MealType:    "Lunch",
			Description: "Delicious fresh tomato soup",
			Ingredients: []models.Ingredient{
				{Name: "Tomato", Quantity: 3, Unit: "pcs"},
				{Name: "Water", Quantity: 1, Unit: "l"},
			},
		},
		{
			ID:          2,
			Name:        "Pasta Salad",
			MealType:    "Dinner",
			Description: "Healthy pasta salad",
			Ingredients: []models.Ingredient{
				{Name: "Pasta", Quantity: 200, Unit: "g"},
				{Name: "Lettuce", Quantity: 1, Unit: "head"},
			},
		},
	}
	if err := storage.SaveRecipes(recipes); err != nil {
		t.Fatal(err)
	}

	// Fridge
	fridge := models.Fridge{
		Fresh:  []models.Ingredient{{Name: "Tomato", Quantity: 2, Unit: "pcs"}},
		Pantry: []models.Ingredient{{Name: "Pasta", Quantity: 100, Unit: "g"}},
		Rare:   []models.Ingredient{},
	}
	if err := storage.SaveFridge(fridge); err != nil {
		t.Fatal(err)
	}
}

func TestGetCookHandler(t *testing.T) {
	setupRecipeData(t)

	// Valid recipe
	req := httptest.NewRequest(http.MethodGet, "/recipes/1", nil)
	w := httptest.NewRecorder()
	api.GetCookHandler(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("expected 200 OK, got %d", w.Code)
	}

	var resp struct {
		ID          int `json:"id"`
		MealType    string
		Description string
		Summary     struct {
			Available int
			Missing   int
		}
		Ingredients []struct {
			Name     string
			Quantity float64
			Unit     string
			Missing  float64
		}
	}
	if err := json.NewDecoder(w.Body).Decode(&resp); err != nil {
		t.Fatal(err)
	}

	if resp.ID != 1 || resp.MealType != "Lunch" {
		t.Fatal("unexpected recipe data")
	}

	// Tomato partially available
	for _, ing := range resp.Ingredients {
		if ing.Name == "Tomato" && ing.Missing != 1 {
			t.Fatalf("expected missing 1 Tomato, got %v", ing.Missing)
		}
	}

	if resp.Summary.Available != 1 || resp.Summary.Missing != 1 {
		t.Fatalf("expected summary Available=1, Missing=1, got %+v", resp.Summary)
	}

	// Invalid recipe ID
	req2 := httptest.NewRequest(http.MethodGet, "/recipes/abc", nil)
	w2 := httptest.NewRecorder()
	api.GetCookHandler(w2, req2)
	if w2.Code != http.StatusBadRequest {
		t.Fatalf("expected 400 for invalid ID, got %d", w2.Code)
	}

	// Non-existing recipe
	req3 := httptest.NewRequest(http.MethodGet, "/recipes/999", nil)
	w3 := httptest.NewRecorder()
	api.GetCookHandler(w3, req3)
	if w3.Code != http.StatusNotFound {
		t.Fatalf("expected 404 for non-existing recipe, got %d", w3.Code)
	}
}
