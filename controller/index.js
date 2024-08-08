const { handleMessage } = require("./lib/Telegam");

async function handler(req, method) {
  const { body } = req;
  if (body) {
    const messageObj = body.message;
    await handleMessage(messageObj);
  }
  return;
}

module.exports = { handler };
