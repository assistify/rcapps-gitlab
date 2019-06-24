# GitLab
Integrate GitLab into Assistify.

This App connects GitLab with Assistify, so that Assistify users can easily create or query GitLab Issues
and get informed in their chat about newly pushed code or the status of their builds (GitLab-CI)

## Build & Deploy

### Preconditions

1. **Activate the app framework and development mode** - Therefore goto to the Rocket.Chat Admin UI -> Settings -> General -> Apps and enable both options "app framework" and "development mode".

2. **Install "Rocket.Chat Apps CLI"** - In order to make a deployable Rocket.Chat app from this repository, you need to install the "Rocket.Chat Apps CLI" first. See https://github.com/RocketChat/Rocket.Chat.Apps-cli for installation details.

### Install the App

After the RC Apps CLI has been installed on your computer, checkout this repository and run `rc-apps package` in order to generate a packaged app file (zip) which can be installed. To deploy the app locally or remotely use the `rc-apps deploy` command: this will do what `package` does but ask you for your server url, username, and password to deploy the app for you.

```
git clone https://github.com/assistify/rcapps-gitlab.git
cd rcapps-gitlab
rc-apps deploy
```

## Config
This Rocket.Chat gitlab app has only one parameters which can be configured after installation in the "Administration / Apps" menu:

- `url` - The url of your GitLab installations API

## Documentation
Here are some links to examples and documentation:
- [Rocket.Chat Apps TypeScript Definitions Documentation](https://rocketchat.github.io/Rocket.Chat.Apps-engine/)
- [Rocket.Chat Apps TypeScript Definitions Repository](https://github.com/RocketChat/Rocket.Chat.Apps-engine)
- [Example Rocket.Chat Apps](https://github.com/graywolf336/RocketChatApps)
- Community Forums
  - [App Requests](https://forums.rocket.chat/c/rocket-chat-apps/requests)
  - [App Guides](https://forums.rocket.chat/c/rocket-chat-apps/guides)
  - [Top View of Both Categories](https://forums.rocket.chat/c/rocket-chat-apps)
- [#rocketchat-apps on Open.Rocket.Chat](https://open.rocket.chat/channel/rocketchat-apps)
