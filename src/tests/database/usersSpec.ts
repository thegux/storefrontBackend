import UserTable, { User } from '../../models/users';

const store = new UserTable();

describe('User database tests', () => {
	let referenceUser: User;

	beforeAll(async () => {
		referenceUser = await store.create({
			first_name: 'database',
			last_name: 'user',
			username: 'database_user',
			password: 'db_user_password',
		});
	});

	it('should have an index method', () => {
		expect(store.index).toBeDefined();
	});
	it('should have an show method', () => {
		expect(store.show).toBeDefined();
	});
	it('should have an create method', () => {
		expect(store.create).toBeDefined();
	});
	it('should have an authenticate method', () => {
		expect(store.authenticate).toBeDefined();
	});

	it('should create an user', async () => {
		const result = await store.create({
			first_name: 'database_2',
			last_name: 'user',
			username: 'database_2_user',
			password: 'db_user_password',
		});

		expect(result.id).toBeGreaterThanOrEqual(1);
		expect(result.first_name).toBe('database_2');
		expect(result.last_name).toBe('user');
		expect(result.username).toBe('database_2_user');
	});

	it('should show user', async () => {
		const userId = referenceUser.id || -1;
		const result = await store.show(userId);

		expect(result.id).toBe(userId);
		expect(result.first_name).toBe(referenceUser.first_name);
		expect(result.last_name).toBe(referenceUser.last_name);
		expect(result.username).toBe(referenceUser.username);
	});

	it('should get all users', async () => {
		const result = await store.index();
		expect(result.length).toBeGreaterThan(0);
	});

	it('should authenticate an user', async () => {
		const result = await store.authenticate(
			referenceUser.username,
			'db_user_password'
		);
		expect(result?.id).toBe(referenceUser.id);
	});
});
