/* A constant that is used to convert milliseconds to minutes. */
const MILLISECONDS_TO_MINUTES_MULTIPLIER = 60000;

/**
 * Get the difference in minutes between two dates.
 * @param dateTime2 - The date and time to compare to.
 * @param dateTime1 - The first date and time.
 * @returns The difference in minutes between two dates.
 */
const getTimeDifferenceInMinutes = (dateTime2, dateTime1) => {
  const diff = (dateTime2.getTime() - dateTime1.getTime()) / MILLISECONDS_TO_MINUTES_MULTIPLIER;
  return Math.abs(Math.round(diff));
};

/**
 * If the time difference between the current time and the simulation time is greater than the wait time, then return true.
 * @param simulationTime - The time the simulation was started.
 * @param waitTimeInMinutes - The amount of time in minutes that the user has to wait before they can take the survey
 * again.
 * @returns A boolean value.
 */
const hasWaitTimeElapsed = (simulationTime, waitTimeInMinutes) => {
  const simulationTimestamp = new Date(simulationTime);
  const currentTimestamp = new Date();
  const timeDifference = getTimeDifferenceInMinutes(currentTimestamp, simulationTimestamp);
  return timeDifference > +waitTimeInMinutes;
};

module.exports = {
  hasWaitTimeElapsed,
};
