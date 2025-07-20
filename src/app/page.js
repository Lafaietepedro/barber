import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Appointments from '@/components/Appointments';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { Suspense, lazy } from 'react';

const Gallery = lazy(() => import('@/components/Gallery'));
const Booking = lazy(() => import('@/components/Booking'));

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Suspense fallback={<div className="text-center py-12">Carregando galeria...</div>}>
        <Gallery />
      </Suspense>
      <Suspense fallback={<div className="text-center py-12">Carregando agendamento...</div>}>
        <Booking />
      </Suspense>
      <Appointments />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}