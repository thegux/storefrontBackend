import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Product endpoint test', () => {

    let authorization:string;
    let userId:number;

    beforeAll(async () => {
        const user_payload = {
            "username": "Test_User_4",
            "password": "testPassword4",
            "firstName": "Test",
            "lastName": "User"
        };

        const response = await request.post('/users/create').send(user_payload);
        authorization = response.body.token;

        authorization = response.body.token;
        userId=response.body.id;

        const product_payload = {
            name: "test_product",
            price: 10,
        }
        await request.post("/products/create").set('authorization', `Bearer ${authorization}`).send(product_payload);

        const payload = {
            status: "open",
            userId: userId,
        }

        await request.post("/orders/create").set('authorization', `Bearer ${authorization}`).send(payload);
    });

    it("should create an order", async () => {
        const payload = {
            status: "open",
            userId: userId,
        }
        const response = await request.post("/orders/create").set('authorization', `Bearer ${authorization}`).send(payload);
        expect(response.body.status).toBe("open");
        expect(response.body.user_id).toEqual(userId.toString());
        expect(response.body.id).toBe(2);
        
    });


    it("should add a product to an order", async () => {
        const payload = {
            quantity: 1,
            orderId: 1,
            productId:1,
        }
        const response = await request.post("/orders/add").set('authorization', `Bearer ${authorization}`).send(payload);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, quantity: 1, order_id: '1', product_id: '1' });
    });
    
});
 
