const allPosts = [];

async function handleSearch(event) {
    event.preventDefault();

    const searchTerm = document.querySelector('.search-input').value.toLowerCase().trim();
    
    // tokenize search terms
    // const tokens = searchTerm.split(' ').filter(token => token.trim() !== ' ');

    // if (tokens.length) {
    //     // RegEx of all the search terms
    //     const searchTermRegex = new RegExp(tokens.join('|'), 'gim');
    // };

    if (searchTerm) {
        const getPosts = await fetch('/api/posts', {
            method: 'get',
            headers: { 'Content-Type' : 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                response.json()
                .then(data => {
                    data.forEach(post => allPosts.push(post))
                })
            }
        })


        const filteredPosts = allPosts.filter(post => {
            return (
                post.title.toLowerCase().includes(searchTerm) ||
                post.description.toLowerCase().includes(searchTerm)
            )
        })

        console.log(filteredPosts)
    };
};

document.querySelector('#search-form').addEventListener('submit', handleSearch);