export default function DashboardTitle({ text }: { text: string }) {
  return (
    <h2
      className="
          text-2xl font-bold"
    >
      {text}
    </h2>
  );
}
