//Make Connection 
var socket = io.connect('http://localhost:8000/homepage.html');

var comment = document.getElementById("comment");
var output = document.getElementById('output');
var btn = document.getElementById('send');
var likeBtn = document.getElementById('like');

var votes= 0 ;
//Emit events
function updateLikes(number){
    var str = document.getElementById("votes").innerHTML;
    var words = str.split(" ");
    for(var i=0; i<words.length; i++){
        document.getElementById("votes").innerHTML = str.replace(words[0], votes);
    }
    
    


}
likeBtn.addEventListener('click', function(){
     votes++; 
     updateLikes();


})


btn.addEventListener('click',function(){
    socket.emit('comments', {
        comment: comment.value
    });
    output.value +=  comment.value;
    //alert(document.getElementById("votes").innerHTML) ;
    alert(comment.value);
    comment.value=""; 
});
socket.on('connection', function(data){
    console.log(data);
    socket.emit('chat', 
        
    );
    alert(output.value);
     
});



// let votes = 0;

// function updateDisplay(){
//     document.getElementById("votes").innerHTML = votes;
// }


// function voting(){
//     votes++;
//     updateDisplay();
// }

// function sendMessageWithForm() {
//     const commentElement = document.getElementById("myForm"); 
//     //const formData = new FormData(formElement); 
//     const request = new XMLHttpRequest();  
//     var mesg = document.getElementById("form-comment").value;
//     //const data = mesg.nodeValue; 
//     if(mesg!=='') {
//         request.onreadystatechange = function(){
//             if(this.readyState ===4 && this.status ===200){
//                 console.log(this.responseText);
//                 listofMesg.push(mesg);
//         }
//     };
//     }
//     // onreadystatechange removed for slide
//     // request.open("GET", "/ajax"); ss
//     // request.send(formData); 
//     request.open("POST","/homepage.html")
//     request.send(formData);
//     formElement.reset();
// }

// function commentContent(){
//     const request = new XMLHttpRequest();
//     request.onreadystatechange = function(){
//         if(this.readyState ===4 && this.status ===200){
//              renderMessages(this.responseText);
//         }

//             // renderMessages(this.responseText);
//     };
//     request.open("GET","/output.json");
//     request.send();
// }

// function renderMessages(rawMessage){
//     let chat  =  document.getElementById('chat');
//     const messages = JSON.parse(rawMessage);
    
//     let allChat ="";
//     for(let message of messages){
//         allChat += message + "<br/>";
//     }
//     chat.innerHTML = allChat;
// }

