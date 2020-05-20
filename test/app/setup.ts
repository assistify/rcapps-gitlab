import request = require('request');
import * as auth from './utils/auth';

export default async function () {
    let res  = await auth.login();
    console.log(res)
    res = JSON.parse(res);
    await deleteChannel(res.data.authToken, res.data.userId);
    await createChannel(res.data.authToken, res.data.userId);
};

async function createChannel(authToken, userId) {
    const channelBody = { name: 'jonmi-webhooks-test' };

    return new Promise((resolve, reject) => {
        request.post(
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': authToken,
                    'X-User-Id': userId,
                },
                url: 'http://localhost:3000/api/v1/channels.create',
                body: JSON.stringify(channelBody),
            },
            (error, res, body) => {
                if (!error && res.statusCode === 200) {
                    resolve(body);
                } else {
                    reject(error);
                }
            }
        );
    });
}

async function deleteChannel(authToken, userId) {
    const channelBody = { roomName: 'jonmi-webhooks-test' };

    return new Promise((resolve, reject) => {
        request.post(
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': authToken,
                    'X-User-Id': userId,
                },
                url: 'http://localhost:3000/api/v1/channels.delete',
                body: JSON.stringify(channelBody),
            },
            (error, res, body) => {
                    resolve(body);
            }
        );
    });
}