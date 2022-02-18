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

## Endpoint
There are ten endpoints in this application:

### USER ENDPOINTS

#### 1. GET/USERS [TOKEN REQUIRED]
Get all the users in the database

##### Params:    
```
GET/users
```

##### Response Type: Array of Users  

#### 2. GET/USERS/:ID [TOKEN REQUIRED]
Get a single user from the database
#### Params:

- ID - The id of the requested user
    
```
GET/USERS/:ID
```
##### Response Type: An User object


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
