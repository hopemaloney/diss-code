import { getJiraTickets } from "./getTickets.js";
import { postToSlack } from "./postToSlack.js";

let message = "";
let previousJiraKeyList = [];

export const isolateNewTickets = async () => {
  try {
    const currentKeyList = Object.keys(
      Object.groupBy(await getJiraTickets(), ({ key }) => key)
    );
    const newKeys = identifyNewTickets(previousJiraKeyList, currentKeyList);
    if (newKeys.length > 0) {
      console.log(`new tickets since last`);
      newKeys.forEach(
        (ticket) => (message = `Ticket ${ticket} is now ready for review!`)
      );
      // postToSlack(message);
    } else {
      console.log(`No new tickets`);
    }
    return previousJiraKeyList = currentKeyList;
  } catch (error) {
    console.error(`error fetching new ticket keys`, error);
    return [];
  }
};

export function identifyNewTickets(previousJiraKeyList, newJiraKeyList) {
  return newJiraKeyList.filter(
    (ticket) => !previousJiraKeyList.includes(ticket)
  );
}

//to remember for restart, create a db
