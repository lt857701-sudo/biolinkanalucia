const http = require('http');
const fs = require('fs');
const path = require('path');

const port = parseInt(process.env.PORT || '5173', 10);
const root = __dirname;

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jfif': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

const server = http.createServer((req, res) => {
  const safeUrl = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
  let filePath = path.join(root, safeUrl === '/' ? '/index.html' : safeUrl);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mime[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(root, '/index.html'), (err2, home) => {
          if (err2) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Erro interno do servidor');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(home);
        });
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Erro interno do servidor');
      }
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

server.listen(port, '127.0.0.1', () => {
  console.log(`[biolinkana] Servidor rodando em http://127.0.0.1:${port}`);
  console.log(`[biolinkana] Sirvendo diretório: ${root}`);
});

server.on('error', (err) => {
  console.error(`[biolinkana] Erro no servidor: ${err.message}`);
  process.exit(1);
});
