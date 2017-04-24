'use strict'

const faker = require('faker')
const ensure = require('certainty').ensure
const info = require(('../../package.json'))
const User = require('../../models/user')
var agent = {}

describe('Users /cookies', function () {
  before(function () {
    this.agent = global.test.agent
  })

  it('should generate a unique id, se the user can be identified and set on a cookie', function (done) {
    // First we generate five random strings
    for (let i = 0; i < 5; i++) {
      this.agent.post('/cookies')
        .send({
          email: faker.internet.email()
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          ensure(res.body.cookie).named('Cookie').isNotNullOrUndefined()
          global.test.fixtures.cookies.push(res.body.cookie)
        })
    }
    done()
  })

  it('should check every user and guarantee to be unique', function (done) {
    // First we generate five random strings
    for (let user of global.test.fixtures.users) {
      User.find({ _id: user._id })
        .then((value) => {
          ensure(value).named('User found').hasLength(1)
        })
        .catch((err) => {
          donde(err)
        })
    }
    done()
  })

})
