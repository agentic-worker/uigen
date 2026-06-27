import { Loader2, FilePlus, FilePen, Eye, Trash2, ArrowRightLeft, Wrench } from "lucide-react";

interface ToolCallStatusProps {
  toolName: string;
  args: Record<string, unknown>;
  state: string;
}

function getToolLabel(toolName: string, args: Record<string, unknown>): { icon: typeof Wrench; label: string } {
  const path = (args?.path as string) || "";
  const fileName = path.split("/").filter(Boolean).pop() || path;

  if (toolName === "str_replace_editor") {
    const command = args?.command as string;
    switch (command) {
      case "create":
        return { icon: FilePlus, label: `Creating ${fileName}` };
      case "str_replace":
        return { icon: FilePen, label: `Editing ${fileName}` };
      case "insert":
        return { icon: FilePen, label: `Editing ${fileName}` };
      case "view":
        return { icon: Eye, label: `Reading ${fileName}` };
      default:
        return { icon: FilePen, label: `Modifying ${fileName}` };
    }
  }

  if (toolName === "file_manager") {
    const command = args?.command as string;
    switch (command) {
      case "delete":
        return { icon: Trash2, label: `Deleting ${fileName}` };
      case "rename": {
        const newPath = (args?.new_path as string) || "";
        const newFileName = newPath.split("/").filter(Boolean).pop() || newPath;
        return { icon: ArrowRightLeft, label: `Renaming ${fileName} → ${newFileName}` };
      }
      default:
        return { icon: Wrench, label: `${toolName}` };
    }
  }

  return { icon: Wrench, label: toolName };
}

export function ToolCallStatus({ toolName, args, state }: ToolCallStatusProps) {
  const isComplete = state === "result";
  const { icon: Icon, label } = getToolLabel(toolName, args);

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs border border-neutral-200">
      {isComplete ? (
        <Icon className="w-3.5 h-3.5 text-emerald-600" />
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
      )}
      <span className="text-neutral-700">{label}</span>
    </div>
  );
}
