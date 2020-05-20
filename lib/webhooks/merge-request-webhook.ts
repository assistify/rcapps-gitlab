import { IApiRequest } from '@rocket.chat/apps-engine/definition/api';

export function createMergeRequestMessage(request: IApiRequest): string {
    const projectUrl = request.content.project.web_url;
    const repoName = request.content.project.name;
    const mergeTitle = request.content.object_attributes.title;
    const mergeUrl = request.content.object_attributes.url;

    const text = `${request.content.user.name} ${getAction(request)} a merge request in repository [${repoName}](${projectUrl})
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
    const action = request.content.object_attributes.action
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
