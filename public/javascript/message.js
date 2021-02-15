async function commentFormHandler(event) {
    event.preventDefault();

    const message = document.querySelector('textarea[name="message-body"]').value.trim();
    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length-1
    ];

    if(message) {
        const response = await fetch(`/api/messages`, {
            method: 'POST',
            body: JSON.stringify({
                postId,
                message
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

document.querySelector('.message-form').addEventListener('submit', commentFormHandler);