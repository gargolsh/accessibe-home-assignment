## Doron Argov - Accessibe Home Assignment

### Requirements:
node.js

#### In order to run the tests you first need to run

```
npm install
```

#### run headless
```
npm test
```

#### run headed
```
npm run testHeaded
```

- 15 tests are located in *accessibe-home-assignment.spec.ts*\
- Functions and locators are located in files for the different pages in the *page_elements* folder\
- The test *'menu "Reset App State" button test - validate using item "Remove" button'* -
fails because of a bug in the app, so it is skipped until the issue is fixed.
- HTML report is generated automatically after every run and is saved in the *test-resutls* folder
