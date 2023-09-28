//Welcome Screen
// import { result } from "./main.js";
// console.log(result());

document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("popup");
    const startButton = document.getElementById("start-button-pop");

    startButton.addEventListener("click", function () {
        const playerName = document.getElementById("player-name").value;
        if (playerName.trim() === "") {
            alert("Please enter your name.");
        } else {
            popup.style.display = "none";
        }
    });

    popup.style.display = "flex";
});


//Basic Monster Data


const monsterData = {
    color: ['red', 'blue'],
    shape: ['round', 'square'],
    direction: ['counterclock-wise', 'clockwise'],
    steps: [6, 7, 8, 9, 10, 11, 12],
    startcell: () => Math.floor(Math.random() * 7) + 6
};

// Generate Monster function

function generateRandomMonster() {
    return {
        color: monsterData.color[Math.floor(Math.random() * monsterData.color.length)],
        shape: monsterData.shape[Math.floor(Math.random() * monsterData.shape.length)],
        direction: monsterData.direction[Math.floor(Math.random() * monsterData.direction.length)],
        steps: monsterData.steps[Math.floor(Math.random() * monsterData.steps.length)],
        startcell: monsterData.startcell()
    };
}


// Generate button + showing monster generated + add start game button


const generateDiv = document.getElementById('generate_div');
const buttonGenerate = document.getElementById('generate-button');
buttonGenerate.addEventListener('click', generate)

let monster = generateRandomMonster();
//export let start_monster = monster; // <--- this is the variable I want to send to the server
function generate() {
    buttonGenerate.style.display = 'none';
    //here was monsterSteps variable but it was not used anywhere
    const monsterProperties = `
        <p class="monster_text">
            <span>Monster properties:</span><br><br>
            Color: ${monster.color}<br>
            Shape: ${monster.shape}<br>
            Direction: ${monster.direction}<br>
            Steps: ${monster.steps}<br>
            First room: ${monster.startcell}<br>
        </p>
    `;
    const startCell = document.getElementById(`cell${monster.startcell}`);
    startCell.classList.add('highlight');
    generateDiv.innerHTML += monsterProperties;
    const imageMonster = document.querySelectorAll('.monst_img');
    imageMonster.forEach(image => image.style.display = 'none');

    if (monster.color === 'blue' && monster.shape === 'round') {
        imageMonster[0].style.display = 'block';
    } else if (monster.color === 'blue' && monster.shape === 'square') {
        imageMonster[1].style.display = 'block';
    } else if (monster.color === 'red' && monster.shape === 'square') {
        imageMonster[2].style.display = 'block';
    } else if (monster.color === 'red' && monster.shape === 'round') {
        imageMonster[3].style.display = 'block';
    }

    let generationComplete = true;  //<--- this get me an error without the let
    if (generationComplete) {
        const generatedDiv = document.getElementById('generate_div');
        const startButton = document.createElement('button');
        startButton.classList.add('start_button');
        startButton.textContent = 'Start Game';
        generatedDiv.appendChild(startButton);
        startButton.addEventListener("click", function () {
            startTimer(monster.steps);
            generatedDiv.style.display = 'none';
            startCell.classList.remove('highlight');
        });
    }
    handleGenerate(monster);
}

let countdown = 0;

function startTimer(steps) {
    const timerElement = document.getElementById('timer');
    timerElement.style.display = 'block'
    countdown = steps;
    timerElement.textContent = countdown;

    const timerInterval = setInterval(() => {
        countdown--;
        timerElement.textContent = countdown;

        if (countdown === 0) {
            clearInterval(timerInterval);
            timerElement.style.display = 'none'
            return userInput()
        }
    }, 700);
}

function userInput() {
    const form = document.getElementsByClassName('form_main')[0]
    form.style.display = 'flex'


    const colorSelect = document.getElementById('input_color');
    const shapeSelectContainer = document.getElementById('shape-select-container');
    shapeSelectContainer.style.opacity = 0;
    const shapeSelect = document.getElementById('input_shape');
    const roomSelectContainer = document.getElementById('room_select');
    roomSelectContainer.style.opacity = 0;

    colorSelect.addEventListener('change', function () {
        let opacity = 0;
        const fadeInInterval = setInterval(() => {
            opacity += 0.05;
            shapeSelectContainer.style.opacity = opacity;
            if (opacity >= 1) {
                clearInterval(fadeInInterval);
            }
        }, 50);
    });
    shapeSelect.addEventListener('change', function () {
        let opacity = 0;
        const fadeInInterval = setInterval(() => {
            opacity += 0.05;
            roomSelectContainer.style.opacity = opacity;
            if (opacity >= 1) {
                clearInterval(fadeInInterval);
            }
        }, 50);
    });
}


$(document).ready(function () {
    // $("#generate-button").click(function () {
    // handleGenerate();
    // });

    $("#button_submit").click(function (event) {
        event.preventDefault();
        handleSubmit();
    });

});

async function handleGenerate(start_monster) {

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
        let user_color = document.querySelector('#input_color').value
        let user_shape = document.querySelector('#input_shape').value
        let user_endcell = parseInt(document.querySelector('#input_room').value);
        data = await res.json();
        console.log('from server:', data);
        if (user_color === data.color && user_shape === data.shape && user_endcell === data.endcell) {
            message = "You Win!";
        } else {
            message = "Try Again! You Lose!";
        }
        console.log(message, `'user choices: ${user_color}, ${user_shape}, ${user_endcell}`);
        showResult(message,data.color,data.shape,data.endcell);
    }
    catch (e) {
        console.log(e);
    }
}


let popResult = document.getElementById("result-popup");

function showResult(message, color_game, shape_game, endcell_game) {
    const playerNameMain = document.getElementById("player-name").value;
    popResult.style.display = 'block';
    const imageMonster = document.querySelectorAll('.monst_img');
    imageMonster.forEach(image => image.style.display = 'none');

    let popMessage = document.getElementById("result-message");
    popMessage.innerHTML = `${playerNameMain}!<br>${message} <br><br> Correct answers<br> color:${color_game} | shape:${shape_game} | endcell:${endcell_game}`;

    let quitButton = document.getElementById("quit-button");
    quitButton.addEventListener('click', function () {
        popMessage.innerHTML = `GAME OVER`;
        popMessage.style.color = '#ff6347';
        quitButton.style.display = 'none';
        let resultHeader = document.getElementById("result-header");
        resultHeader.style.display = 'none';
        imageMonster.forEach(image => image.style.display = 'none');
    });

    let imageIndex = -1;
    if (color_game === 'blue' && shape_game === 'round') {
        imageIndex = 0;
    } else if (color_game === 'blue' && shape_game === 'square') {
        imageIndex = 1;
    } else if (color_game === 'red' && shape_game === 'square') {
        imageIndex = 2;
    } else if (color_game === 'red' && shape_game === 'round') {
        imageIndex = 3;
    }

    if (imageIndex >= 0) {
        popResult.appendChild(imageMonster[imageIndex]);
        imageMonster[imageIndex].style.display = 'block';
        imageMonster[imageIndex].style.position = 'absolute';
        imageMonster[imageIndex].style.top = '50px';
        imageMonster[imageIndex].style.left = '450px';
        imageMonster[imageIndex].style.width = '100px';
    }
}