import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  showSparkline?: boolean;
  className?: string;
}

export default function MetricsCard({
  title,
  value,
  change,
  changeType = "neutral",
  showSparkline = false,
  className = ""
}: MetricsCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-green-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-[#70707B]";
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case "positive":
        return <TrendingUp className="w-4 h-4" />;
      case "negative":
        return <TrendingDown className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className={`bg-white rounded-[20px] border border-[#E8E8ED] shadow-[0_4px_8px_0_rgba(0,0,0,0.1)] p-6 ${className}`}>
      {/* Title */}
      <div className="text-sm font-bold text-[#70707B] mb-2">
        {title}
      </div>

      {/* Value */}
      <div className="text-2xl sm:text-3xl font-bold text-black mb-2">
        {value}
      </div>

      {/* Change and Sparkline */}
      <div className="flex items-center justify-between">
        {change && (
          <div className={`flex items-center gap-1 text-sm font-medium ${getChangeColor()}`}>
            {getChangeIcon()}
            <span>{change}</span>
          </div>
        )}

        {showSparkline && (
          <div className="flex-1 max-w-[100px] h-8 ml-4">
            {/* Simple sparkline SVG */}
            <svg className="w-full h-full" viewBox="0 0 100 32">
              <path
                d="M0 16 L20 12 L40 20 L60 8 L80 14 L100 10"
                stroke="#129AD7"
                strokeWidth="2"
                fill="none"
                className="opacity-60"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}