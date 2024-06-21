import BrowseJobsSection from './components/BrowseJobsSection';
import HeroSection from './components/HeroSection';
import HomeCard from './components/HomeCard';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <HomeCard />
      <BrowseJobsSection />
    </>
  );
}
