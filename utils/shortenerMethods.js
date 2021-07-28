const { get, post } = require("./../service/shortener");
const { DEFAULT_ERROR } = require("./constants");

async function getLink(id) {
  let link = await get(id);
  if (!isValidUrlScheme(link)) link = `http://${link}`;
  return link;
}

function getFullLink(request) {
  return request;
}

async function postLink(payload) {
  return await post(payload);
}

function validateGetRequest(link) {
  return link;
}

function isMissingQuery(payload) {
  if (!payload.body && !payload.body.url) return true;
}

function isEmptyQuery(payload) {
  if (payload.body.url === "") return true;
}

function isValidUrlScheme(url) {
  const hostName = url.split("://")[1];
  if (hostName) return true;
}

function validateUrlScheme(url) {
  const hostName = url.split("://")[1];
  if (!hostName) return url;
  return hostName;
}

async function validateUrlDns(url) {
  const dns = require("dns");
  const options = {
    family: 0,
  };

  return new Promise((resolve, reject) => {
    dns.lookup(url, options, (error) => {
      if (error) return reject(DEFAULT_ERROR);
      return resolve();
    });
  });
}

async function validatePostRequest(payload) {
  if (isMissingQuery(payload)) throw DEFAULT_ERROR;
  if (isEmptyQuery(payload)) throw DEFAULT_ERROR;
  const url = validateUrlScheme(payload.body.url);
  await validateUrlDns(url);
}

exports.getLink = getLink;
exports.getFullLink = getFullLink;
exports.postLink = postLink;
exports.validateGetRequest = validateGetRequest;
exports.validatePostRequest = validatePostRequest;
