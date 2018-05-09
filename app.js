const memoryGame = {
    cardCount: 16,
    cardOnRow: 4,
    divBoard: null,
    cards: [],
    cardsChecked: [],
    cardsImg: [
        'images/title-2.jpg',
        'images/title-3.jpg',
        'images/title-4.jpg',
        'images/title-5.jpg',
        'images/title-6.jpg',
        'images/title-7.jpg',
        'images/title-8.jpg',
        'images/title-9.jpg'
    ],
    canGet: true,
    cardPairs: 0,

    cardClick: function (element) {
        if (this.canGet) {

            if (!this.cardsChecked[0] || (this.cardsChecked[0].dataset.index !== element.target.dataset.index)) {
                this.cardsChecked.push(element.target);
                element.target.style.backgroundImage = 'url(' + this.cardsImg[element.target.dataset.cardType] + ')';
            }

            if (this.cardsChecked.length === 2) {
                this.canGet = false;

                if (this.cardsChecked[0].dataset.cardType === this.cardsChecked[1].dataset.cardType) {
                    setTimeout(this.deleteCards.bind(this), 1500);
                } else {
                    setTimeout(this.resetCards.bind(this), 500);
                }
            }
        }
    },

    deleteCards : function() {
        this.cardsChecked[0].remove();
        this.cardsChecked[1].remove();

        this.canGet = true;
        this.cardsChecked = [];

        this.cardPairs++;
        if (this.cardPairs >= this.cardCount / 2) {
            alert('YEAAAAH! One more time? ');
        }
    },


    resetCards: function () {
        this.cardsChecked[0].style.backgroundImage = 'url(images/title.jpg)';
        this.cardsChecked[1].style.backgroundImage = 'url(images/title.jpg)';

        this.cardsChecked = [];
        this.canGet = true;
    },

    startGame: function () {
        this.divBoard = document.querySelector('.game-board');
        this.divBoard.innerHTML = '';
        this.cards = [];
        this.cardsChecked = [];
        this.canGet = true;
        this.cardPairs = 0;

        for (var i = 0; i < this.cardCount; i++) {
            this.cards.push(Math.floor(i / 2));
        }
        for (let i=this.cardCount-1; i>0; i--) {
            const swap = Math.floor(Math.random()*i);
            const tmp = this.cards[i];
            this.cards[i] = this.cards[swap];
            this.cards[swap] = tmp;
        }

        for (let i=0; i<this.cardCount; i++) {
            const card = document.createElement('div');
            card.classList.add("game-card");
            this.divBoard.appendChild(card);

            card.dataset.cardType = this.cards[i];
            card.dataset.index = i;

            card.style.left = 5 + (card.offsetWidth+10) * (i%this.cardOnRow) + 'px'
            card.style.top = 5 + (card.offsetHeight+10) * (Math.floor(i/this.cardOnRow)) + 'px';

            card.addEventListener('click', this.cardClick.bind(this));
        }
    }
};


document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.btn').addEventListener('click', function () {
        memoryGame.startGame();
    });
});