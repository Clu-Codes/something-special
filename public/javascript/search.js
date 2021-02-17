function handleSearch(event) {
    event.preventDefault();

    const searchTerm = document.querySelector('.search-input').value.toLowerCase().trim();
    
    if (searchTerm) {
        window.location = `/search/${searchTerm}`
    };
};

document.querySelector('#search-form').addEventListener('submit', handleSearch);