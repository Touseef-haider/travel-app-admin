const set = (key, value) => {
  localStorage.setItem(key, value);
};

const get = (key) => {
  return localStorage.getItem(key);
};

const clear = () => localStorage.clear();

const del = (key) => {
  localStorage.removeItem(key);
};

export { set, get, clear, del };
