// import { sendDailySlackMessage } from "./dailyPostSlackMessage.js";
import { fetchPrs, fetchPRFileInfo } from "./fetchGithubInfo.js";
import { isolateNewTickets } from "./isolateNewTickets.js";
import { matchPrs } from "./matchPullRequestsAndPostMessage.js";

const jiraIssues = await isolateNewTickets();
  const githubPRs = await fetchPrs();

const app = async () => {
//   const dailyMessage = await sendDailySlackMessage();
//   const newTickets = await isolateNewTickets();
//   const githubPrs = await fetchPrs();
//   const githubPRFiles = await fetchPRFileInfo();
//   const postDetailedMessage = await matchPrs();
// };
  

  for (const jiraIssue of jiraIssues) {
    const prs = matchPrs(jiraIssue, githubPRs);
    console.log(prs)
    // for (const pr of prs) {
    //   const prLinkOnCommentResult = await hasPrLink(jiraIssue, pr);
    //   if (prLinkOnCommentResult=="needs-pr-link" || prLinkOnCommentResult=="no-comment") {
    //     addPrToIssue(jiraIssue, pr);
    //   }
    // }
  }
}

setInterval(app, 10000)
app();
