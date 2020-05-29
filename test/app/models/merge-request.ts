import { User } from './user';
import { Project } from './project';

/* tslint:disable */
export class MergeRequest {
    object_kind = 'merge_request';
    event_type = 'merge_request';
    user: User;
    project: Project;
    object_attributes: any;
}