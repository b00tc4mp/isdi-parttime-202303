function show(...containers) {
    for (var i = 0; i < containers.length; i++)
        containers[i].classList.remove('off')
}

function hide(...containers) {
    for (var i = 0; i < containers.length; i++)
        containers[i].classList.add('off')
}

function toggle(...containers) {
    for (var i = 0; i < containers.length; i++)
        containers[i].classList.toggle('off')
}