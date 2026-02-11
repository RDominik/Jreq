import http from 'node:http';
const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: true, service: 'jreq-backend', path: req.url }));
});
server.listen(port, () => console.log(`[jreq-backend] listening on :${port}`));
