import Card from "./Card";

interface Metric {
  energyStar: number;
  ll97Score: number;
  compliance: number;
}

interface Building {
  title: string;
  subtitle: string;
  image: string;
  metrics: Metric;
}

interface PortfolioCardProps {
  name: string;
  buildings: Building[];
  image: string;
}

export default function PortfolioCard({ name, buildings }: PortfolioCardProps) {
  return (
    <div className="mb-8 sm:mb-10 px-2 sm:px-4">
      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
        {name}
      </h3>

      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          xl:grid-cols-4 
          gap-4 
          sm:gap-6
        "
      >
        {buildings.map((bldg) => (
          <Card
            key={bldg.title}
            title={bldg.title}
            subtitle={bldg.subtitle}
            image={bldg.image}
            metrics={bldg.metrics}
          />
        ))}
      </div>
    </div>
  );
}

