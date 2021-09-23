package main

import (
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("Unknown Command", func ()  {
	Describe("Create Unknown Command", func ()  {
		Context("A valid array", func() {
			It("Should create command", func ()  {
				command := NewUnknownCommand([]string { "aaaa" })
				
				Expect(command).ToNot(BeNil())
			})
		})

		Context("Nil array", func ()  {
			It("Should panic when given a nil array", func ()  {
				Expect(func ()  {
					NewUnknownCommand(nil)
				}).To(Panic())
			})
		})
	})

	Describe("Execute Command", func ()  {
		It("Should execute unknown command", func () {
			parser := NewUnknownCommandParser()

			command := parser.Parse([]string { "unknown" })

			command.Execute()
		})
	})
})