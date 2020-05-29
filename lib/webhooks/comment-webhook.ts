import { IApiRequest } from '@rocket.chat/apps-engine/definition/api';
import { enforce } from '../enforce';

export function createCommentMessage(request: IApiRequest): string {
    const projectUrl = enforce(request.content.project.web_url);
    const repoName = enforce(request.content.project.name);

    let text = `${enforce(request.content.user.name)} added a new comment in repository [${repoName}](${projectUrl}) to\n`;

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
    const issueTitle = enforce(request.content.issue.title);
    const issueUrl = enforce(request.content.issue.url);
    const note = enforce(request.content.object_attributes.note);
    const noteUrl = enforce(request.content.object_attributes.url);

    text = `• [Issue: ${issueTitle}](${issueUrl}): "${note}"\n\n`
    text += `[Details](${noteUrl})`
    return text;
}

function createMergeRequestMessage(request: IApiRequest): string {
    let text;
    const mergeTitle = enforce(request.content.merge_request.title);
    const mergeUrl = enforce(request.content.merge_request.url);
    const note = enforce(request.content.object_attributes.note);
    const noteUrl = enforce(request.content.object_attributes.url);

    text = `• [Merge Request: ${mergeTitle}](${mergeUrl}): "${note}"\n\n`
    text += `[Details](${noteUrl})`
    return text;
}