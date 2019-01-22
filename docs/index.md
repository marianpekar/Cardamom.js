# Welcome in Cardamom.js Docs

As you may have read already in [README.md on GitHub](https://github.com/marianpekar/Cardamom.js/blob/master/README.md), Cardamom.js is a JavaScript library that provides all (or at least the most) of the logic you'll be needing while building a card game, whether it's based on rules of an existing card game like Black Jack, Texas Hold'em or Rummy or on your own. 

The only assumption is you'll be working with cards that follow the color&value pattern and yes, you can have Jokers too.

The goal was to provide intuitive, easy to use library with well-documented API so as simple and readable source code. On this page you can read out what all you can do with Cardamom.js.

Library is divided into six sections and here the chapters after 'Instalation' follow them. They are: 

* Construction
* Manipulation
* Comparison
* Evaluation
* Getting
* Counting

## Getting Started

Let's say you have a game with two players which get 4 cards from a shuffled standard 52 cards deck and then one card goes on table. With Cardamom.js included you can do it like this.

```javascript
let deck = Cardamom.CreateDeck(4,13);
Cardamom.Shuffle(deck);

let player_one = Cardamom.CreateHand();
let player_two = Cardamom.CreateHand();
Cardamom.MoveCards(deck,player_one,sides.top,sides.top,4);
Cardamom.MoveCards(deck,player_two,sides.top,sides.top,4);

let table = Cardamom.CreateTable();
Cardamom.MoveCard(deck,table,sides.top,sides.top);
```

And what if you'd like to know if player one has bigger sum of values of cards that have the same color as the card on table? Two lines of code for that.

```javascript
let card_on_table_color =  Cardamom.GetColorOfCard(table,0);
Cardamom.GetSumOfColors(player_one,card_on_table_color) > Cardamom.GetSumOfColors(player_two,card_on_table_color);
```

Now you'd want to take all cards and put them back to the bottom of your deck. With Cardamom.js you can handle it with a single line.

```javascript
Cardamom.Merge(deck,[table,player_one,player_two]);
```

And that's it! For just an eleven lines of code quite a nice card game, right? In case you want to see more complex example, [here is a fully playable and well-commented Vingt-et-un (Twenty-One) card game that follows MVC pattern](https://github.com/marianpekar/Cardamom.js/tree/master/examples/Vingt-et-un).

## Instalation

Instalation is pretty standard, [download Cardamom.js](https://raw.githubusercontent.com/marianpekar/Cardamom.js/master/Cardamom.js) and simply inject it into your HTML page.

```html
<!DOCTYPE html>
<head>
    <title>My Awesome Card Game</title>
</head>
<body>
    <script type="text/javascript" src="Cardamom.js"></script>
    <script>
        // Your code goes here
    </script>
</body>
</html>
```

Minified version [Cardamom.min.js](https://raw.githubusercontent.com/marianpekar/Cardamom.js/master/Cardamom.min.js) is provided for you as well. 

## Construction

Typically you start a card game with objects you'll be needing for play. In Cardamom.js those could be **Deck**, ***Hand*** (Player) or **Table**.

### Cardamom.CreateDeck(colors, values)

Create new Deck of n colors with m values for each color. 

```javascript
let deck = Cardamom.CreateDeck(4, 13);
```

Creates a 52 cards deck of 4 colours, 13 values for each. 

*Note: in Cardamom.js color is an abstract concept represented by an integer.*

### Cardamom.CreateDeckWithOffset(colors, values, startColorsAt, startValuesAt)

To get standard 52 cards deck you'd use this function instead, because values of this type of deck starts at 2.

```javascript
let deck = Cardamom.CreateDeckWithOffset(4, 13, 1, 2);
```

This will do the trick. Colors would be 1,2,3,4 and values 2, 3, 4 ... 12, 13. 

### Cardamom.CreateHand() 

Use this method to create a player. In the next chapter you'll see how easily you can pass cards among players and decks.

```javascript
let player = Cardamom.CreateHand();
```

Hand has actually the same structure as deck, on this level of abstraction there is actually no difference between deck and player in every card game - both just hold some cards or none cards, yet still may exist.

### Cardamom.CreateTable(decks)

This object is just a little bit diffent than player or deck. It has to be created with at least deck, yet it also has a cards array as other objects. In the next chapter you'll see that you could move cards among decks, players and tables in the same fashion.

```javascript
let deck = Cardamom.CreateDeck(4, 13);
let player = Cardamom.CreateTable(deck);
```

## Manipulation

This section associates methods for moving cards among decks, players and tables or shuffling, splitting and merging them together.

### Cardamom.Merge(obj,objs)

Put all cards from array of objects provided as the second argument to the object provided as the first argument. They'll be placed at the end in same order as in the passed array.

```javascript
let deck_1 = Cardamom.CreateDeckWithOffset(2,13,1,2);
let deck_2 = Cardamom.CreateDeckWithOffset(1,13,3,2);
let deck_3 = Cardamom.CreateDeckWithOffset(1,13,4,2);

Cardamom.Merge(deck_1,[deck_2,deck_3]);
```

### Cardamom.Shuffle(obj) 

Simply shuffle cards in passed object. Typically a deck, but it could be player or table as well.

```javascript
let deck = Cardamom.CreateDeck(4, 13);
Cardamom.CreateDeck(deck);
```

### Cardamom.Flip(obj)

Reverse cards in passed object.

```javascript
let deck = Cardamom.CreateDeck(4, 13);
Cardamom.Flip(deck);
```

In many card games there are typically two decks. Players take cards from top of one and pile cards one on another, when there's no cards left in the first deck, they flip the pile that becomes this first deck and game goes on.

### Cardamom.Split(obj, index)

This method splits cards in passed object from given index and returns this part (from index to the end) as a **new object that could be either deck or hand**. 

```javascript
let deck = Cardamom.CreateDeck(4, 13);
let new_deck = Cardamom.Split(deck,26);
```

Return type doesn't have to be specified, it will be the same as the type of passed object.

*Note: doesn't work with tables*

### Cardamom.MoveCard(src,dest,from,to)

This method move one card from **s**ou**rc**e object to **dest**ionation object. You have to specify whether you want to move card **from** top **to** top, top to bottom, bottom to top or bottom to bottom.

```javascript
let deck = Cardamom.CreateDeck(4, 13);
let player_1 = Cardamom.CreateHand();
let player_2 = Cardamom.CreateHand();

Cardamom.MoveCard(deck, player_1, sides.top, sides.bottom);
Cardamom.MoveCard(deck, player_2, sides.top, sides.bottom);
```

Both players got one card from top of the deck.

### Cardamom.MoveCards(src,dest,from,to,count)

Works same as MoveCard method, but you have to also set how many cards you want to move.

```javascript
let deck = Cardamom.CreateDeck(4, 13);
let player_1 = Cardamom.CreateHand();
let player_2 = Cardamom.CreateHand();

Cardamom.MoveCards(deck, player_1, sides.top, sides.bottom,4);
Cardamom.MoveCards(deck, player_2, sides.top, sides.bottom,4);
```

Both players got four cards from top of the deck.

### Cardamom.MoveCardsFromIndex(src,dest,to,count,index)

This one is a little bit trickier. You can move **count** of cards from **s**ou**rc**e object that starts on **index** and put them **to** the top or bottom of **dest**ionation object. 

```javascript
let deck_1 = Cardamom.CreateDeck(4, 13);
let deck_2 = Cardamom.CreateDeck(4, 13);

Cardamom.MoveCardsFromIndex(deck_1, deck_2, sides.top,4,2);
```

First two cards from the top of deck_1 has been skipped and then four cards was moved on top of deck_2.

## Comparison

There is only a one method, let's take a look at it straight away. 

### Cardamom.CompareCards(cardOne, cardTwo, comparer)

Compare card one with card two by comparer and return boolean value.
Comparers are:

* compare.color
* compare.value
* compare.both
* compare.bigger
* compare.smaller
* compare.next
* compare.previous

To see how it works try in on the first and the second card from standard 52-cards deck.

```javascript
let standard_deck = Cardamom.CreateDeckWithOffset(4, 13, 1, 2);
let card_1 = Cardamom.GetCardOnIndex(standard_deck,0); 
let card_2 = Cardamom.GetCardOnIndex(standard_deck,1); 

// card_1 -> Card {color: 1, value: 2}
// card_2 -> Card {color: 1, value: 3}

Cardamom.CompareCards(card_1,card_2, compare.color)    // true
Cardamom.CompareCards(card_1,card_2, compare.value)    // false
Cardamom.CompareCards(card_1,card_2, compare.both)     // false
Cardamom.CompareCards(card_1,card_2, compare.bigger)   // false
Cardamom.CompareCards(card_1,card_2, compare.smaller)  // true
Cardamom.CompareCards(card_1,card_2, compare.next)     // false
Cardamom.CompareCards(card_1,card_2, compare.previous) // true
```

## Evaluation

In this section you can find methods that also returns boolean values, but instead of comparing individual cards they **evaluate cards in object**.

### Cardamom.IsSumOver(obj, value)

Add values of all cards in object and return true if the result is bigger than passed value.

```javascript
let standard_deck = Cardamom.CreateDeckWithOffset(4, 13, 1, 2);
Cardamom.IsSumOver(standard_deck,416) // false
```

### Cardamom.IsSumUnder(obj, value)

The exact oposite of IsSumOver.

```javascript
let standard_deck = Cardamom.CreateDeckWithOffset(4, 13, 1, 2);
Cardamom.IsSumUnder(deck,416) // false
```

I guess you already know why both examples resulted in false. Yes, sum of values of all cards in standard 52 cards deck is exactly 416. No more, no less.

### Cardamom.IsSumEqual(obj, value)

Returns true only when sum of values of all cards is equal to passed value.

```javascript
let standard_deck = Cardamom.CreateDeckWithOffset(4, 13, 1, 2);
Cardamom.IsSumEqual(standard_deck,416); // true
```

### Cardamom.AreAllValuesEqual(obj)

Returns true only if all values of cards in object are same.

```javascript
let deck_1 = Cardamom.CreateDeck(1,13);
let deck_2 = Cardamom.CreateDeck(4,1);
Cardamom.AreAllValuesEqual(deck_1); // false
Cardamom.AreAllValuesEqual(deck_2); // true
```

### Cardamom.AreAllValuesEqualTo(obj, value)

Returns true if all values of cards in object are equal to passed value.

```javascript
let deck = Cardamom.CreateDeck(4,1);
Cardamom.AreAllValuesEqual(deck,1) // true
```

### Cardamom.AreAllColorsEqual(obj)

Returns true only if all colors of cards in object are same.

```javascript
let deck_1 = Cardamom.CreateDeck(1,13);
let deck_2 = Cardamom.CreateDeck(4,1);
Cardamom.AreAllColorsEqual(deck_1); // true
Cardamom.AreAllColorsEqual(deck_2); // false
```

### Cardamom.AreAllColorsEqualTo(obj, color)

Returns true if all colors of cards in object are equal to passed value.

```javascript
let deck = Cardamom.CreateDeck(1,13);
Cardamom.AreAllColorsEqualTo(deck,1) // true
```

### Cardamom.HasAtLeastOne(obj, color, value)

Returns true if there is at least one card in object that matches both color and value.

```javascript
let deck = Cardamom.CreateDeck(4,13);
Cardamom.HasAtLeastOne(deck,4,1);  // true
Cardamom.HasAtLeastOne(deck,5,1);  // false
Cardamom.HasAtLeastOne(deck,4,14); // false
```

### Cardamom.HasAtLeastOneOfColor(obj, color)

Returns true if object has at least one card that matches passed color.

```javascript
let deck = Cardamom.CreateDeck(4,13);
Cardamom.HasAtLeastOneOfColor(deck,4);  // true
Cardamom.HasAtLeastOneOfColor(deck,5);  // false
```

### Cardamom.HasAtLeastOneOfValue(obj, value) 

Returns true if object has at least one card that match passed value.

```javascript
let deck = Cardamom.CreateDeck(4,13);
Cardamom.HasAtLeastOneOfValue(deck,13);  // true
Cardamom.HasAtLeastOneOfValue(deck,14);  // false
```

## Getting 

In this section you can find methods that return sum of values of all cards in object, value or color of card in object at index or random card index for instance.

### Cardamom.GetSumOfValues(obj) 

Returns sum of values of all cards in object.

```javascript
let standard_deck = Cardamom.CreateDeckWithOffset(4, 13, 1, 2);
let sum_of_values = Cardamom.GetSumOfValues(standard_deck); // = 416
```

### Cardamom.GetSumOfValuesWithColor(obj, color) 

Returns sum of values of all cards in object that match passed color.

```javascript
let standard_deck = Cardamom.CreateDeckWithOffset(4, 13, 1, 2);
let sum_of_values_with_color_1 = Cardamom.GetSumOfValuesWithColor(standard_deck,1); // = 104
```

### Cardamom.GetColorOfCard(obj, index)

Returns color of card in object on index.

```javascript
let deck = Cardamom.CreateDeck(4,13);
let color_at_index_0 = Cardamom.GetColorOfCard(deck, 0) // = 1
```

### Cardamom.GetValueOfCard(obj, index)

Returns value of card in object on index.

```javascript
let deck = Cardamom.CreateDeck(4,13);
let value_at_index_12 = Cardamom.GetValueOfCard(deck, 12) // = 13
```

### Cardamom.GetRandomCardIndex(obj)

Pick random card in object and returns its index.

```javascript
let deck = Cardamom.CreateDeck(4,13);
let random_card_index =  Cardamom.GetRandomCardIndex(deck) // == number from 0 to 51
```

### Cardamom.GetCardOnIndex(obj, index)

Returns **new Card object** from passed object at index.

```javascript
let standard_deck = Cardamom.CreateDeckWithOffset(4, 13, 1, 2);
let card = Cardamom.GetCardOnIndex(standard_deck, 0) // = Card { color: 1, value: 2 }
```

**CAUTION: You probably don't want to use GetCardOnIndex like this.** It returns a copy of the card while original card remains in given object. 

## Counting

In the last section of Cardamom.js are methods that return count of cards, count of cards that match either color, value of both of them.

### Cardamom.CountCards(obj) 

Simply returns count of all cards in object.

```javascript
let deck = Cardamom.CreateDeck(4,13);
let count = Cardamom.CountCards(deck) // = 52;
```

### Cardamom.CountCardsOfColor(obj, color) 

Returns count of cards that match color.

```javascript
let deck = Cardamom.CreateDeck(4,13);
let count_cards_of_color_1 = Cardamom.CountCardsOfColor(deck,1) // = 13;
```

### Cardamom.CountCardsOfValue(obj, value) 

Returns count of cards that match value.

```javascript
let deck = Cardamom.CreateDeck(4,13);
let count_cards_of_value_1 = Cardamom.CountCardsOfValue(deck,1) // = 4;
```

### Cardamom.CountCardsEqualTo(obj, color, value)

Returns count of cards that match both value and color.

```javascript
let deck = Cardamom.CreateDeck(4,13);
let count_cards_of_value_1 = Cardamom.CountCardsEqualTo(deck,3,6) // = 1;
```