import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { AppPersistence } from './persistance';
import { sendNotification } from './sendNotification';

export async function setupAccount(context: SlashCommandContext, read: IRead, modify: IModify, persis: IPersistence): Promise<void> {
    const [, token, tokenValue] = context.getArguments();
    if (!tokenValue || !token) {
        await sendNotification('Usage: `/gitlab setup token: ACCESS_TOKEN`', read, modify, context.getSender(), context.getRoom());
        return;
    }
    const persistence = new AppPersistence(persis, read.getPersistenceReader());

    await persistence.setupAuthToken(tokenValue, context.getSender());

    await sendNotification('Successfully stored your key', read, modify, context.getSender(), context.getRoom());
}
