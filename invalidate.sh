#!/bin/bash
echo "Invalidating cloudfront for www.hello.coop"
aws cloudfront create-invalidation --distribution-id E18QWJE5W61Q2O --paths "/*"