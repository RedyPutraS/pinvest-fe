import type { ReactNode } from "react";
import cn from "utils/cn";

export interface TypoProps {
  className?: string;
  children?: ReactNode;
}

function Heading1(props: TypoProps) {
  const { className, children } = props;

  return (
    <h1 className={cn("text-[96px] leading-[144px]", className)}>{children}</h1>
  );
}

function Heading2(props: TypoProps) {
  const { className, children } = props;

  return (
    <h2 className={cn("text-[60px] leading-[90px]", className)}>{children}</h2>
  );
}

function Heading3(props: TypoProps) {
  const { className, children } = props;

  return (
    <h3 className={cn("text-[48px] leading-[72px]", className)}>{children}</h3>
  );
}

function Heading4(props: TypoProps) {
  const { className, children } = props;

  return (
    <h4 className={cn("text-[34px] leading-[51px]", className)}>{children}</h4>
  );
}

function Heading5(props: TypoProps) {
  const { className, children } = props;

  return (
    <h5 className={cn("text-[24px] leading-[36px]", className)}>{children}</h5>
  );
}

function Heading6(props: TypoProps) {
  const { className, children } = props;

  return (
    <h6 className={cn("text-[20px] leading-[30px]", className)}>{children}</h6>
  );
}

function Subtitle1(props: TypoProps) {
  const { className, children } = props;

  return (
    <div className={cn("text-[16px] leading-[24px]", className)}>
      {children}
    </div>
  );
}

function Subtitle2(props: TypoProps) {
  const { className, children } = props;

  return (
    <div className={cn("text-[14px] leading-[21px]", className)}>
      {children}
    </div>
  );
}

function Body1(props: TypoProps) {
  const { className, children } = props;

  return (
    <div className={cn("text-[16px] leading-[24px]", className)}>
      {children}
    </div>
  );
}

function Body2(props: TypoProps) {
  const { className, children } = props;

  return (
    <div className={cn("text-[14px] leading-[21px]", className)}>
      {children}
    </div>
  );
}

function Button(props: TypoProps) {
  const { className, children } = props;

  return (
    <div className={cn("text-[96px] leading-[144px]", className)}>
      {children}
    </div>
  );
}

function Caption(props: TypoProps) {
  const { className, children } = props;

  return (
    <div className={cn("text-[12px] leading-[18px]", className)}>
      {children}
    </div>
  );
}

function Overline(props: TypoProps) {
  const { className, children } = props;

  return (
    <div className={cn("text-[10px] leading-[15px]", className)}>
      {children}
    </div>
  );
}

function Typo() {
  return <div>typo</div>;
}

Typo.H1 = Heading1;
Typo.H2 = Heading2;
Typo.H3 = Heading3;
Typo.H4 = Heading4;
Typo.H5 = Heading5;
Typo.H6 = Heading6;
Typo.S1 = Subtitle1;
Typo.S2 = Subtitle2;
Typo.B1 = Body1;
Typo.B2 = Body2;
Typo.Caption = Caption;
Typo.Button = Button;
Typo.Overline = Overline;

export default Typo;
