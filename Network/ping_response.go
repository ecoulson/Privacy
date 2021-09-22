package main

import "time"

type PingResponse struct {
	RoundTripTime time.Duration
	Error error
}

func CreateErrorResponse(err error) *PingResponse {
	return &PingResponse {
		RoundTripTime: 0,
		Error: err,
	}
}

func CreateResponse(before time.Time) *PingResponse {
	return &PingResponse {
		RoundTripTime: time.Since(before),
		Error: nil,
	}
}