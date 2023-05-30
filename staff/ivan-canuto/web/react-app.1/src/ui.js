export const addOffClass = (...containers)=>{
  for(let i = 0; i < containers.length; i++) containers[i].classList.add('off');
}

export const removeOffClass = (...containers)=>{
  for(let i = 0; i < containers.length; i++) containers[i].classList.remove('off');
}

export const toggleClass = (...containers)=>{
  for(let i = 0; i < containers.length; i++) containers[i].classList.toggle('off');
}

export const context = sessionStorage

