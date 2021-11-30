import axios from 'axios';

// instantiate axios client
const httpClient = axios.create();
const username = 'user';
const domain =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : '';

httpClient.getUser = function () {
  const user = localStorage.getItem(username);
  return null ? !user : user;
};

httpClient.setUser = function (user) {
  localStorage.setItem(username, user);
  return user;
};

httpClient.logIn = function (firstName, lastName) {
  return this({
    method: 'post',
    url: domain + '/api/login',
    data: { firstName, lastName },
  }).then((_) => {
    const user = { firstName, lastName };
    this.setUser(user);
    return user;
  }).catch((_) => false);
};

httpClient.logOut = function () {
  localStorage.removeItem(username);
  return true;
};

export default httpClient;
