// ---------------------------------------------
//                     Model
// ---------------------------------------------

// First of all create a player and a dealer
let player = Cardamom.CreateHand();
let dealer = Cardamom.CreateHand();

// and game flags
let isPlayerPlaying = false;
let isBetPlaced = false;
let isDealerWinner = false;
let isPlayerWinner = false;

// Let's create standard 52-card deck = 4 colours, 13 values where colors starts at 1 and values at 2.
const colors = 4;
const values = 13;  
let deck = Cardamom.CreateDeckWithOffset(colors, values, 1, 2);

// And shuffle it of course.
Cardamom.Shuffle(deck);

// Also let's create variables for holding player's bank and bet,
let bank = 100, bet = 0;

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
    isPlayerWinner = true;
    isPlayerPlaying = isDealerWinner = false;
    bank += 2 * bet; 
    bet = 0;
}
function PlayerLost() { 
    isDealerWinner = true;
    isPlayerPlaying = isPlayerWinner = false;
    bet = 0;
}

// After each round we need to merge back cards from player and dealer with the bottom side of deck. 
// Cardamom.Merge handles it on a single line!
function TakeCardsBack() {
    Cardamom.Merge(deck,[player,dealer]);
}

// We start a game session with a new round
function NewRound() {
    TakeCardsBack();

    // Simply give both the player and the dealer one card each from the top of our deck
    Cardamom.MoveCard(deck,player,sides.top, sides.bottom);
    Cardamom.MoveCard(deck,dealer,sides.top, sides.bottom);

    // and set game flags
    isPlayerPlaying = true;
    isPlayerWinner = isDealerWinner = false;
}

// Player could choose whether he wants to 'Hit' or 'Stand'.
function Hit() {
    if(!isPlayerPlaying) 
        return;

    // Give player another card from top of the deck
    Cardamom.MoveCard(deck,player,sides.top, sides.bottom);

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
        
        if (Cardamom.IsSumOver(dealer, 21)) {
            PlayerWin();
            break;
        } 

        if (Cardamom.IsSumEqual(dealer, 21) || Cardamom.IsSumOver(dealer,Cardamom.GetSumOfValues(player))) {
            PlayerLost();
            break;
        } 
    }
}

// ---------------------------------------------
//                     View
// ---------------------------------------------

// Contruct and append DOM elements we'll need
playerCardsDiv = document.createElement("div");
dealerCardsDiv = document.createElement("div");
controlsDiv = document.createElement("div");
infoLabel = document.createElement("label");

bankBetLabel = document.createElement("label");
bankBetLabel.innerHTML = " Bank: " + bank + " Bet: " + bet;

newRoundButton = document.createElement("button");
newRoundButton.innerHTML = "New Round";

hitButton = document.createElement("button");
hitButton.innerHTML = "Hit";

standButton = document.createElement("button");
standButton.innerHTML = "Stand";

betInputNumber = document.createElement("input");
betInputNumber.setAttribute("type","number");

placeBetButton = document.createElement("button");
placeBetButton.innerHTML = "Place Bet";

document.body.appendChild(playerCardsDiv);
document.body.appendChild(dealerCardsDiv);
document.body.appendChild(controlsDiv);
document.body.appendChild(infoLabel);

controlsDiv.appendChild(newRoundButton);
controlsDiv.appendChild(hitButton);
controlsDiv.appendChild(standButton);
controlsDiv.appendChild(betInputNumber);
controlsDiv.appendChild(placeBetButton);
controlsDiv.appendChild(bankBetLabel);

// In UpdateView function we'll be appending cards for player and dealer with the same mechanism, let's create function for that
function AppendCards(actor, divElement) {
    divElement.innerHTML = "";
    for(i = 0; i < Cardamom.CountCards(actor); i++) {
            cardImg = document.createElement("img");
            color = Cardamom.GetColorOfCard(actor, i);
            value = Cardamom.GetValueOfCard(actor, i);
            cardImg.setAttribute("src","img/cards/" + value + "_of_" + color + ".svg");
            divElement.appendChild(cardImg);
        }
}

// and the update view function that we'll be calling after each change (see Controller below)
function UpdateView() {
    AppendCards(player, playerCardsDiv);
    AppendCards(dealer, dealerCardsDiv);

    // Show info about game session
    infoLabel.innerHTML = 
    "Player: " + Cardamom.GetSumOfValues(player) + "<br>Dealer: " + Cardamom.GetSumOfValues(dealer);

    if(isPlayerWinner)
        infoLabel.innerHTML += "<br>Player Wins!";
    else if (isDealerWinner) 
        infoLabel.innerHTML += "<br>Dealer Wins!";

    bankBetLabel.innerHTML = " Bank: " + bank + " Bet: " + bet;

    // and disable/enable buttons according to game state
    if(isPlayerPlaying) {
        newRoundButton.disabled = true;
        hitButton.disabled = false;
        standButton.disabled = false;
        placeBetButton.disabled = false;
    } else {
        newRoundButton.disabled = false;
        hitButton.disabled = true;
        standButton.disabled = true;
        placeBetButton.disabled = true;
        betInputNumber.disabled = false;
    }

    // In case of permanent lost (player has no more money to bet), we replace whole view with text
    if(bet == 0 && bank == 0) {
        document.body.innerHTML = "You've lost all your money. Refresh page for new game." 
    }
}

// ---------------------------------------------
//                  Controller
// ---------------------------------------------

events = { new_round:"new_round", hit:"hit", stand:"stand", place_bet:"place_bet"};

newRoundButton.setAttribute("onclick", "HandleEvent(events.new_round)");
hitButton.setAttribute("onclick", "HandleEvent(events.hit)");
standButton.setAttribute("onclick", "HandleEvent(events.stand)");
placeBetButton.setAttribute("onclick", "HandleEvent(events.place_bet)");

function HandleEvent(e) {
    switch(e) {
        case events.new_round:
            NewRound();
            UpdateView();
            break;
        case events.hit:
            Hit();
            UpdateView();
            break;
        case events.stand:
            Stand();
            UpdateView();
            break;
        case events.place_bet:
            PlaceBet(parseInt(betInputNumber.value));
            UpdateView();
            break;
    }
}

NewRound();
UpdateView();
