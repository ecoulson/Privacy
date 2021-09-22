package main

type ContactsCommand struct {
	contacts *Contacts
}

func NewContactsCommand(contacts *Contacts) *ContactsCommand {
	return &ContactsCommand {
		contacts: contacts,
	}
}

func (command * ContactsCommand) Execute() {
	command.contacts.PrintContacts()
}