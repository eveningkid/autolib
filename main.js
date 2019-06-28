const parsed = parseCSV(STATION_RENTALS);
const formatted = formatCSV(parsed);

let locations = formatData(formatted);
locations = computeMetadata(locations);
locations = sortByDate(locations);

const { waitingTimes } = computeIndicators(locations);

makeTable(waitingTimes, (indicator) => {
  return {
    'Jour': `${indicator.day} ${indicator.period}`,
    'Temps d\'attente moyen': indicator.waitingTime,
  };
});

makeTable(locations, (location) => {
  return {
    'Voiture': location.car,
    'Début': location.start.toLocaleString(),
    'Fin': location.end.toLocaleString(),
    'Distance': `${location.distance}km`,
    'Durée': location.durationString,
  };
});
