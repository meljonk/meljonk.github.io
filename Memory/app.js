var cardData = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];

matched = 0;

setInterval(function() {
    timer++;
    $('#timer').text(timer);
}, 1000);

function shuffleArray(d) {
  for (var c = d.length - 1; c > 0; c--) {
    var b = Math.floor(Math.random() * (c + 1));
    var a = d[c];
    d[c] = d[b];
    d[b] = a;
  }
  return d
};

function startGame() {
    $('#gameboard').empty();
      shuffleArray(cardData);
      $('#moves').text("0");
      moves = 0;
      timer = 0;
      matched = 0;
	 $.each(cardData, function(index, value){
		$('#gameboard').append('<div class="cards">' +cardData[index]+ '</div>');
	})
};

var cardsPicked = [];
var selectCard = $('#gameboard').on( 'click', 'div', function() {
		card = $(this).text();
		$(this).addClass('selected');
		moves++;
		$('#moves').text(moves/2);
		if (cardsPicked.length <= 1) {
			cardsPicked.push(card);
			if (cardsPicked.length === 2) {
				console.log(compare(cardsPicked));
				if (compare(cardsPicked) === true) {
					$('#gameboard').find('.selected').removeClass('selected').addClass('match');
					matched++;
					cardsPicked = [];
					if (matched === 8) {
						setTimeout(function() {
						 $('#win-dialog').dialog('open');
						}, 1000);
					}
				} else {
					setTimeout(function() {
					$('#gameboard').find('.selected').removeClass('selected');
					}, 1000);
					cardsPicked = [];
				}
			}
		}
});

function compare(array) {
	var isSame = true;
	for(var i=0; i < array.length; i++) {
	isSame = array[0] === array[i] ? true : false;
	}
return isSame;
};

$('#win-dialog').dialog({
	autoOpen: false,
    width: 300,
    height: 170,
    buttons: {
        YEP: function() { //ok
            $(this).dialog('close');
            startGame();
           // $('#moves').text("0");
        },
        NAH: function() { //cancel
            $(this).dialog('close');
        }
    },
    open: function (event, ui) {
        $('#win-dialog').text("You've won in " + timer + " seconds and " + moves + " moves! Pat yourself on the back. Do you want to play again?");
    }
});

$('#restart-dialog').dialog({
	autoOpen: false,
    width: 300,
    height: 150,
    buttons: {
        YES: function() { //ok
            $(this).dialog('close');
            startGame();
        },
        NO: function() { //cancel
            $(this).dialog('close');
        }
    }
});

function reStart() {
    setTimeout(function() {
     $('#restart-dialog').dialog('open');
    }, 1000);
};

startGame();
