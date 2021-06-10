var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isGameRunning = false;
var level = 0;

$(document).keypress(function(){
  if(!isGameRunning){
    nextSequence();
    $("#level-title").text("Level " + level);
    isGameRunning = true;
  }

});

$(".btn").click(function(){

  var userChosenColour = $(this).attr("id");
  // var userChosenColour = event.currentTarget.id;
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
  // Math.random() produces [0,1)
  // so multiply it by 4 and floor it
  // there you have random of [0,1,2,3]
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  /*var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();*/
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length==userClickedPattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 500);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  isGameRunning = false;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}


/*
switch (randomChosenColour) {
  case "red":
    $("#red").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var redAudio = new Audio("sounds/red.mp3");
    redAudio.play();
    break;
  case "blue":
    $("#blue").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var blueAudio = new Audio("sounds/blue.mp3");
    blueAudio.play();
    break;
  case "green":
    $("#green").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    break;
  case "yellow":
    $("#yellow").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  default:
    console.log("error");
}*/
