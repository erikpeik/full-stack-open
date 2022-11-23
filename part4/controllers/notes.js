const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes)
  })
})

notesRouter.get('/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then((note) => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

notesRouter.delete('/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

notesRouter.post('', (req, res, next) => {
  const { name, number } = req.body

  Note.findOne({ name }).then((person) => {
    if (person) {
      return res.status(400).json({ error: 'name must be unique' })
    }
  })

  const person = new Note({
    name,
    number,
  })

  person
    .save()
    .then((savedNote) => {
      res.json(savedNote)
    })
    .catch((error) => next(error))
})

notesRouter.put('/:id', (req, res, next) => {
  const { name, number } = req.body
  const id = req.params.id

  const person = {
    name,
    number,
  }

  Note.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedNote) => {
      if (updatedNote) {
        return res.json(updatedNote)
      } else {
        return res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

module.exports = notesRouter
