import { type ReactNode } from "react";
import { cn } from "utils";

type Props = {
  children?: ReactNode;
  className?: string;
};

function PageBody({ children, className }: Props) {
  return (
    <div className={cn("mx-4 flex justify-center py-5 xl:mx-10", className)}>
      <div className="w-screen xl:max-w-[1300px]">{children}</div>
    </div>
  );
}

export default PageBody;
