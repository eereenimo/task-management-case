export default function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className={`h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent ${className}`} />
    </div>
  );
}
