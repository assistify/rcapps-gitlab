import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { GitLabApp } from '../GitLabApp';
import { sendNotification, sendNotificationWithAttachments } from './sendNotification';

export async function searchIssues(app: GitLabApp, context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
    const [, , query, scope] = context.getArguments();
    if (!query) {
        throw new Error('Invalid search query');
    }
    const issues = await app.issue.searchIssues(query, scope, context, read, http, persis);
    if (!issues) {
        throw new Error('No issues found');
    }
    await Promise.all(issues.map(async (issue) => {
        const attachments = {
            text: issue.description,
            title: {
                value: issue.title,
                link: issue.web_url,
            },
            fields: [{
                title: 'Status',
                value: issue.state,
                short: false,
            }, {
                title: 'Assignee',
                value: issue.assignee ? issue.assignee.name : 'Not assigned',
                short: false,
            }],
        };
        await sendNotificationWithAttachments('', [attachments], read, modify, context.getSender(), context.getRoom());
    }));

}

export async function createIssue(app: GitLabApp, context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
    const [, project, title, description, label] = context.getArguments();
    if (!project) {
        const text = 'Invalid Project name';
        await sendNotification(text, read, modify, context.getSender(), context.getRoom());
    }

    if (!title) {
        const text = 'Issue title cannot be empty';
        await sendNotification(text, read, modify, context.getSender(), context.getRoom());
    }

    const issue = {
        title,
        description,
        label,
    };

    const response = await app.issue.createIssue(project, issue, context, read, http, persis);

}
