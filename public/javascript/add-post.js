async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const description = document.querySelector('#post-text').value;
    const price = document.querySelector('#post-price').value;
    const image = document.querySelector('#create-image').src;
    const category_id = document.getElementById('edit-post-category').value;
    const tag = document.getElementsByClassName('tag');
    const arr =Array.from(tag); 

    const tags = arr.map(item =>item.textContent)

    console.log(tags);
    
    // fetch tag find or create
    

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            price,
            description,
            category_id,
            image,
            tag:tags
        }),
        headers: {
            'Content-Type': 'application/json'  
        }
    });

    if(response.ok) {  
        // currently refreshes dash before I can note the console.logs   
        // document.location.replace('/dashboard');     
    } else {
        alert(response.statusText);
    }
};

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);

// get it into the database
// strigify the tags data as a string and then parce the data when retrieving from the database
// check the api call to see what is coming out of the database
// might have to add places to recieve newly created tag
// once tags are added
// veriy that I am getting what I think I am getting