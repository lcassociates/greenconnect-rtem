interface PortfolioPreviewCardProps {
  name: string;
  image: string;
}

export default function PortfolioPreviewCard({ name, image }: PortfolioPreviewCardProps) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden">
      <img src={image} alt={name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
      </div>
    </div>
  );
}
