import fs = require('fs');
import request = require('request');
import * as messages from '../utils/messages';

export { };

describe('Test Merge Request', () => {
    it('send mr hook', async done => {
        request.post({
            headers: { 'Content-Type': 'application/json', 'X-Gitlab-Event': 'Merge Request Hook' },
            url: 'http://localhost:3000/api/apps/public/684202ed-1461-4983-9ea7-fde74b15026c/webhook',
            body: fs.readFileSync('./json/merge-requests/merge-open.json')
        }, async (error, response, body) => {
            console.log(body)
            const msg = await messages.getLastMessage();
            console.log(msg);
            expect(response.statusCode).toBe(200)
            done()
        });
    })
})

describe('Test Merge Request 2', () => {
    it('send mr hook', async done => {
        request.post({
            headers: { 'Content-Type': 'application/json', 'X-Gitlab-Event': 'Merge Request Hook' },
            url: 'http://localhost:3000/api/apps/public/684202ed-1461-4983-9ea7-fde74b15026c/webhook',
            body: fs.readFileSync('./json/merge-requests/merge-close.json')
        }, async (error, response, body) => {
            console.log(body)
            const msg = await messages.getLastMessage();
            console.log(msg);
            expect(response.statusCode).toBe(200)
            done()
        });
    })
})

describe('Test Merge Request 2', () => {
    it('send mr hook', async done => {
        request.post({
            headers: { 'Content-Type': 'application/json', 'X-Gitlab-Event': 'Merge Request Hook' },
            url: 'http://localhost:3000/api/apps/public/684202ed-1461-4983-9ea7-fde74b15026c/webhook',
            body: fs.readFileSync('./json/merge-requests/merge-merge.json')
        }, async (error, response, body) => {
            console.log(body)
            const msg = await messages.getLastMessage();
            console.log(msg);
            expect(response.statusCode).toBe(200)
            done()
        });
    })
})