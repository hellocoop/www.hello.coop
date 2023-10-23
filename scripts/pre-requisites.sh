#!/bin/bash

requiredPackages=("gh" "git")

for pkg in "${requiredPackages[@]}"; do
    if ! which "$pkg" &>/dev/null; then
        echo "$pkg is not installed"
        exit 1
    fi
done