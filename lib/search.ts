import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IMessageAttachment } from '@rocket.chat/apps-engine/definition/messages';
import { ISlashCommandPreviewItem, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { GitLabApp } from '../GitLabApp';
import { getIssuesPreviewItems } from './issue';
import { sendMsgWithAttachment } from './sendMessage';
import { sendNotification } from './sendNotification';

export async function getSearchPreviewItems(app: GitLabApp, context: SlashCommandContext, read: IRead, http: IHttp, persis: IPersistence): Promise<Array<ISlashCommandPreviewItem>> {
    const [, scope] = context.getArguments();
    if (scope !== 'issues') {
        throw new Error('Invalid parameter');
    }
    return await getIssuesPreviewItems(app, context, read, http, persis);
}

export async function executeSearchPreviewItem(item: ISlashCommandPreviewItem, app: GitLabApp, context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
    if (!item.id) {
        throw new Error('Invalid Item id');
    }
    const issue = await app.issue.getIssue(item.id, context, read, http, persis);

    const attachments = [{
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
            value: issue.assignee || 'Not assigned',
            short: false,
        }],
    }];
    await sendMsgWithAttachment('', attachments, read, modify, context.getSender(), context.getRoom());
}
