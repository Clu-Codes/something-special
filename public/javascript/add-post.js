async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const description = document.querySelector('#post-text').value;
    const price = document.querySelector('#post-price').value;
    const image = document.querySelector('#create-image').src;
    const category_id = document.getElementById('post-category').value;
    //
    const tags = document.getElementsByClassName('tags-input').value;
    
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            price,
            description,
            category_id,
            image,
            //
            tags
        }),
        headers: {
            'Content-Type': 'application/json'  
        }
    });

    if(response.ok) {     
        document.location.replace('/dashboard');     
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);

