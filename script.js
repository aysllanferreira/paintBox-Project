const getApp = document.querySelector('#app');

const createHeader = () => {
  const genHeader = document.createElement('header');
  const genTitle = document.createElement('h1');
  genTitle.innerText = 'Paint Box';
  genHeader.appendChild(genTitle);
  getApp.appendChild(genHeader);
};

const generatePallete = (div) => {
  for (let i = 0; i < 4; i += 1) {
    const createDiv = document.createElement('div');
    createDiv.className = 'color';
    createDiv.style.border = '1px solid black';
    createDiv.style.width = '50px';
    createDiv.style.height = '50px';

    if (i === 0) {
      createDiv.classList.add('selected');
    }

    if (i % 2 === 1) {
      createDiv.style.borderRadius = '50%';
    }
    div.appendChild(createDiv);
  }
};

const createPallete = () => {
  const createDiv = document.createElement('div');
  createDiv.id = 'pallete';
  createDiv.style.display = 'flex';
  createDiv.style.justifyContent = 'center';
  generatePallete(createDiv);
  getApp.appendChild(createDiv);
};

const randomColour = () => {
  const random = Math.floor(Math.random() * 16777215).toString(16);
  return `#${random}`;
};

const saveLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

const savePalleteLocalStorage = () => {
  const pallete = document.querySelectorAll('.color');
  const palleteArray = [];
  for (let i = 0; i < pallete.length; i += 1) {
    palleteArray.push(pallete[i].style.backgroundColor);
  }
  saveLocalStorage('colors', JSON.stringify(palleteArray));
};

const paintPallete = () => {
  const pallete = document.querySelectorAll('.color');
  for (let i = 0; i < pallete.length; i += 1) {
    if (i === pallete.length - 1) {
      pallete[i].style.backgroundColor = 'black';
    } else {
      pallete[i].style.backgroundColor = randomColour();
    }
  }
  savePalleteLocalStorage();
};

const paintPalleteStorage = () => {
  const pallete = document.querySelectorAll('.color');
  const palleteStorage = JSON.parse(localStorage.getItem('colors'));
  for (let i = 0; i < pallete.length; i += 1) {
    pallete[i].style.backgroundColor = palleteStorage[i];
  }
};

const palleteLogicPaint = () => {
  if (localStorage.getItem('colors') === null) {
    paintPallete();
  } else {
    paintPalleteStorage();
  }
};

const createtButton = () => {
  const createDiv = document.createElement('div');
  createDiv.style.display = 'flex';
  createDiv.style.justifyContent = 'center';
  const createButton = document.createElement('button');
  createButton.innerText = 'Gerar cores';
  createButton.id = 'new-colors';
  createDiv.appendChild(createButton);
  getApp.appendChild(createDiv);
};

const palleteSelectedClassToggle = (event) => {
  const pallete = document.querySelectorAll('.color');
  for (let i = 0; i < pallete.length; i += 1) {
    if (pallete[i].classList.contains('selected')) {
      pallete[i].classList.remove('selected');
    }
  }
  event.target.classList.add('selected');
};

const palleteEventListeners = () => {
  const pallete = document.querySelectorAll('.color');
  for (let i = 0; i < pallete.length; i += 1) {
    pallete[i].addEventListener('click', palleteSelectedClassToggle);
  }
};

window.onload = () => {
  createHeader();
  createPallete();
  palleteLogicPaint();
  createtButton();

  const button = document.querySelector('#new-colors');
  button.addEventListener('click', paintPallete);

  palleteEventListeners();
};
