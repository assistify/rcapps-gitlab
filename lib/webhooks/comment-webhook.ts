import { IApiRequest } from '@rocket.chat/apps-engine/definition/api';

export function createCommentMessage(request: IApiRequest): string {
    const projectUrl = request.content.project.web_url;
    const repoName = request.content.project.name;

    let text = `${request.content.user.name} added a new comment in repository [${repoName}](${projectUrl}) to\n`;

    if(request.content.issue) {
        text += createIssueMessage(request);
    }
    if(request.content.merge_request) {
        text += createMergeRequestMessage(request);
    }

    return text;
}


function createIssueMessage(request: IApiRequest): string {
    let text;
    const issueTitle = request.content.issue.title;
    const issueUrl = request.content.issue.url;
    const note = request.content.object_attributes.note;
    const noteUrl = request.content.object_attributes.url;

    text = `• [Issue: ${issueTitle}](${issueUrl}): "${note}"\n\n`
    text += `[Details](${noteUrl})`
    return text;
}

function createMergeRequestMessage(request: IApiRequest): string {
    let text;
    const mergeTitle = request.content.merge_request.title;
    const mergeUrl = request.content.merge_request.url;
    const note = request.content.object_attributes.note;
    const noteUrl = request.content.object_attributes.url;

    text = `• [Merge Request: ${mergeTitle}](${mergeUrl}): "${note}"\n\n`
    text += `[Details](${noteUrl})`
    return text;
}