package assert

func IsGreater(a int, b int, message string) {
	if a <= b {
		panic(message)
	}
}

func Equal(a interface {}, b interface {}, message string) {
	if a != b {
		panic(message)
	}
}

func NotNil(a interface{}, message string) {
	if a == nil {
		panic(message)
	}
}