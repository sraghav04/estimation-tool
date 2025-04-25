/* 
Creating a mock metadata list response for the API call. 
*/
const mockResponse = {
  /*
   * Payload: contains list of triggers
   * totalCount: total number of triggers
   */
  totalCount: 2,
  payload: [
    {
      id: '1',
      triggerName: 'Trigger 1',
      brand: 'abc',
      selectedDivision: 'd1',
      owner: 'Anand',
      tags: ['Payor', 'Tempa'],
      channels: ['Email'],
      volume: '100',
      PostVolume: '100',
      isOnCycle: false,
      isActive: true,
      tenure: 12,
      deliveryFrequency: '1 week',
      description: 'Test Description',
      capacityContribution: 0.24,
    },
    {
      id: '2',
      triggerName: 'Trigger 4',
      brand: 'abc',
      selectedDivision: 'd1',
      owner: 'Pinto',
      tags: ['Dina', 'Tempa'],
      channels: ['Email', 'Phone'],
      volume: '2000',
      PostVolume: '3000',
      isOnCycle: true,
      isActive: false,
      tenure: 12,
      deliveryFrequency: '1 week',
      description: 'Test Description',
      capacityContribution: 0.18,
    },
  ],
};

module.exports = {
  mockResponse,
};
