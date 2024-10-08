import { AlertCircle, CheckCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AuthFormMessageProps {
  title?: string;
  message: string | undefined;
  type: "success" | "error";
  // onClearMessage: () => void;
}
const AuthFormMessage = ({
  message,
  type,
  title,
}: // onClearMessage,
AuthFormMessageProps) => {
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     onClearMessage();
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, [onClearMessage]);

  return (
    <Alert variant={type}>
      {type === "success" ? (
        <CheckCircle className="h-5 w-5" />
      ) : (
        <AlertCircle className="h-5 w-5" />
      )}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default AuthFormMessage;
