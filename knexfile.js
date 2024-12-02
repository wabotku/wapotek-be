module.exports = {
   development: {
     client: 'pg',
     connection: {
       host: process.env.DB_HOST,
       post: process.env.DB_PORT,
       user: process.env.DB_USER,
       password: process.env.DB_PASSWORD,
       database: process.env.DB_SCHEMA,
     },
     migrations: {
       directory: './migrations',
     },
     seeds: {
       directory: './seeds',
     },
   },
 };
 