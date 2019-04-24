const friends = require('../data/friends');

module.exports = (app) => {
  app.get('/api/friends', (req, res) => res.json(friends));

  app.post('/api/friends', (req, res) => {
    friends.push(req.body);
    res.json(findBestMatch(friends));
  });

};

const findBestMatch = (friends) => {
  let latestResults = friends[friends.length - 1].results;
  latestResults = latestResults.map((result => parseInt(result)));

  let results = friends[0].results;
  results = results.map((result => parseInt(result)));

  let minS = sumSquaredDifferences(latestResults, results);
  let minIndex = 0;

  for (let i = 1; i < friends.length - 1; i++) {
    let results = friends[i].results;
    results = results.map((result => parseInt(result)));

    const s = sumSquaredDifferences(latestResults, results);

    if (s < minS) {
      minS = s;
      minIndex = i;
    }
  }

  return friends[minIndex];
};

const sumSquaredDifferences = (vector1, vector2) => {
  let sum = 0;
  for (let i = 0; i < vector1.length; i++) {
    sum += Math.pow(vector2[i] - vector1[i], 2);
  }
  return sum;
};
