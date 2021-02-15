async function commentFormHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('textarea[name="message-body"]').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length-1
    ];

    if(comment_text) {
        const response = await fetch(`/api/messages`, {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                message_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

async function chatButtonHandler(event) {
    event.preventDefault();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length-1
    ];

    document.location.replace('/chats/direct-message/' + post_id );
    
}

document.querySelector('.message-form').addEventListener('submit', commentFormHandler);
document.querySelector('#chat').addEventListener('click', chatButtonHandler);