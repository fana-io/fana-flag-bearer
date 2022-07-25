const parseFlagData = require('../utils/parseFlagData');

const testUser1 = {
  userId: 'jjuy',
  userContext: {
    state: 'california',
    beta: true,
    age: 20,
    student: false,
  },
};

const testUser2 = {
  userId: 'yrc',
  userContext: {
    state: 'california',
    beta: false,
    age: 21,
    student: true,
  },
};

const testUser3 = {
  userId: 'ahsu',
  userContext: {
    state: 'washington',
    beta: false,
    age: 50,
    student: false,
  },
};
// const testUser4 = {
//   userId: 'rgorman',
//   userContext: {
//     state: 'alaska',
//     beta: true,
//     age: 50,
//     student: false,
//   },
// };

/*
- beta is true
- Not beta
- off flag for all
- on flag for all,
- cali or student
- cali AND student
- neither cali nor student
- userid is in 
- user id contains "u"
- age is greater than 
- age lt eq 20
*/
