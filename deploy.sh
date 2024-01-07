#!/bin/bash
set -eo pipefail
docker compose run node bash -c 'yarn build'
cd dist
git init
git checkout --orphan gh-pages
git add -A
git commit -m "deploy"
git remote add origin git@github.com:yakov255/vue-pwa.git
git push origin gh-pages --force
