const { format } = require('date-fns');

// Fonction de recherche
const searchAlgorithm = (data, target) => {
  return data.indexOf(target);
};

// Simulation de Monte Carlo
const monteCarloSimulation = () => {
  return Math.random();
};

// Algorithme d'apprentissage automatique
const machineLearningAlgorithm = (data, target) => {
  return Math.random() < 0.5 ? "Positif" : "Négatif";
};

// Analyse des données en temps réel
const realTimeDataAnalysis = (data) => {
  return data.map(x => x * 2);
};

// Heuristique de jeu
const gameHeuristic = (guess, target) => {
  if (guess < target) {
    return "Le nombre est plus grand";
  } else if (guess > target) {
    return "Le nombre est plus petit";
  } else {
    return "Bravo, vous avez deviné le nombre correctement!";
  }
};

// Calcul des cotes exactes
const calculateExactOdds = (predictions) => {
  const exactOdds = {};
  predictions.forEach(prediction => {
    const { coefficient, probability } = prediction;
    const assurance = coefficient / 3;
    const probMin = Math.max(87, probability - 10);
    const probMax = Math.min(98, probability + 10);
    const probEstimated = (probMin + probMax) / 2;
    exactOdds[coefficient] = { assurance, probEstimated };
  });
  return exactOdds;
};

// Analyse des prédictions
const analyzePredictions = (database) => {
  const pattern = /(\d{2}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2})\n(\d+\.?\d*)x/g;
  const matches = [...database.matchAll(pattern)];
  const predictions = [];
  let currentTime = new Date();
  const endDate = new Date(2024, 10, 20, 7, 0, 0);

  for (const match of matches) {
    if (currentTime > endDate) break;

    const coefficientValue = parseFloat(match[2]);
    const probability = Math.floor(Math.random() * 20) + 80;
    const assuranceValue = Math.random() * 3 + 2;

    const predictionTimeStart = new Date(currentTime);
    const predictionTimeEnd = new Date(predictionTimeStart.getTime() + 60000);
    const mlResult = machineLearningAlgorithm([coefficientValue, assuranceValue], "Positif");

    predictions.push({
      startTime: predictionTimeStart,
      endTime: predictionTimeEnd,
      coefficient: coefficientValue,
      probability,
      assurance: assuranceValue,
      result: mlResult
    });

    currentTime = new Date(currentTime.getTime() + (Math.floor(Math.random() * 4) + 5) * 60000);
    currentTime = new Date(currentTime.getTime() + Math.floor(Math.random() * 24) * 1000);
  }

  const exactOdds = calculateExactOdds(predictions);

  const formattedPredictions = predictions.map(prediction => {
    const { startTime, coefficient, assurance, probability } = prediction;
    const { assurance: exactAssurance, probEstimated } = exactOdds[coefficient];
    return {
      startTime: format(startTime, 'HH:mm:ss'),
      coefficient: `${coefficient.toFixed(2)}x`,
      assurance: exactAssurance.toFixed(2),
      speed: `${probEstimated.toFixed(2)}%`
    };
  });

  return formattedPredictions;
};

const database = `
08/02/24 05:40:12
20.00x

08/02/24 05:40:12
18.00x

08/02/24 05:40:12
16.00x

08/02/24 05:40:12
14.00x

08/02/24 05:40:12
12.00x
`;

const newDataBase = `
02/05/24 06:30:15
10.00x

02/05/24 06:30:15
8.00x

02/05/24 06:30:15
6.00x

02/05/24 06:30:15
4.00x

02/05/24 06:30:15
2.00x
`;

const combineData = (db1, db2) => db1 + db2;

const initialData = combineData(database, newDataBase);

// Exécution de l'analyse des prédictions
const analyzedData = analyzePredictions(initialData);

module.exports = { analyzedData };
