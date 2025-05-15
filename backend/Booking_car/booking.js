import connectToDatabase from "../database.js";

export default async function addUser({
  name,
  number,
  PickUp,
  Where_to_go,
  price,
  carId,
  carBrand,
  carModel,
  carYear,
  carColor,
  carSit,
  carDetails,
  carImg,
  status = "pending",
}) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("Book_car");

    const lastUser = await collection
      .find()
      .sort({ id: -1 })
      .limit(1)
      .toArray();
    const userId = lastUser.length > 0 ? lastUser[0].id + 1 : 1;

    const newUser = {
      id: userId,
      name,
      number,
      PickUp,
      Where_to_go,
      price,
      carId,
      carBrand,
      carModel,
      carYear,
      carColor,
      carSit,
      carDetails,
      carImg,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      status,
    };

    const result = await collection.insertOne(newUser);

    return {
      success: true,
      message: "User  added successfully",
      userId: result.insertedId,
    };
  } catch (error) {
    console.error("There is a problem in adding user:", error);
    return {
      success: false,
      message: "Failed to add user",
    };
  }
}
