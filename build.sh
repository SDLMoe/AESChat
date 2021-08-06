#!/bin/bash
date "+%F %r %Z" > src/buildtime.txt
cat src/buildtime.txt
npm run ng-high-memory -- b --configuration production
