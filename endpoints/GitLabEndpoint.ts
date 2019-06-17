import {IHttp, IModify, IPersistence, IRead} from '@rocket.chat/apps-engine/definition/accessors';
import {ApiEndpoint, IApiEndpointInfo, IApiRequest, IApiResponse} from '@rocket.chat/apps-engine/definition/api';
import { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import {createPipelineMessage} from '../lib/PipelineWebhook';
import { sendMessage } from '../lib/send';

async function getRoomFromRequest(request: IApiRequest, read: IRead) {
    const roomName = request.content.project.path_with_namespace.replace('/', '-').toLowerCase();
    const room = await read.getRoomReader().getByName(roomName);
    if (!room) {
        throw new Error(`Room ${roomName} not found`);
    }
    return room;
}

async function getUser(username: string, read: IRead) {
    return read.getUserReader().getByUsername(username);
}

async function getUserFromRequest(request: IApiRequest, read: IRead) {
    return await getUser(request.content.user_username, read) || await getUser('rocket.cat', read);
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
        const eventType = request.content.event_name || request.content.event_type;
        if (!this[eventType]) {
            throw Error(`Unknown GitLab event '${eventType}'`);
        }
        await this[eventType](request, read, modify);
        return this.success();
    }

    public async push(request: IApiRequest, read: IRead, modify: IModify) {
        const room = await getRoomFromRequest(request, read);
        const sender = await getUserFromRequest(request, read);
        const usernameAlias = await read.getEnvironmentReader().getSettings().getById('gitlab-username-alias');
        const gitlabUrl = (await read.getEnvironmentReader().getSettings().getById('url')).value.replace(/\/?$/, '/');
        if (room && sender) {
            const projectUrl = gitlabUrl + request.content.project.path_with_namespace;
            const commits = request.content.commits.map((commit) => {
                return `• [${commit.message}](${projectUrl}/commit/${commit.id}) (${commit.author.name})`;
            }).join('\n');

            const repoName = request.content.project.name;
            const text = `${request.content.user_name} pushed some commits to repository [${repoName}](${projectUrl})
 ${commits}`;
            const message: IMessage = {
                    room,
                    sender,
                    alias: usernameAlias.value,
                    text: text || '',
                    groupable: false,
            };
            await sendMessage(message, modify);
        }
    }

    public async pipeline(request: IApiRequest, read: IRead, modify: IModify) {
        const sender = await read.getUserReader().getById('rocket.cat');
        const room = await getRoomFromRequest(request, read);
        const usernameAlias = await read.getEnvironmentReader().getSettings().getById('gitlab-username-alias');
        if (room && sender) {
            const text = createPipelineMessage(request);
            const message: IMessage = {
                room,
                sender,
                alias: usernameAlias.value,
                text: text || '',
                groupable: false,
            };
            await sendMessage(message, modify);
        }
    }
}
