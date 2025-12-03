import { Card } from "../../components/ui/card";
import { Star, CheckCircle2 } from "lucide-react";
import {properties, type PropertyItem} from "../../data/properties"

interface PropertyListProps {
  clientId: string;
  onBuildingSelect?: (buildingName: string) => void;
}

export function PropertyList({
    clientId,
    onBuildingSelect,
  }: PropertyListProps) {
    const isScore = (score: number) => score < 4.53;
    const isCompliant = (year: number) => year < 2025;

  return (
    <div className="p-8">
      <h2 className="mb-6 text-gray-900">Property List</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {properties.map((property, idx) => (
          <Card
            key={idx}
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onBuildingSelect?.(property.title)}
          >
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              <h4 className="text-gray-900 mb-1">
                {property.title}
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                {property.subtitle}
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star
                      className="w-4 h-4 text-yellow-500"
                      fill="currentColor"
                    />
                    <span className="text-sm text-gray-600">
                      Energy Star:
                    </span>
                  </div>
                  <span className="text-gray-900">
                    {property.energyStar}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    LL97 Score:
                  </span>
                  <span
                    className={`${isScore(property.ll97Score) ? "text-green-600" : "text-red-600"}`}
                  >
                    {property.ll97Score}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Compliance:
                  </span>
                  <div className="flex items-center gap-1">
                    {isCompliant(property.compliance) ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      ""
                    )}
                    <span className="text-gray-900">
                      {property.compliance}
                    </span>
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