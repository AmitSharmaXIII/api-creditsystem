const request = require('supertest');
const {app} = require('../app.js');

let id ;

describe('POST /creditcards Success Scenarios' , () => {
	it('Should return 200 code', async () =>{
        let payload = {            
            "name":"John",
            "cardNumber":5242479284136960,
            "limit":21
        }
        const response = await request(app)
                            .post('/v1/creditcards')
                            .send(payload)
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json')

        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
        expect(response.body.id).toBe(1);
	});
    it('Should return 200 code for payload without limit', async () =>{
        let payload = {            
            "name":"John",
            "cardNumber":5242479284136960
        }
        const response = await request(app)
                            .post('/v1/creditcards')
                            .send(payload)
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json')

        expect(response.status).toBe(201);
		expect(response.body.limit).toBeDefined();
        expect(response.body.limit).toBe(0);
	});
});
describe('POST /creditcards Failure Scenarios' , () => {
	it('Should return 400 for invalid cardNumber', async () =>{
        let payload = {            
            "name":"John",
            "cardNumber":5242379284136961,
            "limit":21
        }
        const response = await request(app)
                            .post('/v1/creditcards')
                            .send(payload)
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json')

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid card number");
	});
    it('Should return 400 for missing name', async () =>{
        let payload = {            
            "cardNumber":4485275742308321,
            "limit":21
        }
        const response = await request(app)
                            .post('/v1/creditcards')
                            .send(payload)
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json')

        expect(response.status).toBe(400);
	});
});
describe('GET /creditcards Success Scenarios' , () => {
	it('Data Creations : Should return 200 code', async () =>{
        let payload = {            
            "name":"John",
            "cardNumber":4485275742308327,
            "limit":21
        }
        const response = await request(app)
                            .post('/v1/creditcards')
                            .send(payload)
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json')

        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
        id = response.body.id;
		
	});
    it('Should return 200 code', async () =>{
        const response = await request(app)
                            .get('/v1/creditcards')

        expect(response.status).toBe(200);
		
	});
});
describe('GET /creditcards/id Success Scenarios' , () => {
    it('Should return 200 for specific credit card number', async () =>{
        const response = await request(app)
                            .get(`/v1/creditcards/${id}`)

        expect(response.status).toBe(200);
	});
});