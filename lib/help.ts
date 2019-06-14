import { IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { sendNotification } from './sendNotification';

export function help(context: SlashCommandContext, read: IRead, modify: IModify): void {
    const msg = `The commands I can understand:
                 \`/gitlab setup token <your_auth_token>\`
                 \`/gitlab create issue <repository id | path> <issue title> <description>\`
                 \`/gitlab search issues <keyword> (optional: [created-by-me | assigned-to-me | all])\``;

    sendNotification(msg, read, modify, context.getSender(), context.getRoom());
}
