import chalk from "chalk";
import yargs from "yargs";
import { addNote, listNotes, removeNote } from "./notes.js"; // Update import to use ES module syntax

// Customize yargs version
yargs.version("1.1.0");

console.log(chalk);

// Create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    addNote(argv.title, argv.body); // Update to use ES module function name
  },
});

// Create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    removeNote(argv.title); // Update to use ES module function name
  },
});

// Create list command
yargs.command({
  command: "list",
  describe: "List your notes",
  handler() {
    listNotes()
  },
});

// Create read command
yargs.command({
  command: "read",
  describe: "Read a note",
  handler() {
    console.log("Reading a note");
  },
});

yargs.parse();
