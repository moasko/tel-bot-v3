const { axiosInstance } = require("./axios");
const { analyzedData } = require("./predicator");
const { formatPredictions } = require("../../helper/formatPredictMessage");

function sendMessage(messageObj, messageText) {
  axiosInstance.get("sendMessage", {
    params: {
      chat_id: messageObj.chat.id,
      text: messageText,
    },
  });
}

async function sendInlineButtons(messageObj, buttons) {
  const inlineKeyboard = buttons.map(row => row.map(button => ({
    text: button.text,
    callback_data: button.command,
  })));

  try {
    const response = await axiosInstance.post("sendMessage", {
      chat_id: messageObj.chat.id,
      text: "Choose an option",
      reply_markup: {
        inline_keyboard: inlineKeyboard,
      },
    });
    return response;
  } catch (error) {
    console.error(`Failed to send button: ${error.message}`);
    console.log(error.response?.data); // Log detailed error response from Telegram
    throw error;
  }
}

async function handleBotStart(messageObj) {
  return sendInlineButtons(messageObj, [
    [
      { text: "Midle signal", command: "/midle_signal" },
      { text: "Big signal", command: "/big_signal" },
    ],
    [
      { text: "Signal", command: "/signal" },
    ],
    [
      { text: "ID", command: "/id" },
      { text: "Contact", command: "/contact" },
    ],
  ]);
}

async function handleCallbackQuery(callbackQuery) {
  const messageObj = {
    chat: { id: callbackQuery.message.chat.id },
    from: { id: callbackQuery.from.id },
  };
  const command = callbackQuery.data;

  switch (command) {
    case "/midle_signal":
      return sendMessage(messageObj, "Middle signal");
    case "/big_signal":
      return sendMessage(messageObj, formatPredictions(analyzedData));
    case "/signal":
      return sendMessage(messageObj, "Signal");
    case "/id":
      return sendMessage(
        messageObj,
        `Votre identifiant : ${messageObj.from.id}`
      );
    case "/contact":
      return sendMessage(messageObj, "@moaskoDev");
    default:
      return sendMessage(messageObj, "Command not found");
  }
}

async function handleUpdate(update) {
  if (update.message) {
    return handleMessage(update.message);
  } else if (update.callback_query) {
    return handleCallbackQuery(update.callback_query);
  }
}

function handleMessage(messageObj) {
  const messageText = messageObj.text || "";

  if (messageText.charAt(0) === "/") {
    const command = messageText.substr(1);
    switch (command) {
      case "start":
        return handleBotStart(messageObj);
      case "help":
        return sendMessage(messageObj, "Help");
      case "big_signal":
        return sendMessage(messageObj, formatPredictions(analyzedData));
      case "id":
        return sendMessage(
          messageObj,
          `Votre identifiant : ${messageObj.from.id}`
        );
      case "contact":
        return sendMessage(messageObj, "@moaskoDev");
      default:
        return sendMessage(messageObj, "Command not found");
    }
  } else {
    return sendMessage(messageObj, messageText);
  }
}

module.exports = { sendMessage, handleMessage, handleBotStart, handleCallbackQuery, handleUpdate };
