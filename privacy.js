/* Alea Botucatu | consentimento LGPD, versão 1 */
(function(){
'use strict';
const KEY='alea_privacy_v1';
let pref={analytics:false,marketing:false},initialized=false;
try{const saved=JSON.parse(localStorage.getItem(KEY)||'null');if(saved&&saved.version===1)pref={analytics:!!saved.analytics,marketing:!!saved.marketing};}catch(_){}
window.dataLayer=window.dataLayer||[];
// Protecao contra loops de eventos de conversao originados por tags HTML do GTM.
const aleaGuarded=new Set(['alea_form_success','alea_whatsapp_click','alea_whatsapp_handoff']);
const aleaEventLast=new Map();
const aleaNativePush=window.dataLayer.push.bind(window.dataLayer);
window.dataLayer.push=function(...items){
 const now=Date.now();
 const valid=items.filter(item=>{
  if(!item||typeof item!=='object'||!aleaGuarded.has(item.event))return true;
  const last=aleaEventLast.get(item.event)||0;
  if(now-last<3000)return false;
  aleaEventLast.set(item.event,now);
  return true;
 });
 return valid.length?aleaNativePush(...valid):window.dataLayer.length;
};
function add(src){const s=document.createElement('script');s.async=true;s.src=src;document.head.appendChild(s);}
function enable(){
if(initialized)return;initialized=true;
if(pref.analytics){window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});add('https://www.googletagmanager.com/gtm.js?id=GTM-MJZS5VPC');}
if(pref.marketing){
window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
window.gtag('js',new Date());window.gtag('config','AW-18538989712');
add('https://www.googletagmanager.com/gtag/js?id=AW-18538989712');
(function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)})(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
window.fbq('init','1147098132944586');window.fbq('track','PageView');
}
}
window.aleaTrack=function(event,details){
if(aleaGuarded.has(event)){
 const now=Date.now();
 const previous=window.__aleaTrackLast?.[event]||0;
 if(now-previous<3000)return;
 window.__aleaTrackLast=window.__aleaTrackLast||{};
 window.__aleaTrackLast[event]=now;
}
if(pref.analytics)window.dataLayer.push(Object.assign({event:event},details||{}));
if(pref.marketing&&window.fbq){
if(event==='alea_form_success')window.fbq('track','Lead');
if(event==='alea_whatsapp_handoff')window.fbq('track','Contact');
}
};
document.addEventListener('click',function(e){const a=e.target.closest&&e.target.closest('a[href*="wa.me/"],a[href*="api.whatsapp.com/"]');if(a)window.aleaTrack('alea_whatsapp_click',{lead_channel:'whatsapp_link'});},true);
const style=document.createElement('style');
style.textContent='#alea-cookie-box{position:fixed;z-index:2147483000;bottom:18px;left:18px;right:18px;max-width:750px;margin:auto;background:#fff;color:#143f3c;border:1px solid #d8e2dd;border-radius:14px;box-shadow:0 14px 55px #001c1944;padding:20px;font:14px/1.55 system-ui,sans-serif}#alea-cookie-box[hidden]{display:none}#alea-cookie-box strong{font-size:17px;display:block;margin-bottom:7px}#alea-cookie-box p{margin:8px 0 14px}#alea-cookie-box a{color:#075b55;text-decoration:underline}#alea-cookie-box .actions{display:flex;gap:8px;flex-wrap:wrap}#alea-cookie-box button,.alea-privacy-control{border:1px solid #075b55;border-radius:7px;padding:10px 14px;background:#075b55;color:#fff;font-weight:700;cursor:pointer}#alea-cookie-box button.secondary{background:white;color:#075b55}#alea-cookie-box label{display:block;margin:9px 0}#alea-cookie-box input{margin-right:8px}#alea-privacy-open{background:transparent;border:0;color:inherit;text-decoration:underline;cursor:pointer;padding:6px;font:inherit}';
function render(){
document.head.appendChild(style);
const box=document.createElement('aside');box.id='alea-cookie-box';box.setAttribute('role','dialog');box.setAttribute('aria-label','Preferências de privacidade');
box.innerHTML='<strong>Privacidade e cookies</strong><p>Usamos tecnologias necessárias para o funcionamento deste site. Com sua autorização, também usamos medição de visitas (Google Analytics) e publicidade (Google Ads e Meta Pixel). Você pode recusar sem impedir o atendimento. <a href="/privacidade.html">Saiba mais</a>.</p><div id="alea-choices" hidden><label><input type="checkbox" id="alea-ana"> Permitir análise de utilização</label><label><input type="checkbox" id="alea-mkt"> Permitir publicidade e remarketing</label><p>Cookies necessários permanecem ativos. Você pode alterar sua escolha a qualquer momento.</p></div><div class="actions"><button type="button" id="alea-accept">Aceitar todos</button><button type="button" id="alea-reject" class="secondary">Rejeitar opcionais</button><button type="button" id="alea-custom" class="secondary">Personalizar</button><button type="button" id="alea-save" hidden>Salvar escolhas</button></div>';
document.body.appendChild(box);
const saved=localStorage.getItem(KEY);box.hidden=!!saved;
const link=document.createElement('button');link.type='button';link.id='alea-privacy-open';link.textContent='Preferências de cookies';link.setAttribute('aria-label','Alterar preferências de cookies');
const footer=document.querySelector('footer');if(footer)footer.appendChild(link);else document.body.appendChild(link);
function clearOptionalCookies(){const names=['_ga','_gid','_gat','_fbp','_fbc','_gcl_au'];const host=location.hostname;const domains=['',host,'.'+host,host.replace(/^www\./,''),'.'+host.replace(/^www\./,'')];document.cookie.split(';').forEach(part=>{const n=part.split('=')[0].trim();if(n.startsWith('_ga_')||n.startsWith('_gcl_'))names.push(n);});for(const n of new Set(names))for(const domain of domains)document.cookie=n+'=; Max-Age=0; Path=/; SameSite=Lax'+(domain?'; Domain='+domain:'');}
function save(a,m){const prev=localStorage.getItem(KEY);if((pref.analytics&&!a)||(pref.marketing&&!m)||(!a&&!m))clearOptionalCookies();localStorage.setItem(KEY,JSON.stringify({version:1,analytics:!!a,marketing:!!m,at:new Date().toISOString()}));pref={analytics:!!a,marketing:!!m};box.hidden=true;if(prev)location.reload();else enable();}
box.querySelector('#alea-accept').onclick=()=>save(true,true);
box.querySelector('#alea-reject').onclick=()=>save(false,false);
box.querySelector('#alea-custom').onclick=()=>{box.querySelector('#alea-choices').hidden=false;box.querySelector('#alea-save').hidden=false;box.querySelector('#alea-ana').checked=pref.analytics;box.querySelector('#alea-mkt').checked=pref.marketing;};
box.querySelector('#alea-save').onclick=()=>save(box.querySelector('#alea-ana').checked,box.querySelector('#alea-mkt').checked);
link.onclick=()=>{box.hidden=false;box.querySelector('#alea-custom').click();};
const privacyLink=document.createElement('a');privacyLink.href='/privacidade.html';privacyLink.textContent='Política de privacidade';privacyLink.style.cssText='margin-left:12px;color:inherit;text-decoration:underline';if(footer)footer.appendChild(privacyLink);else document.body.appendChild(privacyLink);
if(saved)enable();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render,{once:true});else render();
})();