import connectToDatabase from "../database.js";

export default async function addUser ({ name, email, password, country, state }) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("Users");
    
    const newUser  = {
      name,
      email,
      password, 
      country,
      state,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(), 
      verified: false,
      nid: null,
      submit: false,
    };

    const result = await collection.insertOne(newUser);
     
  } catch {
    console.log("there is an probelm in adding user");
  }
}