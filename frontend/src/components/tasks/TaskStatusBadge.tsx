import Badge from "@/components/ui/Badge";
import { TaskStatus } from "@/types/task";

export default function TaskStatusBadge({ status }: { status: TaskStatus }) {
  const configs: Record<TaskStatus, { label: string; variant: any }> = {
    todo: { label: "To Do", variant: "default" },
    in_progress: { label: "In Progress", variant: "info" },
    done: { label: "Done", variant: "success" },
  };

  const { label, variant } = configs[status];

  return <Badge variant={variant}>{label}</Badge>;
}
