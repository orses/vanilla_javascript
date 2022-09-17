const COLORS = [
  'yellow',
  'green',
  'red',
  'blue',
  'grey',
  'black',
  'white',
  'brown',
  'pink',
  'orange',
  'rgba(133,122,200)',
  '#f15025',
  '#B7617F',
  '#AA5D12',
  '#19B29A',
  '#0B7881',
  '#E07886',
  '#13F1A2',
  '#F1f5f8',
  'teal',
  'lime',
];

export const getColor = position => {
  return COLORS[position];
};

export const getColors = () => {
  return COLORS;
};
