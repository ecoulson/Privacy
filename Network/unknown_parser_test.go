package main

import (
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("Unknown Command Parser", func ()  {
	Describe("Unknown Parser", func ()  {
		It("Should create parser", func ()  {
			parser := NewUnknownCommandParser()

			Expect(parser).ToNot(BeNil())
		})
	})

	Describe("Parser Command", func ()  {
		It("Should parse an unknown command", func () {
			parser := NewUnknownCommandParser()

			command := parser.Parse([]string { "unknown" })

			Expect(command).ToNot(Equal(nil))
		})
	})
})