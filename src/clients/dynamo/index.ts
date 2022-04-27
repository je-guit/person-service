import * as AWS from 'aws-sdk';
import hash from 'object-hash';
import { ValidatedPerson } from '../../services/person-validator';

interface DynamoClientInput {
  tableName: string
}

export default class DynamoClient {
  private tableName: string;

  public client: AWS.DynamoDB.DocumentClient;

  constructor({ tableName }: DynamoClientInput) {
    AWS.config.update({ region: 'eu-west-1' });
    this.client = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
    this.tableName = tableName;
  }

  public async createPerson(person: ValidatedPerson) {
    const personHash = hash({
      f: person.FirstName, l: person.LastName, t: person.TelephoneNumber,
    });
    const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: {
        id: personHash,
        firstName: person.FirstName,
        lastName: person.LastName,
        telephoneNumber: person.TelephoneNumber,
        streetName: person.Address.StreetName,
        cityName: person.Address.CityName,
        buildingNumber: person.Address.BuildingNumber,
        postalCode: person.Address.PostalCode,
        country: person.Address.Country,
      },
    };
    return this.client.put(params).promise();
  }
}
