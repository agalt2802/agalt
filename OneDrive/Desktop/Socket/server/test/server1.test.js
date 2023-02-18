// const request = require('supertest');
// const express = require('express');
// const sinon = require('sinon');
// const { expect } = require('chai');
// const {describe, it} = require('mocha')

// const server = require('../../server')

// describe('Express Server', () => {
//   let app;
//   let stub;

//   beforeEach(() => {
//     app = express();
//     stub = sinon.stub();
//   });

//   afterEach(() => {
//     stub.reset();
//   });

//   describe('GET / endpoint', () => {
//     it('should return a success response', async () => {
//       stub.returns({ message: 'Success' });
//       app.get('/', (req, res) => {
//         res.send(stub());
//       });

//       const res = await request(app).get('/');
//       expect(res.statusCode).to.equal(200);
//       expect(res.body).to.deep.equal({ message: 'Success' });
//     });
//   });

//   describe('Test endpoint', () => {
//     it('should respond with status code 200 and render index.ejs', async () => {
//       stub.returns({ text: '<h1>Welcome to my app!</h1>' });
//       app.get('/', (req, res) => {
//         res.send(stub());
//       });
      
//       const response = await request(app).get('/');
//       expect(response.statusCode).to.equal(200);
//       expect(response.text).to.contain('<h1>Welcome to my app!</h1>');
//     });
//   });

//   describe('POST / endpoint', () => {
//     it('should return a success response', async () => {
//       stub.returns({ message: 'Success' });
//       app.post('/', (req, res) => {
//         res.send(stub());
//       });

//       const res = await request(app)
//         .post('/')
//         .send({ data: 'test data' });
//       expect(res.statusCode).to.equal(200);
//       expect(res.body).to.deep.equal({ message: 'Success' });
//     });
//   });
// });
