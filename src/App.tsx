import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Background from '@/components/ui/Background';
import Navbar from '@/components/layout/Navbar';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Chat from '@/pages/Chat';
import AdminUpload from '@/pages/AdminUpload';
import { useEffect } from 'react';
import { checkHealth } from '@/services/api';

export default function App() {
  useEffect(() => {
    checkHealth()
      .then((data) => console.log('Backend health:', data))
      .catch((err) => console.error('Backend health check failed', err));
  }, []);

  return (
    <BrowserRouter>
      <Background />
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/admin" element={<AdminUpload />} />
      </Routes>
    </BrowserRouter>
  );
}
