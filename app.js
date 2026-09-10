const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const toast=(msg)=>{const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)};
function showView(id){$$('.view').forEach(v=>v.classList.toggle('active',v.id===id));$$('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.view===id));window.scrollTo({top:0,behavior:'smooth'})}
$$('.nav-item').forEach(n=>n.addEventListener('click',()=>showView(n.dataset.view)));
$$('[data-chat]').forEach(el=>el.addEventListener('click',()=>openChat(el.dataset.chat)));
function openChat(name){$('#modalTitle').textContent=name;$('#modal').classList.add('show');}
$('#closeModal').onclick=()=>$('#modal').classList.remove('show');
$('#modal').addEventListener('click',e=>{if(e.target.id==='modal')$('#modal').classList.remove('show')});
$('#sendMessage').onclick=()=>{const i=$('#messageInput');if(!i.value.trim())return;const b=document.createElement('div');b.className='bubble mine';b.textContent=i.value.trim();$('.messages').appendChild(b);i.value='';toast('Message sent')};
$('#messageInput').addEventListener('keydown',e=>{if(e.key==='Enter')$('#sendMessage').click()});
$('#tipModal').onclick=()=>{toast('Demo tip flow opened — no real funds moved');$('#modal').classList.remove('show')};
$$('[data-tip]').forEach(b=>b.onclick=()=>{toast(`Tip flow for ${b.dataset.tip} opened`)});
$$('[data-action]').forEach(b=>b.onclick=()=>{const a=b.dataset.action;toast(a==='send'?'Send flow opened':a==='receive'?'Receive address copied (demo)':'Swap flow opened')});
$('#notifyBtn').onclick=()=>toast('You have 3 new notifications');
$$('.earn-item').forEach(b=>b.onclick=()=>toast('Reward task opened'));
$('#chatSearch').addEventListener('input',e=>{const q=e.target.value.toLowerCase();$$('.chat-item').forEach(x=>x.style.display=x.innerText.toLowerCase().includes(q)?'flex':'none')});