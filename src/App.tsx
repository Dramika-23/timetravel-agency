import Header from './components/Header';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import ChatSection from './components/ChatSection';
import Footer from './components/Footer';
import FloatingChat from './components/FloatingChat';

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink-950">
      <Header />
      <main>
        <Hero />
        <Destinations />
        <ChatSection />
      </main>
      <Footer />
      <FloatingChat />
    </div>
  );
}
