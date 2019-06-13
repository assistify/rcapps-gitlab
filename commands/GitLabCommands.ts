import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { GitLabApp } from '../GitLabApp';
import { help } from '../lib/help';
import { createIssue, searchIssues } from '../lib/issue';
import { setupAccount } from '../lib/setup';

export enum Commands {
    'Setup' = 'setup',
    'Create' = 'create',
    'Help' = 'help',
    'Search' = 'search',
}

export class GitLabCommand implements ISlashCommand {
    public command = 'gitlab';
    public i18nDescription = 'gitlab_description';
    public i18nParamsExample = 'gitlab_params';
    public providesPreview = false;
    public constructor(private readonly app: GitLabApp) { }

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
        const [command] = context.getArguments();
        switch (command) {
            case Commands.Setup:
                await setupAccount(context, read, modify, persis);
                break;
            case Commands.Create:
                await createIssue(this.app, context, read, modify, http, persis);
                break;
            case Commands.Search:
                await searchIssues(this.app, context, read, modify, http, persis);
                break;
            default:
                await help(context, read, modify);
                break;
        }
    }
}
