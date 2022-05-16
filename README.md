# Validator

A simple validator library to check a data-model from the client, it works with `ts` as well with `js` projects.

```ts
import Validator from '@taikai/validator';

const validator = new Validator({});
const isValid1 = await validator.validate({
    name: {
        type: 'string',
        options: {
            presence: true
        }
    }
}, {
    name: 'John Doe'
});

```

## :memo: Where do I start?

### Step 1: Installation

This is a Node.js module available through the npm registry.

Before installing, download and install Node.js. prefer the LTS version.

If this is a brand new project, make sure to create a package.json first with the `npm init` command.

Installation is done using the npm install command:

```bash
$ npm i @taikai/validator
```

### Step 2: Validate a model with the validator

#### Import the library into your project

use the import statement (in case of a typescript project):

```ts
import Validator from '@taikai/validator';
```

or require (if you are working in a js project):

```js
const { default: Validator } = require('@taikai/validator');
```

#### Create a new instance of your Validator

the validator instance expects a context object as the first parameter. the `context` is na object containing a `db` property (as `PrismaClient` instance object) to achieve the database if need at some point. 

```js
// Example
const validator = new Validator({
    // Use only if SchemaOptions `unique` property is defined
    db: new PrismaClient()
});

```

the `db` is required only when the SchemaOptions `unique` combined with `orm` properties are defined when validating a model.

```js
//... Instance with valid context ... 

await validator.validate({
    username: {
        type: 'string',
        options: {
            presence: true,
            unique: true, // required
            orm: 'user' // required
        }
    }
}, {
    username: 'joshmathias'
}); // true

// In case of errors, we can find in the `errors` property of the 
// validator instance
console.log(validator.errors); // {}
```

#### Reusing a validator instance

we can re-use a validator instance by calling the `reset()` method:

```js
const validator = new Validator({});

// #1 Validation
await validator.validate({
    username: {
        type: 'string',
        options: {
            presence: true,
        }
    }
}, {}); // false

console.log(validator.errors); // { 'username': 'name is not a valid string' }

// Reseting...
validator.reset();

// #2 Validation
await validator.validate({
    name: {
        type: 'string',
        options: {
            presence: true,
        }
    }
}, {}); // false

console.log(validator.errors); // { 'name': 'name is not a valid string' }
```

    Note: When you call the `reset()` method it's clears the errors object.

## Contributing

The way you can contribute to this project is **submitting new features** or **fixing bugs.**

To get started you have to clone this repo to your machine; open your terminal on the folder you want to clone into, and enter the following commands:

```bash
$ git clone https://github.com/taikai/validator.git
$ cd validator
$ npm install
```

Now you can create a new branch containing the new feature or bugfix, e.g.: `git checkout -b feature/my_new_feature`. This will make it easier for you to submit a pull request and get your feature merged.

### Test Options

Before submitting, you must pass all the unit tests and syntax checks by running the two commands below:

`npm run test` run all the unit test cases in tests folder

There is a nested project called **lib-tester** where you can play and see how would work your new feature or bugfix. But first you need to run the `build` script on the root project, then install the dependencies on the nested project using the `npm install` command. It should install the local package NOT the published one:

```json
{
    // ...
    "@taikai/validator": "file:../taikai-validator-<VERSION>.tgz"
    // ...
}
```