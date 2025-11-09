#!/bin/bash

# --- Script to launch multiple 'npm run start' instances ---
# --- Uses 'npx concurrently' to manage and prefix logs ---

# Check if an argument was provided.
if [ -z "$1" ]; then
  echo "Error: You must provide the number of instances to start."
  echo "Usage: ./start_snakes.sh 3"
  exit 1
fi

NUM_SNAKES=$1
echo "Starting $NUM_SNAKES server instances using 'npx concurrently'..."

# Create separate arrays for names and commands.
declare -a names
declare -a commands

# Loop from 0 up to (NUM_SNAKES - 1)
for (( i=0; i<$NUM_SNAKES; i++ ))
do
  # Calculate the port for this instance
  PORT=$((8000 + i))

  # Add the name to the 'names' array
  names+=("Snake-$i-P$PORT")

  # Add the full, quoted command string to the 'commands' array
  commands+=("PORT=$PORT npm run start")
done

# --- THIS IS THE FIX ---
# Join the 'names' array into a single, comma-separated string.
# We temporarily set the Internal Field Separator (IFS) to a comma.
OLD_IFS=$IFS
IFS=','
joined_names="${names[*]}"
IFS=$OLD_IFS
# --- END OF FIX ---


# Run all commands at once using npx.
# We now pass ONE '-n' flag with the single string of joined names,
# followed by all the commands.
npx concurrently \
  --kill-others \
  --prefix-colors "auto" \
  -n "$joined_names" \
  "${commands[@]}"

echo "All processes have been stopped."