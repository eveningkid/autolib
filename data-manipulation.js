function formatData(locations) {
  return locations.map((location) => {
    return {
      ...location,
      start: new Date(location.start),
      end: new Date(location.end),
      distance: parseInt(location.distance, 10),
    };
  });
}

function computeMetadata(locations) {
  return locations.map((location) => {
    const duration = (location.end - location.start) / 1000;

    return {
      ...location,
      duration,
      durationString: moment
        .duration(duration, 'seconds')
        .humanize(),
    };
  });
}

function sortByDate(locations) {
  return locations.sort((a, b) => a.start - b.start);
}

const periodIndexToString = (periodIndex) => {
  switch (periodIndex) {
    case 0:
      return 'Matin';

    case 1:
      return 'Après-midi';

    case 2:
      return 'Soir';

    default:
      return '';
  }
};

function computeIndicators(locations) {
  const aggregated = Array(7).fill([[], [], []]);

  for (const location of locations) {
    const dayIndex = location.start.getDay();
    const dayTime = location.start.getHours() + 1;
    let dayPeriodIndex;

    if (dayTime >= 0 && dayTime <= 12) {
      dayPeriodIndex = 0;
    } else if (dayTime > 12 && dayTime <= 16) {
      dayPeriodIndex = 1;
    } else {
      dayPeriodIndex = 2;
    }

    aggregated[dayIndex][dayPeriodIndex].push(location);
  }

  const avgWaitingTimes = aggregated.map((dayLocations) => {
    return dayLocations.map((dayPeriodLocations) => {
      const sum = dayPeriodLocations.map((location) => location.duration)
        .reduce((prev, current) => prev + current);

      return sum / dayPeriodLocations.length;
    });
  });

  // { day: 'Monday', period: 'Matin', waitingTime: 321 }
  const waitingTimes = [];

  // [[[matin, matin], [aprem, aprem], [soir, soir]], ...]
  // [[avgMatin, avgAprem, avgSoir], ...]
  for (let i = 0; i < avgWaitingTimes.length; i++) {
    const avgWaitingTime = avgWaitingTimes[i];

    for (let j = 0; j < avgWaitingTime.length; j++) {
      const dayPeriodWaitingTime = avgWaitingTime[j];

      waitingTimes.push({
        day: moment().weekday(i).format('dddd'),
        period: periodIndexToString(j),
        waitingTime: moment
          .duration(dayPeriodWaitingTime, 'seconds')
          .humanize(),
      });
    }
  }

  return {
    waitingTimes,
  };
}
