import request = require('request');

export async function login(): Promise<any> {
    const requestBody = { username: 'admin', password: 'supersecret' };

    return new Promise((resolve, reject) => {
        request.post(
            {
                headers: { 'Content-Type': 'application/json' },
                url: 'http://localhost:3000/api/v1/login',
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
