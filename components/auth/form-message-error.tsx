import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import { useEffect } from "react";

interface FormMessageErrorProps {
  title?: string;
  message: string;
  type: "success" | "error";
  onClearMessage: () => void;
}

export const FormMessageError = ({
  message,
  type,
  onClearMessage,
}: FormMessageErrorProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClearMessage();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClearMessage]);
  return (
    <div>
      {type === "success" ? (
        <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
          <CheckCircledIcon className="w-4 h-4" />
          <p>{message}</p>
        </div>
      ) : (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
          <ExclamationTriangleIcon className="w-4 h-4" />
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};
