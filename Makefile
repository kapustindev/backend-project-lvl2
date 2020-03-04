install:
	npm install
publish:
	npm publish --dry-run | sudo npm link
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npx jest --coverage
build:
	rm -rf dist
	npm run build