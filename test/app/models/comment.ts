import { User } from './user';
import { Project } from './project';

/* tslint:disable */
export class Comment {
    object_kind = 'note';
    event_type = 'note';
    user: User;
    project: Project;
    object_attributes: any;
    merge_request: any | undefined;
    issue: any | undefined;
}