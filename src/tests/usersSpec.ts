import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('User endpoint test', () => {

    it('should create an user', async () => {
        const payload = {
            "username": "Test_User",
            "password": "testPassword",
            "firstName": "Test",
            "lastName": "User"
        };

        
        const response = await request.post('/users/create').send(payload);
        expect(response.status).toBe(200);
        expect(response.body.username).toEqual('Test_User');
        expect(response.body.firstName).toEqual('Test');
        expect(response.body.lastName).toEqual('User');
        expect(response.body.id).toBe(1);
    });

    it('should authenticate an user', async () => {
        const payload = {
            "username": "Test_User",
            "password": "testPassword",
        }
        const response = await request.post('/users/authenticate').send(payload);
        expect(response.status).toBe(200); 
    })

    it("should show user", async () => {
        const payload = {
            "username": "Test_User",
            "password": "testPassword",
        }
        const authorization = await request.post('/users/authenticate').send(payload);
        
        const response = await request.get('/users/1').set('authorization', `Bearer ${authorization.body}`);
        expect(response.status).toBe(200); 
        expect(response.body.username).toEqual('Test_User');
        expect(response.body.firstName).toEqual('Test');
        expect(response.body.lastName).toEqual('User');
        expect(response.body.id).toBe(1);
    })


    it("should return all users", async () => {
        const payload = {
            "username": "Test_User",
            "password": "testPassword",
        }
        const authorization = await request.post('/users/authenticate').send(payload);
        
        const response = await request.get('/users').set('authorization', `Bearer ${authorization.body}`);
        expect(response.status).toBe(200); 
        expect(response.body.length).toBe(1);

    })
});