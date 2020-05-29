import { Issue } from '../models/issue';
import { UserBuilder } from './user-builder';
import { ProjectBuilder } from './project-builder';

export class IssueBuilder {

private issue: Issue;

    constructor() {
        this.issue = new Issue();
        this.issue.user = new UserBuilder().buildStandard();
        this.issue.project = new ProjectBuilder().buildStandard();
        this.issue.object_attributes = {
            description: 'This is the description (edit)',
            title: 'Test Issue',
            url: 'https://gitlab.com/rc/webhooks-test/-/issues/6',
        }
    }

    public action(action: string): IssueBuilder {
        this.issue.object_attributes.action = action;
        return this;
    }

    public build(): Issue {
        return this.issue;
    }
}