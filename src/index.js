// curl  -X POST -d '{"text":"testing"}' -H "content-type:application/json" https://hooks.slack.com:443/services/T02A2SS1Q/B072KH2MKUJ/h4C6qyPqG3zCaqZti9ZpTLyX

// import { getJiraTickets } from "./getTickets.js";
import { sendDailySlackMessage } from "./dailyPostSlackMessage.js";
import { isolateNewTickets } from "./pollForNewTickets.js";

const app = async () => {
  const newTickets = await isolateNewTickets();
  const dailyMessage = await sendDailySlackMessage();
  
};

setInterval(app, 10000)
app();
