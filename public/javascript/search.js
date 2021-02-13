function handleSearch(event) {
    event.preventDefault();

    const searchTerm = document.querySelector('.search-input').value.toLowerCase().trim();
    
    if (searchTerm) {
        const getPosts = fetch('/api/posts', {
            method: 'get',
            headers: { 'Content-Type' : 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                response.json()
                .then(data => {                
                    const filteredPosts = data.filter(post => {
                        return (
                            post.title.toLowerCase().includes(searchTerm) ||
                            post.description.toLowerCase().includes(searchTerm)
                        )
                    })
            
                    renderResults(filteredPosts)
                });
            };
        });
    };
};

function renderResults(searchResults) {
    const allPostsEl = document.querySelector('.all-posts');
    const searchResultsEl = document.querySelector('.search-results');
    const searchRowEl = document.querySelector('.search-row');

    allPostsEl.classList.add('hide');
    searchResultsEl.classList.remove('hide');

    searchResults.forEach(post => {
        searchRowEl.innerHTML = '';

        const colEl = document.createElement('div');
        colEl.classList.add('col');
        searchRowEl.appendChild(colEl);

        const anchorEl = document.createElement('a');
        anchorEl.classList.add('card-link');
        anchorEl.setAttribute('href', `/post/${post.id}`);
        colEl.appendChild(anchorEl);

        const cardEl = document.createElement('div');
        cardEl.classList.add('card', 'rounded', 'mt-2', 'mb-3', 'bg-light');
        anchorEl.appendChild(cardEl);

        const imgEl = document.createElement('img');
        imgEl.classList.add('rounded-top');
        imgEl.setAttribute('src', `${post.image_url}`);
        cardEl.appendChild(imgEl);

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'rounded', 'bg-light');
        cardEl.appendChild(cardBody);

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = `$${post.price}`;
        cardBody.appendChild(cardTitle);

        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = `${post.title} in ${post.category.category_name}`;
        cardBody.appendChild(cardText);

        const cardFooter = document.createElement('div');
        cardFooter.classList.add('card-footer', 'bg-light');
        cardBody.append(cardFooter);

        const footerText = document.createElement('small');
        footerText.classList.add('text-muted');
        footerText.textContent = `Posted by ${post.user.username}`;
        cardFooter.appendChild(footerText);
    });
};

document.querySelector('#search-form').addEventListener('submit', handleSearch);