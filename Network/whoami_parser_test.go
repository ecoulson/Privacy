package main

import (
	"context"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("WhoAmIParser", func ()  {
	Describe("Create Parser", func ()  {
		Context("Valid host node", func ()  {
			It("Should create parser", func ()  {
				context := context.Background()
				command := NewWhoAmIParser(NewHostNode(&context))

				Expect(command).ToNot(BeNil())
			})
		})

		Context("Nil host node", func ()  {
			It("Should panic", func ()  {
				Expect(func () {
					NewWhoAmIParser(nil)
				}).Should(Panic())	
			})
		})
	})

	Describe("Parser Command", func ()  {
		It("Should parse a whoami command", func () {
			context := context.Background()
			parser := NewWhoAmIParser(NewHostNode(&context))

			command := parser.Parse([]string { "whoami" })

			Expect(command).ToNot(Equal(nil))
		})
	})
})