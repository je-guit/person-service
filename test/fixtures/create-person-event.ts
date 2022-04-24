export const VALID = {
  body: '{\n  "FirstName": "J",\n  "LastName": "G",\n  "TelephoneNumber": "+31612345678",\n  "Address": {\n    "StreetName": "Street", \n    "CityName": "City", \n    "BuildingNumber": "2A", \n    "PostalCode": "1111XX", \n    "Country": "NL"\n  }\n}',
};

export const MISSING_NAME = {
  body: '{\n  "LastName": "G",\n  "TelephoneNumber": "+31612345678",\n  "Address": {\n    "StreetName": "Street", \n    "CityName": "City", \n    "BuildingNumber": "2A", \n    "PostalCode": "1111XX", \n    "Country": "NL"\n  }\n}',
};

export const INVALID_TELEPHONE_NUMBER = {
  body: '{\n  "FirstName": "Jan",\n  "LastName": "G",\n  "TelephoneNumber": "9999888866",\n  "Address": {\n    "StreetName": "Street", \n    "CityName": "City", \n    "BuildingNumber": "2A", \n    "PostalCode": "1111XX", \n    "Country": "NL"\n  }\n}',
};
