import {IHttp, IModify, IPersistence, IRead} from '@rocket.chat/apps-engine/definition/accessors';
import {ApiEndpoint, IApiEndpointInfo, IApiRequest, IApiResponse} from '@rocket.chat/apps-engine/definition/api';
import {sendMessage} from '../lib/sendMessage';
import {createPipelineMessage} from '../lib/PipelineWebhook';

async function getRoomFromRequest(request: IApiRequest, read: IRead) {
    const roomName = request.content.project.path_with_namespace.replace('/', '-');
    const room = await read.getRoomReader().getByName(roomName);
    if (!room) {
        throw new Error(`Room ${roomName} not found`);
    }
    return {roomName, room};
}

async function getUser(username: string, read: IRead) {
    return read.getUserReader().getByUsername(username);
}

async function getUserFromRequest(request: IApiRequest, read: IRead) {
    return await getUser(request.content.user_username, read) || await getUser('admin', read);
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
        if (!this[request.content.event_name]) {
            throw Error(`Unknown GitLab event '${request.content.event_name}'`);
        }
        await this[request.content.event_name](request, read, modify);
        return this.success();
    }

    public async push(request: IApiRequest, read: IRead, modify: IModify) {
        const {roomName, room} = await getRoomFromRequest(request, read);
        const user = await getUserFromRequest(request, read);
        if (room && user) {
            const commits = request.content.commits.map(commit => {
                return '• [' + commit.message + '](' + commit.url + ') (' + commit.author.name + ')';
            }).join('\n');

            const text = request.content.user_name + ' pushed some commits to #' + roomName + '\n' + commits;
            await sendMessage(text, read, modify, user, room);
        }
    }

    public async pipeline(request: IApiRequest, read: IRead, modify: IModify) {
        const user = await read.getUserReader().getById('rocket.cat');
        const {room} = await getRoomFromRequest(request, read);

        if (room && user) {
            const text = createPipelineMessage(request);
            await sendMessage(text, read, modify, user, room);
        }
    }
}
