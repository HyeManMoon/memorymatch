var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;

var matches = 0; //whenever player finds a match increment by 1
var attempts = 0; // whenever player clicks the 2nd card the attempts increment by 1;
var accuracy = 0; //matches/attemtpts
var games_played = 0; //when reset is pressed increments



$(document).ready(initializeApp);


function initializeApp () {
    $('.modal').show();
    $('.modalMain').show();
    $('.modalBG').show();


    $('.closer').on("click", function () {
        $('.start').get(0).play();
        $('.modal').delay("slow").fadeOut();
        $(".modalMain").delay("slow").fadeOut();

        $('.theme').get(0).pause();
    });

    $('.about').on('click', function () {
        $('.aboutMe').fadeIn();
        $('.aboutBG').fadeIn();
        $('.aboutMain').fadeIn();
    })
    $('.aboutImg').on('click', function () {
        $('.aboutMe').fadeOut();
        $('.aboutBG').fadeOut();
        $('.aboutMain').fadeOut();
    })

    var c = randomizeCards();
    createCardDomElements(c);
    $('#game-area').on("click", ".card", toggleCardBack);
    $('.reset').on("click", resetClick);
    $
    displayStats();

}
function displayStats() {
    $('.games-played > .value').text(games_played);
    $('.attempts >  .value').text(attempts);
    accuracy = attempts == 0 ? 0 : ((matches/attempts) * 100).toFixed();
    $('.accuracy > .value').text(accuracy + "%");
}

function resetClick() {


    $('.card').remove();
    //$('.gifStore').remove();
    var c = randomizeCards();
    createCardDomElements(c);
    first_card_clicked = null;
    second_card_clicked = null;
    games_played += 1;
    match_counter = 0;
    matches = 0; //whenever player finds a match increment by 1
    attempts = 0; // whenever player clicks the 2nd card the attempts increment by 1;
    accuracy = 0; //matches/attemtpts
    $('.gameOver').get(0).pause();
    $('.win').get(0).pause();
    displayStats();


}


function randomizeCards () { //randomizes the cards into an array
    var cards = cardArray.slice();
    cards = cards.concat(cards);
    var randomArray = [];
    while(cards.length){
        var randomIndex = Math.floor(Math.random() * cards.length);
        randomArray.push(cards[randomIndex]);
        cards.splice(randomIndex, 1);
    }
    return randomArray;
}


function createCardDomElements (randomArray) { //creates dom for the cards
    for( var i = 0; i<randomArray.length; i++) {
        var card = $("<div>").addClass('card');
        var front = $("<div>").addClass('front');
        var back = $('<div>').addClass('back');
        var backImage = $('<img>').attr("src", "./images/fireemblem-back.png");
        var frontImage = $('<img>', {
            "src": randomArray[i].img,
            gif: randomArray[i].gif
        });

        back.append(backImage);
        front.append(frontImage);
        card.append(front, back);

        if (i < 6) {
            $('.row1').append(card);
        } else if (i < 12) {
            $('.row2').append(card);
        } else {
            $('.row3').append(card);
        }
    }
}


function toggleCardBack() {
    var targetCard = $(this);

    if (targetCard.hasClass('visible')) return;
    if (first_card_clicked != null && second_card_clicked != null) return;

    targetCard.find(".back").toggleClass("hidden");

    if(first_card_clicked === null) {
        first_card_clicked = this;
        $(first_card_clicked).addClass('visible');
        displayStats();

    } else {
        second_card_clicked = this;
        attempts +=1;
        $(second_card_clicked).addClass('visible');
        if(targetCard.hasClass('visible') == true) {
            displayStats();
        }
        if($(first_card_clicked).find(".front > img").attr('src') === $(second_card_clicked).find('.front > img').attr('src')) {

            if(matches < 8 && $(first_card_clicked).find(".front > img").attr('src') === cardArray[8].img && $(second_card_clicked).find('.front > img').attr('src') === cardArray[8].img) {
                //display gameOver

                $('.gameOver').delay('fast').get(0).play();

                match_counter =  -1;
                setTimeout(function () {
                    if(match_counter === -1) {
                        $('.modalLose').show();
                        $('.modalBGLose').show();
                        $('.modalMainLose').show();

                        $('.closer2').on("click", function () {
                            $('.modalLose').fadeOut();
                            $(".modalMainLose").fadeOut();
                            $('.modalBGLose').fadeOut();


                            resetClick();
                        });
                    }
                },2000)

                 return;
            }
            matches +=1 ;
            match_counter += 1;
            displayStats();


            // var gifImage = $("<img>").attr('src', $(first_card_clicked).find(".front > img").attr('gif'));  attaches the gifs to the gifStore wip
            //
            // $('.gifStore').append(gifImage);
            first_card_clicked = null;
            second_card_clicked = null;


            if( match_counter === 8) {
                $('.win').get(0).play();
                //display that match is won
                $('.modalWin').fadeIn();
                $('.modalBGWin').fadeIn();
                $('.modalMainWin').fadeIn();

                $('.closer3').on("click", function () {
                    $('.modalWin').fadeOut();
                    $(".modalMainWin").fadeOut();
                    $('.modalBGWin').fadeOut();

                    resetClick();
                });

            }


        } else {
            displayStats();
            setTimeout(function() {
                $(first_card_clicked).find(".back").toggleClass("hidden");
                $(second_card_clicked).find(".back").toggleClass("hidden");
                first_card_clicked = null;
                second_card_clicked = null;
                // $('#game-area').on("click", ".card", toggleCardBack);
            },400);

            $(first_card_clicked).removeClass('visible');
            $(second_card_clicked).removeClass('visible');
        }
    }
}

var cardArray = [
    {
        name: "Athos",
        img: "./images/Athos-mage.jpg",
        gif: "./images/athos-animation.gif",
        id: 1
    },
    {
        name: "Eliwood",
        img: "./images/eliwood-sword1.jpeg",
        gif: "./images/eliwood-animation.gif",
        id: 2
    },
    {
        name: "Ephraim",
        img: "./images/Ephraim-lance.png",
        gif: "./images/Ephraim-animation.gif",
        id: 3
    },
    {
        name: "Erika",
        img: "./images/erika-sword.jpeg",
        gif: "./images/Erika-animation.gif",
        id:4
    },
    {
        name: "Hector",
        img: "./images/Hector-axe.jpg",
        gif: "./images/Hector-animation.gif",
        id: 5
    },
    {
        name: "Lyndis",
        img: "./images/lyndis-sword.jpg",
        gif: "./images/Lyn-sword-animation.gif",
        id: 6
    },
    {
        name: "Myrrh",
        img: "./images/Myrrhcipher-dragon.png",
        gif: "./images/Myrrh-animation.gif",
        id: 7
    },
    {
        name: "Roy",
        img: "./images/roy-sword.jpeg",
        gif: "./images/Roy-animation.gif",
        id: 8
    },
    {
        name: "Zephiel",
        img: "./images/zephiel-king.jpg",
        gif: "./images/Zephiel_king.gif",
        id: 9
    }
];