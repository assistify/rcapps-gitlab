import { IApiRequest } from '@rocket.chat/apps-engine/definition/api';
import { enforce } from '../enforce';

export function createMergeRequestMessage(request: IApiRequest): string {
    const projectUrl = enforce(request.content.project.web_url);
    const repoName = enforce(request.content.project.name);
    const mergeTitle = enforce(request.content.object_attributes.title);
    const mergeUrl = enforce(request.content.object_attributes.url);

    const text = `${enforce(request.content.user.name)} ${getAction(request)} a merge request in repository [${repoName}](${projectUrl})
        • [${mergeTitle}](${mergeUrl}): ${getDescription(request)}`;

    return text;
}

function getDescription(request: IApiRequest): string {
    const issueDescription = request.content.object_attributes.description;
    if(issueDescription) {
        return `"${issueDescription}"`;
    }
    return '_no description provided_';
}

function getAction(request: IApiRequest): string {
    const action = enforce(request.content.object_attributes.action);
    switch (action) {
        case 'open':
            return 'opened';
        case 'update':
            return 'updated';
        case 'close':
            return 'closed';
        case 'merge':
            return 'merged';
        default:
            return action;
    };
}
