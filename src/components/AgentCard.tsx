
import { useState } from 'react';
import { Star, MessageSquare, Phone } from 'lucide-react';

interface AgentCardProps {
  name: string;
  id: string;
  type: string;
  rating: number;
  contacts: {
    whatsapp?: string;
    messenger?: string;
  };
}

export const AgentCard = ({ name, id, type, rating, contacts }: AgentCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const initial = name.charAt(0).toUpperCase();

  return (
    <div 
      className="glass-card p-4 hover:bg-card/90 transition-colors cursor-pointer animate-slide-in"
      onClick={() => setShowDetails(!showDetails)}
    >
      <div className="flex items-center gap-4">
        <div className="agent-avatar">{initial}</div>
        <div className="flex-1">
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-white/60">{type}</p>
        </div>
        <div className="rating-stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < rating ? 'fill-current text-primary' : 'opacity-30'}`}
            />
          ))}
        </div>
      </div>

      {showDetails && (
        <div className="mt-4 pt-4 border-t border-primary/10 animate-fade-in">
          <p className="text-sm text-white/60 mb-2">ID: {id}</p>
          <div className="flex gap-2">
            {contacts.whatsapp && (
              <a
                href={`https://wa.me/${contacts.whatsapp}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-4 h-4" />
                WhatsApp
              </a>
            )}
            {contacts.messenger && (
              <a
                href={contacts.messenger}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare className="w-4 h-4" />
                Messenger
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
