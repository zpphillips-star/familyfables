// Full-screen reader layout — no navbar or footer
export default function ReadLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="read-layout">
      {children}
    </div>
  );
}
