var gamePattern = [];
var btnColors = ['red','blue','yellow','green'];
var indexCheck;
var roundCount;
var gameEnd;
var i = 0; // check second transition

$('.btn').click(onClick);
$('.btn').on('transitionend',transitionAnim)
$(document).keypress(startGame);

function startGame(e){
    if(( gamePattern.length === 0 && e.key ==='a') || (gameEnd===true && e.key ==='a')){
        gameEnd = false;
        $('body').removeClass('gameover');
        $('body').addClass('default');
        roundCount = 1;
        nextSequence();
    }
    
}

function nextSequence(){
    var randomNum = Math.floor(Math.random()*4);
    gamePattern.push(btnColors[randomNum]);
    $(`#${btnColors[randomNum]}`).addClass('next');
    var audio = new Audio(`sounds/${btnColors[randomNum]}.mp3`);
    audio.play();
    indexCheck = 0;
    $('h1').text(`Round ${roundCount}.`);
}

function onClick(e){
    if(gamePattern.length===0) return;
    $(`#${e.target.id}`).addClass('clicked');
    if(e.target.id==gamePattern[indexCheck]){
        var audio = new Audio(`sounds/${e.target.id}.mp3`);
        audio.play();
        indexCheck++;
        
    }else{
        gameOver();
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();  
        
    }
}

function transitionAnim(e){
    $(e.target).removeClass('next clicked');
    if(e.originalEvent.propertyName == 'transform'){
         i++;
    }
    if(i===2){
        i=0;
        if(indexCheck >= gamePattern.length && gameEnd===false ){
            roundCount++;
            nextSequence();
        }
    }  
}

function gameOver(){
    gameEnd=true;
    gamePattern = [];
    $('body').removeClass('default');
    $('body').addClass('gameover');
    $('h1').text("Game Over. A to restart.")
    
}