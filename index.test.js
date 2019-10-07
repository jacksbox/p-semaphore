const semaphore = require('./index.js')

const { V, P } = semaphore(2)

const fn = async i => {
  console.log('wait', i)
  await P()
  console.log('enter', i)
  setTimeout(() => {
    console.log('leave', i)
    V()
  }, 1000)
}

fn(1)
fn(2)
fn(3)
fn(4)