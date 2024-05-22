import { Version2Client } from "jira.js";
import 'dotenv/config';

if (process.env.JIRA_TOKEN === undefined) {
  throw new Error('MISSING JIRA PERSONAL ACCESS TOKEN');
}

const client = new Version2Client({
  host: "https://tools.skybet.net/jira/",
  authentication: {
    personalAccessToken: process.env.JIRA_TOKEN,
  },
});

//Periodically check for new jira tickets
export async function getJiraTickets() {
  try {
    const jiraTickets = await fetchJiraTickets();
    const issues = jiraTickets.issues || []
//     for (const jiraTicket of issues) {
//       const jiraTicketKey = jiraTicket.key
//       console.log(jiraTicketKey)
//   }
  return issues;
  } catch (error) {
    console.error('Error occurred while processing Jira ticket', error);
  }
}

async function fetchJiraTickets() {
  try {
  //create JQL query to fetch tickets in the desired column
  const jql = `project = "TX2" AND status = "Implementation Out" OR project = "TX2" AND status = "Code Review 1 Out" OR project = "BTX" AND status = "Implementation Out" OR project = "BTX" AND status = "Code Review 1 Out"`;

    //make request to fetch jira tickets
    const issues = await client.issueSearch.searchForIssuesUsingJqlPost({jql});
    if (!issues) {
        console.error('No jira tickets matching that request could be found')
    };
    return issues;
  } catch (error) {
    console.error('Error occured fetching jira tickets', error);
    throw error;
  }

}
//900000 for 15 mins
getJiraTickets();