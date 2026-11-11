export default function Spinner() {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="w-12 h-12 rounded-full border-4 border-[var(--color-portal-dim)] border-t-[var(--color-portal)] animate-spin" />
    </div>
  );
}
