import { Project } from '../models/project';

export class ProjectBuilder {

    private project: Project;

    constructor() {
        this.project = {
            name: 'webhooks-test',
            description: '',
            web_url: 'https://gitlab.com/rc/webhooks-test',
            path_with_namespace: 'rc/webhooks-test'
        }
    }

    public buildStandard(): Project {
        return this.project;
    }
}