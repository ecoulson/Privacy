package main

import (
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("Quit Command Test", func ()  {
	Describe("Create Command", func ()  {
		It("Should create command", func ()  {
			command := NewQuitCommand()

			Expect(command).ToNot(BeNil())
		})
	})

	Describe("Execute Command", func ()  {
		It("Should execute command", func () {
			command := NewQuitCommand()

			Expect(func ()  {
				command.Execute()
			}).To(Panic())
		})
	})
})