import { IApiRequest } from '@rocket.chat/apps-engine/definition/api';

export function createPushMessage(request: IApiRequest): string {
    const projectUrl = request.content.project.web_url;
    const commits = request.content.commits.map((commit) => {
        return `• [${commit.message}](${commit.url}) (${commit.author.name})`;
    }).join('\n');

    const repoName = request.content.project.name;
    const text = `${request.content.user_name} pushed some commits to repository [${repoName}](${projectUrl})
${commits}`;
    return text;
}