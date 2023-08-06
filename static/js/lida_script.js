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
    direction: ['left', 'right'],
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
    generateDiv.innerHTML += monsterProperties;
    const imageMonster = document.querySelectorAll('img');
    imageMonster.forEach(image => image.style.display = 'none');

    if (monster.color === 'blue' && monster.shape === 'round') {
        imageMonster[0].style.display = 'block';
    } else if (monster.color === 'blue' && monster.shape === 'square') {
        imageMonster[1].style.display = 'block';
    } else if (monster.color === 'red' && monster.shape === 'square') {
        imageMonster[3].style.display = 'block';
    } else if (monster.color === 'red' && monster.shape === 'round') {
        imageMonster[2].style.display = 'block';
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
    }, 100);
}

const cell1 = document.getElementById('cell1');
const cell2 = document.getElementById('cell2');
const cell3 = document.getElementById('cell3');
const cell4 = document.getElementById('cell4');
const cell5 = document.getElementById('cell5');
const cell6 = document.getElementById('cell6');
const cell7 = document.getElementById('cell7');
const cell8 = document.getElementById('cell8');
const cell9 = document.getElementById('cell9');
const cell10 = document.getElementById('cell10');
const cell11 = document.getElementById('cell11');
const cell12 = document.getElementById('cell12');

const cells = [cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10, cell11, cell12];

function userInput() {
    const form = document.getElementsByClassName('form_main')[0]
    form.style.display = 'flex'


    const colorSelect = document.getElementById('input_color');
    const shapeSelectContainer = document.getElementById('shape-select-container');
    shapeSelectContainer.style.opacity = 0;

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

}


$(document).ready(function () {
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
let steps

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
        data = await res.json();     //<-- data return [end_monster_prop_dictionary, [endcells]]
        steps = data.steps;
        console.log('from server:', data, steps);
        if (user_color === data.color && user_shape === data.shape && user_endcell === data.endcell) {
            message = "You win!";
        } else {
            message = "Try again!";
        }
        animateSteps();
        console.log(message, `'user choices: ${user_color}, ${user_shape}, ${user_endcell}`);
    }
    catch (e) {
        console.log(e);
    }
}

function animateSteps() {
    let i = 0;
    const animateStepsInterval = setInterval(() => {
        if (i === monster.steps) {
            clearInterval(animateStepsInterval);
            return;
        }
        cells[i].classList.add('active');
        i++;
    }, 1000);

    // for (const step of data[1]) {
    // cells[step - 1].classList.add('animate-step');
    // }
}

