
import { Header } from "@/components/Header";
import { AgentCard } from "@/components/AgentCard";

const MOCK_AGENTS = [
  {
    name: "John Doe",
    id: "SA001",
    type: "Site Admin",
    rating: 5,
    contacts: {
      whatsapp: "1234567890",
      messenger: "https://m.me/johndoe"
    }
  },
  {
    name: "Jane Smith",
    id: "SU001",
    type: "Super Agent",
    rating: 4,
    contacts: {
      whatsapp: "0987654321"
    }
  },
  // Add more mock data as needed
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Site Admins</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {MOCK_AGENTS.map((agent) => (
              <AgentCard key={agent.id} {...agent} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
