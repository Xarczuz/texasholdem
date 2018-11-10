//author: Chjun-chi Chiu 2018-10-12
//version alpha 3.0 Texas Holdem
$(document).ready(function() {
  // document is loaded and DOM is ready
  newGame();
});
var deckOfCards = [];
var players;
var playersLeft = 0;
var callOrFold = 0;
var playersHand = new Array(players).fill("");
var playersHandFlop = new Array().fill("");
var playersHandTurn = new Array().fill("");
var playersHandRiver = new Array().fill("");
var playersHandShowDown = new Array().fill("");
var flopTurnRiver = new Array(4).fill("");

function newGame() {
  players = prompt("Nr: of players", 2);
  while (players < 2 || players > 10) {
    players = prompt(
      "Nr: of players must be higher than 1 and less than 11",
      2
    );
  }
  deckOfCards = createADeckOfCards(deckOfCards);
  deckOfCards = shuffleDEck(deckOfCards);
  deckOfCards = deal(deckOfCards);
  writePlayerHand();
}

function writePlayerHand() {
  for (let x = 0; x < players; x++) {
    var card = playersHand[x];
    var arr = card.split(",");
    var playerCard1 = "#player" + arr[0] + "Card1";
    var playerCard2 = "#player" + arr[0] + "Card2";
    $(playerCard1).attr("href", "/image/PNG/" + arr[1] + ".png");
    $(playerCard2).attr("href", "/image/PNG/" + arr[2] + ".png");
  }
  $("#call").css("visibility", "visible");
  $("#fold").css("visibility", "visible");
}

function writeFlopPlayerHand() {
  for (let x = 0; x < playersLeft; x++) {
    var card = playersHandFlop[x];
    var arr = card.split(",");
    var playerCard1 = "#player" + arr[0] + "Card1";
    var playerCard2 = "#player" + arr[0] + "Card2";
    $(playerCard1).attr("href", "/image/PNG/" + arr[1] + ".png");
    $(playerCard2).attr("href", "/image/PNG/" + arr[2] + ".png");
  }
}

function writeFlop() {
  for (let x = 0; x < 3; x++) {
    var card = flopTurnRiver[x];
    var flopCard = "#flopCard" + (x + 1);
    $(flopCard).attr("href", "/image/PNG/" + card + ".png");
  }
}

function writeTurn() {
  $(theTurnCard).attr("href", "/image/PNG/" + flopTurnRiver[3] + ".png");
}

function writeRiver() {
  $(theRiverCard).attr("href", "/image/PNG/" + flopTurnRiver[4] + ".png");
}

function createADeckOfCards(deckOfCards) {
  for (i = 1; i <= 4; i++) {
    for (n = 1; n <= 13; n++) {
      var card = n + suit(i);
      deckOfCards.push(card);
    }
  }
  return deckOfCards;
}

function suit(nr) {
  switch (nr) {
    case 1:
      return "H";
    case 2:
      return "D";
    case 3:
      return "S";
    case 4:
      return "C";
  }
}

function shuffleDEck(deck) {
  deck.sort(function(a, b) {
    return 0.5 - Math.random();
  });
  return deck;
}

function deal(deck) {
  var i;
  var two;
  for (i = 0; i < players; i++) {
    var n = i + 1;
    playersHand[i] = n + ",";
  }
  for (two = 0; two < 2; two++) {
    for (i = 0; i < players; i++) {
      var card = deck.pop();
      playersHand[i] += card + ",";
    }
  }
  return deck;
}

function theFlop() {
  var i;
  for (i = 0; i < 3; i++) {
    var card = deckOfCards.pop();
    flopTurnRiver[i] = card;
  }
  sortFlopPlayers();
  writeFlop();
  writeFlopPlayerHand();
  $("#call").css("visibility", "hidden");
  $("#fold").css("visibility", "hidden");
  if (playersLeft == 1) {
    alert(playersHandFlop[0] + " WINS!");
  } else {
    $("#callFlop").css("visibility", "visible");
    $("#foldFlop").css("visibility", "visible");
  }
}

function theTurn() {
  var card = deckOfCards.pop();
  flopTurnRiver[3] = card;
  sortTurnPlayers();
  writeTurn();
  $("#callFlop").css("visibility", "hidden");
  $("#foldFlop").css("visibility", "hidden");
  if (playersLeft == 1) {
    alert(playersHandTurn[0] + " WINS!");
  } else {
    $("#callTurn").css("visibility", "visible");
    $("#foldTurn").css("visibility", "visible");
  }
}

