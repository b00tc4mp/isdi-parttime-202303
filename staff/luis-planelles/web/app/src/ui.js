//
const show = (...containers) => {
  for (let i = 0; i < containers.length; i++)
    containers[i].classList.remove('off');
};

const hide = (...containers) => {
  for (let i = 0; i < containers.length; i++)
    containers[i].classList.add('off');
};

const toggle = (...containers) => {
  for (let i = 0; i < containers.length; i++)
    containers[i].classList.toggle('off');
};

const context = {
  userId: null,
};

export { show, hide, toggle, context };
