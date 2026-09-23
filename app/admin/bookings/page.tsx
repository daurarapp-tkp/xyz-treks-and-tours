'use client';

import {useEffect,useState} from 'react';
import {supabase} from '@/lib/supabase';

type Booking={id:string;customer_name:string;email:string|null;phone:string|null;country:string|null;travelers:number;travel_date:string|null;message:string|null;status:string;created_at:string};
const statuses=['new','contacted','confirmed','cancelled','completed'];

export default function AdminBookings(){
 const [rows,setRows]=useState<Booking[]>([]); const [loading,setLoading]=useState(true);
 async function load(){setLoading(true);const {data,error}=await supabase.from('xyz_bookings').select('*').order('created_at',{ascending:false});if(error)alert(error.message);setRows((data||[]) as Booking[]);setLoading(false)}
 useEffect(()=>{load()},[]);
 async function status(id:string,status:string){const {error}=await supabase.from('xyz_bookings').update({status}).eq('id',id);if(error)alert(error.message);else load()}
 return <main className="admin"><div className="admin-nav"><strong>XYZ Treks & Tours — Bookings</strong><a className="btn light" href="/admin">Dashboard</a></div><div className="admin-wrap"><h1>Booking Management</h1><p className="muted">Review enquiries and update their status.</p><div className="table"><table><thead><tr><th>Customer</th><th>Contact</th><th>Travel</th><th>People</th><th>Message</th><th>Status</th></tr></thead><tbody>{loading?<tr><td colSpan={6}>Loading…</td></tr>:rows.map(b=><tr key={b.id}><td><strong>{b.customer_name}</strong><br/><small>{b.country||''}</small></td><td>{b.phone||'—'}<br/>{b.email||''}</td><td>{b.travel_date||'Flexible'}</td><td>{b.travelers}</td><td>{b.message||'—'}</td><td><select value={b.status} onChange={e=>status(b.id,e.target.value)}>{statuses.map(s=><option key={s} value={s}>{s}</option>)}</select></td></tr>)}</tbody></table></div></div></main>}
