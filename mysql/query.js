const dbConnection = require ('./original');
const queryBuilder = require ('./queryBuilder');
const query = queryBuilder(dbConnection)

const init = async () => {
    const data = await query('SELECT 1 + 1 AS solution');
    const { solution } = data.results[0];

    console.log({ solution });

    end(function(err) {
        if (err) {
          return console.log("Ошибка: " + err.message);
        }
        console.log("Подключение закрыто");
      });
};

init();


// Ошибка !!! 
// npm run sql

// > ejs@1.0.0 sql
// > node mysql/query.js

// node:internal/process/promises:289
//             triggerUncaughtException(err, true /* fromPromise */);
//             ^

// AggregateError
//     at internalConnectMultiple (node:net:1114:18)
//     at afterConnectMultiple (node:net:1667:5) {
//   code: 'ECONNREFUSED',
//   fatal: true,
//   [errors]: [
//     Error: connect ECONNREFUSED ::1:3306
//         at createConnectionError (node:net:1634:14)
//         at afterConnectMultiple (node:net:1664:40) {
//       errno: -61,
//       code: 'ECONNREFUSED',
//       syscall: 'connect',
//       address: '::1',
//       port: 3306
//     },
//     Error: connect ECONNREFUSED 127.0.0.1:3306
//         at createConnectionError (node:net:1634:14)
//         at afterConnectMultiple (node:net:1664:40) {
//       errno: -61,
//       code: 'ECONNREFUSED',
//       syscall: 'connect',
//       address: '127.0.0.1',
//       port: 3306
//     }
//   ]
// }
