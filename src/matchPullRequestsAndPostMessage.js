import { fetchPrs } from "./fetchGithubInfo.js";
import { identifyNewTickets } from "./isolateNewTickets.js";
// import { postToSlack } from "./postToSlack"

export function matchPrs(jiraTicket, githubPRs) {
  try {
  const jiraKey = jiraTicket.key;
  return githubPRs.filter((pr) => {
    return pr.title.toLowerCase().includes(jiraKey.toLowerCase())
  });
} catch (error) {
  console.error('error matching prs', error)
}
}

// export function fetchMatchedPRInfo(pr) {
//   try {
//     const prInfo = fetchPRFileInfo(pr.number)
//     console.log(prInfo)
//   } catch (error) {
//     console.error(`Error posting message to slack...eventually`, error)
//   }
// }




