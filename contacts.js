const fs = require("fs/promises");
// const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = "./db/contacts.json";

// TODO: задокументувати кожну функцію
async function listContacts() {
  // ...твій код. Повертає масив контактів.
  const data = await fs.readFile(contactsPath, "utf-8");
  const dataPase = JSON.parse(data);

  return dataPase;
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const data = await listContacts();
  const byID = data.filter(({ id }) => contactId === id)[0] ?? null;

  return byID;
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const data = await listContacts();
  const returnResult = data.filter(({ id }) => contactId === id)[0] ?? null;

  if (returnResult) {
    const filteredData = data.filter(({ id }) => contactId !== id);
    await fs.writeFile(contactsPath, JSON.stringify(filteredData), "utf-8");
  }

  return returnResult;
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
  const data = await listContacts();
  const contactObject = {
    id: "id",
    name,
    email,
    phone,
  };
  const newArray = [...data, contactObject];
  await fs.writeFile(contactsPath, JSON.stringify(newArray), "utf-8");

  return contactObject;
}

// listContacts();
// getContactById("AeHIrLTr6JkxGE6SN-0Rw");
// removeContact("AeHIrLTr6JkxGE6SN-0Rw");
// addContact("Maks", "maks.karalash@gmail.com", "0956756721");

module.exports = { listContacts, getContactById, removeContact, addContact };
