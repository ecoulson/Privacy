package assert

func IsGreater(a int, b int, message string) {
	True(a > b, message)
}

func Equal(a interface {}, b interface {}, message string) {
	True(a == b, message)
}

func NotEqual(a interface {}, b interface {}, message string) {
	False(a == b, message)
}

func NotNil(a interface {}, message string) {
	False(a == nil, message)
}

func True(expression bool, message string) {
	if !expression {
		panic(message)
	}
}

func False(expression bool, message string) {
	if expression {
		panic(message)
	}
}