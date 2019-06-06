import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, ISlashCommandPreview, ISlashCommandPreviewItem, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { GitLabApp } from '../GitLabApp';
import { executeHelpPreviewItem, getHelpPreviewItems } from '../lib/help';
import { createIssue } from '../lib/issue';
import { executeSearchPreviewItem, getSearchPreviewItems } from '../lib/search';
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
    public providesPreview = true;
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
            default:
                break;
        }
    }

    public async previewer(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<ISlashCommandPreview> {
        const [command] = context.getArguments();
        let i18nTitle: string;
        let items: Array<ISlashCommandPreviewItem>;
        switch (command) {
            case Commands.Search:
                i18nTitle = 'Results for ';
                items = await getSearchPreviewItems(this.app, context, read, http, persis);
                break;
            case Commands.Create:
                i18nTitle = 'Suggestions for';
                items = [];
            case Commands.Setup:
                i18nTitle = 'Suggestions for';
                items = [];
            default:
                i18nTitle = 'Suggestions for';
                items = getHelpPreviewItems();
                break;
        }
        return {
            i18nTitle,
            items,
        };
    }

    public async executePreviewItem(item: ISlashCommandPreviewItem, context: SlashCommandContext, read: IRead,
        // tslint:disable-next-line: align
        modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
        const [command] = context.getArguments();
        switch (command) {
            case Commands.Help:
                await executeHelpPreviewItem(item, read, modify, context.getSender(), context.getRoom());
                break;
            case Commands.Search:
                await executeSearchPreviewItem(item, this.app, context, read, modify, http, persis);
                break;
            default:
                break;
        }
    }
}
