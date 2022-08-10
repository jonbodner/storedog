#!/bin/bash

checkStoredog() {
  wget --quiet -O - http://localhost:3000 |grep -qi storedog
}

printf "\nWaiting for Storedog"

until checkStoredog; do
  printf .
  sleep 2
done

printf "\nBrowser replay starting.\n\n"

while :
do
  node puppeteer.js http://localhost:3000
done