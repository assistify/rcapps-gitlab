import { MergeRequestBuilder } from '../builder/merge-request.builder';
import { sendWebhook } from '../utils/send';
import { Api } from '../utils/api';


describe('Test Merge Request Hooks', () => {
    test('open Merge Request', async done => {
        const data = new MergeRequestBuilder().action('open').build();

        sendWebhook('Merge Request Hook', data, async (error, response, body) => {
            console.log(body)
            const msg = await Api.getLastMessage();
            console.log(msg);
            expect(response.statusCode).toBe(200)
            done()
        });
    });

    test('close Merge Request', async done => {
        const data = new MergeRequestBuilder().action('close').build();

        sendWebhook('Merge Request Hook', data, async (error, response, body) => {
            console.log(body)
            const msg = await Api.getLastMessage();
            console.log(msg);
            expect(response.statusCode).toBe(200)
            done()
        });
    });

    test('update Merge Request', async done => {
        const data = new MergeRequestBuilder().action('update').build();

        sendWebhook('Merge Request Hook', data, async (error, response, body) => {
            console.log(body)
            const msg = await Api.getLastMessage();
            console.log(msg);
            expect(response.statusCode).toBe(200)
            done()
        });
    });

    test('merge Merge Request', async done => {
        const data = new MergeRequestBuilder().action('merge').build();

        sendWebhook('Merge Request Hook', data, async (error, response, body) => {
            console.log(body)
            const msg = await Api.getLastMessage();
            console.log(msg);
            expect(response.statusCode).toBe(200)
            done()
        });
    });
})