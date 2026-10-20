import {getTeachers} from '../../../lib/teachers';
import {getSql} from '../../../db';
export async function POST(req:Request){
 let originHost='';try{originHost=new URL(req.headers.get('origin')||'').host}catch{};if(!originHost||originHost!==req.headers.get('host'))return Response.json({error:'Invalid origin'},{status:403});
 const b:any=await req.json().catch(()=>null);const now=Date.now();const dt=new Date(now+8*3600000);const day=dt.toISOString().slice(0,10);const m=dt.getUTCHours()*60+dt.getUTCMinutes();const slot=m>=540&&m<555?'Morning':m>=870&&m<885?'Afternoon':null;
 if(!slot||day<'2026-10-20'||day>'2026-10-23')return Response.json({error:'The scheduled session is closed.'},{status:400});
 if(!b||typeof b.name!=='string'||!getTeachers().includes(b.name)||b.name.length>100||typeof b.device!=='string'||b.device.length>100||![b.lat,b.lng,b.accuracy,b.captured].every(Number.isFinite)||Math.abs(b.lat)>90||Math.abs(b.lng)>180||b.accuracy<0||Math.abs(now-b.captured)>60000)return Response.json({error:'A fresh, valid location and name are required.'},{status:400});
 try { const sql=getSql(); await sql`INSERT INTO readings (name,device,lat,lng,accuracy,captured,received,session) VALUES (${b.name.trim()},${b.device},${b.lat},${b.lng},${b.accuracy},${b.captured},${now},${day+' '+slot})`;return Response.json({ok:true,received:now}); } catch {return Response.json({error:'The record could not be saved. Contact your administrator.'},{status:503});}
}
