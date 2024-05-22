import { getJiraTickets } from "./getTickets.js";

export const isolateNewTickets = async () => {
const jiraTickets = await getJiraTickets();

const jiraKeyList = Object.keys(Object.groupBy(jiraTickets, ({ key }) => key));
console.log(jiraKeyList);

function identifyNewTickets(previousJiraKeyList, newJiraKeyList) {
  return newJiraKeyList.filter(
    (ticket) => !previousJiraKeyList.includes(ticket)
  );
}

function pollForNewTickets() {
  let previousJiraKeyList = [];

  setInterval(async () => {
    try {
      const currentKeyList = await getJiraTickets();
      const newKeys = identifyNewTickets(previousJiraKeyList, currentKeyList);
      if (newKeys.length > 0) {
        console.log(`new tickets since last`);
        newKeys.forEach((ticket) => console.log(`New ticket: ${ticket.key}`));
      } else {
        console.log(`No new tickets`);
      }
      previousJiraKeyList = jiraTickets;
    } catch (error) {
      console.error(`error fetching new ticket keys`, error);
    }
  }, 30000);
}
pollForNewTickets();
}