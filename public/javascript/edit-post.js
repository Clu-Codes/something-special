async function editFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    const title = document.getElementById('title-edit').value.trim();
    const description = document.getElementById('desc-edit').value;
    const image = document.getElementById('create-image').src;
    const price = document.getElementById('post-price').value;
    const category = document.getElementById('edit-post-category').value.split('-')[0];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'put',
        body: JSON.stringify({
            description,
            image,
            price,
            category,
            tag
        }),
        headers: { 'Content-Type' : 'application/json' }
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    };
};

// eventListeners preview window on Edit Post page.
function titlePreviewHandler(e) {
    e.preventDefault();

    const title = document.getElementById('title-edit').value.trim();
    const preview_title = document.getElementById('preview-title');
    
    preview_title.innerHTML = title;  
};

function descPreviewHandler(e) {
    e.preventDefault();

    const description = document.getElementById('desc-edit').value;
    const preview_desc = document.getElementById('preview-desc');

    preview_desc.innerHTML = description;
};

function pricePreviewHandler(e) {
    e.preventDefault();

    const price = document.getElementById('post-price').value;
    const preview_desc = document.getElementById('preview-price');

    preview_desc.innerHTML = `$${price}`;
};

async function categoryPreviewHandler(e) {
    e.preventDefault();

    const category = document.getElementById('edit-post-category').value.split('-')[1];
    const preview_category = document.getElementById('preview-category');

    preview_category.innerHTML = category;
};

document.getElementById('title-edit').addEventListener('keyup', titlePreviewHandler);
document.getElementById('desc-edit').addEventListener('keyup', descPreviewHandler);
document.getElementById('post-price').addEventListener('keyup', pricePreviewHandler);
document.getElementById('edit-post-category').addEventListener('change', categoryPreviewHandler); 
document.querySelector('#edit-post').addEventListener('submit', editFormHandler);