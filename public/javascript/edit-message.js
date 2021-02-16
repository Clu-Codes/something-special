function editMessage() {

    const id = this.getAttribute('data-id');
    const messageBodyEl = this.closest('.message-card').querySelector('.message-body')
    const oldText = messageBodyEl.textContent;

    console.log(messageBodyEl)
    console.log(oldText)
};

async function deleteMessage() {
    const id = this.getAttribute('data-id');

    const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    };
};

const editMsgBtns = document.querySelectorAll('.edit-msg-btn');
editMsgBtns.forEach(button => {
    button.addEventListener('click', editMessage);
});

const delMsgBtns = document.querySelectorAll('.del-msg-btn');
delMsgBtns.forEach(button => {
    button.addEventListener('click', deleteMessage)
});