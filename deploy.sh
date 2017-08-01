#!/bin/bash
cp ./data/house_by_state.json ./deploy/data
cp -rf ./lib ./deploy
# Skipping node_modules for now
cp -rf ./static ./deploy
cp favicon* ./deploy
cp index.html ./deploy
cp js-sandbox.html ./deploy