package main

import (
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("Quit Parser Test", func ()  {
	Describe("Create Parser", func ()  {
		It("Should create command", func ()  {
			command := NewQuitParser()

			Expect(command).ToNot(BeNil())
		})
	})

	Describe("Parse Command", func ()  {
		It("Should parse a command", func () {
			parser := NewQuitParser()

			command := parser.Parse([]string { "quit" })

			Expect(command).ToNot(BeNil())
		})

		Context("Nil arguments", func ()  {
			It("Should panic", func ()  {
				parser := NewQuitParser()

				Expect(func ()  {
					parser.Parse(nil)
				}).To(Panic())
			})
		})

		Context("Incorrect command type", func ()  {
			It("Should panic", func ()  {
				parser := NewQuitParser()

				Expect(func ()  {
					parser.Parse([]string { "wrong" })
				}).To(Panic())
			})
		})
	})
})