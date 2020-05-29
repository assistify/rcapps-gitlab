import request = require('request');
import { Settings } from '../settings';

export class Api {

    public static async login(): Promise<any> {
        const requestBody = { username: 'admin', password: 'supersecret' };

        return new Promise((resolve, reject) => {
            request.post(
                {
                    headers: { 'Content-Type': 'application/json' },
                    url: `${Settings.ROCKETCHAT_URL}/api/v1/login`,
                    body: JSON.stringify(requestBody),
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

    public static async getLastMessage(): Promise<any> {
        let res = await this.login();
        res = JSON.parse(res);

        const message = await this.getLastMessageInChannel(
            res.data.authToken,
            res.data.userId
        );
        return message;
    }

    private static getLastMessageInChannel(authToken, userId): Promise<any> {
        return new Promise((resolve, reject) => {
            request.get(
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Auth-Token': authToken,
                        'X-User-Id': userId,
                    },
                    url:
                        `${Settings.ROCKETCHAT_URL}/api/v1/channels.history?roomName=${Settings.WEBHOOK_CHANNEL}&count=1`,
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


    public static async  deleteUser(authToken, userId) {
        const channelBody = { username: 'test-user' };

        return new Promise((resolve, reject) => {
            request.post(
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Auth-Token': authToken,
                        'X-User-Id': userId,
                    },
                    url: `${Settings.ROCKETCHAT_URL}/api/v1/users.delete`,
                    body: JSON.stringify(channelBody),
                },
                (error, res, body) => {
                    resolve(body);
                }
            );
        });
    }


    public static async createUser(authToken, userId) {
        const channelBody = { email: 'example@example.com', name: 'Example User', password: 'pass@w0rd', username: 'test-user' };

        return new Promise((resolve, reject) => {
            request.post(
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Auth-Token': authToken,
                        'X-User-Id': userId,
                    },
                    url: `${Settings.ROCKETCHAT_URL}/api/v1/users.create`,
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

    public static async createChannel(authToken, userId) {
        const channelBody = { name: Settings.WEBHOOK_CHANNEL };

        return new Promise((resolve, reject) => {
            request.post(
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Auth-Token': authToken,
                        'X-User-Id': userId,
                    },
                    url: `${Settings.ROCKETCHAT_URL}/api/v1/channels.create`,
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

    public static async deleteChannel(authToken, userId) {
        const channelBody = { roomName: Settings.WEBHOOK_CHANNEL };

        return new Promise((resolve, reject) => {
            request.post(
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Auth-Token': authToken,
                        'X-User-Id': userId,
                    },
                    url: `${Settings.ROCKETCHAT_URL}/api/v1/channels.delete`,
                    body: JSON.stringify(channelBody),
                },
                (error, res, body) => {
                    resolve(body);
                }
            );
        });
    }


}