import log from "./log";

export default function handleError(error, res) {
  if (error.response) {
    const requestedUrl = `${error.response.config.baseURL}${error.response.config.url}`;
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (requestedUrl) {
      log.error(`error fetching: ${requestedUrl}`);
    }
    log.error(`returned: ${error.response.status}`);

    const validationErrors = error.response.data?.data?.validationErrors;
    if (validationErrors) {
      Object.values(validationErrors).forEach((validationError) => {
        log.error(`validationError: ${validationError[0].message}`);
      });
    }

    res.status(error.response.status).json(error.response.data);
  } else if (error.request) {
    const { _options: errorRequestOptions } = error.request;
    const requestedUrl = `https://${errorRequestOptions.hostname}${errorRequestOptions.path}`;
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    log.error(error);

    res.status(400).json();
  } else {
    // Something happened in setting up the request that triggered an Error
    log.error(error.message);
    res.status(error.status || 500).json();
  }
}
