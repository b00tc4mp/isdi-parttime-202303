export function show(...containers) {
  for (let i = 0; i < containers.length; i++) {
    containers[i].classList.remove("off");
  }
}

export function hidden(...containers) {
  for (let i = 0; i < containers.length; i++) {
    containers[i].classList.add("off");
  }
}

export function toggle(...containers) {
  for (let i = 0; i < containers.length; i++) {
    containers[i].classList.toggle("off");
  }
}
