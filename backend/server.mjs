import http from 'node:http';
const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  if (req.url == '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok', service: 'jreq-backend' }));
  }
  if (req.url == '/api/hello') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: 'Hello from Jreq API' }));
  }

  if (req.url == '/api/schema') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const schema = {
      entities: [
        { name: 'Project', fields: ['id','name','key','createdAt','updatedAt'] },
        { name: 'Epic', fields: ['id','projectId','title','status','priority'] },
        { name: 'UserStory', fields: ['id','epicId','title','status','assignee','points'] },
        { name: 'Task', fields: ['id','userStoryId','title','status','assignee','dueDate'] },
        { name: 'CustomAttribute', fields: ['id','entityType','name','type','options','required'] }
      ]
    };
    return res.end(JSON.stringify(schema));
  }
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: true, service: 'jreq-backend', path: req.url }));
});
server.listen(port, () => console.log(`[jreq-backend] listening on :${port}`));
