async function newDMHandler(event) {
    event.preventDefault();

    const recipient = document.querySelector("#recipient")
    const chat_text = document.querySelector('#chat-text').value.trim();
    const post_id = window.location.toString().split('/')[window.location.toString.split('/').length - 1];
    
    const response = await fetch(`/api/chats`, {
        method: 'POST',
        body: JSON.stringify({
            recipient,
            post_id,
            chat_text
        }),
        headers: {
            'Content-Type': 'application/json'  
        }
    });

    if(response.ok) {     
        document.location.replace('/api/chats/direct-message/' + post_id );     
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-direct-message').addEventListener('submit', newDMHandler);