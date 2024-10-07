import { getJiraTickets } from "./getTickets.js";
import { postToSlack } from "./postToSlack.js";

let message = "";
const prefferedNotificationTime = "09:00";

export const sendDailySlackMessage = async () => {
  try {
    let issues = await getJiraTickets();
    const now = new Date();
    const currentTime = now.toLocaleTimeString();
    if (currentTime.startsWith(prefferedNotificationTime)) {
      if (issues.length > 1) {
        message = `There are currently ${issues.length} tickets that are ready for review. Do you have spare time to check them out?`;
      } else if (issues.length === 1) {
        message = `There is currently ${issues.length} ticket that is ready for review. Do you have spare time to check it out?`;
      } else {
        message = `There are currently no tickets in ready for review. Well done team!`;
      }
      postToSlack(message);
    }
  } catch (error) {
    console.error(error);
  }
};

//use setinterval to run once every 24 hours
