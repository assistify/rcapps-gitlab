# Manual Test

To test this App, you need an installation of GitLab and an installation of Assisitfy or RocketChat (RC).


## Setup

First, you need to allow app installations in RC instance. The setting shall be found under the following section.

>Menu->Administration->General

Activate the app framework and developer mode. The latter is needed to install Apps locally. Save these changes.

## App Installation 

1. Install using CLI <br>
    The `rc-apps deploy` CLI command shall be used as per the instructions.
    [More on RCApps CLI](https://github.com/RocketChat/Rocket.Chat.Apps-cli)

2. Upload in Rocket Chat <br>
    On Rocket.Chat the "Upload App" under the Apps section shall be used to deploy the app.

In both cases, the App should be displayed in your Apps list in the administration UI after a succesfull deployment.

## Configuration 

Next, click on the App and activate it by pressing the "Activate" button in the App configuration screen
You need to fill out the `Url` configuration entry in the same screen.

`Url` needs to contain the End-Point URL of the GitLab API you want to connect as below:
>`http://localhost:9080/api/v4/` <br>
if you have installed GitLab on port 9080 in your local machine.

After that, you need to copy the URL in the "POST webhook". Remember, that the field shows a complete `curl` command,
but you only need the URL part! Take this URL and add it in your GitLab repository in "Settings / Integrations" as a
new Webhook. Specify at least "Push events" to get notified about such events in your Assistify/RocketChat.

If you use SSL/TLS (visible if your RC installation uses "https" protocol), you can let GitLab verify the certificate.
Test installations (especially on localhost) normally don't use https, so, if this is the case for you too, remove the
checkmark.

*Now you should be ready to test!*

## Testing
### Webhooks
#### Preparation
- Create a new or an existing Repository in GitLab to connect RC.
- Create a channel in RC with a name containing the GitLab user or group name, a hyphen and the repository name. The easiest way is to use the last two parts of the repository URL and replacing the slash with a hyphen.
    - For example:
        > **#awesome-project** <br>
        > `awesome`: User or group name<br>
        > `project`: Repository name


#### Test steps
1. Create a new file in this repository, commit (don't push).
2. Change the file, commit with a different message, and push.
3. In the RC channel should then appear a message containing information about the user who pushed the changes and a list with the two commits, each with their commit message and the user who committed.

### Slash Commands
#### Preparation
1. The gitlab user must be registered in the Rocket.Chat using the slash command `setup`.
    > `/gitlab setup token <auth_token>`

* Authorization token need to be generated in gitlab

2. The registered users will be able to access the information from the gitlab using the following slash commands.
    -  Search Issues:
        The information about the issues created by an user or assigned to a user shall be retreived using the below command.
          > `/gitlab search issues <keyword> (optional: <created-by-me>/<assigned-to-me>`)
    - Create Issue:
        The new issue can be created to a repository using the following command.    
        > `/gitlab create issue <repository id/ path> <issue title> <description>`'

#### Test steps
1. Create a new issue or exisiting issue in the gitlab for testing.
2. Execute the slash command for search by replacing the search `keyword` to the text that matchs the title of the issue.
3. The issues matching the search text will posted in the channel as a Notificatio message.         

## FAQ

#### I use GitLab as a docker container. What do I need to be aware of?

To access RocketChat from Gitlab inside a docker container, you need to change the Webhook URL to use the host's name,
for example `http://docker.for.mac.localhost:3000`. With `localhost` instead, Gitlab would suppose RC to be in the same
docker container as GitLab itself, and so would not access it.

