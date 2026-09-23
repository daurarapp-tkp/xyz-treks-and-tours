'use client';
import {useEffect,useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {supabase} from '@/lib/supabase';

export default function Booking(){
 const searchParams=useSearchParams();
 const packageId=searchParams.get('package');
 const [packageTitle,setPackageTitle]=useState('');
 const [sent,setSent]=useState(false);
 const [loading,setLoading]=useState(false);
 useEffect(()=>{if(!packageId)return;(async()=>{const {data}=await supabase.from('xyz_packages').select('title').eq('id',packageId).maybeSingle();if(data)setPackageTitle(data.title)})()},[packageId]);
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();setLoading(true);
  const f=new FormData(e.currentTarget);
  const {error}=await supabase.from('xyz_bookings').insert({
   package_id:packageId||null,customer_name:f.get('name'),email:f.get('email'),phone:f.get('phone'),
   country:f.get('country'),travelers:Number(f.get('travelers')||1),travel_date:f.get('date')||null,message:f.get('message')
  });
  setLoading(false);
  if(error)alert(error.message);else{setSent(true);e.currentTarget.reset();}
 }
 return <main><section className="pageHero"><div className="container"><div className="eyebrow">Start your journey</div><h1>Book your trip</h1><p>{packageTitle?'Enquiry for '+packageTitle:'Share your travel plans and our local team will help arrange your journey.'}</p></div></section>
 <section className="section"><div className="container"><form className="form" onSubmit={submit}><h2>Trip enquiry</h2>{sent&&<p className="success">Thank you! Your enquiry has been received. Our team will contact you soon.</p>}
 <div className="row"><div className="field"><label>Name *</label><input name="name" required/></div><div className="field"><label>Email</label><input type="email" name="email"/></div></div>
 <div className="row"><div className="field"><label>Phone / WhatsApp</label><input name="phone"/></div><div className="field"><label>Country</label><input name="country"/></div></div>
 <div className="row"><div className="field"><label>Travelers *</label><input type="number" name="travelers" min="1" max="100" defaultValue="1" required/></div><div className="field"><label>Preferred date</label><input type="date" name="date"/></div></div>
 <div className="field"><label>Message</label><textarea name="message" placeholder="Tell us your destination, dates, interests and any special requests..."/></div>
 <button className="btn primary" disabled={loading}>{loading?'Sending...':'Send Booking Enquiry'}</button></form></div></section></main>
}