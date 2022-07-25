export enum CodeType {
  OK = 'OK',
  LOGIN_FAILED = 'LoginFailed',
  UNAUTHORIZED = 'Unauthorized',
  OAUTH_ERROR = 'OAuthError',
  ACCOUNT_NOT_FOUND = 'AccountNotFound',
  DATA_INPUT_REQUIRED = 'DataInputRequired',

  FORBIDDEN = 'Forbidden',

  DELETE_FAILED = 'DeleteFail',

  ADMIN_ALREADY_EXIST = 'AdminAlreadyExistWithProvidedUsername',
  ADMIN_NOT_EXIST = 'AdminNotExist',
}
