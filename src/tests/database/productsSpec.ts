import ProductTable, {Product} from '../../models/products'

const store = new ProductTable();

describe("Product database tests", () => {
    let referenceProduct:Product;
    beforeAll(async () => {
        referenceProduct = await store.create({
            name: "product_database",
            price: 10
        })
    });

    it("should create a product", async () => {
        const response = await store.create({
            name: "product_database_2",
            price: 10
        })

        expect(response.id).toBeDefined();
        expect(response.name).toBe("product_database_2");
        expect(Number(response.price)).toBe(10);
    })

    it("should get a single product", async () => {
        const productId = referenceProduct.id || 0;
        const response = await store.show(productId);
        expect(response).toEqual(referenceProduct);
    })

    it('should get all products', async () => {
        const response = await store.index();
        expect(response.length).toBeGreaterThanOrEqual(1);
        expect(response).toContain(referenceProduct);
    })
})