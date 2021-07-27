const { get, post } = require("./../service/shortener");

async function getLink(id) {
  return await get(id);
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
      if (error) return reject(error);
      return resolve();
    });
  });
}

async function validatePostRequest(payload) {
  if (isMissingQuery(payload)) throw "Missing url";
  if (isEmptyQuery(payload)) throw "Empty request";
  const url = validateUrlScheme(payload.body.url);
  await validateUrlDns(url);
}

exports.getLink = getLink;
exports.getFullLink = getFullLink;
exports.postLink = postLink;
exports.validateGetRequest = validateGetRequest;
exports.validatePostRequest = validatePostRequest;
