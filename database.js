//const url="mongodb+srv://nikhildivya0777:NikhilDivya1993@server1.wwxsrcf.mongodb.net/";
import React from "react";
import ReactDOM from "react-dom";
const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'
const Root = ReactDOM.createRoot(document.getElementById('root'));
// Connection URL
const url = 'mongodb+srv://nikhildivya0777:NikhilDivya1993@server1.wwxsrcf.mongodb.net/';
const client = new MongoClient(url);

// Database Name
const dbName = 'CoderArmy';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('user');

//   const insertResult = await collection.insertMany({ "name":"alia","age":30 , "Occupation":"Actress" });
// console.log('Inserted documents =>', insertResult);
const filteredDocs = await collection.find({ "name":"nikhil"}).toArray();
console.log('Found documents filtered by { a: 3 } =>', filteredDocs);
 const element=`${filteredDocs}`
 Root.render(element);
  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());