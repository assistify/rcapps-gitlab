import fs = require('fs');
import request = require('request');
import * as messages from '../utils/messages';

export { };

describe('Test Issue', () => {
  it('send issue hook', async done => {
    request.post({
      headers: { 'Content-Type': 'application/json', 'X-Gitlab-Event': 'Issue Hook' },
      url: 'http://localhost:3000/api/apps/public/684202ed-1461-4983-9ea7-fde74b15026c/webhook',
      body: fs.readFileSync('./json/issues/issue.json')
    }, async (error, response, body) => {
      console.log(body)
      const msg = await messages.getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });
  })
})

describe('Test Issue (edit)', () => {
  it('send issue hook with changed desccription', async done => {
    request.post({
      headers: { 'Content-Type': 'application/json', 'X-Gitlab-Event': 'Issue Hook' },
      url: 'http://localhost:3000/api/apps/public/684202ed-1461-4983-9ea7-fde74b15026c/webhook',
      body: fs.readFileSync('./json/issues/issue-edit.json')
    }, async (error, response, body) => {
      console.log(body)
      const msg = await messages.getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });
  })
})