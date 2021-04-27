const { httpGet } = require('./mock-http-interface');

const illBeBack = async (url) => {
  const response = await httpGet(url);
  const key = response.status === 200 ? 'Arnie Quote' : 'FAILURE'
  const { message } = JSON.parse(response.body);

  return {
    [key]: message
  };
};

const getArnieQuotes = async (urls) => {
  const arniePromises = urls.map(async (url) => illBeBack(url));

  return await Promise.all(arniePromises).catch((err) => {
    console.warn(err);
  });
};

module.exports = {
  getArnieQuotes,
};
