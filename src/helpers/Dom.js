export const getParent = (elem, selector) => {
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (
      ( elem.classList !== undefined && elem.classList.contains(selector) ) ||
      elem.getAttribute("id") === selector ||
      elem.tagName.toLowerCase() === selector.toLowerCase()
    )
      return elem;
  }
  return null;
};




export const setToken = () => {
      let random = () => {
          return Math.random().toString(36).substr(2);
      }
      return random() + random();
}

