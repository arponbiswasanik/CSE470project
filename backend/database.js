import { MongoClient } from "mongodb";



const url ="mongodb+srv://scm:123456scm@scm.ez2lk.mongodb.net/scm?retryWrites=true&w=majority&appName=scm";

export default async function connectToDatabase() {
  // console.log("Check3");
  const client = new MongoClient(url);

  try {
    // console.log("Check4")
    await client.connect();
    console.log("Connected to the database");

    console.log("Data loaded successfully");

    return client.db("scm");

    
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}


