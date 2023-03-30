function show(...containers){
    for (container of containers)
    container.classList.remove('off')
}

function hide(...containers){
    for  (container of containers)
    container.classList.add('off')
}
function toggle(...containers){
    for (container of containers)
    container.classList.toggle('off')
}