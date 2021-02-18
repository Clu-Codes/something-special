async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const description = document.querySelector('#post-text').value;
    const price = document.querySelector('#post-price').value;
    const image = document.querySelector('#create-image').src;
    const category_id = document.getElementById('edit-post-category').value;
    
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            price,
            description,
            category_id,
            image
        }),
        headers: {
            'Content-Type': 'application/json'  
        }
    });

    if(response.ok) {     
        document.location.replace('/');     
    } else {
        console.log(response.statusText);
        alert(response.statusText);
    }
};

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);

