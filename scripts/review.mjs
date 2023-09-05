#!/usr/bin/env zx
import { SLACK_ACCESS_TOKEN } from "../vault.mjs"

const SLACK_CHANNEL = "test-dev-process"

try {
    $.verbose = false //do not log output of script run using zx

    //Is not in main branch
    const prBranchName = (await $`git branch --show-current`).stdout.trim()
    if(prBranchName === "main")
        throw new Error("Cannot start a review from main branch.\nPlease switch to your development branch and try again.")

    //Get latest changes from main
    await $`git pull origin main --rebase`

    //Run tests
    await $`npm run test`
    
    //Create PR
    let isExistingPR = false //for slack notification
    try {
        await $`gh pr create --base main --title ${prBranchName} --body ""`
    } catch(p){
        if(!p.stderr.includes("already exists")) { //TBD: this is brittle to check for existing PR
            throw p
        }
        //There is an existing PR. Do not die as author may have inteded to just update the PR.
        isExistingPR = true
    }
    
    //Get PR details for Slack notification
    const prUrlPromise = await $`gh pr list --base main --head ${prBranchName} --json url`
    const prUrl = JSON.parse(prUrlPromise.stdout)[0].url
    const repoDetailsPromise = await $`gh repo view --json name --json url`
    const { name: repoName } = JSON.parse(repoDetailsPromise.stdout)
    const prAuthorName = (await $`git config user.name`).stdout.trim()
    
    await sendSlackMessage({repoName, prBranchName, isExistingPR, prAuthorName, prUrl})
    
    //Play success sound to notify (Only works on MacOS)
    $`afplay /System/Library/Sounds/Glass.aiff`
} catch(p) {
    if(p.stderr) { //Error thrown by zx
        console.log(`Exit code: ${p.exitCode}`)
        console.log(`Error: ${p.stderr}`)
    } else { //Standard JS error obj
        console.log(p)
    }
    //Play error sound to notify (Only works on MacOS)
    $`afplay /System/Library/Sounds/Funk.aiff`
    process.exit(1)
}

async function sendSlackMessage ({
    repoName,
    prBranchName,
    isExistingPR,
    prAuthorName,
    prUrl
} = {}) {
    const msg = JSON.stringify({        
        channel: SLACK_CHANNEL,
        blocks: [
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: 
`<${prUrl}|${repoName}/${prBranchName}> pull request was ${isExistingPR ? "updated" : "created"} by @${prAuthorName}
*Waiting for Review and Approval*`
                }
            }
        ]
    })
    await fetch("https://slack.com/api/chat.postMessage", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + SLACK_ACCESS_TOKEN,
            "Content-Type": "application/json"
        },
        body: msg
    })
}