import {
  Bar,
  BarChart,
  Cell,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  CARD,
  CARD_TITLE,
  EYEBROW,
  formatDuration,
  type DayActivity,
} from "../dashboard.config";

const BAR_COLOR = "#0064F9";
const BAR_COLOR_MUTED = "#0064F9B3";
const GRID_COLOR = "#edf1f6";
const AXIS_COLOR = "#718096";
const CURSOR_COLOR = "#f1f5fb";

function formatMinutesLabel(value: unknown): string {
  return `${value}m`;
}

function buildAccessibleSummary(activity: DayActivity[]): string {
  return activity.map((day) => `${day.day} ${formatDuration(day.minutes)}`).join(", ");
}

function getYAxisMax(activity: DayActivity[]): number {
  const max = Math.max(0, ...activity.map((day) => day.minutes));
  return max > 0 ? Math.ceil(max * 1.15) : 10;
}

type TooltipEntry = {
  value?: number | string;
  payload?: DayActivity;
};

type ActivityTooltipProps = {
  active?: boolean;
  payload?: ReadonlyArray<TooltipEntry>;
  label?: string | number;
};

function ActivityTooltip({ active, payload, label }: ActivityTooltipProps) {
  if (!active || !payload?.length) return null;

  const minutes = Number(payload[0].value ?? 0);

  return (
    <div className="rounded-lg bg-[#111827] px-3 py-2 text-xs shadow-lg">
      <p className="font-medium text-white/70">{label}</p>
      <p className="mt-0.5 font-semibold text-white">{formatDuration(minutes)}</p>
    </div>
  );
}

type ActivityCardProps = {
  activity: DayActivity[];
};

export default function ActivityCard({ activity }: ActivityCardProps) {
  const total = activity.reduce((sum, day) => sum + day.minutes, 0);
  const max = Math.max(0, ...activity.map((day) => day.minutes));
  const yMax = getYAxisMax(activity);

  return (
    <article className={CARD}>
      <div className="flex items-start justify-between">
        <div>
          <p className={EYEBROW}>Activity</p>
          <h2 className={CARD_TITLE}>Your learning this week</h2>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold text-[#111827]">{formatDuration(total)}</p>
          <p className="text-xs text-[#718096]">total learning time</p>
        </div>
      </div>

      {activity.length === 0 ? (
        <div className="mt-8 flex h-56 items-center justify-center rounded-lg bg-[#f8fafc] text-sm text-[#718096]">
          No learning activity this week yet.
        </div>
      ) : (
        <div
          className="mt-8 h-56 w-full"
          role="img"
          aria-label={`Minutes studied per day. ${buildAccessibleSummary(activity)}.`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={activity}
              margin={{ top: 24, right: 0, bottom: 0, left: 0 }}
              barCategoryGap="28%"
            >
              <CartesianGrid vertical={false} stroke={GRID_COLOR} />

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                dy={8}
                tick={{ fill: AXIS_COLOR, fontSize: 12, fontWeight: 500 }}
              />

              <YAxis hide domain={[0, yMax]} />

              <Tooltip cursor={{ fill: CURSOR_COLOR }} content={<ActivityTooltip />} />

              <Bar
                dataKey="minutes"
                maxBarSize={56}
                radius={[6, 6, 0, 0]}
                animationDuration={600}
              >
                {activity.map((day) => (
                  <Cell
                    key={day.day}
                    fill={day.minutes === max ? BAR_COLOR : BAR_COLOR_MUTED}
                  />
                ))}

                <LabelList
                  dataKey="minutes"
                  position="top"
                  formatter={formatMinutesLabel}
                  fill={AXIS_COLOR}
                  fontSize={10}
                  fontWeight={500}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </article>
  );
}