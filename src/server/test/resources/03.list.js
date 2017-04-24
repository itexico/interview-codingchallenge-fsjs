'use strict'

const faker = require('faker')
const ensure = require('certainty').ensure
var agent = {}

describe('List /lists', function () {
    before(function () {
        this.agent = global.test.agent
    })

    it('should generate a unique id, se the user can be identified and set on a cookie', function (done) {
        this.agent.post('/cookies')
            .send({
                email: faker.internet.email()
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                ensure(res.body.cookie).named('Cookie').isNotNullOrUndefined()
                global.test.cookie = res.body.cookie
                done()
            })
    })

    it('should create a new list', function (done) {
        this.agent.post('/lists')
            .set('Cookie', [`user=${global.test.cookie}`])
            .send({
                name: faker.random.words()
            })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err)
                ensure(res.body._id).named('List ID').isNotNullOrUndefined()
                ensure(res.body.name).named('List Name').isNotNullOrUndefined()
                global.test.fixtures.lists.push(res.body)
                done()
            })
    })

    it('should get all the lists from the user', function (done) {
        this.agent.get('/lists')
            .set('Cookie', [`user=${global.test.cookie}`])
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                ensure(res.body).named('Lists').hasLength(1)
                done()
            })
    })

    it('should get a specific list from the user', function (done) {
        this.agent.get(`/lists/${global.test.fixtures.lists[0]._id}`)
            .set('Cookie', [`user=${global.test.cookie}`])
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                ensure(res.body._id).named('List ID').isNotNullOrUndefined()
                ensure(res.body.user).named('List User').isNotNullOrUndefined()
                ensure(res.body.name).named('List Name').isNotNullOrUndefined()
                done()
            })
    })

    it('should update a specific list from the user', function (done) {
        let oldList = Object.assign({}, global.test.fixtures.lists[0])
        this.agent.put(`/lists/${global.test.fixtures.lists[0]._id}`)
            .set('Cookie', [`user=${global.test.cookie}`])
            .send({
                name: faker.random.words()
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                ensure(res.body._id).named('List ID').isEqualTo(oldList._id)
                ensure(res.body.user).named('List User').isEqualTo(oldList.user)
                ensure(res.body.name).named('List Name').isNotEqualTo(oldList.name)
                done()
            })
    })

    it('should delete a specific list from the user', function (done) {
        this.agent.delete(`/lists/${global.test.fixtures.lists[0]._id}`)
            .set('Cookie', [`user=${global.test.cookie}`])
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                done()
            })
    })
})
