const Tom = require('test-runner').Tom
const Index = require('./')
const Lws = require('lws')
const fetch = require('node-fetch')
const a = require('assert').strict

const tom = module.exports = new Tom()

tom.test('no options', async function () {
  const port = 9000 + this.index
  const lws = Lws.create({
    stack: Index,
    port: port
  })
  const response = await fetch(`http://localhost:${port}/`)
  const body = await response.text()
  lws.server.close()
  a.ok(/listing directory/.test(body))
  a.ok(/class="icon/.test(body))
})

tom.test('directory links have trailing slash', async function () {
  const port = 9000 + this.index
  const lws = Lws.create({
    stack: Index,
    port: port
  })
  const response = await fetch(`http://localhost:${port}/`)
  const body = await response.text()
  lws.server.close()
  a.ok(/href="\/node_modules\/"/.test(body))
  a.ok(/href="\/index.js"/.test(body))
})
