import { useDisclosure } from "hooks/use-disclosure";
import { cn } from "utils";

type Props = {
  children: React.ReactElement;
  className?: string;
};

const Collapse = ({ children, className }: Props) => {
  const toggle = useDisclosure();
  return (
    <>
      <div
        className={cn(
          "overflow-hidden ",
          className,
          toggle.isOpen ? "h-full" : "max-h-[190px] lg:max-h-[500px]"
        )}
      >
        {children}
      </div>
      <button
        className={cn(
          "text-lg font-medium",
          toggle.isOpen ? "text-pv-grey-medium2" : "text-pv-blue-light"
        )}
        onClick={() => toggle.onToggle()}
      >
        {toggle.isOpen ? "Sembunyikan" : "Baca selengkapnya"}
      </button>
    </>
  );
};

export default Collapse;
