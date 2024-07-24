import { memo } from "react";
import { StockMarket } from "react-ts-tradingview-widgets";

const Stock = () => {
  return <StockMarket exchange={"IDX" as never} width="100%" />;
};

export default memo(Stock);
