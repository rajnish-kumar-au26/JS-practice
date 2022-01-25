let userInfo = [
  { id: 1, name: 'subu' },
  { id: 2, name: 'shekhar' },
  { id: 3, name: 'varun' },
  { id: 4, name: 'varun' },
  { id: 5, name: 'vart4un' },
  { id: 6, name: 'varun34' },
  { id: 7, name: 'vafrerun' },
  { id: 8, name: 'varunerg' },
  { id: 9, name: 'varuergen' },
  { id: 10, name: 'varuergen' },
  { id: 11, name: 'varuergen' },
  { id: 12, name: 'varuergen' },
];
let userMobile = [
  { id: 1, mobile: '8888888889' },
  { id: 2, mobile: '9999999999' },
  { id: 7, mobile: '7777777777' },
  { id: 6, mobile: '6666666666' },
  { id: 5, mobile: '5555555555' },
  { id: 15, mobile: '4444444444' },
  { id: 3, mobile: '3333333333' },
  { id: 8, mobile: '3333333333' },
  { id: 9, mobile: '6666666666' },
  { id: 10, mobile: '5555555555' },
  { id: 11, mobile: '4444444444' },
  { id: 12, mobile: '3333333333' },
  { id: 13, mobile: '6666666666' },
  { id: 14, mobile: '5555555555' },
  { id: 4, mobile: '4444444444' },
];

let largeArray = userMobile.length > userInfo.length ? userMobile : userInfo;
let smallArray = userMobile.length > userInfo.length ? userInfo : userMobile;

let newObj = {};
smallArray.map((data) => (newObj[data.id] = data));
largeArray = largeArray.map((nedata) => {
  let obj = newObj[nedata.id] ? newObj[nedata.id] : {};
  return { ...nedata, ...obj };
});

console.log(largeArray);
