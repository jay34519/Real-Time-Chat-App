
const socket = io('http://localhost:8000');
const form=document.getElementById('send-c');
const messageinp=document.getElementById('messagein');
const cont=document.querySelector('.container');
var audio=new Audio('song.mp3');
const append=(message,position)=>{
    
    const element=document.createElement('div');
    element.innerText=message;
    element.classList.add('message');
    element.classList.add(position);
    cont.append(element);
if(position=='left'){
    audio.play();
}

}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    append(`You: ${messageinp.value}`,'right');
    socket.emit('send',messageinp.value);
    messageinp.value="";
    
    })
    
const nam=prompt("Enter Your Name");

socket.emit('new-user-joined',nam);
socket.on('user-joined',data=>{
append(`${data} joined the chat`,'left')

})


socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left')
    
    })

    socket.on('left',data=>{
append(`${data} left the chat`,'left');

    })