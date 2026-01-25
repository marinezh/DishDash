package storage

import (
	"errors"

	"DishDash/src/models"
)

func AddIngredient(ing models.Ingredient) error {
	list, err := LoadFridge()
	if err != nil {
		return err
	}

	list = append(list, ing)
	return SaveFridge(list)
}

func RemoveIngredient(ing models.Ingredient) error {
	list, err := LoadFridge()
	if err != nil {
		return err
	}

	// find ingredient by name
	index := -1
	for i, item := range list {
		if item.Name == ing.Name {
			index = i
			break
		}
	}

	if index == -1 {
		return errors.New("ingredient not found")
	}

	// remove from slice
	list = append(list[:index], list[index+1:]...)

	return SaveFridge(list)
}