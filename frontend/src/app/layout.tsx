import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';
import './globals.css';
import { ToastContainer } from 'react-toastify';

const roboto = Roboto({
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Book Store',
	description: 'Webapp to store and manage books',
	icons: '../../public/icons/stack-of-books.png',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<head>
				<link rel='icon' href='/icon.png' sizes='any' />
			</head>

			<body className={roboto.className}>
				<div className='app__container'>
					<Header />

          <main className='app__content'>
            <Sidebar />

            <section className='app__section'>
              {children}
            </section>
          </main>
				</div>
        <ToastContainer />
			</body>
		</html>
	);
}
