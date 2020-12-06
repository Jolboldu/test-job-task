var fetch = require('../fetch');

//setup variables to test
let random = Math.floor(Math.random() * 100000);     // returns a random integer from 0 to 999999
let username = "testUsername1" + random;

let password = "Luchi0%к";

const headers = {
  'authorization': {}
}

let noteIds = [];

let shareableLink;

//testing
describe('signup', () => {
  test('signup to get a token', async () => {
    let response = await fetch.signup(username, password);
    headers.authorization = response.data;
    expect(response.status).toEqual(200);
  });
});

describe('create notes', () => {
  test('create note with more than 1000 characters length', async() => {
    let tooLongText = 'WmavYRjQDZCN6sWdKTvvw3GCXrTLgzL70SwMkyo1JCx6ruMC1uYubj0'
    +'3cktFAlIZyuGyyREiqzfgwV6dx2hBoAi19pxX8uSbhs0g9d5IMJd5sFVClkb9pXNMxpEmYzur'
    +'ZRLppy6bdRh8WqIX3LyCET9D94MeDZWvvTmIwSY0WfCCoRqqC4O5C8Fkq9SAiK2mK2MbXOV3H'
    +'VhFpu5KtfDuB4kD7glDiWgLzQrSp7jubOCXHByb4ExAPuv0UGq5ybSrYFgRYiaqSP9Y5jrKAd'
    +'WfLPiwxYAO8HJ4w89GCSGAFPWuMVIdRmc95UmlrA8k07wJFGNe6mZgyr6RD2q2JMNOp6tVcz6'
    +'FIRvv0nLAJGDfjCygOgf1VWGf8S8MOolWCg0iTVBcEvKdBM5adBXZsTWZd03KnjSW3JdF22UI1'
    +'e4KZezYpNDb4SlDbQpMaM8vQBU1oC4iHMT2Ix5ZoUE1uWGT3S1Y8R40HRPtDvBytidCPmm60cO'
    +'7QY3ku3soGJF7oHAzEuvmOQzDlXLD1mF9phAmhnhvcLtt69C9I6g5omo0cSFDmwM995zNRjTyii'
    +'27UAPXOBphcuiFFaIev8g3tqoUTN8z9LHuCyJS8CvCDkSwDqb7e7z7YGe2szdtuf2eqY2hFcGbG'
    +'xtt0Qu3jSdwmDuIcUi0sgCcGZcFfdAPoWWQ1tDSZAXuNEnU2pwyQbtWUgUscvAKkNciB3MD6eAI'
    +'JI4S9CDSuR2yLTU5I7yS1Meb90ydvQdKmT29HpoMcU3838ImvwvMdxXXAwMqRRqRmtqrYnLpBRi'
    +'REi0yjHbdt6VT1OkFHoBNV8GPZBefs0l6UGe6hkigYwQURrNwDB2FDDciyujhnqQKuIFnlFgM7f'
    +'jTnGiaFt8IH7NOkh5TFVH2wDhD8neaIuVXiVbbSg4b6ReKl13fA9xix0y2tLU6054EB70ETP6IGM'
    +'9TNLsuy26VEdXYheP9dM6izKfYOc6NStFJkO7IxGdiT0j1TsuQIujWS'

    let response = await fetch.postNote(tooLongText, headers);
    expect(response.response.status).toEqual(400);
  });
  
  test('create note with undefined text', async() => {
    let undefinedText;
    let response = await fetch.postNote(undefinedText, headers);
    expect(response.response.status).toEqual(500);
  });

  test('create several notes', async() => {
    for(let i = 0; i < 10; ++i)
    {
      let response = await fetch.postNote("someText", headers);
      noteIds.push(response.data.id)
      expect(response.status).toEqual(200);
    }
  });
});

test('check created notes', async() => {
  let response = await fetch.getMyNotes(headers);
  expect(response.data.length).toEqual(noteIds.length);
});

