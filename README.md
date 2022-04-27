# Serverless Person Service

This is a simple person service stack build with CDK. 

## Business logic
A person can be created by calling `/person [POST]` REST API with the appropriate api key.
A person will be stored in a database on a valid `POST` request.
On creation of the person an event is fired into the serverless landscape.

### Example request
Headers:
```json
  {
    "Content-Type": "application/json",
    "x-api-key": "{api_key_here}"
  }
```
Body:
```json
{
  "FirstName": "FirstName",
  "LastName": "LastName",
  "TelephoneNumber": "+31612345678",
  "Address": {
    "StreetName": "Street",
    "CityName": "City",
    "BuildingNumber": "2A",
    "PostalCode": "1111XX",
    "Country": "NL"
  }
}
```

### Success response
```json
{
  "body": "{\"message\":\"Ok\",\"data\":{\"message\":\"Successfully stored.\"}}",
  "statusCode": 200,
}
```

## Architecture
* `API Gateway`             AWS managed REST API
* `DynamoDB`                AWS managed (No-SQL) database
* `DynamoDB Streams`        AWS managed Change Data Capture service
* `Lambda`                  AWS managed compute service
* `SQS`                     AWS managed message queueing service

 ![Architecture](/images/architecture.png)

## Useful commands

* `npm run build`           compile typescript to js
* `npm run watch`           watch for changes and compile
* `npm run test`            perform the jest unit tests
* `npm run deploy-dev`      deploy `person-service-stack-dev` to `dev` AWS account/region
* `npm run diff-dev`        compare deployed `person-service-stack-dev` stack with current state
* `cdk synth`               emits the synthesized CloudFormation template
