import { Card } from "./ui/card";
import { FileText, ExternalLink, ArrowRight, Info } from "lucide-react";
import { Button } from "./ui/button";
import { localLaw84Content } from "../data/localLaw84Contents";

export function LinkDesignOptions() {
  const { title, description, officialHref, officialLinkLabel } =
    localLaw84Content;

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-gray-900">Link Design Options</h2>

      {/* Option 1: Inline Link with External Icon */}
      <div>
        <h3 className="text-gray-900 mb-4">
          Option 1: Inline Link with External Icon (Subtle)
        </h3>
        <Card className="border-l-4 border-l-blue-500 bg-blue-50/50 border-blue-200">
          <div className="p-6">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {description}{" "}
                  <a
                    href={officialHref}
                    className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 hover:underline"
                  >
                    {officialLinkLabel}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Option 2: Button-Style Link */}
      <div>
        <h3 className="text-gray-900 mb-4">
          Option 2: Button-Style Link (Prominent)
        </h3>
        <Card className="border-l-4 border-l-blue-500 bg-blue-50/50 border-blue-200">
          <div className="p-6">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white hover:bg-blue-50 text-blue-600 border-blue-300"
                >
                  <a
                    href={officialHref}
                    className="inline-flex items-center gap-2"
                  >
                    More Info: NYC DOB
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Option 3: Separated Footer Link */}
      <div>
        <h3 className="text-gray-900 mb-4">
          Option 3: Separated Footer Link (Professional)
        </h3>
        <Card className="border-l-4 border-l-blue-500 bg-blue-50/50 border-blue-200">
          <div className="p-6">
            <div className="flex items-start gap-3 pb-4 border-b border-blue-200">
              <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
            <div className="pt-3 flex items-center justify-between">
              <a
                href={officialHref}
                className="text-sm text-blue-600 hover:text-blue-700 inline-flex items-center gap-2 hover:underline"
              >
                <Info className="w-4 h-4" />
                View Official NYC DOB Information
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </Card>
      </div>

      {/* Option 4: Inline Badge Style */}
      <div>
        <h3 className="text-gray-900 mb-4">
          Option 4: Inline Badge Style (Modern)
        </h3>
        <Card className="border-l-4 border-l-blue-500 bg-blue-50/50 border-blue-200">
          <div className="p-6">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {description}
                </p>
                <a
                  href={officialHref}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  NYC DOB Official Page
                </a>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Option 5: Right-aligned with icon */}
      <div>
        <h3 className="text-gray-900 mb-4">
          Option 5: Right-Aligned Link (Balanced)
        </h3>
        <Card className="border-l-4 border-l-blue-500 bg-blue-50/50 border-blue-200">
          <div className="p-6">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-gray-900">{title}</h3>
                  <a
                    href={officialHref}
                    className="text-xs text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 hover:underline whitespace-nowrap flex-shrink-0"
                  >
                    NYC DOB
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
