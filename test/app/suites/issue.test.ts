import { IssueBuilder } from '../builder/issue-builder';
import { sendWebhook } from '../utils/send';
import { Api } from '../utils/api';

describe('Test Issue Hooks', () => {
  test('open Issue', async done => {
    const data = new IssueBuilder().action('open').build();

    sendWebhook('Issue Hook', data, async (error, response, body) => {
      console.log(body)
      const msg = await Api.getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });
  });

  test('update Issue', async done => {
    const data = new IssueBuilder().action('update').build();

    sendWebhook('Issue Hook', data, async (error, response, body) => {
      console.log(body)
      const msg = await Api.getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });
  });

  test('close Issue', async done => {
    const data = new IssueBuilder().action('close').build();

    sendWebhook('Issue Hook', data, async (error, response, body) => {
      console.log(body)
      const msg = await Api.getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });
  });
})