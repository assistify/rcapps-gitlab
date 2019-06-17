# GitLab
Integrate GitLab into Assistify.

This App connects GitLab with Assistify, so that Assistify users can easily create or query GitLab Issues
and get informed in their chat about newly pushed code or the status of their builds (GitLab-CI)

## Configuration
The App has currently two parameters which can be configured after installation in the "Administration / Apps" menu:

- `url` - The url of your GitLab installations API

## Using the app locally (for further development)
You can either package it up and manually deploy it to your test instance or you can use the CLI to do so.
Here are some commands to get started:
- `rc-apps package`: this command will generate a packaged app file (zip) which can be installed **if** it compiles with TypeScript
- `rc-apps deploy`: this will do what `package` does but will then ask you for your server url, username, and password to deploy it for you

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
