async function newDMHandler(event) {
    event.preventDefault();

    const recipient = document.querySelector('#new-direct-message').getAttribute('data-post-author');
    const post_id = document.querySelector('#new-direct-message').getAttribute('data-post-id');
    const user_id = document.querySelector('#new-direct-message').getAttribute('data-chat-user');

    const response = await fetch(`/api/chats`, {
        method: 'POST',
        body: JSON.stringify({
            recipient,
            post_id,
            user_id
        }),
        headers: {
            'Content-Type': 'application/json'  
        }
    });

    if(response.ok) { 
        document.location.replace('/chat/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#new-direct-message').addEventListener('click', newDMHandler);