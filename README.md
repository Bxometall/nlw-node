<h2>if ...express, or some other dependecy</h2>

> yarn add @types/express -D // to install the types of dependency

<h2>on package.json</h2>

> line bellow: using Typescript Node to avoid using module.exports on server.ts file

> `--respawn` to hot reload the application

```javascript
"scripts": {
  "dev": "ts-node-dev --respawn src/server.ts"
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

> IMPORTANT: If you, like me, are using windows with wsl (linux) to code and you have beekeeper installed, you're going to create your database file on your windows subsystem because it can't be read by network, so on your `ormconfig.json` change:

```javascript
"database": "/mnt/c/some_folder/database.sqlite"
```

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
The `migration:create` code is used to create the migration file with the methods that are used to create and drop the tables of especific entity

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

**<h3>Creation Files Order</h3>**
Entities, Repositories, Services, Controllers

**<h3>Websock Conection (Webscocket Protocol)</h3>**
It's a connection that stays opened when is called for the first time, not like a http protocol that only reponds a call made by a client.

To work with WSProtocol we gonna need to install somethings:
First we going to need the websocket plugin
```
$ yarn add socket.io
```

After we going to add the types of this plugin so we can see wich ones we going to use when importing to the project. Install only as a Development dependency `-D`

```
$ yarn add @types/socket.io -D
```

Then we gonna need one more plugin that is called `EJS`. **EJS** *(Embedded Javascript)* is a engine that make it easier too see html and javascript code from backend to frontend in a especif url. So install `EJS Plugin` as well

```
$ yarn add ejs
```

To work it with some configurations has to be made on our `server.js` file:

```javascript
import path from 'path'

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')))
app.set('views', path.join(__dirname, '..', 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.get("/pages/client", (request: Request, response: Response) => {
  return response.render('html/client.html')
})
```

And to use our WS Application (frontend) we're going to need the client version of the plugin, what we installed before was the backend plugin:

```
$ yarn add socket.io-client
```

**<h3>Mustache</h3>**
`mustache.js` is a zero-dependency implementation of the mustache template system in JavaScript.

Is a logic-less template syntax. It can be used for HTML, config files, source code - anything. It works by expanding tags in a template using values provided in a hash or object.

```
$ yarn add mustache
or
$ npm install mustache --save
```
or you can add directly on html file

```html
<script src="https://unpkg.com/mustache@latest"></script>
```

Example:
```html
<html>
  <body onload="renderHello()">
    <div id="target">Loading...</div>
    <script id="template" type="x-tmpl-mustache">
      Hello {{ name }}!
    </script>

    <script src="https://unpkg.com/mustache@latest"></script>
    <script>
      function renderHello() {
        var template = document.getElementById('template').innerHTML;
        var rendered = Mustache.render(template, { name: 'Luke' });
        document.getElementById('target').innerHTML = rendered;
      }
    </script>
  </body>
</html>
```