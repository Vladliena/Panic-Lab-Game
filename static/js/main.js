import { start_monster } from './script.js';
console.log(start_monster);

let timerInterval = null;

$(document).ready(function () {
    $("#generate-button").click(function () {
        $.ajax({
            url: "",
            type: "post",
            contentType: "application/json",
            data: JSON.stringify(start_monster),
            success: function () {
            }
        });

    });

    $('.button_submit').click(function () {
        $.ajax({
            url: "",
            type: "get",
            contentType: "application/json",
            success: function (response) {
                end_monster = JSON.stringify(response);
                result = compare_monsters(end_monster);
            }
        });
    });

    function compare_monsters(monster) {
        const userColor = $("#input_color").val();
        const userShape = $("#input_shape").val();
        if (userColor === monster.color && userShape === monster.shape) {
            message = "You win!";
            // Perform other actions or display a message here...
        } else {
            message = "Try again!";
            // Perform other actions or display a message here...
        }
        return message;
    }

});    