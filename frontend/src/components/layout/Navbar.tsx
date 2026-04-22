import { CheckSquare } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 h-16 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
            <CheckSquare className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">TaskFlow</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">v1.0.0</span>
        </div>
      </div>
    </header>
  );
}
