# Storefront backend`
This is an API backend for a storefront application. This project was executed as the second challenge of the Udacity's Full Stack Javascript Nanodegree course.

## Getting Started

### Pre-requisites
In order to run this project properly, make sure you have the following installed:
- Node
- Postgres
- Environment variables (Listed at the bottom of the README)
1. Create a .env file in the main directory with the environment variables
2. Install the dependencies:
```
npm install
```
3. Start your project:
```
npm start
```

## Authentication
This application uses JWT tokens with salts to authenticate users.


## Endpoints
There are ten endpoints in this application:

### 1. USER ENDPOINTS

#### 1.1 GET/USERS [TOKEN REQUIRED]
Gets all the users in the database

##### Params:    
```
GET/users
```

##### Response Type: Array of Users  

#### 1.2 GET/USERS/:ID [TOKEN REQUIRED]
Gets a single user from the database
#### Params:

- ID - The id of the requested user
    
```
GET/USERS/:ID
```
##### Response Type: An User object

#### 1.3 POST/USERS/CREATE 
Creates an user.
#### Body:

- User = {
			username: 'YOUR_USERNAME',
			password: 'YOUR_PASSWORD',
			firstName: 'YOUR_NAME',
			lastName: 'YOUR_LASTNAME',
		}
    
```
POST/USERS/CREATE
```
##### Response Type: An User object containg a TOKEN


#### 1.4 POST/PRODUCTS/AUTHENTICATE 
Authenticates an user.
#### Body:

- Product = {
		username: 'USERNAME',
		password: 'USER_PASSWORD',
	    }
    
```
POST/users/authenticate
```
##### Response Type: A object containing a TOKEN and the user's id



### 2. PRODUCT ENDPOINTS

#### 2.1 GET/PRODUCTS
Gets all the products in the database

##### Params:    
```
GET/products
```

##### Response Type: Array of Products

#### 2.2 GET/PRODUCTS/:ID
Gets a single product from the database

##### Params:    
```
GET/products/id
```

##### Response Type: A single product

#### 2.3 POST/PRODUCTS/CREATE [TOKEN REQUIRED]
Creates a product.
#### Body:

- Product = {
			name: 'PRODUCT_NAME',
			price: PRODUCT_PRICE,
		}
    
```
POST/PRODUCTS/CREATE
```
##### Response Type: An User object containg a TOKEN



### 3. ORDERS ENDPOINTS [TOKEN REQUIRED]

#### 3.1 GET/:USERID
Gets most recent order from the user in the database

##### Params:    
```
GET/orders/:userId
```

##### Response Type: An order object

#### 3.2 POST/ORDERS/CREATE [TOKEN REQUIRED]
Creates an order in the database

##### Params:
- Order = {
	      status: ORDER_STATUS ("active" or "complete"),
	      userId: USER_ID
	  }
```
GET/orders/create
```


#### 3.3 POST/ORDERS/ADD [TOKEN REQUIRED]
Adds a product to an order.
#### Body:

- Product = {
	     quantity: PRODUCT_AMOUNT,
	     orderId: ORDER_ID,
	     productId: PRODUCT_ID
	  }
    
```
POST/PRODUCTS/CREATE
```
##### Response Type: An order containing the quantity, the order's id and the product's id that was sent.


## Testing
This application uses Jasmine to test its endpoints responses. Tests can be found within src -> tests.

1. To test your code:
```
npm run test
```


## Building for production

1. To build your code into ES5:
```
npm run build
```

#### ENVIRONMENT VARIABLES
```
POSTGRES_HOST = 127.0.0.1
POSTGRES_DB = storefront
POSTGRES_USER = thegux
POSTGRES_PASSWORD = theguxStorefrontDB

POSTGRES_TEST_DB=storefront_test
POSTGRES_TEST_PASSWORD=thegux123

ENV=dev
BCRYPT_PASSWORD=the-gux-udacity
SALT_ROUNDS=10
```
