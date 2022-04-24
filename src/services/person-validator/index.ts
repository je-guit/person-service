import { existsAndIsOfType } from '../../utils';
import Logger from '../logger';

type Person = Record<string, any>;

export interface ValidatedPerson {
  FirstName: string,
  LastName: string,
  TelephoneNumber: string,
  Address: {
    StreetName: string,
    CityName: string,
    BuildingNumber: string,
    PostalCode: string,
    Country: string,
  }
}

interface PersonValidatorInput {
  logger: Logger,
  person?: Person
}

export default class PersonValidator {
  private logger: Logger;

  private person?: Person;

  constructor({ logger, person }: PersonValidatorInput) {
    this.logger = logger;
    this.person = person;
  }

  public hasValidFirstName(): boolean {
    return existsAndIsOfType(this.person?.FirstName, 'string');
  }

  public hasValidLastName(): boolean {
    return existsAndIsOfType(this.person?.LastName, 'string');
  }

  public hasValidTelephoneNumber(): boolean {
    const telRegex = /^\(?([+]31|0031|0)-?(\s?|-)([0-9]\s{0,2}){9}$/;
    return typeof this.person?.TelephoneNumber === 'string' && telRegex.test(this.person.TelephoneNumber);
  }

  public hasValidStreetName(): boolean {
    return existsAndIsOfType(this.person?.Address?.StreetName, 'string');
  }

  public hasValidCityName(): boolean {
    return existsAndIsOfType(this.person?.Address?.CityName, 'string');
  }

  public hasValidBuildingNumber(): boolean {
    return existsAndIsOfType(this.person?.Address?.BuildingNumber, 'string');
  }

  public hasValidPostalCode(): boolean {
    return existsAndIsOfType(this.person?.Address?.PostalCode, 'string');
  }

  public hasValidCountry(): boolean {
    return existsAndIsOfType(this.person?.Address?.Country, 'string');
  }

  public getInvalidElements(): string[] {
    const validity: [boolean, string][] = [
      [this.hasValidFirstName(), 'Please provide a valid FirstName (string)'],
      [this.hasValidLastName(), 'Please provide a valid LastName (string)'],
      [this.hasValidTelephoneNumber(), 'Please provide a valid (Dutch) TelephoneNumber (string, e.g. +31612345678)'],
      [this.hasValidStreetName(), 'Please provide a valid Address.StreetName (string)'],
      [this.hasValidCityName(), 'Please provide a valid Address.CityName (string)'],
      [this.hasValidBuildingNumber(), 'Please provide a valid Address.BuildingNumber (string)'],
      [this.hasValidPostalCode(), 'Please provide a valid Address.PostalCode (string)'],
      [this.hasValidCountry(), 'Please provide a valid Address.Country (string)'],
    ];
    const invalidElements = validity.filter((check) => !check[0]).map((check) => check[1]);
    this.logger.debug(`Found ${invalidElements.length} invalid elements.`, { invalidElements });
    return invalidElements;
  }
}
