import { MergeRequest } from '../models/merge-request';
import { UserBuilder } from './user-builder';
import { ProjectBuilder } from './project-builder';

export class MergeRequestBuilder {

    private mergeRequest: MergeRequest;

    constructor() {
        this.mergeRequest = new MergeRequest();
        this.mergeRequest.user = new UserBuilder().buildStandard();
        this.mergeRequest.project = new ProjectBuilder().buildStandard();
        this.mergeRequest.object_attributes = {
            description: '',
            source_branch: 'test',
            target_branch: 'master',
            title: 'Test',
            url: 'https://gitlab.com/rc/webhooks-test/-/merge_requests/4',
        }
    }

    public action(action: string): MergeRequestBuilder {
        this.mergeRequest.object_attributes.action = action;
        return this;
    }

    public build(): MergeRequest {
        return this.mergeRequest;
    }
}