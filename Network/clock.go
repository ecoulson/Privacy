package main

import "time"

type IClock interface {
	Since(t time.Time) time.Duration
	Now() time.Time
}

type Clock struct {}

func NewClock() IClock {
	return &Clock {}
}

func (clock Clock) Since(t time.Time) time.Duration {
	return time.Since(t)
}

func (clock Clock) Now() time.Time {
	return time.Now()
}