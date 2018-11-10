$(document).ready(function() {
  // document is loaded and DOM is ready

  myfunction();
});


function myfunction() {
    var l;
    var x = "";
    var n = ["h", "d", "s", "c"];
    var h = "Heart";
    var d = "Diamond";
    var s = "Spades";
    var c = "Clover";
    var g = [h, d, s, c];
    
  for (l = 0; l < 4; l++) {
    x = loopfunction(g[l], n[l],x);
  }

  document.getElementById("img").innerHTML = x;
  document.getElementById("title").innerHTML = "A Deck of Cards";
}

function loopfunction(temp, temp2,x) {
  var i;
  for (i = 1; i <= 13; i++) {
    x +=
      '<div class="card" >' +
      '<img class="card-img-top" src="/image/PNG/' +
      i.toString() +
      temp2 +
      '.png" alt="Card image cap">' +
      '<div class="card-body"><p class="card-text">' +
      i.toString() +
      " of " +
      temp +
      "</p></div></div>";
  }
  return x;
}
