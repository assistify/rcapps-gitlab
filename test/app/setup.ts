import request = require('request');
import { Settings } from './settings';
import { Api } from './utils/api';

export default async function () {
    let res  = await Api.login();
    console.log(res)
    res = JSON.parse(res).data;
    await Api.deleteChannel(res.authToken, res.userId);
    await Api.createChannel(res.authToken, res.userId);
};