### Build

go build -o network

### Test

go test -race -covermode=atomic -coverprofile=coverage.out
