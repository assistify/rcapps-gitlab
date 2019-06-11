import { IHttp, IHttpResponse, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IMessageAttachment } from '@rocket.chat/apps-engine/definition/messages';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import { IUser } from '@rocket.chat/apps-engine/definition/users';

export async function sendMessage(text: string, read: IRead, modify: IModify, user: IUser, room: IRoom): Promise<void> {
    const message =  await modify.getCreator().startMessage();

    if (!room) {
        throw new Error('No Room is available to post Message');
    }
    const usernameAlias = await read.getEnvironmentReader().getSettings().getById('gitlab-username-alias');
    message
        .setSender(user)
        .setUsernameAlias(usernameAlias.value)
        .setRoom(room)
        .setText(text)
        .setGroupable(false);
    modify.getCreator().finish(message);
}

export async function sendMsgWithAttachment(text: string, attachments: Array<IMessageAttachment>,  read: IRead, modify: IModify, sender: IUser, room: IRoom): Promise<void> {
    const message = modify.getCreator().startMessage({
        sender,
        room,
        text,
        groupable: false,
        attachments,
    });
    modify.getCreator().finish(message);
}
