async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
<<<<<<< HEAD
       const response = await fetch('/api/users/create-account', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
          document.location.replace('/');
      } else{
          alert(response.statusText)
      }
    }
  }
=======
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
            username,
            email,
            password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log('success');
            document.location.replace('/');
        } else{
            alert(response.statusText)
        };
    };
};
>>>>>>> 48b9cc233e70d462d6340530556db0a5bf870768

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);