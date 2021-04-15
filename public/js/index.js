console.log('hello index');
const socket = io('http://localhost:8080');

document.getElementById('editor').addEventListener('keyup', (event) => {
  const editor = document.getElementById('editor');
  const text = editor.value;
  socket.send(text);
});

socket.on('message', (data) => {
  editor.value = data;
});
