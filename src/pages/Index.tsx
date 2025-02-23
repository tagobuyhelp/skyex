import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CustomerSupport } from '@/components/CustomerSupport';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/90 to-background">
      <Header />
      
      <Footer />
      <CustomerSupport />
    </div>
  );
};

export default Index;
