async function newDMHandler(event) {
    event.preventDefault();

    const chat_id = document.querySelector('#chat-id').getAttribute('data-chat-id');
    const chat_text = document.querySelector('#chat-text').value;
    
    const response = await fetch(`/api/texts`, {
        method: 'POST',
        body: JSON.stringify({
            chat_id,
            chat_text
        }),
        headers: {
            'Content-Type': 'application/json'  
        }
    });

    if(response.ok) { 
        document.location.replace('/chat/' + chat_id);
    } else {
        alert(response.statusText);
    }
}

// setInterval(function(){document.location.reload()},(1000 * 60) * 5);


document.querySelector('#new-direct-message').addEventListener('click', newDMHandler);