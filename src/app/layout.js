import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import UserProvider from "./context/userprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="" >

        <div>
          <UserProvider>

            <ToastContainer />

            <Navbar />

            <div className="my-2"> {children}</div>

            <Footer />
          </UserProvider>
        </div>
      </body>
    </html>
  );
}
