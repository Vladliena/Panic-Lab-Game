// Dynamic Form for USER at the end of the game

// Form will appear when game ends (dont have this point at the moment)

// const form = document.getElementsByClassName('form_main')[0]
// form.style.display = 'flex'

const colorSelect = document.getElementById('input_color');
const shapeSelectContainer = document.getElementById('shape-select-container');

colorSelect.addEventListener('change', function () {
    shapeSelectContainer.innerHTML = '';

    if (colorSelect.value !== '') {
        const shapeOptions = [
            { value: '', text: 'Select bacteria shape', },
            { value: 'round', text: 'Round', },
            { value: 'square', text: 'Square', },
        ];

        const shapeSelect = document.createElement('select');
        shapeSelect.name = 'shape';
        shapeSelect.id = 'input_shape';
        shapeSelectContainer.appendChild(shapeSelect);

        shapeOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            shapeSelect.appendChild(optionElement);
        });

        shapeSelectContainer.style.opacity = 0;
        let opacity = 0;
        const fadeInInterval = setInterval(() => {
            opacity += 0.05;
            shapeSelectContainer.style.opacity = opacity;
            if (opacity >= 1) {
                clearInterval(fadeInInterval);
            }
        }, 50);
    }
});



// Get data from JSON (at the moment not sure that it is the best way, maybe could do it shorter)

let globalData;

async function foo() {
    const res = await fetch('monsters.json');
    const data = await res.json();
    return data;
}

async function getData() {
    try {
        globalData = await foo();
        ({ numberValue, stringValue } = processExtractedData(globalData));
        processExtractedData(globalData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

//Get steps and direction

let numberValue;
let stringValue;


function processExtractedData(data) {
    let numberValue = data[3];
    let stringValue = data[2];
    return { numberValue, stringValue }
}

getData();

// Generate Monster

let generationComplete = false;

function generate(callback) {
    const button_generate = document.getElementById('generate-button');
    const generate_div = document.getElementById('generate_div')

    button_generate.addEventListener("click", function () {
        button_generate.style.display = 'none';
        generate_div.innerHTML += `<p class = 'monster_text'><span>Monster properties</span> <br><br> ${globalData}</p>`
        for (var i = 0; i < globalData.length; i++) {
            image_monster = document.querySelectorAll('img')
            if (globalData.includes('blue') && globalData.includes('round')) {
                image_monster[0].style.display = 'block'
            } else if (globalData.includes('blue') && globalData.includes('square')) {
                image_monster[1].style.display = 'block'
            } else if (globalData.includes('red') && globalData.includes('square')) {
                image_monster[3].style.display = 'block'
            } else if (globalData.includes('red') && globalData.includes('round')) {
                image_monster[2].style.display = 'block'
            }
        }

        generationComplete = true;

        if (typeof callback === 'function') {
            callback();
        }
    });

    return generate_div
}



// Start Game Button


function start_game() {
    if (generationComplete) {
        const generatedDiv = document.getElementById('generate_div');
        const startButton = document.createElement('button');
        startButton.classList.add('start_button');
        startButton.textContent = 'Start Game';
        generatedDiv.appendChild(startButton)
        startButton.addEventListener("click", function () {
            generatedDiv.style.display = 'none'
            moveMarker(numberValue, stringValue, getRandomCellId()) // calling function to start Monster movement, with steps number, direction and random number for start cell
        });
    }
}

generate(start_game)



//Generate random number of cell to start

function getRandomCellId() {
    const totalCells = 12;
    const randomIndex = Math.floor(Math.random() * totalCells);
    return randomIndex + 1;
}

//Start movement of Monster


function moveMarker(startingCell, direction, steps) {
    const totalCells = 12;
    const cellIds = Array.from({ length: totalCells }, (_, i) => `cell${i + 1}`);
    const startIndex = cellIds.indexOf(`cell${startingCell}`);

    let newIndex;
    if (direction === 'left') {
        newIndex = (startIndex - steps + totalCells) % totalCells;
    } else if (direction === 'right') {
        newIndex = (startIndex + steps) % totalCells;
    } else {
        console.error('Invalid direction');
        return null;
    }

    const finalCell = cellIds[newIndex];
    document.getElementById(finalCell).classList.add('marker'); // Fuction just for now to see the end Cell (Will delete later)
}

