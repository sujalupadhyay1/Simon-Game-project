var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
// Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
   
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(nextSequence,1000);

        }
    }
    else{console.log("wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        $("#level-title").text( "Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");   
        },200);
        
        startover();
}
}
   

function nextSequence() {
   //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
   userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+level);
    var randomnumber = Math.floor(4 * Math.random());
    var randomChosenColour = buttonColours[randomnumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function playSound(name){
    var audio = new Audio("sounds/" + name+ ".mp3");
    audio.play();

}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){$("#"+currentColour).removeClass("pressed");} , 100);

}

function startover(){
    level = 0;
    gamePattern =[];
    started = false;
}





