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
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4 pl-2">{name}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {buildings.map((bldg) => (
            <Card
            key={bldg.title}
            title={bldg.title}
            subtitle={bldg.subtitle}
            image={bldg.image}           // ✅ REQUIRED TO PREVENT THE ERROR
            metrics={bldg.metrics}       // ✅ Include if used in <Card />
            />

        ))}
      </div>
    </div>
  );
}
