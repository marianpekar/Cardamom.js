(function(window){
    function Cardamom(){
        var Cardamom = {};
        
        // Privates
        var Card = function(color, value) {
            this.color = color;
            this.value = value;
        }

        var Deck = function(cards) {
            this.cards = cards;
        }

        // Construction
        Cardamom.CreateCard = function(color, value) {
            return new Card(color, value);
        }

        Cardamom.CreateDeck = function(colors, values) {
            var deck = new Deck([]);

            for(col = 1; col <= colors; col++) {
                for(val = 1; val <= values; val++) {
                    deck.cards.push(this.CreateCard(col,val));
                }
            }
            
            return deck;
        }

        
        // Manipulation
        Cardamom.PushCard = function(deck, card) {
            deck.cards.push(card);
        }

        Cardamom.PopCard = function(deck, index) {
            var card = deck.cards[index];
            deck.cards.splice(index,1);
            return card;
        }

        Cardamom.MergeDecks = function(deck, decks) {
            for(d = 0; d < decks.length; d++) {
                for(c = 0; c < decks[d].cards.length; c++) {
                    deck.cards.push(decks[d].cards[c]);
                }

                while(decks[d].cards.length > 0) {
                    decks[d].cards.pop();
                }  
            }
        }

        Cardamom.ShuffleDeck = function(deck) {
            //TODO: schuffle cards in deck
        }

        Cardamom.SplitDeck = function(deck, index) {
            //TODO: take out from deck.cards array from given index to end and return this new array as a new deck
        }

        // Comparison
        this.comparers = { COLOR:"color", VALUE:"value", BOTH:"both", BIGGER:"bigger", SMALLER:"smaller", NEXT:"next", PREVIOUS:"previous" };

        Cardamom.compareCards = function(cardOne, cardTwo, comparer) {
            if(comparer == comparers.COLOR) {
                return cardOne.color == cardTwo.color;     
            }
            
            if(comparer == comparers.VALUE) {
                return cardOne.value == cardTwo.value;     
            }
            
            if(comparer == comparers.BOTH) {
                return (cardOne.color == cardTwo.color) && (cardOne.value == cardTwo.value);     
            }
            
            if(comparer == comparers.BIGGER) {
                return cardOne.value > cardTwo.value;     
            }
            
            if(comparer == comparers.SMALLER) {
                return cardOne.value < cardTwo.value;     
            }
            
            if(comparer == comparers.NEXT) {
                return (cardOne.value - 1) == cardTwo.value && (cardOne.color == cardTwo.color);     
            }
            
            if(comparer == comparers.PREVIOUS) {
                return (cardOne.value + 1) == cardTwo.value && (cardOne.color == cardTwo.color);     
            }
        }
  
        return Cardamom;
    }
  
    if(typeof(window.Cardamom) === 'undefined'){
      window.Cardamom = Cardamom();
    }
})(window); 

card1 = Cardamom.CreateCard(1,1);
card2 = Cardamom.CreateCard(1,1);