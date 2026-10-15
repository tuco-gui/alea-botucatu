module.exports = async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST') return res.status(405).json({ok:false,error:'metodo'});
  const origin=req.headers.origin||'';
  const host=req.headers.host||'';
  if(!origin || (()=>{try{return new URL(origin).host!==host}catch{return true}})()) return res.status(403).json({ok:false,error:'origem'});
  const s=req.headers['content-length'];if(s&&Number(s)>12000)return res.status(413).json({ok:false,error:'tamanho'});
  const v=req.body||{}; const txt=(key,max=140)=>String(v[key]??'').trim().slice(0,max);
  const nome=txt('nome',120),telefone=txt('whatsapp',24).replace(/\D/g,''),email=txt('email',160);
  if(txt('website')) return res.status(400).json({ok:false,error:'invalido'});
  if(nome.length<3||!/^[0-9]{10,13}$/.test(telefone)||!/^\S+@\S+\.\S+$/.test(email)||v.consentimento!==true) return res.status(400).json({ok:false,error:'dados_invalidos'});
  const url=process.env.ALEA_LEADS_WEBHOOK_URL;
  if(!url)return res.status(503).json({ok:false,error:'servico_indisponivel'});
  const fields=['renda','utm_source','utm_medium','utm_campaign','utm_id','utm_content','utm_term','gclid','fbclid','ttclid','referrer','page','website'];
  const payload={nome,whatsapp:telefone,email};
  for(const f of fields)payload[f]=txt(f,f==='referrer'||f==='page'?300:150);
  try{
    const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(12000)});
    const result=await response.json().catch(()=>({}));
    if(!response.ok||!result.ok||!/^[A-Z0-9]{9,20}$/.test(String(result.protocolo||'')))throw new Error('registro_nao_confirmado');
    return res.status(200).json({ok:true,protocolo:result.protocolo});
  }catch(err){return res.status(502).json({ok:false,error:'falha_ao_registrar'});}
};