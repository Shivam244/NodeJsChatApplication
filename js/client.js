const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput =  document.getElementById('messageInput');
const messageContainer =  document.querySelector('.container');
var audio = new Audio('sound.mp3');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    audio.muted = true;
    if(position ==  'left'){
        audio.muted = false;
        audio.play();
    }
}

const username = prompt("Enter your name to join");
socket.emit('new-user-joined', username); 

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message);
    messageInput.value = '';
});

socket.on('joined', data =>{
    append(`${data} joined the chat`, 'notice');
});

socket.on('recieve', data =>{
    append(`${data.name}: ${data.message}`, 'left');
});
socket.on('left', data =>{
    append(`${data} left the chat`, 'notice');
});


