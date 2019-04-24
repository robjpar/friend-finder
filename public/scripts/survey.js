// Survey questions
const questions = [
  'Red or Blue?',
  'Sweet or Sour?',
  'Sea or Mountains?',
  'Sunny or Cloudy?',
  'Mild or Spicy?',
  'Walk or Ride?',
  'Comedy or Drama?',
  'Tea or Coffee?',
  'Shrimp or Steak?',
  'Beer or Margarita?'
];

// Generating the sliders
$(window).on('load', () =>
  questions.forEach((question, index) =>
    $('#questions').append(
      `<div class="form-group mt-5">
         <label for="question-${index}"><h5>${question}</h5></label>
         <input type="range" class="form-control-range" id="question-${index}" min="0" max="100" value="50" step="1">
     </div>`
    )
  )
);

// Functionality of the "Find your bast match button"
$('#submit-button').click((event) => {
  event.preventDefault();

  const nickname = $('#nickname').val().trim();
  const photoLink = $('#photo-link').val().trim();

  // Input validation
  if (!nickname) {
    $('#nickname-label').text('Provide Your Nickname').css('color', 'red');
    alert('Provide your nickname!');
    return;
  }
  if (!photoLink) {
    $('#photo-link-label').text('Provide Link to Your Photo').css('color', 'red');
    alert('Provide link to your photo!');
    return;
  }

  // Retrieving the values of sliders
  const results = [];
  $('.form-control-range').each(function() { // arrow function doesn't work here because it doesn't bind `this`
    results.push($(this).val());
  });

  // The current user object
  const newFriend = {
    nickname: nickname,
    photoLink: photoLink,
    results: results
  };

  // Posting the data to the server
  $.post("/api/friends", newFriend, (bestFriend) => {
    $('#result-photo').empty().append(`<img src="${bestFriend.photoLink}" alt="${bestFriend.nickname}">`);
    $('#result-nickname').empty().append(`<h3>${bestFriend.nickname}</h3>`);
    $('#results-modal').modal('show');
  });

});
