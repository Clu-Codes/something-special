// const firebase = require("firebase/app");


// get elements
const uploader = document.getElementById('uploader');
const  fileButton = document.getElementById('fileButton');

// listen for file selection
fileButton.addEventListener('change', function(e){
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
        function complete() {

        }
    );
});
