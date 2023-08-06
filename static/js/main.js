import { start_monster } from './script.js';

$(document).ready(function () {
    $("#generate-button").click(function () {
        handleGenerate();
    });

    $("#button_submit").click(function (event) {
        event.preventDefault();
        handleSubmit();
    });

});

async function handleGenerate() {

    console.log('handleGenerate-------');
    try {
        const res = await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(start_monster)
        });
        const data = await res.json();
    }
    catch (e) {
        console.log(e);
    }
}
let data
let message = "Something went wrong!";

async function handleSubmit() {

    console.log('handleSubmit-------');
    try {
        const res = await fetch("/", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        let color = document.querySelector('#input_color').value;
        let shape = document.querySelector('#input_shape').value;
        let endcell = parseInt(document.querySelector('#input_room').value);
        data = await res.json();
        console.log(data);
        if (color === data.color && shape === data.shape && endcell === data.endcell) {
            message = "You win!";
        } else {
            message = "Try again!";
        }
        console.log(message, color, shape, endcell);
        console.log(data);
    }
    catch (e) {
        console.log(e);
    }
}

export let result = main_result(message, data);

function main_result(message, data) {
    try {
        return [message, data[0], data[1], data[2]];
    }
    catch (e) {
        console.log(e);
    }
}