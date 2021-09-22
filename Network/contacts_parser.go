package main

type ContactsParser struct {
	contacts *Contacts
}

func NewContactsParser(contacts *Contacts) *ContactsParser {
	return &ContactsParser {
		contacts: contacts,
	}
}

func (parser *ContactsParser) Parse([]string) Command {
	return NewContactsCommand(parser.contacts)
}