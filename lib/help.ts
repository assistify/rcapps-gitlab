import { IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import { ISlashCommandPreviewItem, SlashCommandPreviewItemType } from '@rocket.chat/apps-engine/definition/slashcommands';
import { IUser } from '@rocket.chat/apps-engine/definition/users';
import { Commands } from '../commands/GitLabCommands';
import { sendNotification } from './sendNotification';

export function getHelpPreviewItems(): Array<ISlashCommandPreviewItem> {
    return [{
        id: 'setup',
        type: SlashCommandPreviewItemType.TEXT,
        value: 'Setup',
    }, {
        id: 'create',
        type: SlashCommandPreviewItemType.TEXT,
        value: 'Create',
    }, {
        id: 'search',
        type: SlashCommandPreviewItemType.TEXT,
        value: 'Search',
    }];
}

export async function executeHelpPreviewItem(item: ISlashCommandPreviewItem, read: IRead, modify: IModify, sender: IUser, room: IRoom): Promise<void> {
    let msg: string;
    switch (item.id) {
         case 'setup':
             msg = 'Command usage: `/gitlab setup <your_auth_token>`';
             break;
        case 'create':
            msg = 'Command usage: `/gitlab create <repository id/ path> <issue title> <description>`';
            break;
        case 'search':
            msg = 'Command usage: `/gitlab search <projects/issues> <keyword>`';
            break;
        default:
            msg = 'No usage for this command is assigned';
            break;
    }
    await sendNotification(msg, read, modify, sender, room);
}
