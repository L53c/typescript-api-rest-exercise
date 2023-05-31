import express from 'express'
import type { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

import * as AuthorService from './author.service'

export const authorRouter = express.Router()

// GET: List of all Authors
authorRouter.get('/', async (req: Request, res: Response) => {
  try {
    const authors = await AuthorService.listAuthors()
    return res.status(200).json(authors)
  } catch (error: any) {
    return res.status(500).json(error.message)
    // console.log('More info about the error:', error)
  }
})

// GET: Single author by id
authorRouter.get('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10)
  try {
    const author = await AuthorService.listAuthor(id)
    if (author) return res.status(200).json(author)
    return res.status(404).json('Author could not be found')
  } catch (error: any) {
    return res.status(500).json(error.message)
  }
})

// POST: Create an author
// Params: firstName, lastName
authorRouter.post(
  '/',
  body('firstName').isString(),
  body('lastName').isString(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })
      
      try {
        const author = req.body
        const newAuthor = await AuthorService.createAuthor(author)
        return res.status(201).json(newAuthor)
      } catch (error: any) {
        return res.status(500).json(error.message)
      }
  }

)
