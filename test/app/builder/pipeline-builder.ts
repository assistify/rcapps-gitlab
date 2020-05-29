import { UserBuilder } from './user-builder';
import { ProjectBuilder } from './project-builder';
import { Pipeline } from '../models/pipeline';

export class PipelineBuilder {

private pipeline: Pipeline;

    constructor() {
        this.pipeline = new Pipeline();
        this.pipeline.user = new UserBuilder().buildStandard();
        this.pipeline.project = new ProjectBuilder().buildStandard();
        this.pipeline.object_attributes = {
            id: 147846433,
            ref: 'master',
            status: 'pending',
        }
        this.pipeline.commit = {
            title: 'Merge branch \'test\' into \'master\'',
            url: 'https://gitlab.com/rc/webhooks-test/-/commit/04c5936b2b883a9fb05f07614685436bbf9fbed0'
        }
        this.pipeline.builds = [];
    }

    public status(status: string): PipelineBuilder {
        this.pipeline.object_attributes.status = status;
        return this;
    }

    public stage(stage: string, name: string, status: string) : PipelineBuilder {
        this.pipeline.builds.push({ id: 1, stage, status, name});
        return this;
    }

    public build(): Pipeline {
        return this.pipeline;
    }
}