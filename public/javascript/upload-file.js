// get elements
var uploader = document.getElementById('uploader');
var  fileButton = document.getElementById('fileButton');

// listen for file selection
fileButton.addEventListener('change', function(e){
    // get file
    var file = e.target.files[0];
    // create storage ref
    var storageRef = firebase.storage().ref('special_pics/' + file.name);
    // upload file
    var task = storageRef.put(file);
    //update progress bar
    task.on('state_changed',
        function progress(snapshot) {
            var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            uploader.value = percentage;
        },
        function error(err) {

        },
        function complete() {

        }
    );
});