function theRiver() {
  var card = deckOfCards.pop();
  flopTurnRiver[4] = card;
  sortRiverPlayers();
  writeRiver();
  $("#callTurn").css("visibility", "hidden");
  $("#foldTurn").css("visibility", "hidden");
  if (playersLeft == 1) {
    alert(playersHandRiver[0] + " WINS!");
  } else {
    $("#callRiver").css("visibility", "visible");
    $("#foldRiver").css("visibility", "visible");
  }
}
function theShowDown() {
  $("#callRiver").css("visibility", "hidden");
  $("#foldRiver").css("visibility", "hidden");
  lastSortPlayers();
  if (playersLeft == 1) {
    alert(playersHandShowDown[0] + " WINS!");
  } else {
    whoGotTheBetterHand();
  }
}

function call() {
  var player = playersHand[callOrFold].split(",");
  $("#player" + player[0]).html("Player " + player[0] + " Call");
  callOrFold++;
  if (callOrFold == players) {
    theFlop();
    callOrFold = 0;
  }
}

function fold() {
  var player = playersHand[callOrFold].split(",");
  $("#player" + player[0]).html("Player " + player[0] + " Fold");
  playersHand[callOrFold] += "fold";
  var playerCard1 = "#player" + player[0] + "Card1";
  var playerCard2 = "#player" + player[0] + "Card2";
  $(playerCard1).attr("href", "/image/PNG/green_back.png");
  $(playerCard2).attr("href", "/image/PNG/green_back.png");
  callOrFold++;
  if (callOrFold == players) {
    theFlop();
    callOrFold = 0;
  }
}

function callFlop() {
  var player = playersHandFlop[callOrFold].split(",");
  $("#player" + player[0]).html("Player " + player[0] + " Call");
  callOrFold++;
  if (callOrFold == playersLeft) {
    theTurn();
    callOrFold = 0;
  }
}

function foldFlop() {
  var player = playersHandFlop[callOrFold].split(",");
  $("#player" + player[0]).html("Player " + player[0] + " Fold");
  playersHandFlop[callOrFold] += "fold";
  var playerCard1 = "#player" + player[0] + "Card1";
  var playerCard2 = "#player" + player[0] + "Card2";
  $(playerCard1).attr("href", "/image/PNG/green_back.png");
  $(playerCard2).attr("href", "/image/PNG/green_back.png");
  callOrFold++;
  if (callOrFold == playersLeft) {
    theTurn();
    callOrFold = 0;
  }
}

function sortFlopPlayers() {
  var i;
  var card;
  playersLeft = 0;
  for (i = 0; i < players; i++) {
    card = playersHand.pop();
    if (card.indexOf("fold") > -1) {
    } else {
      var player = card.split(",");
      $("#player" + player[0]).html("Player " + player[0]);
      playersHandFlop.push(card);
      playersLeft++;
    }
  }
  playersHandFlop.reverse();
}

function callTurn() {
  var player = playersHandTurn[callOrFold].split(",");
  $("#player" + player[0]).html("Player " + player[0] + " Call");
  callOrFold++;
  if (callOrFold == playersLeft) {
    theRiver();
    callOrFold = 0;
  }
}

function foldTurn() {
  var player = playersHandTurn[callOrFold].split(",");
  $("#player" + player[0]).html("Player " + player[0] + " Fold");
  playersHandTurn[callOrFold] += "fold";
  var playerCard1 = "#player" + player[0] + "Card1";
  var playerCard2 = "#player" + player[0] + "Card2";
  $(playerCard1).attr("href", "/image/PNG/green_back.png");
  $(playerCard2).attr("href", "/image/PNG/green_back.png");
  callOrFold++;
  if (callOrFold == playersLeft) {
    theRiver();
    callOrFold = 0;
  }
}
function sortTurnPlayers() {
  var i;
  var card;
  var tempPlayersLeft = playersLeft;
  for (i = 0; i < tempPlayersLeft; i++) {
    card = playersHandFlop.pop();
    if (card.indexOf("fold") > -1) {
      playersLeft--;
    } else {
      var player = card.split(",");
      $("#player" + player[0]).html("Player " + player[0]);
      playersHandTurn.push(card);
    }
  }
  playersHandTurn.reverse();
}

function callRiver() {
  var player = playersHandRiver[callOrFold].split(",");
  $("#player" + player[0]).html("Player " + player[0] + " Call");
  callOrFold++;
  if (callOrFold == playersLeft) {
    theShowDown();
    callOrFold = 0;
  }
}

function foldRiver() {
  var player = playersHandRiver[callOrFold].split(",");
  $("#player" + player[0]).html("Player " + player[0] + " Fold");
  playersHandRiver[callOrFold] += "fold";
  // writeFlopPlayerHand();
  var playerCard1 = "#player" + player[0] + "Card1";
  var playerCard2 = "#player" + player[0] + "Card2";
  $(playerCard1).attr("href", "/image/PNG/green_back.png");
  $(playerCard2).attr("href", "/image/PNG/green_back.png");
  callOrFold++;
  if (callOrFold == playersLeft) {
    theShowDown();
    callOrFold = 0;
  }
}
function sortRiverPlayers() {
  var i;
  var card;
  var tempPlayersLeft = playersLeft;
  for (i = 0; i < tempPlayersLeft; i++) {
    card = playersHandTurn.pop();
    if (card.indexOf("fold") > -1) {
      playersLeft--;
    } else {
      var player = card.split(",");
      $("#player" + player[0]).html("Player " + player[0]);
      playersHandRiver.push(card);
    }
  }
  playersHandRiver.reverse();
}

