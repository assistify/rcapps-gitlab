import request = require('request');
import { RequestCallback } from 'request';
import { Settings } from '../settings';

export async function sendWebhook(gitlabEvent: string, data: any, callback?: RequestCallback) {
    request.post({
        headers: { 'Content-Type': 'application/json', 'X-Gitlab-Event': gitlabEvent },
        url: Settings.WEBHOOK_URL,
        body: JSON.stringify(data)
    }, async (error, response, body) => {
        if(callback) {
            callback(error, response, body);
        }
    });
}