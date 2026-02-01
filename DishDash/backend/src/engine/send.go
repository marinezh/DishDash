package engine

import (
	"os"
	"net/smtp"
	"strings"
	"fmt"

	"DishDash/src/models"
)

func SendShoppingListEmail(to string, list models.ShoppingList) error {
	var body strings.Builder
	body.WriteString("Your shopping list:\n\n")

	for _, it := range list.Items {
		body.WriteString(fmt.Sprintf(
			"- %s: %d %s\n",
			it.Name,
			it.Quantity,
			it.Unit,
		))
	}

	msg := fmt.Sprintf(
		"Subject: Shopping List\n\n%s",
		body.String(),
	)

	return smtp.SendMail(
		os.Getenv("SMTP_ADDR"),
		smtp.PlainAuth(
			"",
			os.Getenv("SMTP_USER"),
			os.Getenv("SMTP_PASS"),
			os.Getenv("SMTP_HOST"),
		),
		os.Getenv("SMTP_FROM"),
		[]string{to},
		[]byte(msg),
	)
}
