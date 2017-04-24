'use strict'

const User = require('../../models/user')

before(function * () {
    // TODO: This section is used in case we need to simulate data on the database before running the tests
})

after(function * () {
    // Delete all users from the test
    for (let user of global.test.fixtures.users) {
        yield User.find({ _id: user._id }).remove()
    }
})
