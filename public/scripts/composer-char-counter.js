// Manage the character counter in the new tweet form while typing

$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    const newCount = 140 - $(this).val().length;
    const counter = $(this).parent().find('.counter');

    counter.val(newCount);

    if (newCount >= 0){
      counter.removeClass('invalid');
    } else {
      counter.addClass('invalid');
    }

  });
});
