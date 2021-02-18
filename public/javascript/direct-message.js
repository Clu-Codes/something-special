async function newDMHandler(event) {
    event.preventDefault();

    const recipient = document.querySelector('#recipient').getAttribute('data-post-author');
    const post_id = document.querySelector('#post-id').getAttribute('data-post-id');
    const user_id = document.querySelector('#user-id').getAttribute('data-chat-user');

    const response = await fetch(`/chat`, {
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