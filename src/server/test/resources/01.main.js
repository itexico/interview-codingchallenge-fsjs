'use strict'

const ensure = require('certainty').ensure
const info = require(('../../package.json'))
var agent = {}

describe('Main /', function () {
  before(function () {
    this.agent = global.test.agent
  })

  it('should show the data of the server', function (done) {
    this.agent.get('/')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        ensure(res.body.api).named('API Name').isEqualTo(info.name)
        ensure(res.body.description).named('Description').isEqualTo(info.description)
        ensure(res.body.author).named('Author').isEqualTo(info.author)
        ensure(res.body.version).named('Version').isEqualTo(info.version)
        done()
      })
  })

})
