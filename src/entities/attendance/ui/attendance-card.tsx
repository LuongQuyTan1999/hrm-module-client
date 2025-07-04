// 📁 src/entities/attendance/ui/attendance-card.tsx
import { Card, CardContent } from "@/shared/ui/card";
import type { AttendanceCard } from "../model/types";

interface AttendanceCardProps {
  card: AttendanceCard;
}

export function AttendanceCard({ card }: AttendanceCardProps) {
  return (
    <Card className={`${card.bgColor} border-0`}>
      <CardContent className="px-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center text-white text-xl`}
          >
            {card.icon}
          </div>
          <div>
            <p className="text-gray-600 text-sm">{card.title}</p>
            <p className={`text-2xl font-bold ${card.textColor}`}>
              {card.value}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
