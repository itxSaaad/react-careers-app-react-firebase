import RecentJobsSection from '../components/RecentJobsSection';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import HomeCard from '../components/HomeCard';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HomeCard />
      <RecentJobsSection />
      <Footer />
    </>
  );
}
