const numDivs = 36;
const maxHits = 10;

let missHits = 0;
let hits = 0;
let firstHitTime = 0;

function round() {
  let divSelector = randomDivId();
  $(divSelector).addClass("target").text(hits + 1);

  if (firstHitTime === 0) {
    firstHitTime = getTimestamp();
    // $('#button-start').prop('disabled', true);
    $('#button-start').hide();
  }

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $('#total-missed-hits').text(missHits);
  $('#game-field').addClass('d-none');
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  let targetID = '#' + event.target['id'];
  if ($(event.target).hasClass("target")) {

    $('.row .miss').each(function () {
      let missedID = '#' + $(this)[0].id;
      $(missedID).removeClass('miss');
    });

    $(targetID).removeClass('target').text('');
    hits = hits + 1;
    round();
  } else {
    console.log('miss');
    $(targetID).addClass('miss');
    missHits += 1;
  }
}

function init() {
  $('#button-start').click(function () {
    round();
    $(".game-field").click(handleClick);
  });

  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
