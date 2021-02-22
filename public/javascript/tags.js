[].forEach.call(document.getElementsByClassName('tags-input'), function (el) {
    
    let hiddenInput = document.createElement('input'),
        mainInput = document.createElement('input');
    tags = [];

    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', el.getAttribute('data-name'));

    mainInput.setAttribute('type', 'text');
    mainInput.classList.add('main-input', 'form-control', 'w-100');
    mainInput.addEventListener('input', function () {
        let enteredTags = mainInput.value.split(',');
        if (enteredTags.length > 1) {
            enteredTags.forEach(function (t) {
                let filteredTag = filterTag(t);
                if (filteredTag.length > 0)
                    createTag(filteredTag);
            });
            // clears input field 
            mainInput.value = '';
        }
    });

    // pressing enter adds tag
    mainInput.addEventListener('keyup', function (e) {
        e.preventDefault();
        let keyCode = e.which || e.keyCode;
        let enteredTags = mainInput.value.split();

        if (keyCode === 13 && enteredTags.length > 0) {
            enteredTags.forEach (function (t) {
                let filteredTag = filterTag(t);
                if (filteredTag.length > 0)
                    createTag(filteredTag);
                }
            );
            // clears input field
            mainInput.value = '';
        }
    });

    // pressing backspace deletes last tag
    mainInput.addEventListener('keydown', function (e) {
        let keyCode = e.which || e.keyCode;
        if (keyCode === 13) {
            e.preventDefault()
            return false
        }
        if (keyCode === 8 && mainInput.value.length === 0 && tags.length > 0) {
            removeTag(tags.length - 1);
        }
    });

    el.appendChild(mainInput);
    el.appendChild(hiddenInput);

    //test tag
    // addTag('hello!');

    function addTag(id, text) {
        let tag = {
            text: text,
            element: document.createElement('span'),
        };
        tag.element.classList.add('tag');
        tag.element.setAttribute('data-tag-id', id)
        tag.element.textContent = tag.text;

        let closeBtn = document.createElement('span');
        closeBtn.classList.add('close');
        closeBtn.addEventListener('click', function () {
            removeTag(tags.indexOf(tag));
        });
        tag.element.appendChild(closeBtn);

        tags.push(tag);

        el.insertBefore(tag.element, mainInput);
        refreshTag();
        return tags;
    }

    function removeTag(index) {
        let tag = tags[index];
        tags.splice(index, 1);
        el.removeChild(tag.element);
        refreshTag();
    }

    function refreshTag() {
        let tagsList = [];
        tags.forEach(function (t) {
            tagsList.push(t.text);
        });
        hiddenInput.value = tagsList.join(',');
    }

    function filterTag(tag) {
        //current filter removes all puncutation besides - and _ and leave spaces, trim all white space of edges and replace all remaining white spaces w/ -
        return tag.replace(/[^\w -]/g, '').trim().replace(/\W+/g, '-');
    }

    function createTag(tag) {
        // const tag = document.getElementsByClassName('tag');
        // const arr = Array.from(tag); 
        // const tags = arr.map(item =>item.textContent)
    
        fetch(`/api/tags`, {
            method: 'POST',
            body: JSON.stringify({
                tag_name: tag
            }),
            headers: { 'Content-Type' : 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                response.json()
                .then(data => {                
                    addTag(data[0].id, data[0].tag_name);
                })
            }
        })
    };
});
