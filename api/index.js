const Hapi = require("@hapi/hapi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const fs = require("fs/promises");

dotenv.config();

const USERS_FILE_PATH = "./users.json";

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  // Function to read users from the file
  const readUsersFromFile = async () => {
    try {
      const data = await fs.readFile(USERS_FILE_PATH, "utf-8");

      // Check if the file is empty
      if (!data.trim()) {
        return [];
      }

      return JSON.parse(data);
    } catch (error) {
      // If the file does not exist, return an empty array
      if (error.code === "ENOENT") {
        return [];
      }
      throw error;
    }
  };

  // Function to write users to the file
  const writeUsersToFile = async (users) => {
    await fs.writeFile(USERS_FILE_PATH, JSON.stringify(users), "utf-8");
  };

  // Route to subscribe a new user
  server.route({
    method: "POST",
    path: "/subscribe",
    handler: async (request, h) => {
      try {
        const { name, email, password } = request.payload;

        // Read existing users from the file
        const users = await readUsersFromFile();

        // Check if the user already exists
        const user = users.find((user) => user.email === email);
        if (user) {
          return h.response({ message: "User already exists" }).code(400);
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = {
          name,
          email,
          password: hashedPassword,
          balance: 0,
          movements: [],
        };

        // Add the new user to the list
        users.push(newUser);

        // Write the updated list of users to the file
        await writeUsersToFile(users);

        return h.response({ message: "User created" }).code(201);
      } catch (error) {
        console.error(error);
        return h.response({ message: "Internal server error" }).code(500);
      }
    },
  });

  // Route to login a user
  server.route({
    method: "POST",
    path: "/login",
    handler: async (request, h) => {
      try {
        const { email, password } = request.payload;

        // Read existing users from the file
        const users = await readUsersFromFile();

        // Check if the user exists
        const user = users.find((user) => user.email === email);

        // Check if the user exists and the password is correct
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return h.response({ message: "Invalid credentials" }).code(401);
        }

        // Generate a JWT token
        const token = jwt.sign(
          { email: user.email },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );

        return h.response({ token }).code(200);
      } catch (error) {
        console.error(error);
        return h.response({ message: "Internal server error" }).code(500);
      }
    },
  });

  server.route({
    method: "GET",
    path: "/user",
    handler: async (request, h) => {
      try {
        // Get the token from the request header
        const token = request.headers.authorization.split(" ")[1];

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Read existing users from the file
        const users = await readUsersFromFile();

        // Check if the user exists
        const user = users.find((user) => user.email === decodedToken.email);

        return h.response(user).code(200);
      } catch (error) {
        console.error(error);
        return h.response({ message: "Internal server error a" }).code(500);
      }
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
