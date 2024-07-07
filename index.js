const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "contact id")
  .option("-n, --name <type>", "contact name")
  .option("-e, --email <type>", "contact email")
  .option("-p, --phone <type>", "contact phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const allContacts = await contacts.listContacts();
        console.table(allContacts);
        break;

      case "get":
        const contact = await contacts.getContactById(id);
        if (contact) {
          console.table(contact);
        } else {
          console.log("Contact not found");
        }
        break;

      case "add":
        if (!name || !email || !phone) {
          console.warn("Missing required fields for adding a contact");
          break;
        }
        const newContact = await contacts.addContact(name, email, phone);
        console.table(newContact);
        break;

      case "remove":
        if (!id) {
          console.warn("Missing ID for removing a contact");
          break;
        }
        const updatedContacts = await contacts.removeContact(id);
        console.table(updatedContacts);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error(error.message);
  }
}

invokeAction(argv);
