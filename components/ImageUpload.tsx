"use client";
import {useState} from "react";
import {supabase} from "@/lib/supabase";

export default function ImageUpload({folder="packages",onUploaded}:{folder?:string;onUploaded:(url:string)=>void}){
 const [busy,setBusy]=useState(false);
 async function upload(e:React.ChangeEvent<HTMLInputElement>){const file=e.target.files?.[0];if(!file)return;if(!["image/jpeg","image/png","image/webp","image/avif"].includes(file.type))return alert("Only JPG, PNG, WEBP and AVIF images are allowed.");if(file.size>6*1024*1024)return alert("Maximum image size is 6MB.");setBusy(true);const ext=file.name.split(".").pop()?.toLowerCase()||"jpg";const path=`${folder}/${crypto.randomUUID()}.${ext}`;const {error}=await supabase.storage.from("xyz-media").upload(path,file,{contentType:file.type,cacheControl:"31536000",upsert:false});setBusy(false);if(error)return alert(error.message);const {data}=supabase.storage.from("xyz-media").getPublicUrl(path);onUploaded(data.publicUrl)}
 return <div><label className="btn light" style={{cursor:busy?"wait":"pointer"}}>{busy?"Uploading…":"Upload Image"}<input hidden type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={upload} disabled={busy}/></label></div>
}