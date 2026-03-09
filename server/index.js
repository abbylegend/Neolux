const express = require('express');
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const WEB_ROOT = path.resolve(__dirname, '..');
const APP_ROOT = path.join(WEB_ROOT, 'workspace');
const STATS_PATH = path.join(APP_ROOT, 'stats.json');
const PLATFORM_PATH = path.join(APP_ROOT, 'platform-data.json');

app.use(express.json({ limit: '1mb' }));
app.use(express.static(WEB_ROOT));

const sessions = new Map();

async function ensureWorkspace() {
  await fs.mkdir(APP_ROOT, { recursive: true });

  const defaultFiles = {
    'index.html': '<!DOCTYPE html><html><body><h1>Student App</h1></body></html>',
    'style.css': 'body { font-family: sans-serif; margin: 2rem; }',
    'app.js': "console.log('Student app loaded');"
  };

  for (const [name, content] of Object.entries(defaultFiles)) {
    const fullPath = path.join(APP_ROOT, name);
    try { await fs.access(fullPath); } catch { await fs.writeFile(fullPath, content, 'utf8'); }
  }

  try { await fs.access(STATS_PATH); } catch { await fs.writeFile(STATS_PATH, JSON.stringify({ projects: 1, users: 0 }, null, 2)); }
  try { await fs.access(PLATFORM_PATH); } catch {
    await fs.writeFile(PLATFORM_PATH, JSON.stringify({ users: [], profiles: {}, messages: [], programs: [] }, null, 2));
  }
}

function safePath(fileName) {
  const decoded = decodeURIComponent(fileName);
  if (!/^[\w.-]+$/.test(decoded)) throw new Error('Invalid file name');
  return path.join(APP_ROOT, decoded);
}

async function readPlatform() { return JSON.parse(await fs.readFile(PLATFORM_PATH, 'utf8')); }
async function writePlatform(data) { await fs.writeFile(PLATFORM_PATH, JSON.stringify(data, null, 2), 'utf8'); }

function chatReply(message) {
  if (String(message).toLowerCase().includes('ruby')) return 'Nora can guide Ruby code structure and Rails basics.';
  return 'Key here: I can explain HTML, CSS, JS, hosting, debugging, and agent routing.';
}

function currentUser(token) {
  const userId = sessions.get(token);
  return userId || null;
}

app.get('/api/agents', (_req, res) => {
  res.json({
    agents: [
      { name: 'Key', stack: 'Multilingual coding', description: 'Primary lingual coding assistant for mixed stacks.' },
      { name: 'Nora', stack: 'Ruby', description: 'Ruby and Rails coding agent.' },
      { name: 'Sora', stack: 'HTML', description: 'Semantic HTML and layout tutor.' },
      { name: 'Tiki', stack: 'Python', description: 'Python scripting and API agent.' },
      { name: 'Volt', stack: 'JavaScript', description: 'Frontend/backend JS coding agent.' },
      { name: 'Forge', stack: 'Java', description: 'Java and Spring fundamentals agent.' },
      { name: 'Zucchini', stack: 'Security training', description: 'Ethical hacking tutor with faint step-by-step reveal guides via terminal dashboard.', pricing: '3-day trial/account, monthly $39, annual $599 (raised), negotiable rental discount up to 20% for annual enterprise terms.' }
    ]
  });
});

app.get('/api/files', async (_req, res) => {
  const files = (await fs.readdir(APP_ROOT)).filter((file) => !file.endsWith('.json'));
  res.json({ files });
});
app.get('/api/files/:name', async (req, res) => {
  try { res.json({ content: await fs.readFile(safePath(req.params.name), 'utf8') }); } catch { res.status(404).send('File not found'); }
});
app.put('/api/files/:name', async (req, res) => {
  try { await fs.writeFile(safePath(req.params.name), req.body.content || '', 'utf8'); res.json({ ok: true }); } catch (e) { res.status(400).send(e.message); }
});

