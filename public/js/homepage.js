/* eslint-disable max-len */
console.log('homepage.js running');

const socket = io();
const form = document.forms[0];
form.addEventListener('submit', handleSubmit);

/**
 *
 * @param {*} e
 * @return {Boolean} If docName is empty submit, otherwise dont do anything
 */
function handleSubmit (e) {
  e.preventDefault();

  const docName = e.target[1].value;

  socket.emit('createDoc', {room: docName});
  // handle client-side validation here.
  return docName != '' ? form.submit() : null;
}

socket.on('redirectToRoom', (room) =>{
  window.location.href = '/doc/' + room;
});

socket.emit('getListings');

socket.on('setListings', (documents) =>{
  Object.values(documents).map((key) => {
    generateCards(key);
    generateDatalist(key);
    console.log(key);
  });
});

/**
 * @title Create card item
 * @param {String} title title of the card
 */
function generateCards (title) {
  const link = `
      <a class="list-item" href="/doc/${title}">
        <span>${title}</span>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z"/></svg>
      </a>
    `;
  document.getElementsByTagName('div')[0].innerHTML += link;
}

/**
 *
 * @param {String} title html element
 */
function generateDatalist (title) {
  const datalistItem = `
    <option value="${title}">
  `;
  document.getElementById('documentList').innerHTML += datalistItem;
}


/*
LOGIC TO CHANGE STYLES
*/
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.setAttribute('data-theme', 'dark');
});

const themeSwitcher = document.getElementById('theme-switcher');
themeSwitcher.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const switchToTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', switchToTheme);
  console.log(`GO GO GO: ${switchToTheme}`);
});
