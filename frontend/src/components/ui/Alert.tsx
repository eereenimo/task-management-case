import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info, XCircle, X } from "lucide-react";
import { useEffect } from "react";

interface AlertProps {
  variant?: "success" | "error" | "info" | "warning";
  message: string;
  className?: string;
  onClose?: () => void;
  autoClose?: boolean;
}

export default function Alert({ 
  variant = "info", 
  message, 
  className, 
  onClose,
  autoClose = true 
}: AlertProps) {
  useEffect(() => {
    if (autoClose && onClose && variant === "success") {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose, variant]);

  const variants = {
    success: "bg-green-50 text-green-700 border-green-200",
    error: "bg-red-50 text-red-700 border-red-200",
    info: "bg-blue-50 text-blue-700 border-blue-200",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
  };

  const icons = {
    success: <CheckCircle2 className="h-5 w-5" />,
    error: <XCircle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
    warning: <AlertCircle className="h-5 w-5" />,
  };

  return (
    <div className={cn("flex items-center justify-between gap-3 rounded-md border p-3 text-sm font-medium", variants[variant], className)}>
      <div className="flex items-center gap-3">
        {icons[variant]}
        <p>{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="rounded-full p-1 hover:bg-black/5 transition-colors">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
