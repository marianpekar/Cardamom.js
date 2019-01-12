(function(window){
    function Cardamom(){
        var Cardamom = {};
        
        // Construction
        // Private
        var Card = function(color, value) {
            this.color = color;
            this.value = value;
        }

        var Deck = function(cards) {
            this.cards = cards;
        }

        var Hand = function(cards) {
            this.cards = cards;
        }

        var Table = function(decks,cards) {
            this.decks = decks;
            this.cards = cards;
        }

        var CreateCard = function(color, value) {
            return new Card(color, value);
        }

        // Public
        Cardamom.CreateDeck = function(colors, values) {
            var deck = new Deck([]);

            for(col = 1; col <= colors; col++) {
                for(val = 1; val <= values; val++) {
                    deck.cards.push(CreateCard(col,val));
                }
            }
            
            return deck;
        }

        Cardamom.CreateTable = function(decks) {
            return new Table(decks,[]);
        }

        Cardamom.CreateHand = function() {
            return new Hand([]);
        }

        // Manipulation
        // Public        
        Cardamom.Merge = function(obj, objs) {
            for(o = 0; o < objs.length; o++) {
                for(c = 0; c < objs[o].cards.length; c++) {
                    obj.cards.push(objs[o].cards[c]);
                }

                while(objs[o].cards.length > 0) {
                    objs[o].cards.pop();
                }  
            }
        }

        Cardamom.Shuffle = function(obj) {
            //TODO
        }

        Cardamom.Split = function(obj, index) {
            //TODO
        }

        Cardamom.MoveCardsFromTop = function(src, dest, count) {
            //TODO
        };

        Cardamom.MoveCardsFromBottom = function(src, dest, count)  {
            //TODO
        };

        Cardamom.MoveCardsFromIndex = function(src, dest, count, index) {
            //TODO
        }

        // Comparison
        // Private
        this.comparers = { COLOR:"color", VALUE:"value", BOTH:"both", BIGGER:"bigger", SMALLER:"smaller", NEXT:"next", PREVIOUS:"previous" };

        // Public
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