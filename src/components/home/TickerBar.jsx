const ITEMS = [
  { name: "S&P 500", value: "5,386.19", change: "+1.33%", up: true, data: [4, 5, 4.5, 6, 5.5, 7, 8, 7.5, 9] },
  { name: "NASDAQ 100", value: "18,432.72", change: "+1.87%", up: true, data: [3, 4, 3.8, 5, 6.2, 5.8, 7.5, 8, 9.5] },
  { name: "DOW JONES", value: "39,512.84", change: "+0.88%", up: true, data: [5, 5.5, 5, 6, 6.5, 6.2, 7, 7.8, 8] },
  { name: "VIX", value: "12.84", change: "-3.21%", up: false, data: [8, 7, 7.5, 5, 6, 4, 4.5, 3, 3.5] },
  { name: "GOLD", value: "2,389.64", change: "+0.65%", up: true, data: [4, 4.5, 5, 4.8, 6, 6.5, 6.2, 7.5, 8] },
  { name: "OIL (WTI)", value: "81.47", change: "+1.26%", up: true, data: [3, 4.5, 4, 5.5, 5, 6.5, 7, 7.4, 8.6] },
];

function Sparkline({ data, up }) {
  const w = 56;
  const h = 22;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / (max - min || 1)) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <polyline
        points={pts}
        fill="none"
        stroke={up ? "#16a34a" : "#ef4444"}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TickerBar() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 shadow-[0_8px_30px_rgba(20,20,60,0.06)] sm:grid-cols-3 lg:grid-cols-6">
      {ITEMS.map((it) => (
        <div
          key={it.name}
          className="flex items-center justify-between gap-3 bg-white px-4 py-3.5"
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
              {it.name}
            </p>
            <p className="mt-1 text-sm font-semibold text-neutral-900">
              {it.value}{" "}
              <span
                className={`text-xs font-medium ${
                  it.up ? "text-green-600" : "text-red-500"
                }`}
              >
                {it.change}
              </span>
            </p>
          </div>
          <Sparkline data={it.data} up={it.up} />
        </div>
      ))}
    </div>
  );
}
