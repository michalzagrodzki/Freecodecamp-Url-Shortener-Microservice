const {
  getLink,
  getFullLink,
  postLink,
  validateGetRequest,
  validatePostRequest,
} = require("./../utils/shortenerMethods");

// send link
exports.get_link = async (req, res) => {
  try {
    validateGetRequest(req);
    const { id } = req.params;

    const response = await getLink(id);
    res.redirect(response);
  } catch (error) {
    res.json({ error: error });
  }
};

// post link
exports.post_link = async (req, res) => {
  try {
    await validatePostRequest(req);
    const { url } = req.body;

    const fullLink = getFullLink(url);
    const shortLink = await postLink(url);
    const response = {
      original_url: fullLink,
      short_url: shortLink,
    };
    res.json(response);
  } catch (error) {
    res.json({ error: error });
  }
};
