const fs = require('fs')
const path = require('path')

const logDir = path.join(__dirname, '..', '..', 'logs')
const logFile = path.join(logDir, 'system.log')

if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true })

function formatEntry(req) {
  const entry = {
    ts: new Date().toISOString(),
    method: req.method,
    path: req.originalUrl || req.url,
    ip: req.ip || req.connection?.remoteAddress,
    body: req.body || null
  }
  return JSON.stringify(entry)
}

function logger(req, res, next) {
  try {
    const line = formatEntry(req) + '\n'
    fs.appendFile(logFile, line, err => { if (err) console.error('Logger write error', err) })
  } catch (e) {
    console.error('Logger error', e)
  }
  next()
}

module.exports = { logger, logFile }
