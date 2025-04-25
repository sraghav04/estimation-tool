/* A dictionary of error messages. */
const errorDictionary = {
  /* TRIGGERS_METADATA error codes */
  TRIGGERS_METADATA_BAD_PAYLOAD: (details = 'TRIGGERS_METADATA_BAD_PAYLOAD') => ({
    errorId: 'NC_101',
    details,
  }),
  /* TRIGGERS_FILTERS error codes */
  TRIGGERS_FILTERS_INTERNAL_ERROR: (details = 'TRIGGERS_FILTERS_INTERNAL_ERROR') => ({
    errorId: 'NC_102',
    details,
  }),
  /* TRIGGERS_METADATA error codes */
  TRIGGERS_METADATA_INTERNAL_ERROR: (details = 'TRIGGERS_METADATA_INTERNAL_ERROR') => ({
    errorId: 'NC_103',
    details,
  }),
  /* TRIGGERS_STATS error codes */
  TRIGGERS_STATS_BAD_PAYLOAD: (details = 'TRIGGERS_STATS_BAD_PAYLOAD') => ({
    errorId: 'NC_104',
    details,
  }),
  TRIGGERS_STATS_INTERNAL_SERVER_ERROR: (details = 'TRIGGERS_STATS_INTERNAL_SERVER_ERROR') => ({
    errorId: 'NC_105',
    details,
  }),
  /* TRIGGERS_BRAND_SELLING_DIVISIONS error codes */
  TRIGGERS_BRAND_SELLING_DIVISIONS_INTERNAL_ERROR: (
    details = 'TRIGGERS_BRAND_SELLING_DIVISIONS_INTERNAL_ERROR',
  ) => ({
    errorId: 'NC_106',
    details,
  }),
  /* TRIGGERS_SIMULATION error codes */
  TRIGGERS_SIMULATION_STATUS_BAD_PAYLOAD: (details = 'TRIGGERS_SIMULATION_STATUS_BAD_PAYLOAD') => ({
    errorId: 'NC_107',
    details,
  }),
  TRIGGERS_SIMULATION_NOT_FOUND_ERROR: (details = 'TRIGGERS_SIMULATION_NOT_FOUND_ERROR') => ({
    errorId: 'NC_108',
    details,
  }),
  TRIGGERS_SIMULATION_STATUS_INTERNAL_ERROR: (
    details = 'TRIGGERS_SIMULATION_STATUS_INTERNAL_ERROR',
  ) => ({
    errorId: 'NC_109',
    details,
  }),
  TRIGGERS_SIMULATION_BAD_PAYLOAD: (details = 'TRIGGERS_SIMULATION_BAD_PAYLOAD') => ({
    errorId: 'NC_110',
    details,
  }),
  TRIGGERS_SIMULATION_INTERNAL_ERROR: (details = 'TRIGGERS_SIMULATION_INTERNAL_ERROR') => ({
    errorId: 'NC_111',
    details,
  }),
  /* TRIGGERS_TAGS error codes */
  TRIGGERS_TAGS_BAD_PAYLOAD: (details = 'TRIGGERS_TAGS_BAD_PAYLOAD') => ({
    errorId: 'NC_112',
    details,
  }),
  TRIGGERS_TAGS_INTERNAL_SERVER_ERROR: (details = 'TRIGGERS_TAGS_INTERNAL_SERVER_ERROR') => ({
    errorId: 'NC_113',
    details,
  }),
  /* TRIGGERS_ANALYSIS error codes */
  TRIGGERS_ANALYSIS_BAD_PAYLOAD: (details = 'TRIGGERS_ANALYSIS_BAD_PAYLOAD') => ({
    errorId: 'NC_114',
    details,
  }),
  TRIGGERS_ANALYSIS_INTERNAL_SERVER_ERROR: (
    details = 'TRIGGERS_ANALYSIS_INTERNAL_SERVER_ERROR',
  ) => ({
    errorId: 'NC_115',
    details,
  }),
  /* TRIGGERS_PUBLISH_BAD_PAYLOAD error codes */
  TRIGGERS_PUBLISH_BAD_PAYLOAD: (details = 'TRIGGERS_PUBLISH_BAD_PAYLOAD') => ({
    errorId: 'NC_116',
    details,
  }),
  /* PUBLISH_TRIGGERS_INTERNAL_ERROR error codes */
  PUBLISH_TRIGGERS_INTERNAL_ERROR: (details = 'PUBLISH_TRIGGERS_INTERNAL_ERROR') => ({
    errorId: 'NC_117',
    details,
  }),
  /* TRIGGERS_RECONFIGURE_BAD_PAYLOAD error codes */
  TRIGGERS_RECONFIGURE_BAD_PAYLOAD: (details = 'TRIGGERS_RECONFIGURE_BAD_PAYLOAD') => ({
    errorId: 'NC_118',
    details,
  }),
  /* TRIGGERS_RECONFIGURE_INTERNAL_ERROR error codes */
  TRIGGERS_RECONFIGURE_INTERNAL_ERROR: (details = 'TRIGGERS_RECONFIGURE_INTERNAL_ERROR') => ({
    errorId: 'NC_119',
    details,
  }),
  USER_ACCESS_TOKEN_MISSING: (message = 'USER_ACCESS_TOKEN_MISSING') => ({
    errorId: 'NC_120',
    details: 'USER_ACCESS_TOKEN_MISSING',
    message,
  }),
  USER_ACCESS_TOKEN_INVALID: (message = 'USER_ACCESS_TOKEN_INVALID') => ({
    errorId: 'NC_121',
    details: 'USER_ACCESS_TOKEN_INVALID',
    message,
  }),
  TRIGGERS_SIMULATION_CANCEL_BAD_PAYLOAD: (details = 'TRIGGERS_SIMULATION_CANCEL_BAD_PAYLOAD') => ({
    errorId: 'NC_122',
    details,
  }),
  TRIGGERS_SIMULATION_CANCEL_INTERNAL_ERROR: (
    details = 'TRIGGERS_SIMULATION_CANCEL_INTERNAL_ERROR',
  ) => ({
    errorId: 'NC_123',
    details,
  }),
};

module.exports = {
  errorDictionary,
};
