<h2>if ...express, or some other dependecy</h2>

> yarn add @types/express -D // to install the types of dependency

<h2>on package.json</h2>

> line bellow: using Typescript Node to avoid using module.exports on server.ts file

```javascript
"scripts": {
  "dev": "ts-node-dev src/server.ts"
},
```

> using the same route like, "/" but with different verbs returns different results

```javascript
app.get("/", (request, response) => {
  return response.json({
    message: "Hello NLW 05"
  })
})

app.post("/", (request, response) => {
  return response.json({
    message: "User saved!"
  })
})
```

* * *

<h2>Database</h2>

> We can use to access database the related plugin of the service we want, like, if we want to use PostgreSQL we can add the related plugin of PostgreSQL
```
$ yarn add postgresql
or
$ npm install postgres
```

Then we can use like this

```postgres
const postgres = require('postgres')
 
const sql = postgres({ ...options }) // will default to the same as psql
 
await sql`
  select name, age from users
`
// > [{ name: 'Murray', age: 68 }, { name: 'Walter', age 78 }]
```

>The ORMs (Object Relational Mapping) frameworks

We can call the Entity and its properties directly using json with ORMFramework, like JPA from JAVA
<h3>Knex</h3>

```
$ yarn add knex
or
$ npm install knex --save

# Then add one of the following (adding a --save) flag:
$ npm install pg
$ npm install sqlite3
$ npm install mysql
$ npm install mysql2
$ npm install oracledb
$ npm install mssql
```

You can configure Knex without passing any params on the constructor that it will call the default configuration

```javascript
const pg = require('knex')();
```

more on [Knex](http://knexjs.org/).

<h3>TypeORM</h3>

TypeORM is an ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8)
```
$ yarn add typeorm
or 
$ npm install --save
```

on the project we used sqlite and typeorm needs reflect-metada so:
```
$ yarn add typeorm reflect-metada sqlite3
```

> TypeORM is more complete and more like JPA cuz adds relations and classes!
> 
> IMPORTANT: TypeORM needs typescript cus you need to inform the properties type

```javascript
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;
}
```
see more on [TypeORM](https://typeorm.io/#/).

**<h3>TypeORM Migration</h3>**

Here we're going to use the custom script that we created at `package.json typeorm` to execute typeorm, since we didn't installed the tool and we're using from the `node_modules`.

```
$ yarn typeorm migration:create -n CreateSettings
```

Use `migration:run` to execute the migration

```
$ yarn typeorm migration:run
```

> To see your database on VSCode with SQLite Explorer probably you'll need, if you use windows and WLS2 on it (linux on windows via vm), to install the database on your computer as well, my case, I needed to install sqlite

```
$ sudo apt install sqlite3
```

> Also if you want, you can install beekeeper software to see your database, like a SQuirreL, very simple to configure and use:
see more on [Beekepper](https://www.beekeeperstudio.io/).