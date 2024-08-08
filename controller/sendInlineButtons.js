const { axiosInstance } = require("./axios");

async function sendInlineButtons(messageObj, buttons) {
  const inlineKeyboard = buttons.map(row => row.map(button => ({ text: button.text, callback_data: button.command })));

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

module.exports = { sendInlineButtons };
