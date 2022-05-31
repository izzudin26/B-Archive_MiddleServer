# B-Archive Middle-serve

part of [blockchain](https://github.com/izzudin26/B-Archive_blockchain) for build simple application with private blockchain using Typescript, Fastify, Redis, and mongodb

## Development

to starting development we need dependency and using `npm install` or `yarn` for install dependency

```
$ npm install

# watch typescript compile
$ npm run start:watch

# start serve development
$ npm run start:serve

# Build
$ npm run build

# start build application
$ npm run start
```

## Deployment with docker

Before deploy to production serve we need change expose port in docker-compose.yml

```
# from
ports:
    - expose_port:port_application

# to
ports:
    - 127.0.0.1:expose_port:port_application

# run docker compose
$ docker-compose up
```

## Service Endpoint

### Node

- Add Node
  Endpoint: `/node/add`
  Method: `POST`
  Request:

```
{
    "uri": "blockchain node uri"
}
```

### User

- Registration
  Endpoint: `/user/registration/`
  Method: `POST`

```json
// Request
{
    "fullname": "string",
    "gender": "male | female",
    "email": "String email",
    "password": "string"
}

// Response
{
    "status": 200,
    "message": "successfull registration",
    "data": {
        "token": "string jwt payload"
    }
}
```

- Login
  Endpoint: `/user/login`
  Method: `POST`

```json
// Request
{
    "email": "String email",
    "password": "string"
}

// Response
{
    "status": 200,
    "message": "successfull login",
    "data": {
        "token": "string jwt payload"
    }
}
```

### Blockchain

this endpoint need header `Authorization` with value `JWT token`

- Upload Image
  Endpoint: `/blockchain/image`
  Method: `POST`
  Content-Type: `multipart/form-data`
  Body: `image: image file`
  Response

  ```json
  {
    "status": 200,
    "data": {
      "imageName": "string imageName"
    }
  }
  ```

- Get Image
  Endpoint: `/image/:imageName`
  Method: `GET`

- Add Blockdata
  Endpoint `/blockchain`
  Method: `POST`

  ```json
  // request
  {
      "receiverName": "string",
      "receiverNumber": "string",
      "transactionDate": "String date",
      "referenceNumber": "string",
      "amount": "number",
      "transactionType": "string",
      "note": "string",
      "imageUri": "string image name"
  }

  // Response
  {
      "status": 200,
      "message": "Data has been stored",
      "data": {
            {
                "receiverName": "string",
                "receiverNumber": "string",
                "transactionDate": "String date",
                "referenceNumber": "string",
                "amount": "number",
                "transactionType": "string",
                "note": "string",
                "imageUri": "string image name"
            }
      }
  }
  ```

- Get All Blockdata
  Endpoint: `/blockchain`
  Method: `GET`
  ```json
  // Response
    "status": 200,
    "message": "Successfull get data",
    "data": [
        {
            "metadata":  {
                "receiverName": "string",
                "receiverNumber": "string",
                "transactionDate": "String date",
                "referenceNumber": "string",
                "amount": "number",
                "transactionType": "string",
                "note": "string",
                "imageUri": "string image name"
            },
            "timestamp": "Date Time milisecond Epoch",
            "iteration": "number of iteration blockdata",
            "hash": "string"
        },
        {
            "metadata":  {
                "receiverName": "string",
                "receiverNumber": "string",
                "transactionDate": "String date",
                "referenceNumber": "string",
                "amount": "number",
                "transactionType": "string",
                "note": "string",
                "imageUri": "string image name"
            },
            "timestamp": "Date Time milisecond Epoch",
            "iteration": "number of iteration blockdata",
            "hash": "string"
        }
    ]
  ```

- Get Specific Blockdata
  Endpoint: `/blockchain/block/:hashblock`
  Method: `GET`
  ```json
    {
        "status": 200,
        "message": "Successfull get blockdata",
        "data": {
            "metadata":  {
                "receiverName": "string",
                "receiverNumber": "string",
                "transactionDate": "String date",
                "referenceNumber": "string",
                "amount": "number",
                "transactionType": "string",
                "note": "string",
                "imageUri": "string image name"
            },
            "timestamp": "Date Time milisecond Epoch",
            "iteration": "number of iteration blockdata",
            "hash": "string",
            "prevHash": "string"
        }
    }
  ```

- Generate QR token
  Endpoint: `/blockchain/block/generate/:hashblock`
  Method: `GET`
  ```json
  // Response
  {
      "status": 200,
      "message": "successfull generate token"
  }
  ```

- GET QR Token
  Endpoint: `/blockchain/qr/:hashblock`
  Method: `GET`
  Response will be image QR data