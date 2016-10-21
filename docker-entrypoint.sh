#!/bin/bash

if [ -z "$NODE_ENV" ]; then
  export NODE_ENV=production
fi

node --harmony /app/server.js
