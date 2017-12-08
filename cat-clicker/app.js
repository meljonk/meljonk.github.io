//lesson on separation of concerns - Udacity FEND
/* ======= Model-controls the data and where it's stored ======= */

var model = {
    currentCat: null,
    cats: [
        {
            name: "Puss In Boots",
        	clickCount: 0,
        	imgSrc: "images/kitten-01.jpg"
        },
        {
            name: "Sir Purrs Alot",
        	clickCount: 0,
        	imgSrc: "images/kitten-02.jpg"
        },
        {
            name: "Danger Kitty",
            clickCount: 0,
            imgSrc: "images/kitten-03.jpg"
        },
        {
            name: "Hide N Seek",
        	clickCount: 0,
        	imgSrc: "images/kitten-04.jpg",
        },
        {
            name: "A Tribe Called Quest",
        	clickCount: 0,
        	imgSrc: "images/kitten-05.jpg",
        }
    ]
};

/* ======= Octopus-our hub that interacts between our model and view ======= */
var octopus = {
    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    }
};

/* ======= View-controls anything the user can see ======= */

var catView = {
    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {
    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (var i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            var cat = cats[i];

            // make a new cat list item and set its text
            var elem = document.createElement('button');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(cat) {
                return function() {
                    octopus.setCurrentCat(cat);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

// make it go!
octopus.init();
