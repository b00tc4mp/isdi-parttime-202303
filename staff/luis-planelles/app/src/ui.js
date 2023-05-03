//

const toggle = (...containers) => {
  for (let i = 0; i < containers.length; i++)
    containers[i].classList.toggle('off');
};

const context = sessionStorage;

export { toggle, context };
