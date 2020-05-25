import fs = require('fs');
import request = require('request');
import * as messages from '../utils/messages';

export { };

describe('Test New Issue', () => {
  it('send new issue hook', async done => {
    request.post({
      headers: { 'Content-Type': 'application/json', 'X-Gitlab-Event': 'Issue Hook' },
      url: 'http://localhost:3000/api/apps/public/684202ed-1461-4983-9ea7-fde74b15026c/webhook',
      body: fs.readFileSync('./test/app/json/issues/issue-new.json')
    }, async (error, response, body) => {
      console.log(body)
      const msg = await messages.getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });
  })
})

describe('Test Comment Issue', () => {
  it('send comment issue hook', async done => {
    request.post({
      headers: { 'Content-Type': 'application/json', 'X-Gitlab-Event': 'Note Hook' },
      url: 'http://localhost:3000/api/apps/public/684202ed-1461-4983-9ea7-fde74b15026c/webhook',
      body: fs.readFileSync('./test/app/json/issues/issue-comment.json')
    }, async (error, response, body) => {
      console.log(body)
      const msg = await messages.getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });
  })
})


describe('Test Edit Issue', () => {
  it('send edit issue hook', async done => {
    request.post({
      headers: { 'Content-Type': 'application/json', 'X-Gitlab-Event': 'Issue Hook' },
      url: 'http://localhost:3000/api/apps/public/684202ed-1461-4983-9ea7-fde74b15026c/webhook',
      body: fs.readFileSync('./test/app/json/issues/issue-edit.json')
    }, async (error, response, body) => {
      console.log(body)
      const msg = await messages.getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });
  })
})

describe('Test Close Issue', () => {
  it('send close issue hook', async done => {
    request.post({
      headers: { 'Content-Type': 'application/json', 'X-Gitlab-Event': 'Issue Hook' },
      url: 'http://localhost:3000/api/apps/public/684202ed-1461-4983-9ea7-fde74b15026c/webhook',
      body: fs.readFileSync('./test/app/json/issues/issue-close.json')
    }, async (error, response, body) => {
      console.log(body)
      const msg = await messages.getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });
  })
})
