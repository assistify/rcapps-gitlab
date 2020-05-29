import { PipelineBuilder } from '../builder/pipeline-builder';
import { sendWebhook } from '../utils/send';
import { Api } from '../utils/api';


describe('Test Pipeline Hooks', () => {
  test('pending Pipeline', async done => {
    const data = new PipelineBuilder()
      .status('pending')
      .stage('deploy', 'deploy1', 'created')
      .stage('test', 'test2', 'created')
      .stage('test', 'test1', 'created')
      .stage('build', 'build1', 'pending')
      .build();

    sendWebhook('Pipeline Hook', data, async (error, response, body) => {
      console.log(body)
      const msg = await Api.getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });
  });

  test('running Pipeline', async done => {
    const data = new PipelineBuilder()
      .status('running')
      .stage('deploy', 'deploy1', 'created')
      .stage('test', 'test2', 'created')
      .stage('test', 'test1', 'created')
      .stage('build', 'build1', 'running')
      .build();

    sendWebhook('Pipeline Hook', data, async (error, response, body) => {
      console.log(body)
      const msg = await Api.getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });
  });

  test('success Pipeline', async done => {
    const data = new PipelineBuilder()
      .status('success')
      .stage('deploy', 'deploy1', 'success')
      .stage('test', 'test2', 'success')
      .stage('test', 'test1', 'success')
      .stage('build', 'build1', 'success')
      .build();

    sendWebhook('Pipeline Hook', data, async (error, response, body) => {
      console.log(body)
      const msg = await Api.getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });
  });

  test('canceled Pipeline', async done => {
    const data = new PipelineBuilder()
      .status('canceled')
      .stage('deploy', 'deploy1', 'canceled')
      .stage('test', 'test2', 'canceled')
      .stage('test', 'test1', 'canceled')
      .stage('build', 'build1', 'canceled')
      .build();

    sendWebhook('Pipeline Hook', data, async (error, response, body) => {
      console.log(body)
      const msg = await Api.getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });
  });

  test('failed Pipeline - stage 1', async done => {
    const data = new PipelineBuilder()
      .status('failed')
      .stage('build', 'build1', 'failed')
      .stage('deploy', 'deploy1', 'skipped')
      .stage('test', 'test2', 'skipped')
      .stage('test', 'test1', 'skipped')
      .build();

    sendWebhook('Pipeline Hook', data, async (error, response, body) => {
      console.log(body)
      const msg = await Api.getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });
  });

  test('failed Pipeline - stage 2', async done => {
    const data = new PipelineBuilder()
      .status('failed')
      .stage('test', 'test1', 'failed')
      .stage('deploy', 'deploy1', 'skipped')
      .stage('test', 'test2', 'success')
      .stage('build', 'build1', 'success')
      .build();

    sendWebhook('Pipeline Hook', data, async (error, response, body) => {
      console.log(body)
      const msg = await Api.getLastMessage();
      console.log(msg);
      expect(response.statusCode).toBe(200)
      done()
    });
  });
})