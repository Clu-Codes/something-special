function newDMHandler(event) {
    event.preventDefault();

    const recipient = document.querySelector('#new-direct-message').getAttribute('data-post-author');
    const post_id = document.querySelector('#new-direct-message').getAttribute('data-post-id');
    const user_id = document.querySelector('#new-direct-message').getAttribute('data-chat-user');

    fetch(`/api/chats`, {
        method: 'POST',
        body: JSON.stringify({
            recipient,
            post_id,
            user_id
        }),
        headers: {
            'Content-Type': 'application/json'  
        }
    })
    .then(response => {
        if(response.ok) {
            response.json()
            .then(data => document.location.replace(`/chat/${data[0].id}`))
        } else {
            alert(response.statusText);
        }
    });
};

document.querySelector('#new-direct-message').addEventListener('click', newDMHandler);