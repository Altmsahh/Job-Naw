"use client";

import { Board } from "@/lib/models/models.types";
import {
  Briefcase,
  TrendingUp,
  Target,
  XCircle,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

interface StatsBarProps {
  board: Board;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtitle?: string;
  color: string;
  bgColor: string;
}

function StatCard({ icon, label, value, subtitle, color, bgColor }: StatCardProps) {
  return (
    <div className={`flex items-center gap-3 rounded-xl ${bgColor} px-3 py-2 sm:px-4 sm:py-3 min-w-0 sm:min-w-[150px]`}>
      <div className={`rounded-lg ${color} p-2 text-white`}>{icon}</div>
      <div>
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="text-xl font-bold text-foreground">{value}</p>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}

const COLUMN_COLORS: Record<string, { dot: string; bg: string }> = {
  "Wish List": { dot: "bg-cyan-500", bg: "bg-cyan-50" },
  "Applied": { dot: "bg-purple-500", bg: "bg-purple-50" },
  "Interviewing": { dot: "bg-green-500", bg: "bg-green-50" },
  "Offer": { dot: "bg-yellow-500", bg: "bg-yellow-50" },
  "Rejected": { dot: "bg-red-500", bg: "bg-red-50" },
};

export default function StatsBar({ board }: StatsBarProps) {
  const [expanded, setExpanded] = useState(true);

  const columns = board.columns || [];
  const totalJobs = columns.reduce(
    (sum, col) => sum + (col.jobApplications?.length || 0),
    0
  );

  const offerCount =
    columns.find((c) => c.name === "Offer")?.jobApplications?.length || 0;
  const rejectedCount =
    columns.find((c) => c.name === "Rejected")?.jobApplications?.length || 0;
  const interviewCount =
    columns.find((c) => c.name === "Interviewing")?.jobApplications?.length || 0;

  const offerRate = totalJobs > 0 ? ((offerCount / totalJobs) * 100).toFixed(0) : "0";
  const activeCount = totalJobs - rejectedCount;

  return (
    <div className="mb-6 rounded-2xl border border-border bg-card shadow-sm">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-5 py-3 hover:bg-muted/50 transition-colors rounded-2xl cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-foreground">
            Application Stats
          </span>
          {!expanded && (
            <span className="ml-2 text-xs text-muted-foreground">
              {totalJobs} total · {offerRate}% offer rate
            </span>
          )}
        </div>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {/* Stats Content */}
      {expanded && (
        <div className="px-5 pb-4 space-y-4">
          {/* Main Stats Cards */}
          <div className="grid grid-cols-2 sm:flex sm:gap-3 gap-2 pb-1">
            <StatCard
              icon={<Briefcase className="h-4 w-4" />}
              label="Total Applications"
              value={totalJobs}
              subtitle={`${activeCount} active`}
              color="bg-blue-500"
              bgColor="bg-blue-50"
            />
            <StatCard
              icon={<Target className="h-4 w-4" />}
              label="Offer Rate"
              value={`${offerRate}%`}
              subtitle={`${offerCount} offer${offerCount !== 1 ? "s" : ""}`}
              color="bg-yellow-500"
              bgColor="bg-yellow-50"
            />
            <StatCard
              icon={<TrendingUp className="h-4 w-4" />}
              label="Interviewing"
              value={interviewCount}
              color="bg-green-500"
              bgColor="bg-green-50"
            />
            <StatCard
              icon={<XCircle className="h-4 w-4" />}
              label="Rejected"
              value={rejectedCount}
              color="bg-red-500"
              bgColor="bg-red-50"
            />
          </div>

          {/* Column Breakdown Bar */}
          {totalJobs > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Pipeline Breakdown</p>
              {/* Progress Bar */}
              <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
                {columns
                  .sort((a, b) => a.order - b.order)
                  .map((col) => {
                    const count = col.jobApplications?.length || 0;
                    if (count === 0) return null;
                    const percentage = (count / totalJobs) * 100;
                    const colors = COLUMN_COLORS[col.name] || {
                      dot: "bg-gray-400",
                      bg: "bg-gray-50",
                    };
                    return (
                      <div
                        key={col._id}
                        className={`${colors.dot} transition-all duration-500 first:rounded-l-full last:rounded-r-full`}
                        style={{ width: `${percentage}%` }}
                        title={`${col.name}: ${count}`}
                      />
                    );
                  })}
              </div>
              {/* Legend */}
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {columns
                  .sort((a, b) => a.order - b.order)
                  .map((col) => {
                    const count = col.jobApplications?.length || 0;
                    const colors = COLUMN_COLORS[col.name] || {
                      dot: "bg-gray-400",
                      bg: "bg-gray-50",
                    };
                    return (
                      <div key={col._id} className="flex items-center gap-1.5">
                        <div
                          className={`h-2 w-2 rounded-full ${colors.dot}`}
                        />
                        <span className="text-xs text-muted-foreground">
                          {col.name}{" "}
                          <span className="font-semibold text-foreground">
                            {count}
                          </span>
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

