#!/bin/bash

# Check if an argument was provided.
if [ -z "$1" ]; then
  echo "Error: You must provide the number of instances to start."
  echo "Usage: ./snake_server.sh 3"
  exit 1
fi

NUM_SNAKES=$1
echo "Testing with $NUM_SNAKES server instances"

declare -a cmd

# Loop from 0 up to (NUM_SNAKES - 1)
for (( i=0; i<$NUM_SNAKES; i++ ))
do
# Calculate the port for this instance
  PORT=$((8000 + i))

  # Add the name to the 'names' array
  cmd+=(--name "Snake-$PORT" --url "http://localhost:$PORT")
done
echo "running command ./battlesnake play -W 11 -H 11 $cmd"
./battlesnake play -W 11 -H 11 "${cmd[@]}" --browser