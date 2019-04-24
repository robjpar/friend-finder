const friends = require('../data/friends');

module.exports = (app) => {
  // API GET route
  app.get('/api/friends', (req, res) => res.json(friends));

  // API POST route
  app.post('/api/friends', (req, res) => {
    friends.push(req.body);

    // Return the best match object to be presented to the user
    res.json(findBestMatch(friends));
  });

};

// Find the best match, for which the sum of squared differences is smallest
const findBestMatch = (friends) => {
  // The current user is the last one in the array
  let latestResults = friends[friends.length - 1].results;
  latestResults = latestResults.map((result => parseInt(result)));

  // Other users
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

// Calculate the sum of squared differences between the numerical
// values of the corresponding answers
const sumSquaredDifferences = (vector1, vector2) => {
  let sum = 0;
  for (let i = 0; i < vector1.length; i++) {
    sum += Math.pow(vector2[i] - vector1[i], 2);
  }
  return sum;
};
