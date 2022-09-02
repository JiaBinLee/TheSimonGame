
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isGameStarted = false;
var level = 0;

// To detect any of the keys are pressed at first
$(document).on("keypress", function(){
  if (!isGameStarted){
    nextSequence();
    isGameStarted = true;
  }
});

// To detect any of the color buttons are pressed
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playAudio(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

//************************ Function List ************************
// Generate new random number
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  playAudio(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  level += 1;
  $("#level-title").text("Level " + level);
}

function checkAnswer(currentLevel){
  // match
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    // If user finish the current level
    // Set a new random number by running nextSequence()
    // clear userClickedPattern array
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  }
  // not match
  else {
    playAudio("wrong");
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
      $("#level-title").text("Game Over, Press Any Key To Restart");
      startOver();
    }, 200);
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  isGameStarted = false;
}

function playAudio(name){
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
