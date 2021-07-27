const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect(process.env["DB_URI"], {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const shortUrlSchema = new Schema({
  shortUrlId: { type: String, required: true },
  fullUrl: { type: String, required: true },
});

async function get(payload) {
  return "";
}

async function post(payload) {
  const guidUrl = uuidv4();
  const shortUrl = new shortUrlSchema({
    shortUrlId: guidUrl,
    fullUrl: payload,
  });
  const response = shortUrl.save(function (err, data) {
    if (err) return done(err);
    done(null, data);
  });
  return response;
}

exports.get = get;
exports.post = post;
