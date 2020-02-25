install:
	npm install
publish:
	npm publish --dry-run | sudo npm link
lint:
	npx eslint .
test:
	npm test