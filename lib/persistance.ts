import { IPersistence, IPersistenceRead } from '@rocket.chat/apps-engine/definition/accessors';
import { RocketChatAssociationModel, RocketChatAssociationRecord } from '@rocket.chat/apps-engine/definition/metadata';
import { IUser } from '@rocket.chat/apps-engine/definition/users';

export class AppPersistence {
    constructor(private readonly persistence: IPersistence, private readonly persistenceRead: IPersistenceRead) { }
    public async connectRepoToRoom(repoName: string, room): Promise<void> {
        const roomAssociation = new RocketChatAssociationRecord(RocketChatAssociationModel.ROOM, room.id);
        const repoAssociation = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, `repo:${repoName}`);

        await this.persistence.updateByAssociations([roomAssociation, repoAssociation], {
            repoName,
            room: room.id,
        }, true);
    }

    /**
     * setupAuthToken
     */
    public async setupAuthToken(token: string, user: IUser): Promise<void> {
        const tokenAssociation = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, 'gitlab_token');
        const userAssociation = new RocketChatAssociationRecord(RocketChatAssociationModel.USER, user.id);
        await this.persistence.updateByAssociations([userAssociation, tokenAssociation], {
            token,
        }, true);
    }

    /**
     * getUserAccessToken
     */
    public async getAuthToken(user: IUser): Promise<string | undefined> {
        const userAssociation = new RocketChatAssociationRecord(RocketChatAssociationModel.USER, user.id);
        const typeAssociation = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, 'gitlab_token');
        const [result] = await this.persistenceRead.readByAssociations([userAssociation, typeAssociation]);
        return result ? (result as any).token : undefined;
    }

    /**
     * getConnectedRoomId
     */
// tslint:disable-next-line: no-empty
    public async getConnectedRoomId() {

    }
}
