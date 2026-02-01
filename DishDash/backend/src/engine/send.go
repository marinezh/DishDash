package engine

import (
	"os"
	"net/smtp"
	"fmt"
)

func SendShoppingListEmail(to []string, subject, body string) error {

	from := os.Getenv("SMTP_FROM")
	user := os.Getenv("SMTP_USER")
	pass := os.Getenv("SMTP_PASS")
	addr := os.Getenv("SMTP_ADDR")

	if from == "" || user == "" || pass == "" || addr == "" {
		return fmt.Errorf("SMTP config missing")
	}

	auth := smtp.PlainAuth("", user, pass, os.Getenv("SMTP_HOST"))

	msg := []byte(fmt.Sprintf(
		"From: %s\r\nTo: %s\r\nSubject: %s\r\n\r\n%s",
		from, to[0], subject, body,
	))

	return smtp.SendMail(addr, auth, from, to, msg)
}
