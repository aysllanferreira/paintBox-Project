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

window.onload = () => {
  createHeader();
  createPallete();
};
