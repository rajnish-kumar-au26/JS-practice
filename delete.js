const users = [
  { id: 1, name: "Jon" },
  { id: 2, name: "Dave" },
  { id: 3, name: "Joe" },
];

function deleteUser(id) {
  try {
    const findUser = users.filter((user) => user.id === id);

    if (!findUser.length) {
      throw { message: "User doesn't exist", status: 400, error: true };
    }
    const userIndex = users.findIndex((user) => user.id == findUser[0].id);

    users.splice(userIndex, 1);
  } catch (error) {
    return { message: error.message, error: error.error, status: error.status };
  }
}
// const userId = 3;
// deleteUser(userId);
// console.log(users);
