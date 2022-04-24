import * as AWS from 'aws-sdk';
import hash from 'object-hash';
import { ValidatedPerson } from '../../services/person-validator';

interface DynamoClientInput {
  tableName: string
}

export default class DynamoClient {
  private tableName: string;

  private client: AWS.DynamoDB;

  constructor({ tableName }: DynamoClientInput) {
    AWS.config.update({ region: 'eu-west-1' });
    this.client = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
    this.tableName = tableName;
  }

  public async createPerson(person: ValidatedPerson) {
    const personHash = hash({
      first: person.FirstName, last: person.LastName, phone: person.TelephoneNumber,
    });
    const params: AWS.DynamoDB.PutItemInput = {
      TableName: this.tableName,
      Item: {
        id: { S: personHash },
        firstName: { S: person.FirstName },
        lastName: { S: person.FirstName },
        telephoneNumber: { S: person.TelephoneNumber },
        streetName: { S: person.Address.StreetName },
        cityName: { S: person.Address.CityName },
        buildingNumber: { S: person.Address.BuildingNumber },
        postalCode: { S: person.Address.PostalCode },
        country: { S: person.Address.Country },
      },
    };
    return this.client.putItem(params);
  }
}
