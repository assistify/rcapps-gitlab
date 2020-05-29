import { User } from './user';
import { Project } from './project';
import { Build } from './build';

/* tslint:disable */
export class Pipeline {
    object_kind = 'pipeline';
    user: User;
    project: Project;
    object_attributes: any;
    commit: any;
    builds: Build[];
}