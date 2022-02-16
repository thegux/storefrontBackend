import supertest from 'supertest';
import { User } from '../../models/users';
import app from '../../server';

const request = supertest(app);



describe('User endpoint test', () => {

    interface userResponseType extends User {
        token: string,
    }

    let user:userResponseType;

    beforeAll(async () => {
            const payload = {
                "username": "Test_User",
                "password": "testPassword",
                "firstName": "Test",
                "lastName": "User"
            };
    
            const response = await request.post('/users/create').send(payload);
            user=response.body;
    })

    it('should create an user', async () => {
        const payload = {
            "username": "Test_User_2",
            "password": "testPassword2",
            "firstName": "Test_2",
            "lastName": "User_2"
        };

        
        const response = await request.post('/users/create').send(payload);
        expect(response.status).toBe(200);
        expect(response.body.username).toEqual('Test_User_2');
        expect(response.body.firstName).toEqual('Test_2');
        expect(response.body.lastName).toEqual('User_2');
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
      
        const response = await request.get(`/users/${user.id}`).set('authorization', `Bearer ${user.token}`);
        expect(response.status).toBe(200); 
        expect(response.body.username).toEqual('Test_User');
        expect(response.body.firstName).toEqual('Test');
        expect(response.body.lastName).toEqual('User');
        expect(response.body.id).toBe(user.id);
    })


    it("should return all users", async () => {        
        const response = await request.get('/users').set('authorization', `Bearer ${user.token}`);
        expect(response.status).toBe(200); 
        expect(response.body.length).toBeGreaterThanOrEqual(1);
    })
});