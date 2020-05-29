import { IApiRequest } from '@rocket.chat/apps-engine/definition/api';
import { enforce } from '../enforce';

export function createIssueMessage(request: IApiRequest): string {
    const projectUrl = enforce(request.content.project.web_url);
    const repoName = enforce(request.content.project.name);
    const issueName = enforce(request.content.object_attributes.title);
    const issueUrl = enforce(request.content.object_attributes.url);
    const text = `${enforce(request.content.user.name)} ${getAction(request)} an issue in repository [${repoName}](${projectUrl})
        • [${issueName}](${issueUrl}): ${getDescription(request)}`;

    return text;
}

function getDescription(request: IApiRequest): string {
    const issueDescription = request.content.object_attributes.description;
    if (issueDescription) {
        return `"${issueDescription}"`;
    }
    return '_no description provided_';
}

function getAction(request: IApiRequest): string {
    switch (enforce(request.content.object_attributes.action)) {
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

