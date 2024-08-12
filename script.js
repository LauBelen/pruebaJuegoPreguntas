let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = {};
let currentQuestion = 0;
let score = 0;

const questions = [
    {
        type: 'image',
        content: "/home/belen/Escritorio/gatoPregunta.png",
        imageSrc: "/home/belen/Escritorio/gatoPregunta.png",
        options: ["Perro", "Gato", "Pájaro", "Ratón"],
        answer: "Gato"
    },
    {
        type: 'text',
        content: "¿Cuál es la capital de Francia?",
        options: ["Madrid", "París", "Londres", "Berlín"],
        answer: "París"
    },
    {
        type: 'text',
        content: "¿En qué año se colonizó América?",
        options: ["1492", "1500", "1600", "1776"],
        answer: "1492"
    }
];

const questionElement = document.getElementById('question');
const questionImageElement = document.getElementById('question-image');
const optionsElement = document.getElementById('options');
const resultElement = document.getElementById('result');
const nextButton = document.getElementById('next-btn');
const finalResultElement = document.getElementById('final-result');

function startGame() {
    const name = document.getElementById('name').value;
    const zone = document.getElementById('zone').value;

    if (name && zone) {
        currentUser = { name, zone, score: 0 };
        document.getElementById('user-info').style.display = 'none';
        document.getElementById('question-container').style.display = 'block';
        loadQuestion();
    } else {
        alert("Por favor ingresa tu nombre y zona.");
    }
}

function loadQuestion() {
    const currentQ = questions[currentQuestion];
    
    if (currentQ.type === 'text') {
        questionElement.textContent = currentQ.content;
        questionImageElement.style.display = 'none';
    } else if (currentQ.type === 'image') {
        questionElement.textContent = '';
        questionImageElement.src = currentQ.imageSrc;
        questionImageElement.style.display = 'block';
    }

    optionsElement.innerHTML = '';

    currentQ.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option));
        optionsElement.appendChild(button);
    });
}

function checkAnswer(option) {
    const currentQ = questions[currentQuestion];
    if (option === currentQ.answer) {
        score++;
    }
    resultElement.textContent = option === currentQ.answer ? "¡Correcto!" : `Incorrecto. La respuesta correcta es: ${currentQ.answer}`;
    resultElement.style.display = 'block';
    nextButton.style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
        resultElement.style.display = 'none'; 
        nextButton.style.display = 'none';
    } else {
        endGame();
    }
}

function endGame() {
    currentUser.score = score;
    users.push(currentUser);
    localStorage.setItem('users', JSON.stringify(users));

    document.getElementById('question-container').style.display = 'none'; 
    displayResults(); 
}

function displayResults() {
    users.sort((a, b) => b.score - a.score);

    const resultList = document.getElementById('result-list');
    resultList.innerHTML = '';

    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name} (${user.zone}) - ${user.score} puntos`;
        resultList.appendChild(li);
    });

    finalResultElement.style.display = 'block'; 
}


document.addEventListener('DOMContentLoaded', () => {

});










