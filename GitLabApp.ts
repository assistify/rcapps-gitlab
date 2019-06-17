import {
    IAppAccessors,
    IConfigurationExtend,
    IConfigurationModify,
    IEnvironmentRead,
    IHttp,
    ILogger,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import {ApiSecurity, ApiVisibility} from '@rocket.chat/apps-engine/definition/api';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { ISetting, SettingType } from '@rocket.chat/apps-engine/definition/settings';
import { GitLabCommand } from './commands/GitLabCommands';
import {GitLabEndpoint} from './endpoints/GitLabEndpoint';
import { Issue } from './models/Issue';

export class GitLabApp extends App {
    public issue: Issue;

    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    public async initialize(configurationExtend: IConfigurationExtend, environmentRead: IEnvironmentRead) {
        configurationExtend.settings.provideSetting({
            id: 'url',
            type: SettingType.STRING,
            packageValue: '',
            required: true,
            public: false,
            i18nLabel: 'url',
        });

        configurationExtend.settings.provideSetting({
            id: 'gitlab-username-alias',
            public: true,
            required: false,
            type: SettingType.STRING,
            packageValue: 'Gitlab-CI',
            value: 'Gitlab-CI',
            i18nLabel: 'gitlab-username-alias',
        });

        configurationExtend.slashCommands.provideSlashCommand(new GitLabCommand(this));

        configurationExtend.api.provideApi({
            visibility: ApiVisibility.PUBLIC,
            security: ApiSecurity.UNSECURE,
            endpoints: [
                new GitLabEndpoint(this),
            ],
        });

        this.issue = new Issue();
    }
}
