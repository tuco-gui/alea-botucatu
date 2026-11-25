// ONE Terramaris: endpoint isolado. Não encaminhar ao webhook Alea.
module.exports=async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST')return res.status(405).json({ok:false,error:'metodo'});
 const origin=req.headers.origin||'',host=req.headers.host||'';
 try{if(!origin||new URL(origin).host!==host)return res.status(403).json({ok:false,error:'origem'})}catch(_){return res.status(403).json({ok:false,error:'origem'})}
 if(Number(req.headers['content-length']||0)>12000)return res.status(413).json({ok:false,error:'tamanho'});
 const v=req.body||{},txt=(k,max=150)=>String(v[k]??'').trim().slice(0,max),nome=txt('nome',120),whatsapp=txt('whatsapp',24).replace(/\D/g,''),email=txt('email',160),renda=txt('renda',100);
 if(txt('website')||nome.length<3||!/^[1-9][0-9][2-9][0-9]{7,8}$/.test(whatsapp)||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!["Até R$ 3.000","R$ 3.001 a R$ 5.000","R$ 5.001 a R$ 8.000","Acima de R$ 8.000","Prefiro conversar com a equipe"].includes(renda)||v.consentimento!==true)return res.status(400).json({ok:false,error:'dados_invalidos'});
 const url=process.env.ONE_LEADS_WEBHOOK_URL;
 if(!url)return res.status(503).json({ok:false,error:'servico_indisponivel'});
 const payload={nome,whatsapp,email,renda,consentimento:true,empreendimento:'ONE Terramaris Botucatu',page:'/one-terramaris/'};
 for(const k of ['utm_source','utm_medium','utm_campaign','utm_id','utm_content','utm_term','gclid','fbclid','ttclid','referrer'])payload[k]=txt(k,k==='referrer'?300:150);
 try{const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(12000)}),b=await r.json().catch(()=>({}));if(!r.ok||!b.ok||!/^[A-Z0-9]{9,20}$/.test(String(b.protocolo||'')))throw new Error('registro');return res.status(200).json({ok:true,protocolo:b.protocolo})}catch(_){return res.status(502).json({ok:false,error:'falha_registro'})}
};