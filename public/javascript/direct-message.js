async function newDMHandler(event) {
    event.preventDefault();

    const recipient = document.querySelector('#recipient').value;
    const chat_text = document.querySelector('#chat-text').value.trim();
    const post_id = window.location.toString().split('/')[window.location.toString.split('/').length - 1];
    const user_id = document.querySelector('#user_id').value;

    const response = await fetch(`/api/chats`, {
        method: 'POST',
        body: JSON.stringify({
            recipient,
            post_id,
            chat_text,
            user_id
        }),
        headers: {
            'Content-Type': 'application/json'  
        }
    });

    if(response.ok) {  
        document.location.replace('/chats/direct-message/' + post_id );     
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-direct-message').addEventListener('submit', newDMHandler);