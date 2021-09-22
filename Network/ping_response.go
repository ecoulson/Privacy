package main

import "time"

type PingResponse struct {
	roundTripTime time.Duration
	err error
}

func CreateErrorResponse(err error) *PingResponse {
	return &PingResponse {
		roundTripTime: 0,
		err: err,
	}
}

func CreateResponse(before time.Time) *PingResponse {
	return &PingResponse {
		roundTripTime: time.Since(before),
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