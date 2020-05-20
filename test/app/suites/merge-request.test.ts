import fs = require('fs');
import request = require('request');
import * as messages from '../utils/messages';

export { };

describe('Merge Request 1 - open', () => {
    it('send mr hook', async done => {
        request.post({
            headers: { 'Content-Type': 'application/json', 'X-Gitlab-Event': 'Merge Request Hook' },
            url: 'http://localhost:3000/api/apps/public/684202ed-1461-4983-9ea7-fde74b15026c/webhook',
            body: fs.readFileSync('./json/merge-requests/merge-1-open.json')
        }, async (error, response, body) => {
            console.log(body)
            const msg = await messages.getLastMessage();
            console.log(msg);
            expect(response.statusCode).toBe(200)
            done()
        });
    })
})

describe('Merge Request 1 - comment', () => {
    it('send mr hook', async done => {
        request.post({
            headers: { 'Content-Type': 'application/json', 'X-Gitlab-Event': 'Note Hook' },
            url: 'http://localhost:3000/api/apps/public/684202ed-1461-4983-9ea7-fde74b15026c/webhook',
            body: fs.readFileSync('./json/merge-requests/merge-1-comment.json')
        }, async (error, response, body) => {
            console.log(body)
            const msg = await messages.getLastMessage();
            console.log(msg);
            expect(response.statusCode).toBe(200)
            done()
        });
    })
})

describe('Merge Request 1 - close', () => {
    it('send mr hook', async done => {
        request.post({
            headers: { 'Content-Type': 'application/json', 'X-Gitlab-Event': 'Merge Request Hook' },
            url: 'http://localhost:3000/api/apps/public/684202ed-1461-4983-9ea7-fde74b15026c/webhook',
            body: fs.readFileSync('./json/merge-requests/merge-1-close.json')
        }, async (error, response, body) => {
            console.log(body)
            const msg = await messages.getLastMessage();
            console.log(msg);
            expect(response.statusCode).toBe(200)
            done()
        });
    })
})



describe('Merge Request 2 - open', () => {
    it('send mr hook', async done => {
        request.post({
            headers: { 'Content-Type': 'application/json', 'X-Gitlab-Event': 'Merge Request Hook' },
            url: 'http://localhost:3000/api/apps/public/684202ed-1461-4983-9ea7-fde74b15026c/webhook',
            body: fs.readFileSync('./json/merge-requests/merge-2-open.json')
        }, async (error, response, body) => {
            console.log(body)
            const msg = await messages.getLastMessage();
            console.log(msg);
            expect(response.statusCode).toBe(200)
            done()
        });
    })
})


describe('Merge Request 2 - push', () => {
    it('send mr hook', async done => {
        request.post({
            headers: { 'Content-Type': 'application/json', 'X-Gitlab-Event': 'Merge Request Hook' },
            url: 'http://localhost:3000/api/apps/public/684202ed-1461-4983-9ea7-fde74b15026c/webhook',
            body: fs.readFileSync('./json/merge-requests/merge-2-push.json')
        }, async (error, response, body) => {
            console.log(body)
            const msg = await messages.getLastMessage();
            console.log(msg);
            expect(response.statusCode).toBe(200)
            done()
        });
    })
})

describe('Merge Request 2 - merge', () => {
    it('send mr hook', async done => {
        request.post({
            headers: { 'Content-Type': 'application/json', 'X-Gitlab-Event': 'Merge Request Hook' },
            url: 'http://localhost:3000/api/apps/public/684202ed-1461-4983-9ea7-fde74b15026c/webhook',
            body: fs.readFileSync('./json/merge-requests/merge-2-merge.json')
        }, async (error, response, body) => {
            console.log(body)
            const msg = await messages.getLastMessage();
            console.log(msg);
            expect(response.statusCode).toBe(200)
            done()
        });
    })
})