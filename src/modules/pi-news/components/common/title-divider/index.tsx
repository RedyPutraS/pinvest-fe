import React from "react";
import { cn } from "utils";

type Props = React.HTMLAttributes<HTMLHeadingElement>;

const TitleDivider = React.forwardRef<HTMLHeadingElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className="flex items-center">
        <hr className="flex-1 border-b-2 border-pv-blue-light" />
        <h1
          className={cn(
            "mx-5 text-2xl font-bold text-pv-blue-light",
            className
          )}
          {...props}
        />
        <hr className="flex-1 border-b-2 border-pv-blue-light" />
      </div>
    );
  }
);
TitleDivider.displayName = "Textarea";

export default TitleDivider;
