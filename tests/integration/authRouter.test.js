var fetch = require('../fetch');

let random = Math.floor(Math.random() * 100000);     // returns a random integer from 0 to 999999
let username = "testUsername" + random;

let password = "Luchi0%к";
const headers = {
  'authorization': {}
}

describe('signup', () => {
  
  test('create user with proper input', async() => {
    let response = await fetch.signup(username, password);
    expect(response.status).toEqual(200);
  })

  test('create user with existing username', async() => {
    let response = await fetch.signup(username, password);
    expect(response.response.status).toEqual(400);
  })

  test('create user with weak password', async() => {
    let response = await fetch.signup(username, "password");
    expect(response.response.status).toEqual(400);
  })

  test('create user with undefined input', async() => {
    let undefinedUsername;
    let undefinedPassword;
    let response = await fetch.signup(undefinedUsername, undefinedPassword);
    expect(response.response.status).toEqual(500);
  })
});

describe('login', () => {

  test('incorrect username and password', async () => {
      let response = await fetch.login("sydykalyuulu_z@auca.kg", "Zhoma1999");
      expect(response.response.status).toEqual(403);
  });

  test('correct username and password', async () => {
    let response = await fetch.login(username, password);
    headers.authorization = response.data;
    expect(response.status).toEqual(200);
  });

});

describe('check token  (1)', () => {
  test('make sure that token is valid', async() => {

    let response = await fetch.checkToken(headers);
    expect(response.status).toEqual(200);
  })
});

describe('logout', () => {
  test('disable token', async() => {

    let response = await fetch.logout(headers);
    expect(response.status).toEqual(200);
  })
});

describe('check token (2)', () => {
  test('make sure that token is no valid more', async() => {

    let response = await fetch.checkToken(headers);
    expect(response.response.status).toEqual(403);

  })
});