async function deleteChatHandler(event) {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/chats/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    };
};

const delChatBtns = document.querySelectorAll('.delete-chat-btn');

delChatBtns.forEach(button => {
    button.addEventListener('click', deleteChatHandler)
});