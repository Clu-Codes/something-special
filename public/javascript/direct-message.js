async function newDMHandler(event) {
    event.preventDefault();

    const recipient = document.querySelector('#recipient').value;
    const chat_text = document.querySelector('#chat-text').value;
    const post_id = document.querySelector('#post-id').value;
    const user_id = document.querySelector('#user-id').value;
    
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
        // document.location.replace('/chats/direct-message/' + post_id );     
        document.location.replace('/dashboard');
    } else {
        document.location.replace('/')
        alert(response.statusText);
    }
}

document.querySelector('.chat-form').addEventListener('submit', newDMHandler);