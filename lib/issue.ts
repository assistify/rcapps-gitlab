import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { ISlashCommandPreviewItem, SlashCommandPreviewItemType } from '@rocket.chat/apps-engine/definition/slashcommands';
import { GitLabApp } from '../GitLabApp';
import { sendNotification } from './sendNotification';

export async function getIssuesPreviewItems(app: GitLabApp, context, read: IRead, http: IHttp, persis: IPersistence): Promise<Array<ISlashCommandPreviewItem>> {
    const issues = await app.issue.listIssues(context, read, http, persis);
    if (!issues) {
        throw new Error('No Preview Items found');
    }
    return issues.map((issue) => {
        return {
            id: issue.iid.toString(),
            type: SlashCommandPreviewItemType.TEXT,
            value: `${issue.iid}: ${issue.title}`,
        };
    });
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
