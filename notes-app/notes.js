import fs from "fs";
import chalk from "chalk";
import { log } from "console";

const getNotes = () => {
  return "Your notes...";
};

const addNote = (title, body) => {
  const notes = loadNotes();
  
  const duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
    console.log(chalk.red.inverse("Test"))
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  
  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Note removed!"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};

const listNotes = () => {
  const notes = loadNotes()

  console.log(chalk.inverse("Your notes"));

  notes.forEach((note) => {
    console.log(note.title)
  })
  
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

export { getNotes, addNote, removeNote, listNotes };
