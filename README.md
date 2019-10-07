# p-semaphore

A simple async/await semaphore implementation

## installation

`npm install p-semaphore`

## usage

```js
const semaphore = require('./p-semaphore.js')

const { V, P } = semaphore(1) // initial value (defaults to 1)
```

```js
await P() // will down/wait/decrement, always has to be awaited
V()       // will up/signal/increase, syncronuse call
```

For convenience `semaphore()` also returns `signal/wait` as well as `increment/decrement`:
```js
const { signal, wait } = semaphore(1)
const { increment, decrement } = semaphore(1)
```