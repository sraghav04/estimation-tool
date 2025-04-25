const { groupBy, sumBy, keys, first } = require('lodash');
const {
  TRIGGER_ANALYSIS_TYPE,
  TRIGGER_ANALYSIS_PER_TRIGGER_BIN_SIZE,
  PERCENT_MULTIPLIER,
} = require('../../../../constants/app.constant');

/**
 * It takes a number between 0 and 1, and returns a range of numbers between 0 and 1
 * @returns An object with the following properties:
 *   min: the minimum value of the range
 *   max: the maximum value of the range
 *   label: a string representation of the range
 */
const getTriggerRange = averageContribution => {
  const scaledAverageContribution = averageContribution * PERCENT_MULTIPLIER;
  const roundedOffContribution = Math.round(scaledAverageContribution);
  const rangeMin =
    Math.floor(roundedOffContribution / TRIGGER_ANALYSIS_PER_TRIGGER_BIN_SIZE) *
    TRIGGER_ANALYSIS_PER_TRIGGER_BIN_SIZE;
  const rangeMax = rangeMin + TRIGGER_ANALYSIS_PER_TRIGGER_BIN_SIZE - 1;
  return {
    min: rangeMin,
    max: rangeMax,
    label: `${rangeMin}-${rangeMax}`,
  };
};

/**
 * Gets the breakdown summary for each trigger in a range
 */
const getBreakdownSummary = (triggersPerBin, type) => {
  return triggersPerBin.map(trigger => {
    const breakDown = {
      id: Number(trigger.id),
      triggerName: trigger.triggerName,
      triggerType: trigger['TrigrMetadataModel.isOnCycle'] ? 'On-Cycle' : 'Off-Cycle',
      numberOfTerritories: Number(trigger.numberOfTerritories),
      averageContribution: Math.round(trigger.averageContribution * PERCENT_MULTIPLIER),
      triggerSuggestionVolume: Number(trigger['TrigrMetadataModel.volume']),
    };
    if (type === TRIGGER_ANALYSIS_TYPE.production) {
      breakDown.suggestionsClosed = trigger.suggestionsClosed * PERCENT_MULTIPLIER;
    }
    return breakDown;
  });
};

/**
 * It takes an array of objects and returns an object with the average of each property
 * @param breakdownSummary - an array of objects, each object representing a trigger
 * @param numberOfTriggers - The number of triggers that were used to generate the breakdown summary.
 * @param type - The type of trigger analysis you want to run. This can be either "production" or "test".
 * @returns An object with the following properties:
 *   numberOfTerritories: The average number of territories per trigger
 *   averageContribution: The average contribution per trigger
 *   triggerSuggestionVolume: The average trigger suggestion volume per trigger
 *   suggestionsClosed: The average suggestions closed per trigger
 */
const getAggregateSummary = (breakdownSummary, numberOfTriggers, type) => {
  const aggregateSummary = {
    numberOfTerritories: Math.floor(
      sumBy(breakdownSummary, 'numberOfTerritories') / numberOfTriggers,
    ),
    averageContribution: sumBy(breakdownSummary, 'averageContribution') / numberOfTriggers,
    triggerSuggestionVolume: sumBy(breakdownSummary, 'triggerSuggestionVolume') / numberOfTriggers,
  };
  if (type === TRIGGER_ANALYSIS_TYPE.production) {
    aggregateSummary.suggestionsClosed =
      sumBy(breakdownSummary, 'suggestionsClosed') / numberOfTriggers;
  }
  return aggregateSummary;
};

/**
 * It takes a list of triggers and returns a summary of the triggers
 * @param triggersPerBin - An array of triggers that fall within a range.
 * @param label - The label for the range.
 * @param type - The type of the trigger.
 * @returns An object with summary per range
 */
const getSummaryPerRange = (triggersPerBin, label, type) => {
  const numberOfTriggers = triggersPerBin.length;
  const breakdownSummary = getBreakdownSummary(triggersPerBin, type);
  const aggregateSummary = getAggregateSummary(breakdownSummary, numberOfTriggers, type);
  // Within a range, all the triggers would have same min and max, thus the first trigger is used to determine the values
  const firstTrigger = first(triggersPerBin);
  const averageCapacityContributionRange = {
    min: firstTrigger.min,
    max: firstTrigger.max,
  };
  const capacityUtilization = averageCapacityContributionRange.max;
  return {
    numberOfTriggers,
    capacityUtilization,
    label,
    aggregateSummary,
    averageCapacityContributionRange,
    breakdownSummary,
  };
};

/**
 * It takes in an array of trigger analysis data and returns an array of summary data for each range
 * @param triggerAnalysisPerTriggerData - This is the data that we get from the API.
 * @param type - The type of the trigger data used - simulation or productions'
 * @returns An array of objects.
 */
const processTriggerAnalysis = (triggerAnalysisPerTriggerData, type) => {
  // 1. Calculate the bin ranges the trigger should belong to
  const triggerAnalysisWithBinRange = triggerAnalysisPerTriggerData.map(trigger => ({
    ...trigger,
    ...getTriggerRange(trigger.averageContribution),
  }));
  // 2. Group the triggers based on the range calculated in the previous step
  const trigrAnalysisGroupedByLabel = groupBy(triggerAnalysisWithBinRange, 'label');
  const labels = keys(trigrAnalysisGroupedByLabel);
  return labels.map(labelKey =>
    // 3. Calculate the summary data for each range
    getSummaryPerRange(trigrAnalysisGroupedByLabel[labelKey], labelKey, type),
  );
};

module.exports = {
  processTriggerAnalysis,
};
