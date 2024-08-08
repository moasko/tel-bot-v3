const { sendInlineButtons } = require("./path/to/sendButton");

async function handleBotStart(messageObj) {
  return sendInlineButtons(messageObj, [
    [
      { text: "Midle signal", command: "/midle_signal" },
      { text: "Big signal", command: "/big_signal" },
    ],
    [
      { text: "Signal", command: "/signal" }
    ],
    [
      { text: "ID", command: "/id" },
      { text: "Contact", command: "/contact" }
    ]
  ]);
}

module.exports = { handleBotStart };
