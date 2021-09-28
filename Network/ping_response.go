package main

import (
	"time"

	"github.com/ecoulson/Privacy/pkg/assert"
)

type PingResponse struct {
	roundTripTime time.Duration
	err error
}

func CreateErrorResponse(err error) *PingResponse {
	assert.NotNil(err, "Error can not be nil")

	return &PingResponse {
		roundTripTime: 0,
		err: err,
	}
}

func CreateResponse(clock IClock, before time.Time) *PingResponse {
	assert.NotNil(clock, "Clock can not be nil")

	if (before.Before(clock.Now())) {
		panic("The given time must be in the past")
	}

	return &PingResponse {
		roundTripTime: clock.Since(before),
		err: nil,
	}
}

func (response PingResponse) RoundTripTime() time.Duration {
	return response.roundTripTime
}

func (response PingResponse) HasError() bool {
	return response.err != nil
}

func (response PingResponse) Error() error {
	return response.err
}