function lastSortPlayers() {
  var i;
  var card;
  var tempPlayersLeft = playersLeft;
  for (i = 0; i < tempPlayersLeft; i++) {
    card = playersHandRiver.pop();
    if (card.indexOf("fold") > -1) {
      playersLeft--;
    } else {
      var player = card.split(",");
      $("#player" + player[0]).html("Player " + player[0]);
      playersHandShowDown.push(card);
    }
  }
  playersHandShowDown.reverse();
}

function whoGotTheBetterHand() {
  // playersLeft
  // flopTurnRiver
  // playersHandShowDown
  var playersHandValue = [];
  for (let x = 0; x < playersLeft; x++) {
    var value = [];
    var handRank = [];
    var card = playersHandShowDown[x];
    var arr = card.split(",");
    handRank.push(arr[1]);
    handRank.push(arr[2]);
    handRank.push(flopTurnRiver[0]);
    handRank.push(flopTurnRiver[1]);
    handRank.push(flopTurnRiver[2]);
    handRank.push(flopTurnRiver[3]);
    handRank.push(flopTurnRiver[4]);
    handRank.push(arr[0]);//handRank.push(arr[0]); The Player nr 1-10
    
    value = checkForRoyalFlush(handRank);
    if (value[0] >= 5) {
      handRank.push(10);
      handRank.push("Royal Straight Flush");
      handRank.push(value[1]);
      playersHandValue.push(handRank);
      continue;
    }
    value = checkForStraightFlush(handRank);
    if (value[0] >= 5) {
      handRank.push(9);
      handRank.push("Straight Flush");
      handRank.push(value[1]);
      playersHandValue.push(handRank);
      continue;
    }
    value = checkForFourOfAKind(handRank);
    if (value[0] >= 4) {
      handRank.push(8);
      handRank.push("Four of a kind");
      handRank.push(value[1], value[2]);
      playersHandValue.push(handRank);
      continue;
    }
    value = checkForFullHouse(handRank);
    if (value[0] >= 5) {
      handRank.push(7);
      handRank.push("Full House");
      handRank.push(value[1], value[2]); //value[2] Value for the trippel value for the pair
      playersHandValue.push(handRank);
      continue;
    }
    value = checkForFlush(handRank);
    if (value[0] >= 5) {
      handRank.push(6);
      handRank.push("Flush");
      handRank.push(value[1], value[2]); //value[2] Value of flush in order Ace = 14 14,13,5,4,3
      playersHandValue.push(handRank);
      continue;
    }
    value = checkForStraight(handRank);
    if (value[0] >= 5) {
      handRank.push(5);
      handRank.push("Straight");
      handRank.push(value[1]);
      playersHandValue.push(handRank);
      continue;
    }
    value = checkForThreeOfAKind(handRank);
    if (value[0] == 3) {
      handRank.push(4);
      handRank.push("Three of a kind");
      handRank.push(value[1], value[2]); // (value[1] trippel) (value[2] highcard 1 and 2 in a int array)
      playersHandValue.push(handRank);
      continue;
    }
    value = checkForTwoPair(handRank);
    if (value[0] >= 2) {
      handRank.push(3);
      handRank.push("Two Pair");
      handRank.push(value[1], value[2], value[3]); //3 values (pair 1) (pair 2) (highcard)
      playersHandValue.push(handRank);

      continue;
    }
    value = checkForPair(handRank);
    if (value[0] == 2) {
      handRank.push(2);
      handRank.push("Pair");
      handRank.push(value[1], value[2]); // value[2] (3 values in a  int array)
      playersHandValue.push(handRank);

      continue;
    }

    value = checkForHighCard(handRank);
    handRank.push(1);
    handRank.push("High Card");
    handRank.push(value); //5 values in a int array
    playersHandValue.push(handRank);
  }

  /**
   * playersHandValue[0] = player X with hand rank at
   * [x][0-6] the river and players hand
   * [x][7] Player nr
   * [x][8] RoyalFlush=10 StraightFlush=9 ---- highcard=1
   * [x][9] String name of the hand
   * [x][10] value of the hand
   * [x][11][x] second value of the hand etc etc could come in a array
   */
 
  var winners = compareWinnerHand(playersHandValue);
  for (let n = 0; n < winners.length; n++) {
    $("#player" + winners[n][7] + "Win").html("Wins: " + winners[n][9]);
  }
  //console.log("WINNER: " + winners);
}

