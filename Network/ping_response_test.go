package main

import (
	"errors"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)


type FakeClock struct {}

func NewFakeClock() *FakeClock {
	return &FakeClock {}
}

func (clock FakeClock) Since(t time.Time) time.Duration {
	return t.Sub(clock.Now())
}

func (clock FakeClock) Now() time.Time {
	time, _ := time.Parse(time.RFC3339, "2021-09-28T00:14:31+00:00")
	return time
}

func Test_CreateErrorResponse(t *testing.T) {
	response := CreateErrorResponse(errors.New("test"))

	if !response.HasError() {
		t.Fatal("Should have an error")
	}
}

func Test_CreateErrorResponseWithNilError(t *testing.T) {
	assert.PanicsWithValue(t, "Error can not be nil", func() {
		CreateErrorResponse(nil)
	})
}

func Test_CreateResponse(t *testing.T) {
	clock := NewFakeClock()
	response := CreateResponse(clock, clock.Now().Add(time.Second))

	if response.HasError() {
		t.Fatal("Should have not had an error")
	}
	if response.RoundTripTime().Seconds() != 1 {
		t.Fatal("Should have round trip time of one sconds")
	}
	if response.Error() != nil {
		t.Fatal("Error should be nil")
	}
}

func Test_CreateResponseWithNilClock(t *testing.T) {
	clock := NewFakeClock()

	assert.PanicsWithValue(t, "Clock can not be nil", func() {
		CreateResponse(nil, clock.Now())
	})
}

func Test_CreateResponseWithNilInvalidTime(t *testing.T) {
	assert.PanicsWithValue(t, "The given time must be in the past", func() {
		clock := NewFakeClock()

		CreateResponse(clock, clock.Now().Add(-time.Second))
	})
}