import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const port = process.env.PORT || 8080;
const indexPath = path.join(process.cwd(), 'index.html');
const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    const html = fs.readFileSync(indexPath, 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } else if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});
server.listen(port, () => console.log(`[jreq-frontend] listening on :${port}`));
