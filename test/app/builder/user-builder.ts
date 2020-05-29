import { User } from '../models/user';
import { Settings } from '../settings';

export class UserBuilder {

    private user: User;

    constructor() {
        this.user = {
            name: 'Jo Nas',
            username: 'rc',
            avatar_url: `${Settings.ROCKETCHAT_URL}/avatar/admin`,
            email: 'no.contact@please.de'
        }
    }

    public buildStandard(): User {
        return this.user;
    }
}