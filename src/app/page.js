import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import Team from '@/components/Team';
import Booking from '@/components/Booking';
import Appointments from '@/components/Appointments';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Gallery />
      <Team />
      <Booking />
      <Appointments />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}