import Layout from '@/layout/Layout';
import Home from '@/pages/Home';
import { Route, Routes } from 'react-router-dom';
import NotFound from './NotFound';

export default function RootElement() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
