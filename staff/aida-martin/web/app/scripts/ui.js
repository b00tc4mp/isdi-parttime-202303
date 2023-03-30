function show(...containers) {
  for (let i = 0; i < containers.length; i++) {
    containers[i].classList.remove("off");
  }
}

function hidden(...containers) {
  for (let i = 0; i < containers.length; i++) {
    containers[i].classList.add("off");
  }
}
