# Transport App

Simple Express backend to track kilometers, fuel liters and working hours for each driver and truck.

## Setup

1. Run `npm install` inside this directory to install dependencies.
2. Start the server with `npm start`.

The server exposes two endpoints:

- `GET /records` - List all records.
- `POST /records` - Create a new record with JSON payload:

```json
{
  "driver": "name or id",
  "truck": "truck id",
  "kilometers": 120,
  "fuelLiters": 30,
  "hours": 5
}
```
