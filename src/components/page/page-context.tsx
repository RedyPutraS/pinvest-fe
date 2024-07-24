import { createContext } from "react";

export const PageContext = createContext<{
  id: string;
  type: string;
  app: string;
}>({ id: "", type: "article", app: "picapital" });
