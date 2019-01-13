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
            var shuffled = [], n = obj.cards.length, i;
            while(n) {
                i = Math.floor(Math.random() * obj.cards.length);

                if(i in obj.cards) {
                    shuffled.push(obj.cards[i]);
                    delete obj.cards[i];
                    n--;
                }
            }
            obj.cards = shuffled;
        }

        Cardamom.Flip = function(obj) {
            obj.cards.reverse();
        }

        Cardamom.Split = function(obj, index) {
            if(obj.constructor.name === "Deck") return new Deck(obj.cards.splice(index, obj.cards.length - index));
            if(obj.constructor.name === "Hand") return new Hand(obj.cards.splice(index, obj.cards.length - index));
        }

        // Private
        this.sides = { TOP:"top", BOTTOM:"bottom"};

        // Public
        Cardamom.MoveCard = function(src, dest, from, to) {
            if(from == sides.TOP) var cardToMove = src.cards.shift();
            else if (from == sides.BOTTOM) var cardToMove = src.cards.pop();           
            if(to == sides.TOP) dest.cards.unshift(cardToMove);
            else if (to == sides.BOTTOM) dest.cards.push(cardToMove);
        }

        Cardamom.MoveCards = function(src, dest, from, to, count) {
            for(var i = 0; i < count; i++) {
                Cardamom.MoveCard(src,dest,from,to);
            };          
        };

        Cardamom.MoveCardsFromIndex = function(src, dest, to, count, index) {
            var cardsToMove = src.cards.splice(index,count);
            if (to == sides.TOP) cardsToMove.reverse();

            for(i = 0; i < cardsToMove.length; i++) {
                if (to == sides.TOP) dest.cards.unshift(cardsToMove[i]);
                else if (to == sides.BOTTOM) dest.cards.push(cardsToMove[i]);
            }
        }

        Cardamom.GetRandomCardIndex = function (obj) {
            return Math.floor(Math.random() * obj.cards.length + 1);
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

        // Evaluation
        // Public
  
        return Cardamom;
    }
  
    if(typeof(window.Cardamom) === 'undefined'){
      window.Cardamom = Cardamom();
    }
})(window); 