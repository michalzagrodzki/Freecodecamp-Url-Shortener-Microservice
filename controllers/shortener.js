const {
  defaultMethod,
  validateGetRequest,
  validatePostRequest,
} = require("./../utils/shortenerMethods");

// send link
exports.get_link = (req, res) => {
  try {
    validateGetRequest(req);

    const defaultMethod = defaultMethod(req);
    const response = {
      link: defaultMethod,
    };
    res.json(response);
  } catch (error) {
    res.json({ error: error });
  }
};

// post link
exports.post_link = (req, res) => {
  try {
    validatePostRequest(req);

    const defaultMethod = defaultMethod(req);
    const response = {
      original_url: defaultMethod,
      short_url: defaultMethod,
    };
    res.json(response);
  } catch (error) {
    res.json({ error: error });
  }
};