function compareWinnerHand(playerHand) {
  var winnerList = [];
  winnerList.push(playerHand.shift());
  for (let i = 0; i < playerHand.length; i++) {
    if (winnerList[0][8] < playerHand[i][8]) {
      winnerList = [];
      winnerList.push(playerHand[i]);
      continue;
    }
    if (winnerList[0][8] == playerHand[i][8]) {
      switch (playerHand[i][8]) {
        case 10:
          winnerList.push(playerHand[i]);
          continue;
        case 9:
          if (parseInt(winnerList[0][10]) == parseInt(playerHand[i][10])) {
            winnerList.push(playerHand[i]);
            continue;
          }
          if (parseInt(winnerList[0][10]) < parseInt(playerHand[i][10])) {
            winnerList = [];
            winnerList.push(playerHand[i]);
            continue;
          } else {
            continue;
          }
        case 8:
          if (
            (parseInt(winnerList[0][10]) == parseInt(playerHand[i][10])) &&
            (winnerList[0][11] == playerHand[i][11])
          ) {
            winnerList.push(playerHand[i]);
            continue;
          }
          if (parseInt(winnerList[0][10]) > parseInt(playerHand[i][10])) {
            continue;
          }
          if (parseInt(winnerList[0][10]) < parseInt(playerHand[i][10])) {
            winnerList = [];
            winnerList.push(playerHand[i]);
            continue;
          }
          if (winnerList[0][11] < playerHand[i][11]) {
            winnerList = [];
            winnerList.push(playerHand[i]);
            continue;
          } else {
            continue;
          }
        case 7:
          if (
            (parseInt(winnerList[0][10]) == parseInt(playerHand[i][10])) &&
            (winnerList[0][11] == playerHand[i][11])
          ) {
            winnerList.push(playerHand[i]);
            continue;
          }
          if (parseInt(winnerList[0][10]) < parseInt(playerHand[i][10])) {
            winnerList = [];
            winnerList.push(playerHand[i]);
            continue;
          } else if (
            parseInt(winnerList[0][10]) > parseInt(playerHand[i][10])
          ) {
            continue;
          }
          if (
            (parseInt(winnerList[0][10]) == parseInt(playerHand[i][10]),
            winnerList[0][11] < playerHand[i][11])
          ) {
            winnerList = [];
            winnerList.push(playerHand[i]);
            continue;
          }
        case 6:
          /**
           * player1[14,12,10,4,3]
           * player2[14,8,7,4,3]
           *Player:3 Flush Value: 14,9,8,4,3
           *Player:4 Flush Value: 14,9,4,3,2
           */
          var g = winnerList[0][11].toString();
          var w = g.split(",");
          var f = playerHand[i][11].toString();
          var p = f.split(",");
          if (
            (parseInt(w[0]) == parseInt(p[0])) &&
            (parseInt(w[1]) == parseInt(p[1])) &&
            (parseInt(w[2]) == parseInt(p[2])) &&
            (parseInt(w[3]) == parseInt(p[3])) &&
            (parseInt(w[4]) == parseInt(p[4]))
          ) {
            winnerList.push(playerHand[i]);
            continue;
          }
          if (parseInt(w[0]) < parseInt(p[0])) {
            winnerList = [];
            winnerList.push(playerHand[i]);
            continue;
          } else if (parseInt(w[0]) > parseInt(p[0])) {
            continue;
          }
          if (parseInt(w[1]) < parseInt(p[1])) {
            winnerList = [];
            winnerList.push(playerHand[i]);
            continue;
          } else if (parseInt(w[1]) > parseInt(p[1])) {
            continue;
          }
          if (parseInt(w[2]) < parseInt(p[2])) {
            winnerList = [];
            winnerList.push(playerHand[i]);
            continue;
          } else if (parseInt(w[2]) > parseInt(p[2])) {
            continue;
          }
          if (parseInt(w[3]) < parseInt(p[3])) {
            winnerList = [];
            winnerList.push(playerHand[i]);
            continue;
          } else if (parseInt(w[3]) > parseInt(p[3])) {
            continue;
          }
          if (parseInt(w[4]) < parseInt(p[4])) {
            winnerList = [];
            winnerList.push(playerHand[i]);
            continue;
          }
        case 5: //straight
          console.log(winnerList[0] + "---" + playerHand[i]);
          if (parseInt(winnerList[0][10]) == parseInt(playerHand[i][10])) {
            winnerList.push(playerHand[i]);
            continue;
          } else if (
            parseInt(winnerList[0][10]) < parseInt(playerHand[i][10])
          ) {
            winnerList = [];
            winnerList.push(playerHand[i]);
            continue;
          } else {
            continue;
          }
        case 4: //Three of a kind
          var g = winnerList[0][11].toString();
          var w = g.split(",");
          var f = playerHand[i][11].toString();
          var p = f.split(",");
          if (
            (parseInt(winnerList[0][10]) == parseInt(playerHand[i][10])) &&
            (parseInt(w[0]) == parseInt(p[0])) &&
            (parseInt(w[1]) == parseInt(p[1]))
          ) {
            winnerList.push(playerHand[i]);
            continue;
          }
          if (parseInt(winnerList[0][10]) < parseInt(playerHand[i][10])) {
            winnerList = [];
            winnerList.push(playerHand[i]);
            continue;
          } else if (
            parseInt(winnerList[0][10]) > parseInt(playerHand[i][10])
          ) {
            continue;
          }
          if (parseInt(w[0]) < parseInt(p[0])) {
            winnerList = [];
            winnerList.push(playerHand[i]);
            continue;
          } else if (parseInt(w[0]) > parseInt(p[0])) {
            continue;
          }
          if (parseInt(w[1]) < parseInt(p[1])) {
            winnerList = [];
            winnerList.push(playerHand[i]);
            continue;
          }

        case 3: //Two Pair
          if (
            (parseInt(winnerList[0][10]) == parseInt(playerHand[i][10])) &&
            (winnerList[0][11] == playerHand[i][11]) &&
            (winnerList[0][12] == playerHand[i][12])
          ) {
            winnerList.push(playerHand[i]);
            continue;
          }
          if (parseInt(winnerList[0][10]) < parseInt(playerHand[i][10])) {
            winnerList = [];
            winnerList.push(playerHand[i]);
            continue;
          } else if (
            parseInt(winnerList[0][10]) > parseInt(playerHand[i][10])
          ) {
            continue;
          }
          if (winnerList[0][11] < playerHand[i][11]) {
            winnerList = [];
            winnerList.push(playerHand[i]);
            continue;
          } else if (winnerList[0][11] > playerHand[i][11]) {
            continue;
          }
          if (winnerList[0][12] < playerHand[i][12]) {
            winnerList = [];
            winnerList.push(playerHand[i]);
            continue;
          }
        case 2: // PAIR  INDEX [10] = Vaule of pair  INDEX[11][0,1,2]= HIGH CARD
          var g = winnerList[0][11].toString();
          var w = g.split(",");
          var f = playerHand[i][11].toString();
          var p = f.split(",");
          if (
            (parseInt(winnerList[0][10]) == parseInt(playerHand[i][10])) &&
            (parseInt(w[0]) == parseInt(p[0])) &&
            (parseInt(w[1]) == parseInt(p[1])) &&
            (parseInt(w[2]) == parseInt(p[2]))
          ) {
            winnerList.push(playerHand[i]);
            continue;
          }
          if (parseInt(winnerList[0][10]) > parseInt(playerHand[i][10])) {
            continue;
          } else if (
            parseInt(winnerList[0][10]) < parseInt(playerHand[i][10])
          ) {
            winnerList = [];
            winnerList.push(playerHand[i]);
          }
          if (parseInt(w[0]) < parseInt(p[0])) {
            winnerList = [];
            winnerList.push(playerHand[i]);
            continue;
          } else if (parseInt(w[0]) > parseInt(p[0])) {
            continue;
          }
          if (parseInt(w[1]) < parseInt(p[1])) {
            winnerList = [];
            winnerList.push(playerHand[i]);
            continue;
          } else if (parseInt(w[1]) > parseInt(p[1])) {
            continue;
          }
          if (parseInt(w[2]) < parseInt(p[2])) {
            winnerList = [];
            winnerList.push(playerHand[i]);
            continue;
          } else if (parseInt(w[2]) > parseInt(p[2])) {
            continue;
          }

        case 1: // high card [9,8,7,4,2] [9,8,7,6,5]
          var g = parseInt(winnerList[0][10]).toString();
          var w = g.split(",");
          var f = parseInt(playerHand[i][10]).toString();
          var p = f.split(",");
          if (
            (parseInt(w[0]) == parseInt(p[0])) &&
            (parseInt(w[1]) == parseInt(p[1])) &&
            (parseInt(w[2]) == parseInt(p[2])) &&
            (parseInt(w[3]) == parseInt(p[3])) &&
            (w[4] == parseInt(p[4]))
          ) {
            winnerList.push(playerHand[i]);
            continue;
          }
          if (parseInt(w[0]) < parseInt(p[0])) {
            winnerList = [];
            winnerList.push(playerHand[i]);
            continue;
          } else if (parseInt(w[0]) > parseInt(p[0])) {
            continue;
          }
          if (parseInt(w[1]) < parseInt(p[1])) {
            winnerList = [];
            winnerList.push(playerHand[i]);
            continue;
          } else if (parseInt(w[1]) > parseInt(p[1])) {
            continue;
          }
          if (parseInt(w[2]) < parseInt(p[2])) {
            winnerList = [];
            winnerList.push(playerHand[i]);
            continue;
          } else if (parseInt(w[2]) > parseInt(p[2])) {
            continue;
          }
          if (parseInt(w[3]) < parseInt(p[3])) {
            winnerList = [];
            winnerList.push(playerHand[i]);
            continue;
          } else if (parseInt(w[3]) > parseInt(p[3])) {
            continue;
          }
          if (parseInt(w[4]) < parseInt(p[4])) {
            winnerList = [];
            winnerList.push(playerHand[i]);
            continue;
          }
      }
    } else if (winnerList[0][8] > playerHand[i][8]) {
      continue;
    }
  }
  return winnerList;
}

