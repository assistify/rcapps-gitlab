import { IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import { SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { sendNotification } from './send';

export function help(context: SlashCommandContext, read: IRead, modify: IModify): void {
    const text = `The commands I can understand:
                 \`/gitlab setup token <your_auth_token>\`
                 \`/gitlab create issue <repository id | path> <issue title> <description>\`
                 \`/gitlab search issues <keyword> (optional: [created-by-me | assigned-to-me | all])\``;

    const message: IMessage = {
        room: context.getRoom(),
        sender: context.getSender(),
        text,
    };

    sendNotification(message, modify);
}
