export default function TestPage() {
  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
      <h1 style={{ color: "red", fontSize: "32px" }}>
        TEST PAGE - If you see this, React is working!
      </h1>
      <p style={{ color: "blue" }}>This is a test page with inline styles.</p>
      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "yellow",
        }}
      >
        <p>If you see this yellow box, the page is rendering correctly.</p>
        <p>The issue is likely with Tailwind CSS not loading.</p>
      </div>
    </div>
  );
}
