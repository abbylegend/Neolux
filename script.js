const panels = document.querySelectorAll('.panel');
const fileList = document.getElementById('fileList');
const activeFile = document.getElementById('activeFile');
const codeEditor = document.getElementById('codeEditor');
let authToken = '';

function showPanel(panelId) {
  panels.forEach((panel) => panel.classList.remove('active'));
  document.getElementById(panelId).classList.add('active');
}

document.querySelectorAll('.sidebar button').forEach((button) => {
  button.addEventListener('click', () => showPanel(button.dataset.panel));
});

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

async function refreshFiles() {
  const data = await api('/api/files');
  fileList.innerHTML = '';
  activeFile.innerHTML = '';
  for (const file of data.files) {
    const li = document.createElement('li');
    li.textContent = file;
    li.onclick = () => openFile(file);
    fileList.appendChild(li);
    activeFile.add(new Option(file, file));
  }
  if (data.files[0]) openFile(data.files[0]);
}

async function openFile(file) {
  const data = await api(`/api/files/${encodeURIComponent(file)}`);
  activeFile.value = file;
  codeEditor.value = data.content;
  codeEditor.dataset.syntaxBackup = data.content;
}

async function saveFile() {
  await api(`/api/files/${encodeURIComponent(activeFile.value)}`, {
    method: 'PUT', body: JSON.stringify({ content: codeEditor.value })
  });
}

async function generateProject() {
  const prompt = document.getElementById('prompt').value;
  const data = await api('/api/generate', { method: 'POST', body: JSON.stringify({ prompt }) });
  document.getElementById('generatorStatus').textContent = data.message;
  refreshFiles();
}

async function runCommand() {
  const input = document.getElementById('terminalInput');
  const data = await api('/api/terminal', { method: 'POST', body: JSON.stringify({ command: input.value }) });
  document.getElementById('terminalBox').innerHTML += `<br>&gt; ${data.output}`;
  input.value = '';
}

async function analyze() {
  const data = await api('/api/analyze', { method: 'POST', body: JSON.stringify({ code: document.getElementById('analyzeInput').value }) });
  document.getElementById('analyzeResult').innerHTML = data.result.join('<br>');
}

function renderPreview() { document.getElementById('previewFrame').src = '/preview'; }

async function fetchStats() {
  const data = await api('/api/stats');
  document.getElementById('dbProjects').textContent = data.projects;
  document.getElementById('dbUsers').textContent = data.users;
}

async function simulateDbUpdate() { await api('/api/stats/simulate', { method: 'POST' }); fetchStats(); }

function appendChat(role, msg) {
  const p = document.createElement('p');
  p.className = `chat-line ${role}`;
  p.textContent = `${role}: ${msg}`;
  document.getElementById('chatLog').appendChild(p);
}

async function sendChat() {
  const input = document.getElementById('chatInput');
  appendChat('You', input.value);
  const data = await api('/api/chat', { method: 'POST', body: JSON.stringify({ message: input.value }) });
  appendChat('Key', data.reply);
  input.value = '';
}

async function loadAgents() {
  const data = await api('/api/agents');
  document.getElementById('agentsList').innerHTML = data.agents.map((a) => `<p><b>${a.name}</b> (${a.stack}) - ${a.description}${a.pricing ? ` | ${a.pricing}` : ''}</p>`).join('');
}

async function register() {
  const username = document.getElementById('registerUser').value;
  const password = document.getElementById('registerPass').value;
  const data = await api('/api/auth/register', { method: 'POST', body: JSON.stringify({ username, password }) });
  document.getElementById('accountStatus').textContent = data.message;
}

async function login() {
  const username = document.getElementById('registerUser').value;
  const password = document.getElementById('registerPass').value;
  const data = await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) });
  authToken = data.token;
  document.getElementById('accountStatus').textContent = `Logged in as ${data.user.username}`;
}

async function saveProfile() {
  const bio = document.getElementById('profileBio').value;
  const data = await api('/api/profile', { method: 'POST', body: JSON.stringify({ token: authToken, bio }) });
  document.getElementById('accountStatus').textContent = data.message;
}

async function loadDatabase() {
  const data = await api('/api/admin/database', { method: 'POST', body: JSON.stringify({ token: authToken }) });
  document.getElementById('adminDb').textContent = JSON.stringify(data, null, 2);
}

async function sendProgramMessage() {
  const program = document.getElementById('programName').value;
  const message = document.getElementById('programMessage').value;
  const data = await api('/api/messages/broadcast', { method: 'POST', body: JSON.stringify({ token: authToken, program, message }) });
  document.getElementById('messageStatus').textContent = data.status;
}

function downloadUrl(url, fileName) {
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
}

function downloadActiveFile() { downloadUrl(`/api/download/file/${encodeURIComponent(activeFile.value)}`, activeFile.value); }
function downloadProject() { downloadUrl('/api/download/project', 'keycloudin-project.json'); }

function switchView() {
  const mode = document.getElementById('viewMode').value;
  if (mode === 'syntax') codeEditor.value = codeEditor.dataset.syntaxBackup || '';
  if (mode === 'logic') codeEditor.value = 'START\n-> INPUT\n-> PROCESS\n-> OUTPUT';
  if (mode === 'terminal') codeEditor.value = '> LOAD\n> RUN';
  if (mode === 'machine') codeEditor.value = '0101 LOAD\n0110 EXEC';
}

document.getElementById('refreshFilesBtn').onclick = refreshFiles;
document.getElementById('saveBtn').onclick = saveFile;
document.getElementById('viewMode').onchange = switchView;
document.getElementById('generateBtn').onclick = generateProject;
document.getElementById('renderBtn').onclick = renderPreview;
document.getElementById('runCommandBtn').onclick = runCommand;
document.getElementById('analyzeBtn').onclick = analyze;
document.getElementById('simulateDbUpdateBtn').onclick = simulateDbUpdate;
document.getElementById('chatSendBtn').onclick = sendChat;
document.getElementById('registerBtn').onclick = register;
document.getElementById('loginBtn').onclick = login;
document.getElementById('saveProfileBtn').onclick = saveProfile;
document.getElementById('loadDbBtn').onclick = loadDatabase;
document.getElementById('sendProgramMsgBtn').onclick = sendProgramMessage;
document.getElementById('downloadFileBtn').onclick = downloadActiveFile;
document.getElementById('downloadProjectBtn').onclick = downloadProject;

refreshFiles().then(fetchStats).then(loadAgents);
appendChat('Key', 'Key activated: multilingual coding support is online.');
