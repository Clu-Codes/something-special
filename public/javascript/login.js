const { connect } = require('getstream');
const client = connect(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET)


async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response  = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email, 
                password
            }),
            headers: { 'Content-Type' : 'application/json' }
        });
        if (response.ok) {
            const userToken = client.createUserToken('the-user-id')
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);