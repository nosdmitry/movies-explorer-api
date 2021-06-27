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
  imageUrlIsNotValid: 'Image URL is not valid',
  trailerUrlIsNotValid: 'Trailer URL is not valid',
  tumbUrlIsNotValid: 'Thumb URL is not valid',
  authDataWasNotSend: 'Email or passwod was not send',
  authDataFailed: 'Email or password is not correct',
  authorizationRequired: 'Access denied, authorization required',
  forbiddenError: 'Forbidden, 403',
  pageNotFound: 'Page not found, 404',
  serverError: 'Server error',
  connectionError: 'Conection failed',
  deleteMovieNotCorrectData: 'Inputed data is not correct',
};

const limiterConfig = {
  windowMs: 15 * 60 * 1000,
  max: 100,
};

module.exports = {
  errors, messages, logs, limiterConfig,
};
