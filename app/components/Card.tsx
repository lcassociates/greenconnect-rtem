"use client";
import { motion } from "framer-motion";
import Image from "next/image";

// Using 'any' for metrics type for simplicity, but define an interface in a real app!
export default function Card({ title, subtitle, image, metrics }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      // CRITICAL FIX: Removed w-64 to allow the card to take the full width of its grid column.
      className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden cursor-pointer w-full" 
    >
      {/* Image section */}
      <div className="relative w-full h-36 bg-gray-200">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 33vw"
            // Note: If images are still missing, double-check that they are in the /public/images directory.
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>

      {/* Text content */}
      <div className="p-4">
        <h2 className="font-bold text-gray-900 text-xl">{title}</h2>
        <p className="text-sm text-gray-500 mb-3">{subtitle}</p>

        {metrics && (
          <div className="text-sm space-y-1 text-gray-700">
            {/* Added some icons for better visualization, matching the mockups */}
            <p className="flex items-center gap-2">
                <span className="text-yellow-500">⭐</span> Energy Star: <span className="font-semibold">{metrics.energyStar}</span>
            </p>
            <p className="flex items-center gap-2">
                <span className="text-blue-500">🏢</span> LL97 Score: <span className="font-semibold">{metrics.ll97Score}</span>
            </p>
            <p className="flex items-center gap-2">
                <span className="text-green-500">✅</span> Compliance: <span className="font-semibold">{metrics.complianceYear}</span>
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}