app.post('/api/generate', async (req, res) => {
  const prompt = (req.body.prompt || 'My Student Web App').trim();
  const html = `<!DOCTYPE html>\n<html><head><title>${prompt}</title><link rel="stylesheet" href="style.css"></head><body><h1>${prompt}</h1><script src="app.js"></script></body></html>`;
  await fs.writeFile(path.join(APP_ROOT, 'index.html'), html, 'utf8');
  await fs.writeFile(path.join(APP_ROOT, 'style.css'), 'body{font-family:system-ui}', 'utf8');
  await fs.writeFile(path.join(APP_ROOT, 'app.js'), "console.log('generated project')", 'utf8');
  res.json({ message: `Project generated for: ${prompt}` });
});

app.post('/api/terminal', (req, res) => res.json({ output: `Command acknowledged: ${req.body.command || ''}` }));
app.post('/api/analyze', (req, res) => {
  const code = String(req.body.code || '');
  const result = [];
  if (!code.includes('<html')) result.push('Missing html tag');
  if (!code.includes('<body')) result.push('Missing body tag');
  if (!result.length) result.push('No issues found');
  res.json({ result });
});
app.get('/api/stats', async (_req, res) => res.json(JSON.parse(await fs.readFile(STATS_PATH, 'utf8'))));
app.post('/api/stats/simulate', async (_req, res) => {
  const data = JSON.parse(await fs.readFile(STATS_PATH, 'utf8'));
  data.projects += 1; data.users += Math.floor(Math.random() * 3);
  await fs.writeFile(STATS_PATH, JSON.stringify(data, null, 2), 'utf8');
  res.json(data);
});
app.post('/api/chat', (req, res) => res.json({ reply: chatReply(req.body.message) }));

app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send('username and password required');
  const db = await readPlatform();
  if (db.users.find((u) => u.username === username)) return res.status(409).send('user exists');
  db.users.push({ id: crypto.randomUUID(), username, password, role: db.users.length ? 'user' : 'admin' });
  await writePlatform(db);
  res.json({ message: 'Account created' });
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const db = await readPlatform();
  const user = db.users.find((u) => u.username === username && u.password === password);
  if (!user) return res.status(401).send('invalid credentials');
  const token = crypto.randomBytes(12).toString('hex');
  sessions.set(token, user.id);
  res.json({ token, user: { username: user.username, role: user.role } });
});

app.post('/api/profile', async (req, res) => {
  const userId = currentUser(req.body.token);
  if (!userId) return res.status(401).send('login required');
  const db = await readPlatform();
  db.profiles[userId] = { bio: req.body.bio || '', updatedAt: new Date().toISOString() };
  await writePlatform(db);
  res.json({ message: 'Profile saved' });
});

app.post('/api/admin/database', async (req, res) => {
  const userId = currentUser(req.body.token);
  const db = await readPlatform();
  const user = db.users.find((u) => u.id === userId);
  if (!user || user.role !== 'admin') return res.status(403).send('admin only');
  res.json(db);
});

app.post('/api/messages/broadcast', async (req, res) => {
  const userId = currentUser(req.body.token);
  if (!userId) return res.status(401).send('login required');
  const db = await readPlatform();
  const message = { id: crypto.randomUUID(), program: req.body.program || 'general', body: req.body.message || '', createdAt: new Date().toISOString() };
  db.messages.push(message);
  if (!db.programs.includes(message.program)) db.programs.push(message.program);
  await writePlatform(db);
  res.json({ status: `Broadcast sent to huge program channel: ${message.program}` });
});

app.get('/api/download/file/:name', async (req, res) => {
  try { res.download(safePath(req.params.name)); } catch { res.status(404).send('not found'); }
});
app.get('/api/download/project', async (_req, res) => {
  const files = (await fs.readdir(APP_ROOT)).filter((n) => !n.endsWith('.json'));
  const bundle = {};
  for (const file of files) bundle[file] = await fs.readFile(path.join(APP_ROOT, file), 'utf8');
  res.setHeader('Content-Disposition', 'attachment; filename="keycloudin-project.json"');
  res.json({ exportedAt: new Date().toISOString(), files: bundle });
});

app.get('/preview', (_req, res) => res.sendFile(path.join(APP_ROOT, 'index.html')));

ensureWorkspace().then(() => app.listen(PORT, () => console.log(`keycloudin running at http://localhost:${PORT}`)));
