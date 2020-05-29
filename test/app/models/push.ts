import { User } from './user';
import { Project } from './project';

/* tslint:disable */
export class Push {
    object_kind = 'push';
    event_type = 'push';
    user_name: string;
    user_username: string;
    user_avatar: string | null;
    project: Project;
    commits: any[];
}