module.exports = {
   development: {
     client: 'pg',
     connection: {
       host: 'host',
       post: 'post',
       user: 'user',
       password: 'password',
       database: 'database',
     },
     migrations: {
       directory: './migrations',
     },
     seeds: {
       directory: './seeds',
     },
   },
 };
 