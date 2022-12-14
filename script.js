// Variaveis Globais
const getApp = document.querySelector('#app');

// Criacao das funcoes

const createHeader = () => {
  const createHeaders = document.createElement('header');
  getApp.appendChild(createHeaders);
};

const createH1 = () => {
  const generateH1 = document.createElement('h1');
  generateH1.innerText = 'Paint Box';
  const getHeader = document.querySelector('header');
  getHeader.appendChild(generateH1);
};

const generatePallete = () => {
  const getPallete = document.querySelector('#pallete');

  for (let i = 0; i < 4; i += 1) {
    const createDiv = document.createElement('div');
    createDiv.className = 'color';
    createDiv.style.border = 'solid 1px black';
    createDiv.style.width = '50px';
    createDiv.style.height = '50px';

    if (i % 2 === 1) {
      createDiv.style.borderRadius = '50%';
    }

    getPallete.appendChild(createDiv);
  }
};

function createPallete() {
  const createDiv = document.createElement('div');
  createDiv.id = 'pallete';
  createDiv.style.display = 'flex';
  createDiv.style.justifyContent = 'center';
  createDiv.style.gap = '24px';
  getApp.appendChild(createDiv);
  generatePallete();
}

const createRandomColour = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  return `rgb(${r}, ${g}, ${b})`;
};

const saveColoursLocalStorage = () => {
  const getColours = document.getElementsByClassName('color');
  const saveColours = [];

  for (let i = 0; i < getColours.length; i += 1) {
    saveColours.push(getColours[i].style.backgroundColor);
  }

  localStorage.setItem('colors', JSON.stringify(saveColours));
};

const paintPallete = () => {
  const getColour = document.querySelectorAll('.color');

  for (let i = 0; i < getColour.length; i += 1) {
    if (i === getColour.length - 1) {
      getColour[i].style.backgroundColor = 'black';
    } else {
      getColour[i].style.backgroundColor = createRandomColour();
    }

    // i === getColour.length - 1
    //   ? getColour[i].style.backgroundColor = 'black'
    //   : getColour[i].style.backgroundColor = createRandomColour();
  }
  saveColoursLocalStorage();
};

const paintPalleteStorage = () => {
  const getColour = document.querySelectorAll('.color');
  const getLocalStorage = JSON.parse(localStorage.getItem('colors'));

  for (let i = 0; i < getColour.length; i += 1) {
    getColour[i].style.backgroundColor = getLocalStorage[i];
  }
};

const generateButton = (createDiv) => {
  const createBtn = document.createElement('button');
  createBtn.id = 'new-colors';
  createBtn.innerText = 'Gerar cores';
  createDiv.appendChild(createBtn);
};

const createButton = () => {
  const createDiv = document.createElement('div');
  createDiv.style.display = 'flex';
  createDiv.style.justifyContent = 'center';
  getApp.appendChild(createDiv);

  generateButton(createDiv);
};

const clickBtn = () => {
  const getBtn = document.querySelector('#new-colors');
  getBtn.addEventListener('click', paintPallete);
};

// Executar minhas funcoes
window.onload = () => {
  createHeader();
  createH1();
  createPallete();

  if (localStorage.getItem('colors') === null) {
    paintPallete();
  } else {
    paintPalleteStorage();
  }

  createButton();
  clickBtn();
};
