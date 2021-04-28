console.log('docviewer.js running');

const socket = io();
const md = window.markdownit();
hljs.highlightAll();

const room = document.body.id;

socket.emit('createDoc', {room: room});

const editor = document.getElementById('editor');
editor.addEventListener('keyup', (event) => {
  const text = editor.value;
  socket.emit('setText', {
    text: text,
    room: window.location.pathname.match(/[^\/]+$/)[0]});

  const output = document.getElementById('output');
  output.innerHTML = md.render(text);
});

const saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', handleSave);

/**
 * @title handleSave
 */
function handleSave () {
  if (editor.value != '') {
    socket.emit('setCache', {room: room, text: editor.value});
  }
}
const input = document.getElementById('editor');

socket.on('getCache', (data) => {
  if (data === null) {
    return data = 'Hello!';
  };
  editor.innerHTML = data.text;
  const output = document.getElementById('output');
  hljs.highlightElement(output);
  output.innerHTML = md.render(data.text);
});

socket.on('message', (data) => {
  editor.value = data;
});

socket.on('getText', (message) =>{
  editor.innerHTML = message.text;
});

socket.on('onlineCount', (count) => {
  console.log(count);
  const counter = document.createElement('span');
  counter.value = count;
  document.getElementById('onlineCounter').innerHTML =`${count} editors online`;
});

socket.on('userJoin', (joinEvent) => {
  console.log(joinEvent);
});
