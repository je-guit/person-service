export const SUCCESS = {
  body: '{"message":"Ok","data":{"message":"Successfully stored."}}',
  statusCode: 200,
};

export const INTERNAL_SERVER_ERROR = {
  body: '{"message":"Internal Server Error","details":"An unexpected error occurred."}',
  statusCode: 500,
};

export const BAD_REQUEST_MISSING_NAME = {
  body: '{"message":"Bad Request","details":{"reason":["Please provide a valid FirstName (string)"]}}',
  statusCode: 400,
};

export const BAD_REQUEST_INVALID_TELEPHONE_NUMBER = {
  body: '{"message":"Bad Request","details":{"reason":["Please provide a valid (Dutch) TelephoneNumber (string, e.g. +31612345678)"]}}',
  statusCode: 400,
};
