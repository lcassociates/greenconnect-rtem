import { Card } from "./ui/card";
import { portfolioClients } from "../data/portfolioClients";

interface PortfolioPageProps {
  onClientSelect: (clientId: string) => void;
}

export function PortfolioPage({ onClientSelect }: PortfolioPageProps) {
  return (
    <div className="p-8">
      <h1 className="mb-8 text-gray-900">Portfolio Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioClients.map((client) => (
          <Card
            key={client.id}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow bg-white"
            onClick={() => onClientSelect(client.id)}
          >
            <div className="grid grid-cols-2 gap-0 h-64">
              <div className="overflow-hidden">
                <img
                  src={client.image1}
                  alt={client.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="overflow-hidden">
                <img
                  src={client.image2}
                  alt={client.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-6 text-gray-900">{client.name}</h3>
              <div className="flex justify-between">
                <div>
                  <div className="text-gray-500 text-sm mb-1">Properties</div>
                  <div className="text-gray-900">
                    {client.properties}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gray-500 text-sm mb-1">
                    Active Projects
                  </div>
                  <div className="text-gray-900">
                    {client.activeProjects}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
