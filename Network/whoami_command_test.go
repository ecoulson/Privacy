package main

import (
	"context"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("", func ()  {
	Describe("Create Command", func ()  {
		Context("Valid host node", func ()  {
			It("Should create command", func ()  {
				context := context.Background()
				command := NewWhoAmICommand(NewHostNode(&context))

				Expect(command).ToNot(BeNil())
			})
		})

		Context("Nil host node", func ()  {
			It("Should panic", func ()  {
				Expect(func () {
					NewWhoAmICommand(nil)
				}).Should(Panic())	
			})
		})
	})

	Describe("Execute Command", func ()  {
		It("Should execute command", func () {
			context := context.Background()
			command := NewWhoAmICommand(NewHostNode(&context))
			command.Execute()
		})
	})
})