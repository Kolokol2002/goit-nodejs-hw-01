const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const dataPase = JSON.parse(data);

  return dataPase;
}

async function getContactById(contactId) {
  const data = await listContacts();
  const result = data.find(({ id }) => contactId === id);

  return result ?? null;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex(({ id }) => contactId === id);

  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

  return result;
}

async function addContact(user) {
  const data = await listContacts();
  const contactObject = {
    id: nanoid(),
    ...user,
  };
  const newArray = [...data, contactObject];
  await fs.writeFile(contactsPath, JSON.stringify(newArray, null, 2));

  return contactObject;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
