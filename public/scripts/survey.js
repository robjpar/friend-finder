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

$(window).on('load', () =>
  questions.forEach((question, index) =>
    $('#questions').append(
      `<div class="form-group">
         <label for="question-${index}">${question}</label>
         <input type="range" class="form-control-range" id="question-${index}" min="0" max="100" value="50" step="1">
     </div>`
    )
  )
);

$('#submit-button').click((event) => {
  event.preventDefault();

  const nickname = $('#nickname').val().trim();
  const photoLink = $('#photo-link').val().trim();

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

  const results = [];

  $('.form-control-range').each(function() { // arrow function doesn't work here because it doesn't bind `this`
    results.push($(this).val());
  });

  const newFriend = {
    nickname: nickname,
    photoLink: photoLink,
    results: results
  };

  $.post("/api/friends", newFriend, (bestFriend) => {
    $('#result-photo').empty().append(`<img src="${bestFriend.photoLink}" alt="${bestFriend.nickname}">`);
    $('#result-nickname').empty().append(`<h3>${bestFriend.nickname}</h3>`);
    $('#results-modal').modal('show');
  });

});
