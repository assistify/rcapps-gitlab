import { IHttp, IHttpResponse, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import { IUser } from '@rocket.chat/apps-engine/definition/users';

export async function sendMessage(text: string, read: IRead, modify: IModify, user: IUser, room: IRoom): Promise<void> {
    const message =  await modify.getCreator().startMessage();

    if (!room) {
        throw new Error('No Room is available to post Message');
    }
    message
        .setSender(user)
        .setRoom(room)
        .setText(text)
        .setGroupable(false);
    modify.getNotifier().notifyRoom(room, message.getMessage());
}
