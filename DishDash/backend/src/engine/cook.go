package engine

import (
	"DishDash/src/models"
	"DishDash/src/utils"
)

// GetRecipeDetails returns a recipe with missing info based on fridge
func GetRecipeDetails(recipe models.Recipe, fridge models.Fridge) models.RecipeDetails {
	// merge fridge sections
	all := append([]models.Ingredient{}, fridge.Fresh...)
	all = append(all, fridge.Pantry...)
	all = append(all, fridge.Rare...)

	availableCount := 0
	missingIngredients := []models.IngredientWithStatus{}

	for _, ing := range recipe.Ingredients {
		if utils.HasIngredient(all, ing) {
			availableCount++
			missingIngredients = append(missingIngredients, models.IngredientWithStatus{
				Name:     ing.Name,
				Quantity: ing.Quantity,
				Unit:     ing.Unit,
				Missing:  false,
			})
		} else {
			missingIngredients = append(missingIngredients, models.IngredientWithStatus{
				Name:     ing.Name,
				Quantity: ing.Quantity,
				Unit:     ing.Unit,
				Missing:  true,
			})
		}
	}

	return models.RecipeDetails{
		ID:                 recipe.ID,
		Name:               recipe.Name,
		MealType:           recipe.MealType,
		Description:        recipe.Description,
		Ingredients:        missingIngredients,
		SummaryAvailable:   availableCount,
		SummaryMissing:     len(recipe.Ingredients) - availableCount,
	}
}
