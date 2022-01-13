var buttonColours = ["red","blue","green","yellow"];
var randomChosenColor ;
var gamePattern = [];
var userClickedPattern = [];
var userChoosenId;
var started = false;
var level = 0 ;
var highScore =0;
var score = 0;


$(document).keypress(function(){
    if(!started){
        nextSequence();
        started = true;
        $("p").remove();
        var backMusic = new Audio("sounds/background.mp3");
        backMusic.play();
        backMusic.volume = 0.2;
        setTimeout(function(){
            playSound("lets");
        },100)

    }

})

function nextSequence(){
    userClickedPattern = [];
    var random = Math.random();
    random = Math.floor(random * 4);
    // console.log(random);
    randomChosenColor = random;
    gamePattern.push(buttonColours[random]);
    $("#"+buttonColours[random]).fadeOut(200).fadeIn(200);
    // console.log(buttonColours[random]);
    playSound(buttonColours[random]);
    level++;
    $("h1").text("level "+level);
    animation(buttonColours[random]);
    $("#score").text("score "+score);
    setTimeout(function(){
        playSound("nextLevel");
    },100);
}

$(".btn").click(function(e){
    userChoosenId = e.target.id;
    // console.log(userChoosenId);
    userClickedPattern.push(userChoosenId);
    $("#"+userChoosenId).fadeOut(100).fadeIn(100);
    playSound(userChoosenId);
    checkAnswer(userClickedPattern.length - 1);
    animation(userChoosenId);
    
});

function playSound(name){
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function checkAnswer(currentlevel){

    if(gamePattern[currentlevel] === userClickedPattern[currentlevel])
    {
        // console.log("Success");
        score+=10;
        if(userClickedPattern.length === gamePattern.length)
        {
            
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        playSound("wrong");
        // console.log("Wrong");
        $("h1").text("Game Over, press Any Key to restart ");
        $("body").addClass("game-over");
        startOver();
        setTimeout(function(){
            $("body").removeClass("game-over");
        },1000);
    }

}

function startOver(){
    gamePattern = [];
    level = 0;
    started = false;
    if(score>highScore){
        highScore = score;
    }
    $("#highScore").text("HighScore:"+highScore);
    score = 0;
    setTimeout(function(){
        playSound("try");
    },1000);
}

function animation(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    },100);
}

$(".start-button").click(function(){
    if(!started){
        nextSequence();
        started = true;
        $("p").remove();
        var backMusic = new Audio("sounds/background.mp3");
        backMusic.play();
        backMusic.volume = 0.2;
        setTimeout(function(){
            playSound("lets");
        },100)

    }
});