function compareArrayOfCards(playersSevenCardHand, checkCondition) {
  var i;
  var n;
  var value = 0;
  for (i = 0; i < 7; i++) {
    for (n = 0; n < checkCondition.length - 1; n++) {
      if (playersSevenCardHand[i] == checkCondition[n]) {
        value++;
      }
    }
  }
  return value;
}

function checkForRoyalFlush(handRank) {
  //A->10
  var c = [
    ["1S", "13S", "12S", "11S", "10S", 10],
    ["1H", "13H", "12H", "11H", "10H", 10],
    ["1C", "13C", "12C", "11C", "10C", 10],
    ["1D", "13D", "12D", "11D", "10D", 10]
  ];
  var rankValue = [];
  var value = 0;
  var i;
  for (i = 0; i < c.length; i++) {
    value = compareArrayOfCards(handRank, c[i]);
    if (value == 5) {
      rankValue.push(value);
      rankValue.push(c[i][5]);
      return rankValue;
    }
  }
  return 0;
}

function checkForStraightFlush(handRank) {
  //K->2
  var rankValue = [];
  var value = 0;
  var c = [
    ["13S", "12S", "11S", "10S", "9S", 10],
    ["13H", "12H", "11H", "10H", "9H", 10],
    ["13C", "12C", "11C", "10C", "9C", 10],
    ["13D", "12D", "11D", "10D", "9D", 10],
    ["12S", "11S", "10S", "9S", "8S", 9],
    ["12H", "11H", "10H", "9H", "8H", 9],
    ["12C", "11C", "10C", "9C", "8C", 9],
    ["12D", "11D", "10D", "9D", "8D", 9],
    ["11S", "10S", "9S", "8S", "7S", 8],
    ["11H", "10H", "9H", "8H", "7H", 8],
    ["11C", "10C", "9C", "8C", "7C", 8],
    ["11D", "10D", "9D", "8D", "7D", 8],
    ["10S", "9S", "8S", "7S", "6S", 7],
    ["10H", "9H", "8H", "7H", "6H", 7],
    ["10C", "9C", "8C", "7C", "6C", 7],
    ["10D", "9D", "8D", "7D", "6D", 7],
    ["9S", "8S", "7S", "6S", "5S", 6],
    ["9H", "8H", "7H", "6H", "5H", 6],
    ["9C", "8C", "7C", "6C", "5C", 6],
    ["9D", "8D", "7D", "6D", "5D", 6],
    ["8S", "7S", "6S", "5S", "4S", 5],
    ["8H", "7H", "6H", "5H", "4H", 5],
    ["8C", "7C", "6C", "5C", "4c", 5],
    ["8D", "7D", "6D", "5D", "4D", 5],
    ["7S", "6S", "5S", "4S", "3S", 4],
    ["7H", "6H", "5H", "4H", "3H", 4],
    ["7C", "6C", "5C", "4c", "3C", 4],
    ["7D", "6D", "5D", "4D", "3D", 4],
    ["6S", "5S", "4S", "3S", "2S", 3],
    ["6H", "5H", "4H", "3H", "2H", 3],
    ["6C", "5C", "4c", "3C", "2C", 3],
    ["6D", "5D", "4D", "3D", "2D", 3]
  ];
  for (let i = 0; i < c.length; i++) {
    value = compareArrayOfCards(handRank, c[i]);
    if (value == 5) {
      rankValue.push(value);
      rankValue.push(c[i][5]);
      return rankValue;
    }
  }

  return 0;
}
function checkForFourOfAKind(handRank) {
  var rankValue = [];
  var value = 0;
  var handRank2 = [];
  var c = [
    ["1S", "1H", "1C", "1D", 13],
    ["13S", "13H", "13C", "13D", 12],
    ["12S", "12H", "12C", "12D", 11],
    ["11S", "11H", "11C", "11D", 10],
    ["10S", "10H", "10C", "10D", 9],
    ["9S", "9H", "9C", "9D", 8],
    ["8S", "8H", "8C", "8D", 7],
    ["7S", "7H", "7C", "7D", 6],
    ["6S", "6H", "6C", "6D", 5],
    ["5S", "5H", "5C", "5D", 4],
    ["4S", "4H", "4C", "4D", 3],
    ["3S", "3H", "3C", "3D", 2],
    ["2S", "2H", "2C", "2D", 1]
  ];
  for (var g = 0; g < c.length; g++) {
    value = compareArrayOfCards(handRank, c[g]);
    if (value == 4) {
      var i;
      var n;
      for (i = 0; i < 7; i++) {
        for (n = 0; n < c.length - 1; n++) {
          if (handRank[i] == c[g][n]) {
            handRank[i] = "0O";
          }
        }
      }
      var highCard = checkForHighCard(handRank);
      rankValue.push(4);
      rankValue.push([c[g][4], highCard[0]]);
      return rankValue;
    }
  }

  return 0;
}

