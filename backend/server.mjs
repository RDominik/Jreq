import express from 'express'
import cors from 'cors'
import { nanoid } from 'nanoid'

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3000

// In-memory store (MVP)
const db = {
  projects: new Map(),
  epics: new Map(),
  stories: new Map(),
  tasks: new Map(),
}

const now = () => new Date().toISOString()

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'jreq-backend' }))
app.get('/api/hello', (_req, res) => res.json({ message: 'Hello from Jreq API' }))

app.get('/api/schema', (_req, res) => {
  res.json({
    entities: [
      { name: 'Project', fields: ['id','name','key','createdAt','updatedAt'] },
      { name: 'Epic', fields: ['id','projectId','title','status','priority'] },
      { name: 'UserStory', fields: ['id','epicId','title','status','assignee','points'] },
      { name: 'Task', fields: ['id','userStoryId','title','status','assignee','dueDate'] },
      { name: 'CustomAttribute', fields: ['id','entityType','name','type','options','required'] }
    ]
  })
})

// Helpers
function create(map, data){
  const id = nanoid()
  const rec = { id, ...data }
  map.set(id, rec)
  return rec
}
function update(map, id, patch){
  const cur = map.get(id)
  if(!cur) return null
  const next = { ...cur, ...patch }
  map.set(id, next)
  return next
}
function list(map, filter = {}){
  const arr = Array.from(map.values())
  return arr.filter(x => {
    for(const k of Object.keys(filter)){
      if(filter[k] !== undefined && x[k] !== filter[k]) return false
    }
    return true
  })
}

// Projects
app.get('/api/projects', (req, res) => {
  res.json(list(db.projects))
})
app.post('/api/projects', (req, res) => {
  const { name, key } = req.body || {}
  if(!name || !key) return res.status(400).json({ error: 'name and key required' })
  const rec = create(db.projects, { name, key, createdAt: now(), updatedAt: now() })
  res.status(201).json(rec)
})
app.get('/api/projects/:id', (req, res) => {
  const r = db.projects.get(req.params.id)
  if(!r) return res.sendStatus(404)
  res.json(r)
})
app.patch('/api/projects/:id', (req, res) => {
  const r = update(db.projects, req.params.id, { ...req.body, updatedAt: now() })
  if(!r) return res.sendStatus(404)
  res.json(r)
})
app.delete('/api/projects/:id', (req, res) => {
  const ok = db.projects.delete(req.params.id)
  res.status(ok ? 204 : 404).end()
})

// Epics
app.get('/api/epics', (req, res) => {
  const { projectId } = req.query
  res.json(list(db.epics, { projectId }))
})
app.post('/api/epics', (req, res) => {
  const { projectId, title, status = 'todo', priority = 0 } = req.body || {}
  if(!projectId || !title) return res.status(400).json({ error: 'projectId and title required' })
  if(!db.projects.get(projectId)) return res.status(400).json({ error: 'project not found' })
  const rec = create(db.epics, { projectId, title, status, priority, createdAt: now(), updatedAt: now() })
  res.status(201).json(rec)
})

// Stories
app.get('/api/stories', (req, res) => {
  const { epicId } = req.query
  res.json(list(db.stories, { epicId }))
})
app.post('/api/stories', (req, res) => {
  const { epicId, title, status = 'todo', assignee = null, points = null } = req.body || {}
  if(!epicId || !title) return res.status(400).json({ error: 'epicId and title required' })
  if(!db.epics.get(epicId)) return res.status(400).json({ error: 'epic not found' })
  const rec = create(db.stories, { epicId, title, status, assignee, points, createdAt: now(), updatedAt: now() })
  res.status(201).json(rec)
})

// Tasks
app.get('/api/tasks', (req, res) => {
  const { userStoryId } = req.query
  res.json(list(db.tasks, { userStoryId }))
})
app.post('/api/tasks', (req, res) => {
  const { userStoryId, title, status = 'todo', assignee = null, dueDate = null } = req.body || {}
  if(!userStoryId || !title) return res.status(400).json({ error: 'userStoryId and title required' })
  if(!db.stories.get(userStoryId)) return res.status(400).json({ error: 'story not found' })
  const rec = create(db.tasks, { userStoryId, title, status, assignee, dueDate, createdAt: now(), updatedAt: now() })
  res.status(201).json(rec)
})

app.use((req, res) => {
  res.json({ ok: true, path: req.url })
})

app.listen(port, () => console.log(`[jreq-backend] listening on :${port}`))
