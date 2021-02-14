const { response } = require("express");

async function editFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[window.location.toString.split('/').length - 1];
    const title = document.querySelector('input[name="title-edit"]').value.trim();
    const description = document.querySelector('.edit-textarea').value;
    const image = document.querySelector('input[name="post-image"]').files[0];

    const response = await fetch(`api/posts/${id}`, {
        method: 'put',
        body: JSON.stringify({
            title, 
            description,
            image
        }),
        headers: { 'Content-Type' : 'application/json' }
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

function previewFile() {
    const preview = document.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener('load', function() {
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    };
};


function titlePreviewHandler(e) {
    e.preventDefault();

    const title = document.getElementById('title-edit').value.trim();
    const preview_title = document.getElementById('preview-title');
    
    preview_title.innerHTML = title;
  
    
}

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

    const category =  document.querySelector('.post-category:checked').value;

    const cat_name = await fetch(`api/category/${category}`, {
        method: 'GET',
        body: JSON.stringify({
            category_name
        }),
        headers: {'Content-Type' : 'application/json'}
    });
    if (cat_name.ok) {
        return cat_name;
    } else {
        alert(cat_name.statusText);
    };

    const preview_category = document.getElementById('preview-category');

    preview_category.innerHTML = category;

    console.log('teeeessssttttt');
}






document.getElementById('title-edit').addEventListener('keyup', titlePreviewHandler);
document.getElementById('desc-edit').addEventListener('keyup', descPreviewHandler);
document.getElementById('post-price').addEventListener('keyup', pricePreviewHandler);
document.querySelector('.post-category').addEventListener('click', categoryPreviewHandler); 
document.querySelector('#edit-post').addEventListener('submit', editFormHandler);