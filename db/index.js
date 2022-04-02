// imports the pg module
const { Client } = require("pg");
const { rows } = require("pg/lib/defaults");

// supply the db name and location of the database
const client = new Client("postgres://localhost:5432/juicebox-dev");

// export them
module.exports = {
  client,
  getAllUsers,
  createUser
};

async function getAllUsers() {
  const { rows } = await client.query(
    `SELECT id, username 
    FROM users;
  `
  );

  return rows;
}


// THE PATTERN - In general, in our db/index.js file we should provide the utility functions that 
// the rest of our application will use.
// We will call them from the seed file, but also from our main application file.
// That is where we are going to listen to the front-end code making AJAX requests to certain routes, and
// and will need to make our own requests to our database.

// function in db/index.js that we can use in db/seed.js

async function createUser({ username, password }) {
  try {
    const {rows} = await client.query(
      `
      INSERT INTO users(username, password)
      VALUES ($1, $2)
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `,
      [username, password]
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