function checkForFullHouse(handRank) {
  var rankValue = [];
  var value = [];
  var handRank2 = [];
  var c = [
    ["1", 14],
    ["13", 13],
    ["12", 12],
    ["11", 11],
    ["10", 10],
    ["9", 9],
    ["8", 8],
    ["7", 7],
    ["6", 6],
    ["5", 5],
    ["4", 4],
    ["3", 3],
    ["2", 2]
  ];
  // var n; //Take away the suits
  for (let n = 0; n < 7; n++) {
    handRank2[n] = handRank[n].slice(0, handRank[n].length - 1);
  }

  value = checkForThreeOfAKind(handRank);
  if (value[0] == 3) {
    var g;
    for (g = 0; g < 7; g++) {
      if (value[1] == handRank2[g]) {
        handRank2[g] = "0";
      }
    }
    rankValue.push(value[1]);

    value = checkForPair(handRank2);
    if (value[0] >= 2) {
      rankValue.unshift(5);
      rankValue.push(value[1]);

      return rankValue;
    }
  }
  return 0;
}

function checkForFlush(handRank) {
  var rankValue = [];
  var value = 0;
  var c = [
    [
      "1S",
      "13S",
      "12S",
      "11S",
      "10S",
      "9S",
      "8S",
      "7S",
      "6S",
      "5S",
      "4S",
      "3S",
      "2S",
      1
    ],
    [
      "1H",
      "13H",
      "12H",
      "11H",
      "10H",
      "9H",
      "8H",
      "7H",
      "6H",
      "5H",
      "4H",
      "3H",
      "2H",
      1
    ],
    [
      "1C",
      "13C",
      "12C",
      "11C",
      "10C",
      "9C",
      "8C",
      "7C",
      "6C",
      "5C",
      "4C",
      "3C",
      "2C",
      1
    ],
    [
      "1D",
      "13D",
      "12D",
      "11D",
      "10D",
      "9D",
      "8D",
      "7D",
      "6D",
      "5D",
      "4D",
      "3D",
      "2D",
      1
    ]
  ];
  var flushRank = [];
  for (let g = 0; g < c.length; g++) {
    value = compareArrayOfCards(handRank, c[g]);
    if (value >= 5) {
      var i;
      var n;
      for (i = 0; i < 7; i++) {
        for (n = 0; n < c[g].length - 1; n++) {
          if (handRank[i] == c[g][n]) {
            flushRank.push(handRank[i]);
          }
        }
      }

      var highCard = checkForHighCard(flushRank);

      if (value >= 5) {
        rankValue.push(value);
        rankValue.push(c[g][13], highCard);
        return rankValue;
      }
    }
  }
  return 0;
}

