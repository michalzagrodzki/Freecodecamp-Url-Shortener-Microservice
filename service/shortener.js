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

let ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);

async function get(payload) {
  const query = ShortUrl.where({ shortUrlId: payload });
  query.findOne(function (err) {
    if (err) return err;
  });
  const { fullUrl: response } = await query;
  return response;
}

async function post(payload) {
  const guidUrl = uuidv4();
  const shortUrlRecord = new ShortUrl({
    shortUrlId: guidUrl,
    fullUrl: payload,
  });
  await shortUrlRecord.save(function (err) {
    if (err) return err;
  });
  const { shortUrlId: response } = shortUrlRecord;
  return response;
}

exports.get = get;
exports.post = post;
