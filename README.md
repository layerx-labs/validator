### Validador

A simple lib to validate data-model from the client.

```js
const validator = new Validator({});

const data = {
	name: 'My Name'
}

await validator.validate({
    name: {
        type: 'String',
        options: {
            present: true,
        }
    }
}, data) // true
```