const data = require("./db/blogs.json");

function deleteUser(id) {
  try {
    const findUser = users.filter((user) => user.id === id);

    if (!findUser.length) {
      throw { message: "User doesn't exist", status: 400, error: true };
    }
    const userIndex = users.findIndex((user) => user.id == id);

    users.splice(userIndex, 1);
  } catch (error) {
    return { message: error.message, error: error.error, status: error.status };
  }
}
