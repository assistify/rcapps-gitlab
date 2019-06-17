import { IModify } from '@rocket.chat/apps-engine/definition/accessors';
import { IMessage } from '@rocket.chat/apps-engine/definition/messages';

export async function sendMessage(message: IMessage, modify: IModify): Promise<void> {
    if (!message.room) {
        throw new Error('No Room is available to post Message');
    }

    if (!message.sender) {
        throw new Error('No Sender is available to post Message');
    }
    const msg =  modify.getCreator().startMessage(message);
    modify.getCreator().finish(msg);
}

export async function sendNotification(message: IMessage, modify: IModify): Promise<void> {
    if (!message.room) {
        throw new Error('No Room is available to post Message');
    }

    if (!message.sender) {
        throw new Error('No Sender is available to post Message');
    }
    modify.getNotifier().notifyUser(message.sender, modify.getCreator().startMessage(message).getMessage());
}
