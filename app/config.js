import "dotenv/config";

const PORT = process.env.PORT;
const DATABASE = process.env.DATABASE;
const SESSION_KEY_SECRET = process.env.SESSION_KEY_SECRET;

export { PORT, DATABASE, SESSION_KEY_SECRET };
