import Badge from "@/components/ui/Badge";
import { TaskPriority } from "@/types/task";

export default function TaskPriorityBadge({ priority }: { priority: TaskPriority }) {
  const configs: Record<TaskPriority, { label: string; variant: any }> = {
    low: { label: "Low", variant: "info" },
    medium: { label: "Medium", variant: "warning" },
    high: { label: "High", variant: "error" },
  };

  const { label, variant } = configs[priority];

  return <Badge variant={variant}>{label}</Badge>;
}
