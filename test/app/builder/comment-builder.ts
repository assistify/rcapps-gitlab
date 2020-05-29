import { Comment } from '../models/comment';
import { UserBuilder } from './user-builder';
import { ProjectBuilder } from './project-builder';

export class CommentBuilder {

private comment: Comment;

    constructor() {
        this.comment = new Comment();
        this.comment.user = new UserBuilder().buildStandard();
        this.comment.project = new ProjectBuilder().buildStandard();
        this.comment.object_attributes = {
            description: 'This is the description (edit)',
            note: 'Test',
            url: 'https://gitlab.com/rc/webhooks-test/-/issues/6#note_345721152',
        }
    }

    public issue(title: string, url: string): CommentBuilder {
        this.comment.issue = {
            title,
            url
        };
        return this;
    }

    public merge_request(title: string, url: string): CommentBuilder {
        this.comment.merge_request = {
            title,
            url
        };
        return this;
    }

    public build(): Comment {
        return this.comment;
    }
}