import Err from './errorcode';

const ResponseTemplate = {
  general(data: any) {
    return data;
  },
  successMessage(message: any) {
    return {
      success: true,
      message
    };
  },
  /**
   * Returns standard success response
   * @param {*} data
   * @param {String} message
   */
  success(data: any, message: any) {
    return {
      success: true,
      message,
      data
    };
  },
  error(message: any, err: any, code: any) {
    return {
      success: false,
      message: message || 'some error occurred',
      error: err || 'error occurred on server, please try again after some time.',
      code: code || Err.InternalServerError
    };
  },
  emptyContent() {
    return ResponseTemplate.error(
      'empty content found',
      `you must provide valid data and it must not be empty
      ref: http://stackoverflow.com/questions/18419428/what-is-the-minimum-valid-json`,
      Err.EmptyRequestBody
    );
  },
  invalidContentType() {
    return ResponseTemplate.error(
      'invalid content type',
      `you must specify content type and it must be application/json',
      ref: 'http://stackoverflow.com/questions/477816/what-is-the-correct-json-content-type`,
      Err.InvalidContentType
    );
  },
  BadRequestFromJoi(err: any) {
    return ResponseTemplate.error(
      err.message,
      err.error,
      err.code || Err.ValidationFailed
    );
  },
  routeNotFound(req: any) {
    return ResponseTemplate.error(
      'api not found',
      `${req.method} ${req.url}`,
      Err.RouteNotFound
    );
  },
}

export default ResponseTemplate;