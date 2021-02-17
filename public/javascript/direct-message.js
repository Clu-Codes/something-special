async function newDMHandler(event) {
    event.preventDefault();

    const recipient = document.querySelector('#recipient').getAttribute('data-chat-author');
    const post_id = document.querySelector('#post-id').getAttribute('data-chat-id');
    const user_id = document.querySelector('#user-id').getAttribute('data-chat-user');
    
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
        document.location.replace('/dashboard');
    } else {
        document.location.replace('/');
        alert(response.statusText);
    }
}

document.querySelector('#new-direct-message').addEventListener('click', newDMHandler);