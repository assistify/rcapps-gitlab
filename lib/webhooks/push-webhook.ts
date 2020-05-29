import { IApiRequest } from '@rocket.chat/apps-engine/definition/api';
import { enforce } from '../enforce';

export function createPushMessage(request: IApiRequest): string {
    const projectUrl = enforce(request.content.project.web_url);
    const commits = enforce(request.content.commits).map((commit) => {
        return `• [${enforce(commit.message)}](${enforce(commit.url)}) (${enforce(commit.author.name)})`;
    }).join('\n');

    const repoName = enforce(request.content.project.name);
    const text = `${enforce(request.content.user_name)} pushed some commits to repository [${repoName}](${projectUrl})\n${commits}`;
    return text;
}