var cardData = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];

matched = 0;
moves = 0;

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
  shuffleArray(cardData);
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
						 $('#dialog').dialog('open');
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

$('#dialog').dialog({
	autoOpen: false
});

startGame();


