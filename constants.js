const messages = {
  deleted: 'Successfylly deleted',
  appListening: 'App listening on port',
  dbConnected: 'DB connected',
};

const logs = {
  requestLogsPath: './logs/request.log',
  errorLogsPath: './logs/error.log',
};

const errors = {
  movieNotFound: 'Requested movie was not found',
  movieDeletePermissionError: 'Permission denied. Only movies that were added by current user are alowed to delete',
  inputedDataError: 'Inputed data error',
  emailIsNotCorrectError: 'Email is not correct',
  emailIsNotUniqError: 'User with this email already exists',
  authDataWasNotSend: 'Email or passwod was not send',
  authDataFailed: 'Email or password is not correct',
  authorizationRequired: 'Access denied, authorization required',
  pageNotFound: 'Page not found, 404',
  serverError: 'Server error',
  connectionError: 'Conection failed',
};

module.exports = { errors, messages, logs };
