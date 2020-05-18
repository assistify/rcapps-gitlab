import fs = require('fs');
import request = require('request');
import * as messages from '../utils/messages';

export { };

describe('Pipeline 1', () => {
  it('send pipeline hook', async done => {
    request.post({
      headers: { 'Content-Type': 'application/json', 'X-Gitlab-Event': 'Pipeline Hook' },
      url: 'http://localhost:3000/api/apps/public/684202ed-1461-4983-9ea7-fde74b15026c/webhook',
      body: fs.readFileSync('./json/pipelines/pipeline1.json')
    }, async (error, response, body) => {
      console.log(body)
      const msg = await messages.getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });
  })
})

describe('Pipeline 2', () => {
  it('send pipeline hook', async done => {
    request.post({
      headers: { 'Content-Type': 'application/json', 'X-Gitlab-Event': 'Pipeline Hook' },
      url: 'http://localhost:3000/api/apps/public/684202ed-1461-4983-9ea7-fde74b15026c/webhook',
      body: fs.readFileSync('./json/pipelines/pipeline2.json')
    }, async (error, response, body) => {
      console.log(body)
      const msg = await messages.getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });
  })
})


describe('Pipeline Canceled', () => {
  it('send pipeline hook', async done => {
    request.post({
      headers: { 'Content-Type': 'application/json', 'X-Gitlab-Event': 'Pipeline Hook' },
      url: 'http://localhost:3000/api/apps/public/684202ed-1461-4983-9ea7-fde74b15026c/webhook',
      body: fs.readFileSync('./json/pipelines/pipeline-cancel.json')
    }, async (error, response, body) => {
      console.log(body)
      const msg = await messages.getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });
  })
})
