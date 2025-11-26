interface PortfolioPreviewCardProps {
  name: string;
  image: string;
}

export default function PortfolioPreviewCard({ name, image }: PortfolioPreviewCardProps) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden w-full max-w-sm sm:max-w-none">
      <img
        src={image}
        alt={name}
        className="w-full h-48 sm:h-56 md:h-64 object-cover"
      />
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
          {name}
        </h3>
      </div>
    </div>
  );
}
