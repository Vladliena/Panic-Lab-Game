//Welcome Screen

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


let monsterData = {
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
console.log(monster)
export let start_monster = monster;

function generate() {
    buttonGenerate.style.display = 'none';
    
    console.log(monster);
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
    const imageMonster = document.querySelectorAll('.monst_img');
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

    let generationComplete = true;
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
    return monster
}


// Start Timer


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
    }, 2000);
}






// User Input

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


import { result } from "./main.js";
console.log(result);

// document.querySelector('.form_answer').addEventListener('submit', function (event) {
//     event.preventDefault();
//     document.querySelector('#input_color').value = '';
//     document.querySelector('#input_shape').value = '';
// });