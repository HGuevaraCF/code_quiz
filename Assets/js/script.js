var startButton = $('#start_button');
var Introduction = $('#page_0');
var fisrtQuestion = $('#page_1');
var secondQuestion = $('#page_2');
var thirdQuestion = $('#page_3');
var SaveScore = $('#saveScore');
var ActualScore = $('#ActualScore');

var scores = [];
var scoreCount = 0;

startButton.on('click', function(){
    Introduction.hide();
    fisrtQuestion.show();
})

$('.FirstQuestionButton').on('click', function(){
    fisrtQuestion.hide();
    secondQuestion.show();

})

$('.SecondOptnButton').on('click', function(){
    secondQuestion.hide();
    thirdQuestion.show();
})

$('.ThirdOptnButton').on('click', function(){
    thirdQuestion.hide();
    SaveScore.show();
})

$('#submitBtn').on('click', function(event){
    event.preventDefault();
    localStorage.setItem("Actual Score", ActualScore.val());

})