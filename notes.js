const fs = require('fs')
const chalk = require('chalk')

// savenotes overwrites file and adds new notes
const saveNotes = function (notes) {
    // json.stringify converts objects to string
        const dataJSON = JSON.stringify(notes)
        fs.writeFileSync('notes.json', dataJSON)
    }
    
//This function loads already available notes. 
// If any line of code under try fails, the code stops running and runs catch instead
const loadNotes = function () {
    try {
        // readfilesync reads files in bits. use .tostring to convert bits to string
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        // use json.parse to convert string to object. The loadNotes funtion returns the converted object 
        // from the notes.json file
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

// create a function to add notes. Function takes in two arguements
const addNote = function (title, body) {
    const notes = loadNotes()
// create a function to avoid duplicate names with same title. 
// if a note within notes has same title with addnote title, add it to duplicateNotes array. .filter forms array
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })

// if array of duplicate notes is empty, push new note
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

// remove note based on title
const removeNote = function (title) {
    const notes = loadNotes()
//if a note within notes has a title same as the title to be removed, it wil not be included in notestokeep
    const notesToKeep = notes.filter(function (note) {
        return note.title !== title
    })

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }    
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your notes'))

    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
}

// exports getnotes and addnote functions. These functions can then be used in other files
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}