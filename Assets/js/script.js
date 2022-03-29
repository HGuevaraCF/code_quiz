var startButton = $('#start_button');
var Introduction = $('#page_0');
var fisrtQuestion = $('#page_1');
var secondQuestion = $('#page_2');
var thirdQuestion = $('#page_3');
var SaveScore = $('#saveScore');
var ScoresHistory = $('#scoresHistory');
var scoreDisplay = $('#ActualScore');
var scoreInitials = $('#Initials');
var timer = $('#timer');
var scores = [];
var scoreCount = 0;

startButton.on('click', function(){
    Introduction.hide();
    fisrtQuestion.show();
    timer.show();
    //timer initialize function
    function TimeLeft(){
        var count = 20;

    }
})

$('.FirstQuestionButton').on('click', function(){
    fisrtQuestion.hide();
    secondQuestion.show();
    var optionButton = $(this).attr('id');
    gradeFunction(optionButton);
    clearAnswer();
})

$('.SecondOptnButton').on('click', function(){
    secondQuestion.hide();
    thirdQuestion.show();
    var optionButton = $(this).attr('id');
    gradeFunction(optionButton);
    clearAnswer();
})

$('.ThirdOptnButton').on('click', function(){
    thirdQuestion.hide();
    SaveScore.show();
    var optionButton = $(this).attr('id');
    gradeFunction(optionButton);
    scoreDisplay.text(scoreCount);
    clearAnswer();

})

$('#submitBtn').on('click', function(event){
    event.preventDefault();
    var ScoreObj = new Object();
    ScoreObj.Name = scoreInitials.val();
    ScoreObj.Score = scoreCount;
    localStorage.setItem("score", JSON.stringify(ScoreObj));

    SaveScore.hide();
    ScoresHistory.show();
})

$('#ClearScore').on('click', function(){
    localStorage.clear();
})

$('#RestartQuiz').on('click', function(){
    ScoresHistory.hide();
    Introduction.show();
})

function gradeFunction(value){
    if(value == 'OptnC'){
        console.log("correcto");
        scoreCount++;
        $('h3').text("Correct!");
        console.log(scoreCount);
    }else{
        console.log("incorrecto");
        $('h3').text("Incorrect!");
        //Restar tiempo al timer
    }
}

function clearAnswer(){
    setTimeout(function(){
        $('h3').text("");
    }, 1000);
}

1. Timer
    1. penalizacion
2. Mostrar scores
3. modificar contenido