function checkForStraight(handRank) {
  var rankValue = [];
  var value = 0;
  var handRank2 = [];
  var c = [
    ["1", "13", "12", "11", "10", 10],
    ["13", "12", "11", "10", "9", 9],
    ["12", "11", "10", "9", "8", 8],
    ["11", "10", "9", "8", "7", 7],
    ["10", "9", "8", "7", "6", 6],
    ["9", "8", "7", "6", "5", 5],
    ["8", "7", "6", "5", "4", 4],
    ["7", "6", "5", "4", "3", 3],
    ["6", "5", "4", "3", "2", 2],
    ["5", "4", "3", "2", "1", 1]
  ];
  for (let n = 0; n < 7; n++) {
    handRank2[n] = handRank[n].slice(0, handRank[n].length - 1);
  }
  handRank2 = removeDupes(handRank2); //eliminates dupplicates
  for (let i = 0; i < c.length; i++) {
    value = compareArrayOfCards(handRank2, c[i]);

    if (value == 5) {
      rankValue.push(value);
      rankValue.push(c[i][5]);
      return rankValue;
    }
  }
  return 0;
}

function removeDupes(arr) {
  var unique = [];
  for (let i = 0; i < arr.length; i++) {
    if (unique.indexOf(arr[i]) == -1) {
      unique.push(arr[i]);
    }
  }
  return unique;
}

