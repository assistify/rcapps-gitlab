import { User } from './user';
import { Project } from './project';

/* tslint:disable */
export class Issue {
    object_kind = 'issue';
    event_type = 'issue';
    user: User;
    project: Project;
    object_attributes: any;
}