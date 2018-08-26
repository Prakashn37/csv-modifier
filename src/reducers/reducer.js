const ReducerDefaultState = [];

const promise = new Promise((resolve, reject) => {
$.get('C2ImportFamRelSample.csv', (data) => {
      CSV = data.split('\r\n');
      CSV.pop();
      rows = CSV.length;
      resolve(CSV);
  });
  setTimeout(() => {
      reject('failure')
  }, 2000);
})

export default (state = ReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_FILE':
      return [
        ...state,
        ...CSV
      ];
    default:
      return state;
  }
};