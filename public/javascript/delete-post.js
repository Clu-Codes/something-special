async function deletePostHandler(event) {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    };
};

const delBtns = document.querySelectorAll('.delete-post-btn');

delBtns.forEach(button => {
    button.addEventListener('click', deletePostHandler)
})