function checkForThreeOfAKind(handRank) {
  var rankValue = [];
  var value = 0;
  var handRank2 = [];
  var c = [
    ["1", 14],
    ["13", 13],
    ["12", 12],
    ["11", 11],
    ["10", 10],
    ["9", 9],
    ["8", 8],
    ["7", 7],
    ["6", 6],
    ["5", 5],
    ["4", 4],
    ["3", 3],
    ["2", 2]
  ];
  // var n; //Take away the suits
  for (let n = 0; n < 7; n++) {
    handRank2[n] = handRank[n].slice(0, handRank[n].length - 1);
  }
  for (let i = 0; i < c.length; i++) {
    value = compareArrayOfCards(handRank2, c[i]);

    if (value == 3) {
      var g;
      var n;
      for (g = 0; g < 7; g++) {
        for (n = 0; n < c.length; n++) {
          if (handRank2[g] == c[i][0]) {
            handRank2[g] = "0";
          }
        }
      }
      var highRank = checkForHighCard(handRank2);
      rankValue.push(value);
      rankValue.push(c[i][1], highRank);
      return rankValue;
    }
  }
  return 0;
}

function checkForTwoPair(handRank) {
  var rankValue = [];
  var value = 0;
  var value2 = 0;
  var handRank2 = [];
  var c = [
    ["1", 14],
    ["13", 13],
    ["12", 12],
    ["11", 11],
    ["10", 10],
    ["9", 9],
    ["8", 8],
    ["7", 7],
    ["6", 6],
    ["5", 5],
    ["4", 4],
    ["3", 3],
    ["2", 2]
  ];
  //Take away the suits
  for (let n = 0; n < 7; n++) {
    handRank2[n] = handRank[n].slice(0, handRank[n].length - 1);
  }
  var i;
  for (i = 0; i < c.length; i++) {
    value = compareArrayOfCards(handRank2, c[i]);
    if (value >= 2) {
      value2++;
      var g;
      var n;
      if (value2 <= 2) {
        for (g = 0; g < 7; g++) {
          for (n = 0; n < c.length; n++) {
            if (handRank2[g] == c[i][0]) {
              handRank2[g] = "0";
            }
          }
        }
        rankValue.push(c[i][1]);
      }
    }
  }
  if (value2 >= 2) {
    var highRank = checkForHighCard(handRank2);
    rankValue.unshift(value2);
    rankValue.push(highRank);
    return rankValue;
  }
  return 0;
}

function checkForPair(handRank) {
  var rankValue = [];
  var value = 0;
  var handRank2 = [];
  var c = [
    ["1", 14],
    ["13", 13],
    ["12", 12],
    ["11", 11],
    ["10", 10],
    ["9", 9],
    ["8", 8],
    ["7", 7],
    ["6", 6],
    ["5", 5],
    ["4", 4],
    ["3", 3],
    ["2", 2]
  ];
  var n; //Take away the suits
  var patt = new RegExp("[A-Z]");
  if (patt.test(handRank[0])) {
    for (n = 0; n < handRank.length; n++) {
      handRank2[n] = handRank[n].slice(0, handRank[n].length - 1);
    }
  } else {
    for (n = 0; n < handRank.length; n++) {
      handRank2[n] = handRank[n];
    }
  }
  for (let i = 0; i < c.length; i++) {
    value = compareArrayOfCards(handRank2, c[i]);
    if (value == 2) {
      var g;
      var n;
      for (g = 0; g < 7; g++) {
        for (n = 0; n < c.length; n++) {
          if (handRank2[g] == c[i][0]) {
            handRank2[g] = "0";
          }
        }
      }
      var highRank = checkForHighCard(handRank2);
      rankValue.push(value);
      rankValue.push(c[i][1]);
      rankValue.push(highRank);
      return rankValue;
    }
  }
  return 0;
}

function checkForHighCard(handRank) {
  var value = [];
  var handRank2 = [];
  var c = [
    ["1", 14],
    ["13", 13],
    ["12", 12],
    ["11", 11],
    ["10", 10],
    ["9", 9],
    ["8", 8],
    ["7", 7],
    ["6", 6],
    ["5", 5],
    ["4", 4],
    ["3", 3],
    ["2", 2]
  ];
  var n; //Take away the suits
  var patt = new RegExp("[A-Z]");
  if (patt.test(handRank[0])) {
    for (n = 0; n < handRank.length; n++) {
      handRank2[n] = handRank[n].slice(0, handRank[n].length - 1);
    }
  } else {
    for (n = 0; n < handRank.length; n++) {
      handRank2[n] = handRank[n];
    }
  }
  var i;
  var n;
  for (i = 0; i < handRank.length; i++) {
    for (n = 0; n < c.length; n++) {
      if (handRank2[i] == c[n][0]) {
        value.push(c[n][1]);
      }
    }
  }
  return value.sort(function(a, b) {
    return b - a;
  });
}
