import type { ReactNode } from "react";
import { cn } from "utils";

interface AnchorProps {
  children: ReactNode;
  className?: string;
}

export default function Anchor(props: AnchorProps) {
  const { children, className } = props;
  return (
    <div className={cn("px-2 font-semibold text-gray-600", className)}>
      {children}
    </div>
  );
}
