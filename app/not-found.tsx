import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="max-w-md w-full rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-lg">
        <p className="text-xs font-semibold tracking-[0.2em] text-emerald-400 uppercase mb-3">
          GreenConnect App
        </p>

        <h1 className="text-2xl font-semibold text-slate-50 mb-2">
          🚧 Page under construction
        </h1>

        <p className="text-sm text-slate-300 mb-6">
          We’re still building this part of the dashboard.  
          Please check back soon or return to the portfolio overview.
        </p>

        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400 transition"
          >
            ⬅ Back to main dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
