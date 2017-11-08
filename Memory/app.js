var cardData = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];

matched = 0;

setInterval(function() {
    timer++;
    $('#timer').text(timer);
}, 1000)

function starRating() {
    if (moves < 22)  {
        $('#stars').text("3");
    } else if (moves > 22 && moves < 32) {
        $('#stars').text("2");
    } else if ( moves > 32){
       $('#stars').text("1");
    }
};

function shuffleArray(d) {
    for (var c = d.length - 1; c > 0; c--) {
        var b = Math.floor(Math.random() * (c + 1));
        var a = d[c];
        d[c] = d[b];
        d[b] = a;
    }
    return d
};
 //creates gameboard populates shuffled card values
function startGame() {
    $('#gameboard').empty();
    $('#stars').text("");
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
		$(this).addClass('selected').css("pointer-events","none");
		moves++;
		$('#moves').text(moves/2);
		console.log(moves/2);
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
					console.log(matched);
				} else {
					setTimeout(function() {
					$('#gameboard').find('.selected').removeClass('selected').css("pointer-events","auto");
					}, 1000);
					cardsPicked = [];
				}
			}
			console.log(cardsPicked);
		}
        starRating();
});

//compares two card values to see if they match
function compare(array) {
	var isSame = true;
	for(var i=0; i < array.length; i++) {
	isSame = array[0] === array[i] ? true : false;
	}
return isSame;
};

//modal for when a player matches all cards
$('#win-dialog').dialog({
	autoOpen: false,
    width: 300,
    height: 170,
    buttons: {
        YEP: function() { //ok
            $(this).dialog('close');
            startGame();
        },
        NAH: function() { //cancel
            $(this).dialog('close');
        }
    },
    open: function (event, ui) {
        $('#win-dialog').text("You've won in " + timer + " seconds and " + moves/2 + " moves! Pat yourself on the back. Do you want to play again?");
    }
});

// modal for when a user clicks the restart button
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

console.log(cardData);
