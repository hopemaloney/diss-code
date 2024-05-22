// curl  -X POST -d '{"text":"Message i want to appear in slack"}' -H "content-type:application/json" https://hooks.slack.com:443/services/T02A2SS1Q/B072KH2MKUJ/h4C6qyPqG3zCaqZti9ZpTLyX

import { getJiraTickets } from "./getTickets.js";

const app = async () => {
  const jiraTickets = await getJiraTickets();
  
  const jiraKeyList = Object.keys(
    Object.groupBy(jiraTickets, ({ key }) => key)
  );
  console.log(jiraKeyList);

  function identifyNewTickets(previousJiraKeyList, newJiraKeyList) {
    return newJiraKeyList.filter(ticket => !previousJiraKeyList.includes(ticket));
  };

  async function pollForNewTickets() {
    let previousJiraKeyList = [];
    
    setInterval(async () => {
      try {
        const currentKeyList = await getJiraTickets();
        const newKeys = identifyNewTickets(previousJiraKeyList, currentKeyList);
        if(newKeys.length >0) {
          console.log(`new tickets since last`)
          newKeys.forEach(ticket => console.log(`Key: ${ticket.key}`))
        } else {
          console.log(`No new tickets`)
        }
        previousJiraKeyList = jiraTickets;
      } 
      catch (error) {
        console.error(`error fetching new ticket keys`, error)
      }
    }, 30000);
  }

  pollForNewTickets();

};

setInterval(app, 30000)
app();