describe('update notes', () => {
  test('update note with more than 1000 characters length', async() => {
    let tooLongText = 'WmavYRjQDZCN6sWdKTvvw3GCXrTLgzL70SwMkyo1JCx6ruMC1uYubj0'
    +'3cktFAlIZyuGyyREiqzfgwV6dx2hBoAi19pxX8uSbhs0g9d5IMJd5sFVClkb9pXNMxpEmYzur'
    +'ZRLppy6bdRh8WqIX3LyCET9D94MeDZWvvTmIwSY0WfCCoRqqC4O5C8Fkq9SAiK2mK2MbXOV3H'
    +'VhFpu5KtfDuB4kD7glDiWgLzQrSp7jubOCXHByb4ExAPuv0UGq5ybSrYFgRYiaqSP9Y5jrKAd'
    +'WfLPiwxYAO8HJ4w89GCSGAFPWuMVIdRmc95UmlrA8k07wJFGNe6mZgyr6RD2q2JMNOp6tVcz6'
    +'FIRvv0nLAJGDfjCygOgf1VWGf8S8MOolWCg0iTVBcEvKdBM5adBXZsTWZd03KnjSW3JdF22UI1'
    +'e4KZezYpNDb4SlDbQpMaM8vQBU1oC4iHMT2Ix5ZoUE1uWGT3S1Y8R40HRPtDvBytidCPmm60cO'
    +'7QY3ku3soGJF7oHAzEuvmOQzDlXLD1mF9phAmhnhvcLtt69C9I6g5omo0cSFDmwM995zNRjTyii'
    +'27UAPXOBphcuiFFaIev8g3tqoUTN8z9LHuCyJS8CvCDkSwDqb7e7z7YGe2szdtuf2eqY2hFcGbG'
    +'xtt0Qu3jSdwmDuIcUi0sgCcGZcFfdAPoWWQ1tDSZAXuNEnU2pwyQbtWUgUscvAKkNciB3MD6eAI'
    +'JI4S9CDSuR2yLTU5I7yS1Meb90ydvQdKmT29HpoMcU3838ImvwvMdxXXAwMqRRqRmtqrYnLpBRi'
    +'REi0yjHbdt6VT1OkFHoBNV8GPZBefs0l6UGe6hkigYwQURrNwDB2FDDciyujhnqQKuIFnlFgM7f'
    +'jTnGiaFt8IH7NOkh5TFVH2wDhD8neaIuVXiVbbSg4b6ReKl13fA9xix0y2tLU6054EB70ETP6IGM'
    +'9TNLsuy26VEdXYheP9dM6izKfYOc6NStFJkO7IxGdiT0j1TsuQIujWS';

    let response = await fetch.updateNote(tooLongText, noteIds[0], headers);
    expect(response.response.status).toEqual(400);
  });
  
  test('update several notes', async() => {
    for(let i = 0; i < 10; ++i)
    {
      let response = await fetch.updateNote("another text", noteIds[i], headers);
      expect(response.status).toEqual(200);
    }
  });

});

test('check updated notes', async() => {
  let response = await fetch.getMyNotes(headers);
  for(let i = 0; i < response.data.length; ++i)
  {
    expect(response.data[i].text).toEqual("another text");
  }
});

describe('remove notes', () => {
  test('remove almost every created note', async() => {
    //remove every note except last one
    for(let i = 0; i < 9; ++i)
    {
      let response = await fetch.deleteNote(noteIds[i], headers);
      expect(response.status).toEqual(200);
    }
  });
});

test('check removed notes', async() => {
  let response = await fetch.getMyNotes(headers);
  expect(response.data.length).toEqual(1);
});

test('get shareable link to note', async() => {
  let response = await fetch.getShareableLink(noteIds[9], headers);
  shareableLink = response.data;
  expect(response.status).toEqual(200);
});

describe('logout', () => {
  test('disable token', async() => {

    let response = await fetch.logout(headers);
    expect(response.status).toEqual(200);
  })
});

describe('check token', () => {
  test('make sure that token is no valid more', async() => {
    let response = await fetch.checkToken(headers);
    expect(response.response.status).toEqual(403);
  })
});

test('get note via shareable link', async() => {
  let response = await fetch.getByLink(shareableLink, headers);
  expect(response.status === 200 && response.data.id == noteIds[9]).toBeTruthy();
});
