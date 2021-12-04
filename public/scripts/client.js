/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };  

  const createTweetElement = function(tweetData) {
    const $tweet = $(`<article class="tweet">
    <header>
      <div class="user-display">
        <img src="${escape(tweetData.user.avatars)}">
        <span>${escape(tweetData.user.name)}</span>
      </div>
      <div class="username">${escape(tweetData.user.handle)}</div>
    </header>
    <main>
      <p>${escape(tweetData.content.text)}</p>
    </main>
    <footer>
      <span class="need_to_be_rendered" datetime="${escape(tweetData.created_at)}">October 18, 2021</span>
      <div class="action-buttons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`);

    return $tweet;
  }

  const renderTweets = function(tweets) {
    $('#tweets-container').empty(); // clear the tweets before rendering. so that we can use this load after submitting a new tweet
    for (const tweet of tweets){
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  }

  $('#new-tweet-form').submit(function(event) {
    event.preventDefault();

    const tweet = $(this).find('#tweet-text').val();
    const errorBox = $(this).find('.error-message');
    
    if (tweet === null || tweet.trim() === "") {
      // no empty tweets or tweets of only whitespace
      errorBox.text('Please enter a tweet');
      errorBox.slideDown(300);
    } else if (tweet.length > 140) {
      // tweet is too long
      errorBox.text('Tweet is too long');
      errorBox.slideDown(300);
    } else {
      // otherwise all good, send tweet!
      errorBox.hide();

      $.ajax('/tweets/', {
        method: 'POST',
        data:   $(this).serialize()
      }).then(function(result) {
        loadTweets();
      });
    }
  })

  const loadTweets = function() {
    $.ajax('/tweets/', {
      method: 'GET'
    }).then(renderTweets).then(() => {
      timeago.render(document.querySelectorAll('.need_to_be_rendered'));
    });
  }
  
  loadTweets();

})
