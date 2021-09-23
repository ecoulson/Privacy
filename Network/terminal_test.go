package main

import (
	"context"
	"os"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("Terminal", func () {
	Describe("Create Terminal", func ()  {
		Context("Nil arguments", func ()  {
			It("Should panic with nil input stream", func ()  {
				context := context.Background()

				Expect(func ()  {
					NewTerminal(nil, NewHostNode(&context), &context)
				}).To(Panic())
			})

			It("Should panic with nil host node", func ()  {
				context := context.Background()

				Expect(func ()  {
					NewTerminal(os.Stdin, nil, &context)
				}).To(Panic())
			})

			It("Should panic with nil context", func ()  {
				context := context.Background()

				Expect(func ()  {
					NewTerminal(os.Stdin, NewHostNode(&context), nil)
				}).To(Panic())
			})
		})	
	})
})