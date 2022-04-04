// imports the pg module
const { Client } = require("pg");
const { rows } = require("pg/lib/defaults");

// supply the db name and location of the database
const client = new Client("postgres://localhost:5432/juicebox-dev");

// export them
module.exports = {
  client,
  getAllUsers,
  createUser,
  updateUser
};

async function getAllUsers() {
  const { rows } = await client.query(
    `SELECT id, username, name, location 
    FROM users;
  `
  );

  return rows;
}

async function updateUser(id, fields = {}) {
  // build the set string
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const {
        rows: [user], }
        = await client.query(
      `
      UPDATE users
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(fields)
      // this expression returns an array
    );

    return result;
  } catch (error) {
    throw error;
  }
}


// THE PATTERN - In general, in our db/index.js file we should provide the utility functions that 
// the rest of our application will use.
// We will call them from the seed file, but also from our main application file.
// That is where we are going to listen to the front-end code making AJAX requests to certain routes, and
// and will need to make our own requests to our database.

// function in db/index.js that we can use in db/seed.js

async function createUser({ 
    username, 
    password,
    name,
    location 
}) {
  try {
    const {rows} = await client.query(
      `
      INSERT INTO users(username, password)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `,
      [username, password, name, location]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

// later
// module.exports = {
  // add createUser here!
// };