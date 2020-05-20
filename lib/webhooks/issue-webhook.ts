import { IApiRequest } from '@rocket.chat/apps-engine/definition/api';

export function createIssueMessage(request: IApiRequest): string {
    const projectUrl = request.content.project.web_url;
    const repoName = request.content.project.name;
    const issueName = request.content.object_attributes.title;
    const issueUrl = request.content.object_attributes.url;

    const text = `${request.content.user.name} ${getAction(request)} an issue in repository [${repoName}](${projectUrl})
        • [${issueName}](${issueUrl}): ${getDescription(request)}`;

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
    switch (request.content.object_attributes.action) {
        case 'open':
            return 'opened';
        case 'close':
            return 'closed';
        case 'update':
            return 'updated';
        default:
            return request.content.object_attributes.action;
    }
}