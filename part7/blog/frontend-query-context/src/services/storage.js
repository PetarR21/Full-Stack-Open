const KEY = 'loggedBlogAppUser';

const saveUser = (user) => {
  localStorage.setItem(KEY, JSON.stringify(user));
};

const loadUser = () => {
  const userJSON = localStorage.getItem(KEY);
  return JSON.parse(userJSON);
};

const removeUser = () => {
  localStorage.removeItem(KEY);
};

export default { saveUser, loadUser, removeUser };
