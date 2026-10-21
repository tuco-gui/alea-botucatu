module.exports=async function handler(req,res){
res.setHeader('Cache-Control','no-store');
if(req.method!=='POST')return res.status(405).json({ok:false,error:'metodo'});
const origin=req.headers.origin||'',host=req.headers.host||'';
if(!origin||(()=>{try{return new URL(origin).host!==host}catch{return true}})())return res.status(403).json({ok:false,error:'origem'});
if(Number(req.headers['content-length']||0)>12000)return res.status(413).json({ok:false,error:'tamanho'});
const a=req.body||{},str=(k,n=150)=>String(a[k]??'').trim().slice(0,n);
const nome=str('nome',120),whatsapp=str('whatsapp',24).replace(/\D/g,''),cidade=str('cidade',100),bairro=str('bairro',100),interesse=str('interesse',20);
if(str('website')||nome.length<3||!/^[0-9]{10,13}$/.test(whatsapp)||cidade.length<2||bairro.length<2||!['vender','alugar'].includes(interesse)||a.consentimento!==true)return res.status(400).json({ok:false,error:'dados_invalidos'});
const url='https://webhook.figueiramarketing.com.br/webhook/figueira-realize-anunciar-imovel';
const payload={nome,whatsapp,cidade,bairro,interesse,consentimento:true};
for(const k of ['utm_source','utm_medium','utm_campaign','page','referrer','website'])payload[k]=str(k,k==='referrer'||k==='page'?250:150);
try{const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(12000)});const data=await r.json().catch(()=>({}));if(!r.ok||!data.ok||!/^RI[A-Z0-9]{7,18}$/.test(String(data.protocolo||'')))throw Error('registro_nao_confirmado');return res.status(200).json({ok:true,protocolo:data.protocolo});}
catch(err){return res.status(502).json({ok:false,error:'falha_ao_registrar'});}
};