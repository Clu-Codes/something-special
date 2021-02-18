async function refresh() {

        document.location.reload();
   
}

function idleTimer() {
    var time;

    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer;
    window.onclick = resetTimer;
    window.onscroll = resetTimer;
    window.onkeypress = resetTimer;

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(refresh,(1000 * 30));
    }
}

idleTimer();
