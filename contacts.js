const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Error reading contacts file");
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === String(contactId));
  } catch (error) {
    throw new Error("Error finding contact by ID");
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== String(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
    return filteredContacts;
  } catch (error) {
    throw new Error("Error removing contact");
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: String(contacts.length + 1), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    throw new Error("Error adding new contact");
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
