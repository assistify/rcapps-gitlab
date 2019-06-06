import {IHttp, IModify, IPersistence, IRead} from '@rocket.chat/apps-engine/definition/accessors';
import {ApiEndpoint, IApiEndpointInfo, IApiRequest, IApiResponse} from '@rocket.chat/apps-engine/definition/api';
import {sendMessage} from '../lib/sendMessage';

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
        async function getUser(username) {
            return await read.getUserReader().getByUsername(username);
        }

        const roomName = request.content.project.path_with_namespace.replace('/', '-');
        const room = await read.getRoomReader().getByName(roomName);
        const user = await getUser(request.content.user_username) || await getUser('admin');
        if (room && user) {
            const commits = request.content.commits.map(commit => {
                return '• [' + commit.message + '](' + commit.url + ') (' + commit.author.name + ')';
            }).join('\n');

            const text = request.content.user_name + ' pushed some commits to #' + roomName + '\n' + commits;
            await sendMessage(text, read, modify, user, room);
        }
    }
}
