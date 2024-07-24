import DOMPurify from "isomorphic-dompurify";
import { type DetailedHTMLProps, type HTMLAttributes } from "react";
import { cn } from "utils";
import "./normalize.css";

type Props = {
  html?: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
const style = `<style>.pv-desc small, .pv-desc strike, .pv-desc strong, .pv-desc sub, .pv-desc sup, .pv-desc tt, .pv-desc var,.pv-desc h1, .pv-desc h2, .pv-desc h3, .pv-desc h4, .pv-desc h5, .pv-desc h6, .pv-desc p, .pv-desc blockquote, .pv-desc big, .pv-desc cite, .pv-desc code, .pv-desc ol, .pv-desc ul, .pv-desc li {all: revert;}</style>`;

const RenderHtml = ({ html, className, ...props }: Props) => {
  const clean = DOMPurify.sanitize(html ?? "", {
    ALLOWED_TAGS: [
      "a",
      "strong",
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "blockquote",
      "big",
      "cite",
      "code",
      "small",
      "strike",
      "sub",
      "sup",
      "tt",
      "var",
      "style",
      "img",
      "dir",
      "ltr",
      "span",
      "div",
      "br",
      "i",
      "b",
      "u",
      "em",
      "pre"
    ],
    ALLOWED_ATTR: ["href", "src", "style", "width", "height"],
  });

  return (
    <div
      className={cn("pv-desc myCustomClass", className)}
      dangerouslySetInnerHTML={{ __html: style + clean }}
      {...props}
    />
  );
};

export default RenderHtml;
