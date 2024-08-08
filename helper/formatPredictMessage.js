function formatPredictions(predictions) {
    return predictions.map(prediction => {
      const isPastText = prediction.isPast ? ' (Past)' : '';
      return (
        `💥 Heure de début : ${prediction.startTime}${isPastText}\n` +
        `🧨 Coefficient : ${prediction.coefficient}\n` +
        `🧨 Fiabilité : ${prediction.assurance}\n` +
        `🧭 Vitesse : ${prediction.speed}\n`
      );
    }).join('\n');
  }

  module.exports = {formatPredictions};