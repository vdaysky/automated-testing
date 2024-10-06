require('dotenv').config()

const request = require('supertest');
const {expect} = require('chai');


const BASE_URL = 'https://gorest.co.in/public/v2';
const TOKEN = process.env.API_KEY;

describe('GoRest API Combined Tests', function () {
    let userId;

    it('should create, update, and delete a user', function (done) {
        const newUser = {
            name: 'Jane Doe', email: `janedoe${Date.now()}@example.com`, gender: 'female', status: 'active',
        };

        request(BASE_URL)
            .post('/users')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(newUser)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('name', newUser.name);
                userId = res.body.id

                const updatedUser = {
                    name: 'Jane Doe Updated',
                    email: `janedoe_updated${Date.now()}@example.com`,
                    gender: 'female',
                    status: 'inactive',
                };

                request(BASE_URL)
                    .put(`/users/${userId}`)
                    .set('Authorization', `Bearer ${TOKEN}`)
                    .send(updatedUser)
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.body).to.have.property('name', updatedUser.name);

                        request(BASE_URL)
                            .get(`/users/${userId}`)
                            .set('Authorization', `Bearer ${TOKEN}`)
                            .expect(200)
                            .end((err, res) => {
                                if (err) return done(err);
                                expect(res.body).to.have.property('id', userId);
                                expect(res.body).to.have.property('name', updatedUser.name);

                                request(BASE_URL)
                                    .delete(`/users/${userId}`)
                                    .set('Authorization', `Bearer ${TOKEN}`)
                                    .expect(204)
                                    .end((err, res) => {
                                        if (err) {
                                            done(err)
                                        } else {
                                            done()
                                        }
                                    })
                            });

                    });
            });
    });
});