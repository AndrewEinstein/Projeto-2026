const express = require('express')
const fs = require('fs')
const router = express.Router()
const { logFile } = require('../middlewares/logger')

router.get('/', (req, res) => {
  if (!fs.existsSync(logFile)) return res.json([])
  const content = fs.readFileSync(logFile, 'utf8').trim()
  if (!content) return res.json([])
  const lines = content.split('\n').reverse().slice(0, 200).map(l => {
    try { return JSON.parse(l) } catch (e) { return { raw: l } }
  })
  res.json(lines)
})

module.exports = router
