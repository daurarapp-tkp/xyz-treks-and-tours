import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export const metadata={title:'XYZ Treks & Tours | Nepal Trekking & Tours',description:'Explore Nepal with XYZ Treks & Tours.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <><Header/>{children}<Footer/></>}
