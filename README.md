# GitLab
Integrate GitLab into Assistify.

This App connects GitLab with Assistify, so that Assistify users can easily create or query GitLab Issues
and get informed in their chat about newly pushed code or the status of their builds (GitLab-CI)

## Build & Deploy

### Preconditions

1. Activate the App Framework and development mode
In order to use Apps in Rocket.Chat, you have to activate the App Framework. The "Development mode" allows the installation of Apps that are not from the Rocket.Chat's Marketplace. Therefore goto to the Rocket.Chat Admin -> Settings -> General -> Apps and enable both options "App Framework" and "development mode".

2. Install "Rocket.Chat Apps CLI"
In order to make a deployable Rocket.Chat app from this repository, you need to install the "Rocket.Chat Apps CLI" first. See https://github.com/RocketChat/Rocket.Chat.Apps-cli for installation details.


### Install the App

After the RC Apps CLI has been installed on your computer, checkout this repository and run `rc-apps package` in order to generate a packaged app file (zip) which can be installed. Use the `rc-apps deploy` command: this will do what `package` does but will then ask you for your server url, username, and password to deploy it for you

```
git clone https://github.com/assistify/rcapps-gitlab.git
cd rcapps-gitlab
rc-apps deploy
```

## Config
The App has only one parameters which can be configured after installation in the "Administration / Apps" menu:

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
