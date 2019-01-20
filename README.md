# About Cardamom.js

All card games are same! Well, they're not actually. However, they have so much in common you'd be using the same chunks of code (or rather say logic) while building a Black Jack, Texas Hold'em or Rummy for instance. That's why I've created Cardamom - a JavaScript library to prevent reinventing a wheel and provide all the logic you need for building a card game wheter it's based on rules of an existing card game or your own.

# Getting Started

Let's say you have a game with two players which get 4 cards from a shuffled standard 52 cards deck and then one card goes on table. With Cardamom.js included you can do it like this.

```javscript
deck = Cardamom.CreateDeck(4,13);
Cardamom.Shuffle(deck);

player_one = Cardamom.CreateHand();
player_two = Cardamom.CreateHand();
Cardamom.MoveCards(deck,player_one,sides.top,sides.top,4);
Cardamom.MoveCards(deck,player_two,sides.top,sides.top,4);

table = Cardamom.CreateTable();
Cardamom.MoveCard(deck,table,sides.top,sides.top);
```

And what if you'd like to know if player one has bigger sum of values of cards that have the same color as the card on table? Two lines of code for that.

```javscript
card_on_table_color =  Cardamom.GetColorOfCard(table,0);
Cardamom.GetSumOfColors(player_one,card_on_table_color) > Cardamom.GetSumOfColors(player_two,card_on_table_color);
```

Now you'd want to take all cards back to the bottom of your deck. With Cardamom.js you can handle it with a single line.

```javscript
Cardamom.Merge(deck,[table,player_one,player_two]);
```

And that's it! For just an eleven lines of code quite a nice card game, right? In case you're interested to see a litle bit more complex example, check out **Vingt-et-un (Twenty-One) in the examples folder**. 

Read out what all you can do with Cardamom.js you in Docs here.
