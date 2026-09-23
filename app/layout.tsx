import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export const metadata={title:'XYZ Tour and Trek | Nepal Trekking & Tours',description:'Explore Nepal with XYZ Tour and Trek.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <><Header/>{children}<Footer/></>}
