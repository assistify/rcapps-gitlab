import { IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import { SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { AppPersistence } from './persistance';
import { sendNotification } from './send';

export async function setupAccount(context: SlashCommandContext, read: IRead, modify: IModify, persis: IPersistence): Promise<void> {
    const [, token, tokenValue] = context.getArguments();
    let message: IMessage;
    if (!tokenValue || !token) {
        message =  {
            sender: context.getSender(),
            room: context.getRoom(),
            text: `/gitlab setup token ACCESS_TOKEN`,
        };
        await sendNotification(message, modify);
        return;
    }
    const persistence = new AppPersistence(persis, read.getPersistenceReader());

    await persistence.setupAuthToken(tokenValue, context.getSender());

    message  =  {
        sender: context.getSender(),
        room: context.getRoom(),
        text: 'Successfully stored your key',
    };
    await sendNotification(message, modify);
}
