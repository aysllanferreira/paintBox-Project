const getApp = document.querySelector('#app');

const createHeader = () => {
  const genHeader = document.createElement('header');
  const genTitle = document.createElement('h1');
  genTitle.innerText = 'Paint Box';
  genHeader.appendChild(genTitle);
  getApp.appendChild(genHeader);
};

window.onload = () => {
  createHeader();
};
