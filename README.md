# Authentication Task

This service provides token-based authentication using Redis for session management. 

## Installation

Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>

```
## Install Dependencies
```bash
npm install
```

## Start Redis Server
Ensure Redis server is running on your system. Run this command.
```bash
redis-server
```

## Run the Application

```bash
npm run dev
```
## Migration
Create a user table in the database run this command.
```bash
npm run migrate:run
``` 
## API End point
Hit this end point through Postman.
```bash
http://localhost:5000
```
## 1- Sign up
Signup api end point is
### Api type : POST
```bash
http://localhost:5000/api/signup
```
### Body
```bash
{
    "username":"abc@gmail.com",
    "password":"12345"
}
```

## 2- Login
Login api end point is
### Api type : POST
```bash
http://localhost:5000/api/login
```
### Body
```bash
{
    "username":"abc@gmail.com",
    "password":"12345"
}
```

## 3- Logout
Logout api end point is
### Api type : POST
```bash
http://localhost:5000/api/logout
```
### Header
Pass vaild token in the Authorization
```bash
    "Authorization":"Bearer <token>",
```

## 4- Session
Session verify api end point is
### Api type : GET
```bash
http://localhost:5000/api/session
```
### Header
Pass vaild token in the Authorization
```bash
    "Authorization":"Bearer <token>",
```
