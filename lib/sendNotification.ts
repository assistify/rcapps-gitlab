import { IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IMessageAttachment } from '@rocket.chat/apps-engine/definition/messages';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import { IUser } from '@rocket.chat/apps-engine/definition/users';

export async function sendNotification(text: string, read: IRead, modify: IModify, sender: IUser, room: IRoom): Promise<void> {
    modify.getNotifier().notifyUser(sender, modify.getCreator().startMessage({
        sender,
        room,
        text,
        groupable: false,
    }).getMessage());
}
