import { getJiraTickets } from "./getTickets.js";

let previousJiraKeyList = [];

export const isolateNewTickets = async () => {

    try {
      const currentKeyList = Object.keys(
            Object.groupBy(await getJiraTickets(), ({ key }) => key)
          );
      const newKeys = identifyNewTickets(previousJiraKeyList, currentKeyList);
      if (newKeys.length > 0) {
        console.log(`new tickets since last`);
        newKeys.forEach((ticket) => console.log(`New ticket: ${ticket}`));
      } else {
        console.log(`No new tickets`);
      }
      previousJiraKeyList = currentKeyList;
    } catch (error) {
      console.error(`error fetching new ticket keys`, error);
    }
  };

function identifyNewTickets(previousJiraKeyList, newJiraKeyList) {
  return newJiraKeyList.filter(
    (ticket) => !previousJiraKeyList.includes(ticket)
  );
}
