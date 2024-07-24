import ProgramMenuButton from "components/program-menu-slider/program-menu-button";
import { ProgramMenuSlider } from "components/program-menu-slider/program-menu-slider";
import { memo } from "react";
import { useRouter } from "next/router";
import { ProgramMenuLogo } from "./program-menu-logo";
type Props = {
  data: { app_name: string; alias: string }[];
};
const ProgramMenu = ({ data }: Props) => {
  const router = useRouter();
  return (
    <ProgramMenuSlider>
      {data &&
        data.map((item, i) => {
          return (
            item.app_name !== "Homepage" &&
            item.app_name !== "PiMarket" && (
              <ProgramMenuButton
                key={i}
                title={item.app_name}
                image={<ProgramMenuLogo app={item.app_name} />}
                onClick={function () {
                  let link = item.alias.replace("pi", "pi-");
                  switch (item.alias.replace("pi", "pi-")) {
                    case "pi-learning":
                      link = "pi-learning/article";
                      break;
                    case "pi-capital":
                      link = "pi-capital?category=crowdfunding";
                      break;
                    case "pi-event":
                      link = "pi-event?category=all";
                      break;
                    case "pi-cast":
                      link = "pi-cast?category=youtube";
                      break;
                  }
                  return router.push(link);
                }}
              />
            )
          );
        })}
    </ProgramMenuSlider>
  );
};
export default memo(ProgramMenu);
