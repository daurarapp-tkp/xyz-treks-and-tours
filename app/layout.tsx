import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export const metadata={title:'XYZ TOUR AND TREK | Nepal Trekking & Tours',description:'Explore Nepal with XYZ TOUR AND TREK.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <><Header/>{children}<Footer/></>}
