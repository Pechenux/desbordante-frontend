export const myData = {
  taskInfo: {
    __typename: 'TaskInfo',
    taskID: '22fcfc02-de6e-4e4b-b75d-16e3881f68ad',
    data: {
      __typename: 'ACTaskData',
      operation: 'ADDITION',
      histogramData: {
        __typename: 'ACHistogramData',
        taskID: '22fcfc02-de6e-4e4b-b75d-16e3881f68ad',
        barsAmount: 6,
        granularity: 10,
        attributes: {
          __typename: 'Attributes',
          attribute1: 'Coffee',
          attribute2: 'Milk',
        },
        data: [
          {
            __typename: 'ACHistogramBar',
            range: [0, 1],
            median: 0.5,
            valuesInRange: 3,
            option: 'outlier',
            associatedInterval: null,
          },
          {
            __typename: 'ACHistogramBar',
            range: [1, 2],
            median: 1.5,
            valuesInRange: 8,
            option: 'default',
            associatedInterval: [1, 4],
          },
          {
            __typename: 'ACHistogramBar',
            range: [2, 3],
            median: 2.5,
            valuesInRange: 10,
            option: 'default',
            associatedInterval: [1, 4],
          },
          {
            __typename: 'ACHistogramBar',
            range: [3, 4],
            median: 3.5,
            valuesInRange: 9,
            option: 'default',
            associatedInterval: [1, 4],
          },
          {
            __typename: 'ACHistogramBar',
            range: [4, 5],
            median: 4.5,
            valuesInRange: 11,
            option: 'outlier',
            associatedInterval: null,
          },
          {
            __typename: 'ACHistogramBar',
            range: [5, 6],
            median: 5.5,
            valuesInRange: null,
            option: 'outlier',
            associatedInterval: null,
          },
          {
            __typename: 'ACHistogramBar',
            range: [6, 7],
            median: 6.5,
            valuesInRange: 1,
            option: 'outlier',
            associatedInterval: null,
          },
          {
            __typename: 'ACHistogramBar',
            range: [7, 8],
            median: 7.5,
            valuesInRange: 4,
            option: 'default',
            associatedInterval: [7, 8],
          },
          {
            __typename: 'ACHistogramBar',
            range: [8, 9],
            median: 8.5,
            valuesInRange: 2,
            option: 'outlier',
            associatedInterval: null,
          },
        ],
      },
    },
  },
};
