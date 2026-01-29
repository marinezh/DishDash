package api_test

import (
	"encoding/json"
	"net/http/httptest"
	"net/http"
	"testing"

	"DishDash/src/api"
	"DishDash/src/models"
	"DishDash/src/storage"
	"DishDash/src/utils"
)

func TestGetCookHandler_ClassicPie(t *testing.T) {
	utils.SetDataDir(t.TempDir())

	if err := storage.SaveRecipes([]models.Recipe{
		{
			ID:       1,
			Name:     "Classic Apple Pie",
			MealType: "dessert",
			Ingredients: []models.Ingredient{
				{Name: "apple", Quantity: 6, Unit: "pcs"},
				{Name: "sugar", Quantity: 1, Unit: "cup"},
				{Name: "cinnamon", Quantity: 1, Unit: "tsp"},
			},
		},
	}); err != nil {
		t.Fatal(err)
	}

	if err := storage.SaveFridge(models.Fridge{
		Fresh:  []models.Ingredient{{Name: "apple", Quantity: 4, Unit: "pcs"}},
		Pantry: []models.Ingredient{{Name: "sugar", Quantity: 1, Unit: "cup"}},
		Rare:   []models.Ingredient{},
	}); err != nil {
		t.Fatal(err)
	}

	req := httptest.NewRequest(http.MethodGet, "/recipes/1", nil)
	w := httptest.NewRecorder()
	api.GetCookHandler(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("expected 200 OK, got %d", w.Code)
	}

	var resp models.RecipeDetails
	if err := json.NewDecoder(w.Body).Decode(&resp); err != nil {
		t.Fatal(err)
	}

	// t.Logf("Recipe details: %+v", resp)

	if resp.SummaryAvailable != 1 {
		t.Fatalf("expected Available=1, got %d", resp.SummaryAvailable)
	}
	if resp.SummaryMissing != 2 {
		t.Fatalf("expected Missing=2, got %d", resp.SummaryMissing)
	}

	for _, ing := range resp.Ingredients {
		switch ing.Name {
		case "apple":
			if !ing.Missing {
				t.Fatalf("expected apple to be missing, got %+v", ing)
			}
		case "sugar":
			if ing.Missing {
				t.Fatalf("expected sugar to be available, got %+v", ing)
			}
		case "cinnamon":
			if !ing.Missing {
				t.Fatalf("expected cinnamon to be missing, got %+v", ing)
			}
		default:
			t.Fatalf("unexpected ingredient: %s", ing.Name)
		}
	}
}
