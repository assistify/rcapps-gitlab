import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ApiEndpoint, IApiEndpointInfo, IApiRequest, IApiResponse } from '@rocket.chat/apps-engine/definition/api';
import { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import { IUser } from '@rocket.chat/apps-engine/definition/users';
import { sendMessage } from '../lib/send';
import { createIssueMessage } from '../lib/webhooks/issue-webhook';
import { createPipelineMessage } from '../lib/webhooks/pipeline-webhook';
import { createPushMessage } from '../lib/webhooks/push-webhook';
import { createCommentMessage } from '../lib/webhooks/comment-webhook';
import { createMergeRequestMessage } from '../lib/webhooks/merge-request-webhook';

async function getRoomFromRequest(request: IApiRequest, read: IRead) {
    const roomName = request.content.project.path_with_namespace.replace(/\//g, '-').toLowerCase();
    const room = await read.getRoomReader().getByName(roomName);
    if (!room) {
        throw new Error(`Room ${roomName} not found`);
    }
    return room;
}

async function canSenderAccessRoom(sender: IUser, room: IRoom, read: IRead): Promise<boolean> {
    const members = await read.getRoomReader().getMembers(room.id);
    if (room.type !== 'c') {
        return members.some((member) => member.id === sender.id);
    }
    return true;
}

async function getUser(request: IApiRequest, read: IRead) {
    let username = '';
    if (request.content.user) {
        username = request.content.user.username;
    }

    if (request.content.user_username) {
        username = request.content.user_username;
    }

    return await read.getUserReader().getByUsername(username) || await read.getUserReader().getByUsername('rocket.cat');
}

function getUserAlias(request: IApiRequest) {
    let alias = '';

    if (request.content.user) {
        alias = request.content.user.name;
    }

    if (request.content.user_name) {
        alias = request.content.user_name;
    }

    return alias;
}

function getUserAvatar(request: IApiRequest) {
    let avatar = '/avatar/rocket.cat';

    if (request.content.user) {
        avatar = request.content.user.avatar_url;
    }

    if (request.content.user_avatar) {
        avatar = request.content.user_avatar;
    }

    return avatar;
}

function getEventType(request: IApiRequest) {
    return request.content.event_name || request.content.event_type || request.content.object_kind;
}

export class GitLabEndpoint extends ApiEndpoint {
    public path = 'webhook';

    public async post(
        request: IApiRequest,
        endpoint: IApiEndpointInfo,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence,
    ): Promise<IApiResponse> {
        await this.handleEvent(request, read, modify);
        return this.success();
    }

    public async handleEvent(request: IApiRequest, read: IRead, modify: IModify) {
        const eventType = getEventType(request);

        const room = await getRoomFromRequest(request, read);
        const sender = await getUser(request, read);

        if (!room || !(await canSenderAccessRoom(sender, room, read))) {
            throw Error(`room not found or inaccessible`);
        }

        let text = '';

        switch (eventType) {
            case 'issue':
                text = createIssueMessage(request);
                break;
            case 'note':
                text = createCommentMessage(request);
                break;
            case 'push':
                text = createPushMessage(request);
                break;
            case 'pipeline':
                text = createPipelineMessage(request);
                break;
            case 'merge_request':
                text = createMergeRequestMessage(request);
                break;
            default:
                throw Error(`Unknown GitLab event '${eventType}'`);
        }

        const message: IMessage = {
            room,
            sender,
            text: text || '',
            groupable: false,
            parseUrls: false,
            avatarUrl: getUserAvatar(request),
            alias: getUserAlias(request),
        };
        await sendMessage(message, modify);
    }
}
