const webhook = `https://hooks.slack.com:443/services/T02A2SS1Q/B072KH2MKUJ/h4C6qyPqG3zCaqZti9ZpTLyX`;
export async function postToSlack(message) {
    const payload = {
        text: message,
    };

    try {
        const response = await fetch(webhook, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            console.log(`Message successfully posted to slack`)
        } else {
            console.error(`Could not post message to slack`, response.statusText)
        }
    } catch (error) {
        console.error(`Error`, error)
    }
}