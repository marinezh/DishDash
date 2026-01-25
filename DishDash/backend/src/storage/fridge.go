package storage

import (
	"encoding/json"
	"os"
	"path/filepath"

	"DishDash/src/models"
)

func fridgePath() string {
	return filepath.Join("data", "fridge.json")
}

func LoadFridge() ([]models.Ingredient, error) {
	path := fridgePath()
	data, err := os.ReadFile(path)
	if err != nil {
		if os.IsNotExist(err) {
			return []models.Ingredient{}, nil
		}
		return nil, err
	}

	var list []models.Ingredient
	if err := json.Unmarshal(data, &list); err != nil {
		return nil, err
	}
	return list, nil
}

func SaveFridge(list []models.Ingredient) error {
	data, err := json.MarshalIndent(list, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(fridgePath(), data, 0644)
}