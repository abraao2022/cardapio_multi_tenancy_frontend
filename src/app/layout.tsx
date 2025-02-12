import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import SetSessionCookie from './components/SetSessionCookie';
import { AuthProvider } from './contexts/AuthContext';
import { SnackbarProvider } from './components/SnackbarProvider';
import ApiInterceptor from './components/ApiInterceptor';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
});

export const metadata: Metadata = {
    title: 'Vovó Gussi - Cardápio Digital',
    description: 'Confira nosso cardápio digital com pratos deliciosos e feitos com carinho.',
    keywords: ['restaurante da Gussi', 'restaurante vovó gussi', 'vovó gussi', 'comida fitness vovó gussi'],
    openGraph: {
        title: 'Vovó Gussi - Cardápio Digital',
        description: 'Confira nosso cardápio digital com pratos deliciosos e feitos com carinho.',
        url: 'https://vovogussi.com.br',
        siteName: 'Vovó Gussi',
        images: [
            {
                url: 'https://vovogussi.com.br/img/logo.png',
                width: 1200,
                height: 630,
                alt: 'Vovó Gussi - Cardápio Digital'
            }
        ],
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Vovó Gussi - Cardápio Digital',
        description: 'Confira nosso cardápio digital com pratos deliciosos e feitos com carinho.',
        images: ['https://vovogussi.com.br/img/logo.png']
    }
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <SnackbarProvider>
                    <ApiInterceptor />
                    <AuthProvider>
                        <SetSessionCookie />
                        {children}
                    </AuthProvider>
                </SnackbarProvider>
            </body>
        </html>
    );
}
