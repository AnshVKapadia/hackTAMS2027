import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../out/', import.meta.url))
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2',
}

export function createStaticServer() {
  return createServer(async (request, response) => {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' }).end()
      return
    }
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
      let file = path.resolve(root, '.' + pathname)
      if (file !== path.resolve(root) && !file.startsWith(path.resolve(root) + path.sep)) {
        response.writeHead(403).end()
        return
      }
      try {
        if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html')
      } catch {
        if (!path.extname(file)) file += '.html'
      }
      let body
      let status = 200
      try { body = await readFile(file) } catch {
        status = 404
        file = path.join(root, '404.html')
        body = await readFile(file)
      }
      response.writeHead(status, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' })
      response.end(request.method === 'HEAD' ? undefined : body)
    } catch {
      response.writeHead(400).end('Build the site with npm run build before starting the preview.')
    }
  })
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 3000)
  createStaticServer().listen(port, '127.0.0.1', () => console.log(`Static preview: http://localhost:${port}`))
}
