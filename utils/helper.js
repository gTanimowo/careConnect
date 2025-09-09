const bcrypt = require("bcrypt");
const saltRounds = 10;

const passwordHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    console.error("Error hashing password:", err);
    return null;
  }
};

const comparePasswords = async (password, hashedPassword) => {
  try {
    const matchFound = await bcrypt.compare(password, hashedPassword);

    return matchFound;
  } catch (err) {
    console.log(err);
  }
  return false;
};

module.exports = { passwordHash, comparePasswords };
