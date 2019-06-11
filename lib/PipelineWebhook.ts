import { IApiRequest } from "@rocket.chat/apps-engine/definition/api";

export function createPipelineMessage(request: IApiRequest): string {
    if (request.content.object_kind !== 'pipeline') {
        console.log(request.content.object_kind);
        return 'Not a pipeline request';
    }
    let response =  'Project Name: ' + JSON.stringify(request.content.project.name) + '\n'
                + 'Status: ' + JSON.stringify(request.content.object_attributes.status) + '\n'
                + 'Commit id: ' + JSON.stringify(request.content.commit.id) + '\n'
                + 'Pipeline:\n'
                ;
    for (const stage of request.content.builds) {
        response += '\tStage: ' + stage.name + ' Status: ' + stage.status + '\n';
    }
    return response;
}
