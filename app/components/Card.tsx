"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Card({ title, subtitle, image, metrics }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="
        bg-white border border-gray-200 rounded-xl 
        shadow-md hover:shadow-lg transition-all overflow-hidden cursor-pointer
        w-full
      "
    >
      {/* Image section */}
      <div className="relative w-full h-40 sm:h-48 md:h-56 bg-gray-200">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>

      {/* Text content */}
      <div className="p-3 sm:p-4">
        <h2 className="font-semibold text-gray-900 text-base sm:text-lg md:text-xl leading-tight">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mb-3">{subtitle}</p>

        {metrics && (
          <div className="text-xs sm:text-sm space-y-1.5 text-gray-700">
            <p className="flex items-center gap-2">
              <span className="text-yellow-500">⭐</span> 
              Energy Star: <span className="font-semibold">{metrics.energyStar}</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-blue-500">🏢</span> 
              LL97 Score: <span className="font-semibold">{metrics.ll97Score}</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-500">✅</span> 
              LL87 Compliance Year: <span className="font-semibold">{metrics.complianceYear}</span>
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}



