'use strict'

const faker = require('faker')
const ensure = require('certainty').ensure
var agent = {}

describe('Item /items', function () {
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
                global.test.list = res.body
                done()
            })
    })

    it('should create a new item', function (done) {
        this.agent.post(`/list/${global.test.list._id}/items`)
            .set('Cookie', [`user=${global.test.cookie}`])
            .send({
                name: faker.random.words()
            })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err)
                ensure(res.body._id).named('Item ID').isNotNullOrUndefined()
                ensure(res.body.name).named('Item Name').isNotNullOrUndefined()
                global.test.item = res.body
                done()
            })
    })

    it('should get all the items from a specific list', function (done) {
        this.agent.get(`/list/${global.test.list._id}/items`)
            .set('Cookie', [`user=${global.test.cookie}`])
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                ensure(res.body).named('Items').hasLength(1)
                done()
            })
    })

    it('should get a specific item from a specific list', function (done) {
        this.agent.get(`/list/${global.test.list._id}/items/${global.test.item._id}`)
            .set('Cookie', [`user=${global.test.cookie}`])
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                ensure(res.body._id).named('Item ID').isNotNullOrUndefined()
                ensure(res.body.name).named('Item Name').isNotNullOrUndefined()
                done()
            })
    })

    it('should update a specific item from a list', function (done) {
        let oldItem = Object.assign({}, global.test.item)
        this.agent.put(`/list/${global.test.list._id}/items/${global.test.item._id}`)
            .set('Cookie', [`user=${global.test.cookie}`])
            .send({
                name: faker.random.words()
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                ensure(res.body._id).named('List ID').isEqualTo(oldItem._id)
                ensure(res.body.name).named('List Name').isNotEqualTo(oldItem.name)
                done()
            })
    })

    it('should delete a specific item from a list', function (done) {
        this.agent.delete(`/list/${global.test.list._id}/items`)
            .set('Cookie', [`user=${global.test.cookie}`])
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                done()
            })
    })
})
