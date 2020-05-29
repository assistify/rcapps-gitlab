import { sendWebhook } from '../utils/send';
import { CommentBuilder } from '../builder/comment-builder';
import { Api } from '../utils/api';

describe('Test Note Hooks', () => {
    test('Issue Comment', async done => {
        const data = new CommentBuilder().issue('Test Issue', 'https://gitlab.com/rc/webhooks-test/-/issues/6#note_345721152').build();

        sendWebhook('Note Hook', data, async (error, response, body) => {
            console.log(body)
            const msg = await Api.getLastMessage();
            console.log(msg);
            expect(response.statusCode).toBe(200)
            done()
        });
    });

    test('Merge Request Comment', async done => {
        const data = new CommentBuilder().issue('Test Merge', 'https://gitlab.com/rc/webhooks-test/-/merge_requests/4').build();

        sendWebhook('Note Hook', data, async (error, response, body) => {
            console.log(body)
            const msg = await Api.getLastMessage();
            console.log(msg);
            expect(response.statusCode).toBe(200)
            done()
        });
    });
})