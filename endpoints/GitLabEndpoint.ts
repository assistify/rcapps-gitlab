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
        const room = await read.getRoomReader().getById('GENERAL');
        const user = await read.getUserReader().getByUsername('admin');
        if (room && user) {
            const text = JSON.stringify(request, null, 2);
            await sendMessage(text, read, modify, user, room);
        }
        return this.success();
    }
}
