console.log('console.log(process) user :', process.env.DB_USER);
console.log('console.log(process) pass:', process.env.DB_PASSWORD);
console.log('console.log(process) name:', process.env.DB_NAME);
console.log('console.log(process) host:', process.env.DB_HOST);

const base = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'postgres',
}

module.exports = { development: base, test: base, production: base };
