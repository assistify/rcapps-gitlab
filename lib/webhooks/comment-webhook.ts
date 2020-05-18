import { IApiRequest } from '@rocket.chat/apps-engine/definition/api';

export function createCommentMessage(request: IApiRequest): string {
    const projectUrl = request.content.project.web_url;
    const repoName = request.content.project.name;

    let text = `${request.content.user.name} added a new comment in repository [${repoName}](${projectUrl}) to\n`;

    if(request.content.issue) {
        text += createIssueMessage(request);
    }

    return text;
}


function createIssueMessage(request: IApiRequest): string {
    let text;
    const issueName = request.content.issue.title;
    const issueUrl = request.content.issue.url;
    const note = request.content.object_attributes.note;
    const noteUrl = request.content.object_attributes.url;

    text = `• [Issue: ${issueName}](${issueUrl}): "${note}"\n\n`
    text += `[Details](${noteUrl})`
    return text;
}
