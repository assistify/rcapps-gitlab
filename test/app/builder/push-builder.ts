import { Push } from '../models/push';
import { ProjectBuilder } from './project-builder';
import { Settings } from '../settings';

export class PushBuilder {

    private push: Push;

    constructor() {
        this.push = new Push();
        this.push.user_name = 'Jo Nas';
        this.push.user_username = 'rc';
        this.push.user_avatar = `${Settings.ROCKETCHAT_URL}/avatar/admin`;
        this.push.project = new ProjectBuilder().buildStandard();
        this.push.commits = [{
            message: 'Initial commit',
            url: 'https://gitlab.com/rc/webhooks-test/-/commit/cd93f4f0af615190d33d968277e304eb31a1d6f3',
            author: {
                name: 'Jo Nas'
            }
        }]
    }

    public username(username: string): PushBuilder {
        this.push.user_username = username;
        return this;
    }

    public avatar(avatar: string | null): PushBuilder {
        this.push.user_avatar = avatar;
        return this;
    }

    public build(): Push {
        return this.push;
    }
}