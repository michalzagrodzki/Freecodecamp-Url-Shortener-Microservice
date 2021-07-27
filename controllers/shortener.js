const {
  getLink,
  getFullLink,
  postLink,
  validateGetRequest,
  validatePostRequest,
} = require("./../utils/shortenerMethods");

// send link
exports.get_link = (req, res) => {
  try {
    validateGetRequest(req);

    const response = getLink(req.params.id);
    res.redirect(response);
  } catch (error) {
    res.json({ error: error });
  }
};

// post link
exports.post_link = async (req, res) => {
  try {
    await validatePostRequest(req);
    const fullLink = getFullLink(req.body.url);
    const shortLink = await postLink(req.body.url);
    const response = {
      original_url: fullLink,
      short_url: shortLink,
    };
    res.json(response);
  } catch (error) {
    res.json({ error: error });
  }
};
