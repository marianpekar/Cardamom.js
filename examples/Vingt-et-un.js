// First of all create a player and a dealer
let player = Cardamom.CreateHand();
let dealer = Cardamom.CreateHand();

// and game flags
let isPlayerPlaying = false;
let isDealerWinner = false;
let isPlayerWinner = false;

// Let's create standard 52-card deck = 4 colours, 13 values for each color.
const colors = 4;
const values = 13;  
let deck = Cardamom.CreateDeck(colors, values);

// And shuffle it of course.
Cardamom.Shuffle(deck);

// Also let's create variables for holding player's bank and bet,
let bank = 100, bet;

// function for betting
function PlaceBet(amount) {
    if(!isPlayerPlaying) 
        return;

    if(amount <= bank) {
        bank -= amount;
        bet += amount;
    }
}

// and for lose and win states.
function PlayerWin() { 
    console.log("Player: " + Cardamom.GetSumOfValues(player) + "\n" + "Dealer: " + Cardamom.GetSumOfValues(dealer) + "\n" + "Player wins!");
    isPlayerWinner = true;
    isPlayerPlaying = isDealerWinner = false;
    bank += bet; 

    TakeCardsBack();
    if(bank > 0) 
        NewRound();
}
function PlayerLost() { 
    console.log("Player: " + Cardamom.GetSumOfValues(player) + "\n" + "Dealer: " + Cardamom.GetSumOfValues(dealer) + "\n" + "Dealer wins!");
    isDealerWinner = true;
    isPlayerPlaying = isPlayerWinner = false;
    bet = 0;

    TakeCardsBack();
    if(bank > 0) 
        NewRound();
}

// After each round we need to merge back cards from player and dealer with the bottom side of deck. 
// Cardamom.Merge handles it on a single line!
function TakeCardsBack() {
    Cardamom.Merge(deck,[player,dealer]);
}

// We start a game session with a new round
function NewRound() {
    // Simply give both the player and the dealer one card each from the top of our deck
    Cardamom.MoveCard(deck,player,sides.top, sides.top);
    Cardamom.MoveCard(deck,dealer,sides.top, sides.top);

    // and set game flags
    isPlayerPlaying = true;
    isPlayerWinner = isDealerWinner = false;
}

// Player could choose whether he wants to 'Hit' or 'Stand'.
function Hit() {
    if(!isPlayerPlaying) 
        return;

    // Give player another card from top of the deck
    Cardamom.MoveCard(deck,player,sides.top, sides.top);

    // and evaluate his cards.
    if(Cardamom.IsSumOver(player, 21)) 
        PlayerLost();
    else if (Cardamom.IsSumEqual(player, 21)) 
        PlayerWin();
}

// In case player choose to stand, it's time for dealer's turn.
function Stand() {
    isPlayerPlaying = false;

    // Dealer hits unless sum of values of his cards is bigger than player's or gets 21. In that case dealer wins.
    // Player wins in case sum of values of dealer's cards is bigger than 21.
    while(true) {
        Cardamom.MoveCard(deck,dealer,sides.top, sides.top);
    
        if (Cardamom.IsSumEqual(dealer, 21) || Cardamom.IsSumOver(dealer,Cardamom.GetSumOfValues(player))) {
            PlayerLost();
            break;
        } 

        if (Cardamom.IsSumOver(dealer, 21)) {
            PlayerWin();
            break;
        } 
    }
}


