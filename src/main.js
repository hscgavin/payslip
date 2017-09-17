#!/usr/bin/env node

const InputHandler = require('./inputHandler')

const args = process.argv.slice(2)

InputHandler.handleInputs(args)
