const msgForm = document.querySelector('.message-form');
const msgTextareaHeader = document.querySelector('.message-textarea-header');
const msgTextarea = document.querySelector('.message-textarea');
const msgSaveBtn = document.querySelector('.message-save-btn');

async function msgFormHandler(event) {
    event.preventDefault();

    const message = document.querySelector('textarea[name="message-body"]').value.trim();
    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length-1
    ];
    const msgId = msgTextarea.getAttribute('data-message-id');

    if (msgId) {
        console.log('a message ID was passed through')
        const response = await fetch(`/api/messages/${msgId}`, {
            method: 'PUT',
            body: JSON.stringify({
                message
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok) {
            msgTextareaHeader.textContent = 'Add A Message';
            msgTextarea.textContent = '';
            msgTextarea.removeAttribute('data-message-id');
            msgSaveBtn.textContent = 'Add Message';
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    } else if (message) {
        console.log('a message id was not passed through')
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


function editMessage() {

    const msgId = this.getAttribute('data-id');
    const oldText = this.closest('.message-card').querySelector('.message-body').textContent;
  
    msgTextareaHeader.textContent = 'Edit Message';
    msgTextarea.textContent = oldText;
    msgTextarea.setAttribute('data-message-id', msgId);
    msgSaveBtn.textContent = 'Save Changes';
};

async function deleteMessage() {
    const msgId = this.getAttribute('data-id');

    const response = await fetch(`/api/messages/${msgId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    };
};


msgForm.addEventListener('submit', msgFormHandler);

const editMsgBtns = document.querySelectorAll('.edit-msg-btn');
editMsgBtns.forEach(button => {
    button.addEventListener('click', editMessage);
});

const delMsgBtns = document.querySelectorAll('.del-msg-btn');
delMsgBtns.forEach(button => {
    button.addEventListener('click', deleteMessage)
});