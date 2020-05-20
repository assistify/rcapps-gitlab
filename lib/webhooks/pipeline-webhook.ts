import { IApiRequest } from '@rocket.chat/apps-engine/definition/api';

export function createPipelineMessage(request: IApiRequest): string {
    const projectUrl = request.content.project.web_url;
    const repoName = request.content.project.name;
    const branch = request.content.object_attributes.ref;

    const commitUrl = request.content.commit.url;
    const commitTitle = request.content.commit.title;

    const status = request.content.object_attributes.status;
    const pipelineId = request.content.object_attributes.id;

    let response = `Status of pipeline [#${pipelineId}](${computePipelineUrl(request)}) for repository [${repoName}](${projectUrl}) changed:\n`
        + `Branch: ${branch}\n`
        + `${computeStatusIcon(status)} Status: ${JSON.stringify(status)}\n`
        + `Commit: [${commitTitle}](${commitUrl})\n`
        + `Steps:\n`
        ;

    const stages = request.content.builds.reverse();

    for (const stage of stages) {
        response += `${computeStatusIcon(stage.status)} \tStage: ${stage.name} Status: ${stage.status} [Details](${computeJobUrl(projectUrl, stage.id)})\n`;
    }

    return response;
}

// https://docs.gitlab.com/ee/api/pipelines.html
function computeStatusIcon(status: string): string {
    switch (status) {
        case 'created':
            return ':white_large_square:';
        case 'pending':
            return ':pause_button:';
        case 'running':
            return ':arrows_counterclockwise:';
        case 'success':
            return ':white_check_mark:';
        case 'failed':
            return ':x:';
        case 'canceled':
            return ':heavy_minus_sign:';
        case 'manual':
            return ':gear:';
        case 'skipped':
            return ':fast_forward:';
        default:
            return '';
    }
}

function computePipelineUrl(request: IApiRequest): string {
    const webUrl = request.content.project.web_url;
    const pipelineId = request.content.object_attributes.id;

    return `${webUrl}/pipelines/${pipelineId}`;
}


function computeJobUrl(webUrl: string, jobId: string): string {
    return `${webUrl}/-/jobs/${jobId}`;
}