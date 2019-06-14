import { HttpStatusCode, IHttp, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { AppPersistence } from '../lib/persistance';

export interface IIssue {
    iid: string;
    project_id: string;
    title: string;
    web_url: string;
    description: string;
    label: string;
    state: string;
    assignee: {
        name: string,
    };
}
export interface IIssueCreate {
    title: string;
    description: string;
}
export class Issue {
// tslint:disable-next-line: no-empty
    constructor() { }
    /**
     * Search Issues
     */
    public async searchIssues(searchText: string,
                              scope: string,
                              context: SlashCommandContext,
                              read: IRead,
                              http: IHttp,
                              persis: IPersistence): Promise<Array<IIssue>> {
        const url = await read.getEnvironmentReader().getSettings().getById('url');
        const persistence = new AppPersistence(persis, read.getPersistenceReader());
        const token = await persistence.getAuthToken(context.getSender());
        if (!token) {
            throw new Error('No valid token found');
        }
        try {
            const response = await http.get(`${url.value}/issues`, {
                headers: {
                    'PRIVATE-TOKEN': token,
                },
                params: {
                    search: searchText,
                    in: 'title',
                    scope: scope || 'created-by-me',
                },
            });
            if (response.statusCode !== HttpStatusCode.OK || !response.data) {
                throw new Error('No issues found');
            }
            return response.data;

        } catch (error) {
            throw new Error('Unable to get details');
        }
    }

    /**
     * listIssues
     */
    public async listIssues(context: SlashCommandContext, read: IRead, http: IHttp, persis: IPersistence): Promise<Array<IIssue>> {
        const url = await read.getEnvironmentReader().getSettings().getById('url');
        const persistence = new AppPersistence(persis, read.getPersistenceReader());
        const token = await persistence.getAuthToken(context.getSender());
        if (!token) {
            throw new Error('No valid token found');
        }
        try {
            const response = await http.get(`${url.value}/issues`, {
                headers: {
                    'PRIVATE-TOKEN': token,
                },
            });
            if (response.statusCode !== HttpStatusCode.OK || !response.data) {
                throw new Error('No issues found');
            }
            return response.data;
        } catch (error) {
            throw new Error('Unable to get details');
        }
    }

    /**
     * createIssue
     */
// tslint:disable-next-line: max-line-length
    public async createIssue(project: string, issue: IIssueCreate, context: SlashCommandContext, read: IRead, http: IHttp, persis: IPersistence): Promise<IIssue> {
        const url = await read.getEnvironmentReader().getSettings().getById('url');
        const persistence = new AppPersistence(persis, read.getPersistenceReader());
        const token = await persistence.getAuthToken(context.getSender());
        if (!token) {
            throw new Error('No valid token found');
        }

        const params = {
            title: issue.title,
        };

        try {
            const response = await http.post(`${url.value}/projects/${encodeURIComponent(project)}/issues`, {
                params,
                headers: {
                    'PRIVATE-TOKEN': token,
                },
            });
            if (response.statusCode === HttpStatusCode.OK && response.data) {
                throw new Error('Unable to create the issue');
            }
            return response.data;
        } catch (error) {
            throw new Error('Unable to create the issue');
        }

    }
}
