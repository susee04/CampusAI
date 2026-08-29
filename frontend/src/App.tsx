import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Background from '@/components/ui/Background';
import Navbar from '@/components/layout/Navbar';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Chat from '@/pages/Chat';
import AdminUpload from '@/pages/AdminUpload';

export default function App() {
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
