import { PushBuilder } from '../builder/push-builder';
import { sendWebhook } from '../utils/send';
import { Api } from '../utils/api';


describe('Test Push Hooks', () => {
  test('push from non-existing user', async done => {
    const data = new PushBuilder().build();

    sendWebhook('Push Hook', data, async (error, response, body) => {
      console.log(body)
      const msg = await Api.getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });
  });

  test('push from non-existing user without avatar', async done => {
    const data = new PushBuilder().avatar(null).build();

    sendWebhook('Push Hook', data, async (error, response, body) => {
      console.log(body)
      const msg = await Api.getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });
  });

  test('push from existing', async done => {
    let res = await Api.login();
    res = JSON.parse(res).data;
    await Api.deleteUser(res.authToken, res.userId);
    await Api.createUser(res.authToken, res.userId);

    const data = new PushBuilder().username('test-user').build();

    sendWebhook('Push Hook', data, async (error, response, body) => {
      console.log(body)
      const msg = await Api.getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });
  });

  test('push from existing user without avatar', async done => {
    let res = await Api.login();
    res = JSON.parse(res).data;
    await Api.deleteUser(res.authToken, res.userId);
    await Api.createUser(res.authToken, res.userId);

    const data = new PushBuilder().username('test-user').avatar(null).build();

    sendWebhook('Push Hook', data, async (error, response, body) => {
      console.log(body)
      const msg = await Api.getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });
  });
})