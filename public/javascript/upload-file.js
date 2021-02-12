// get elements
const uploader = document.getElementById('uploader');
const fileButton = document.getElementById('fileButton');

// listen for file selection
fileButton.addEventListener('change', function (e) {
    // get file
    const file = e.target.files[0];
    // create storage ref: ex. ('folder_name/file_name)
    const storageRef = firebase.storage().ref('somethingSpecial_pics/' + file.name);
    // upload file
    const task = storageRef.put(file);
    //update progress bar
    task.on('state_changed',

        function progress(snapshot) {
            const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = percentage;
        },
        function error(err) {
            if (err) throw err;
        },
        function complete (){
            firebase.storage().ref('somethingSpecial_pics/' + file.name).getDownloadURL()
                .then((url) => {
                    // delete console.log before production
                    console.log(url)
                    // Or inserted into an <img> element
                    var img = document.getElementById('createImg');
                    img.setAttribute('src', url);
                })
        }
    );
});

// download img to user
// firebase.storage().ref("somethingSpecial_pics/Banner.png").getDownloadURL()
//     .then((url) => {
//         console.log(url)
//         // Or inserted into an <img> element
//         var img = document.getElementById('createImg');
//         img.setAttribute('src', url);
//     })
// `url` is the download URL for 'images/stars.jpg'

// This can be downloaded directly:
//     var xhr = new XMLHttpRequest();
//     xhr.responseType = 'blob';
//     xhr.onload = (event) => {
//       var blob = xhr.response;
//     };
//     xhr.open('GET', url);
//     xhr.send();

//     // Or inserted into an <img> element
//     var img = document.getElementById('myimg');
//     img.setAttribute('src', url);
//   })
//   .catch((error) => {
//     // Handle any errors
//   });

// somethingSpecial_pics/Banner.png