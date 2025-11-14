
export default function AIInsightsPage() {
  return (
    <div
      style={{
        margin: 0,
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        background: "#020617",
        color: "#e2e8f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          background: "rgba(15, 23, 42, 0.9)",
          border: "1px solid #1e293b",
          borderRadius: "16px",
          padding: "32px 28px",
          maxWidth: "420px",
          textAlign: "center",
          boxShadow: "0 20px 35px rgba(15, 23, 42, 0.7)",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "#34d399",
            marginBottom: "12px",
          }}
        >
          GreenConnect App
        </div>

        <h1 style={{ fontSize: "24px", marginBottom: "8px" }}>
          🚧 Page under construction
        </h1>

        <p style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "4px" }}>
          We couldn’t find the page you requested.
        </p>

        <p style={{ fontSize: "14px", color: "#94a3b8", margin: 0 }}>
          Please check the URL or return to your GreenConnect dashboard.
        </p>
      </div>
    </div>
  );
}
