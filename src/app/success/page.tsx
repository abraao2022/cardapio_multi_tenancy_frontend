'use client';
import { SuccessCheck } from '../components/SuccessCheck';
import { CopyButton } from '../components/CopyButton';
import '../App.css';
import { AppBar, Toolbar } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const SuccessPage = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const url = searchParams.get('domain') || `https://seusubdominio.facilmenu.com`;

    return (
        <>
            <AppBar position="static" sx={{ bgcolor: 'white', boxShadow: 1 }}>
                <Toolbar>
                    <Link href="/" passHref>
                        <Image src="/img/logo.png" alt="Logo" width={100} height={100} />
                    </Link>
                </Toolbar>
            </AppBar>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="card">
                    <SuccessCheck />

                    <div style={{ textAlign: 'center' }}>
                        <h1 className="title">Compra Realizada com Sucesso!</h1>
                        <p className="subtitle">Parabéns! Seu sistema está pronto para uso.</p>
                    </div>

                    <div className="instructions">
                        <h2>Instruções de Acesso</h2>

                        <div>
                            <div>
                                <p className="label">1. Acesse a URL:</p>
                                <div className="urlBox">
                                    <span className="url">{url}</span>
                                    <CopyButton text={url} />
                                </div>
                            </div>

                            <div style={{ marginTop: '1rem' }}>
                                <p className="label">2. Faça login com:</p>
                                <div className="loginInfo">
                                    <p style={{ color: '#000' }}>
                                        E-mail: <span style={{ fontWeight: 500 }}>{email}</span>
                                    </p>
                                    <p style={{ color: '#000' }}>
                                        Senha: <span style={{ fontWeight: 500 }}>Sua senha cadastrada</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="footer">
                        <p>Após o login, você terá acesso ao painel do administrador para gerenciar seu estabelecimento.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SuccessPage;
