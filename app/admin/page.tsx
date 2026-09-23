'use client';
import {useEffect,useState} from 'react';
import {useRouter} from 'next/navigation';
import {supabase} from '@/lib/supabase';

export default function Admin(){const r=useRouter();const [loading,setLoading]=useState(true);const [stats,setStats]=useState({packages:0,bookings:0,reviews:0,posts:0});
 useEffect(()=>{(async()=>{const {data:{user}}=await supabase.auth.getUser();if(!user){r.replace('/admin/login');return}const {data:admin}=await supabase.from('xyz_admins').select('user_id').eq('user_id',user.id).maybeSingle();if(!admin){await supabase.auth.signOut();r.replace('/admin/login');return}const [p,b,v,o]=await Promise.all([supabase.from('xyz_packages').select('id',{count:'exact',head:true}),supabase.from('xyz_bookings').select('id',{count:'exact',head:true}),supabase.from('xyz_reviews').select('id',{count:'exact',head:true}),supabase.from('xyz_blog_posts').select('id',{count:'exact',head:true})]);setStats({packages:p.count||0,bookings:b.count||0,reviews:v.count||0,posts:o.count||0});setLoading(false)})()},[r]);
 if(loading)return <main className="admin"><div className="admin-wrap">Loading dashboard…</div></main>;
 const links=[['Packages','/admin/packages','Manage trekking and tour packages',stats.packages],['Bookings','/admin/bookings','View enquiries and update status',stats.bookings],['Reviews','/admin/reviews','Manage customer reviews',stats.reviews],['Blog','/admin/blog','Publish travel guides',stats.posts]];
 return <main className="admin"><div className="admin-nav"><strong>XYZ TOUR AND TREK — Admin</strong><button className="btn light" onClick={async()=>{await supabase.auth.signOut();r.push('/admin/login')}}>Logout</button></div><div className="admin-wrap"><h1>Dashboard</h1><div className="admin-grid">{links.map(([name,href,desc,count])=><a className="stat" href={href as string} key={name as string}><span className="muted">{name as string}</span><strong>{count as number}</strong><small>{desc as string}</small></a>)}</div></div></main>}
