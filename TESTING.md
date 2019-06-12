# Manual Test

To test this App, you need an installation of GitLab and an installation of Assisitfy or RocketChat (RC).


## Installation and configuration of the App

First, you need to allow App installations in RC. Therefore, go in Administration menu / General to paragraph "Apps".
You need to activate the App Framework and the Developer mode. The latter is needed to install Apps locally.
Save these changes and go to the "Apps" in the top level administration menu.

Now, you can either install the packaged app via the UI (Button "Upload App" in the upper right),
or you can use the `rc-apps deploy` CLI command.
In both cases, the App should be visible in your Apps list in the administration UI.

Next, click on the App and activate it by pressing the "Activate" button in the App configuration screen
You need to fill out the `Url` configuration entry in the same screen.

`Url` needs to contain the URL of the GitLab API you want to use and could be like `http://localhost:9080/api/v4/` 
if you installed GitLab to port 9080 on your local machine.

After that, you need to copy the URL in the "POST webhook". Remember, that the field shows a complete `curl` command,
but you only need the URL part! Take this URL and add it in your GitLab repository in "Settings / Integrations" as a
new Webhook. Specify at least "Push events" to get notified about such events in your Assistify/RocketChat.

If you use SSL/TLS (visible if your RC installation uses "https" protocol), you can let GitLab verify the certificate.
Test installations (especially on localhost) normally don't use https, so, if this is the case for you too, remove the
checkmark.

*Now you should be ready to test!*

## Testing

### Preparation
- Create a Repository in GitLab and connect it to RC (like described before) or use an existing one which is already
conntected.
- Create a channel in RC with a name containing the GitLab user or group name, a hyphen and the repository name. The
easiest way is to use the last two parts of the repository URL and replacing the slash with a hyphen.

### Test steps
1. Create a new file in this repository, commit (don't push).
1. Change the file, commit with a different message, and push.
1. In the RC channel should then appear a message containing information about the user who pushed the changes and a
 list with the two commits, each with their commit message and the user who committed.

## FAQ

#### I use GitLab as a docker container. What do I need to be aware of?

To access RocketChat from Gitlab inside a docker container, you need to change the Webhook URL to use the host's name,
for example `http://docker.for.mac.localhost:3000`. With `localhost` instead, Gitlab would suppose RC to be in the same
docker container as GitLab itself, and so would not access it.

