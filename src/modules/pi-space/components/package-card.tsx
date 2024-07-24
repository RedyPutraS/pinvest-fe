import { currencyFormatter } from "utils/helpers/formatter";
import type { PackageItem } from "../api/pi-space-article";
import RenderHtml from "components/render-html";
type Props = {
  packageItem: PackageItem;
};

const PackageCard = ({ packageItem }: Props) => {
  return (
    <div className="h-[360px] rounded-xl bg-pv-white-light p-4">
      <img src="/assets/icon/coins.svg" alt="" className="p-4" />
      <div className="mb-6 border-l-4 border-pv-blue-light pl-2 text-3xl font-semibold text-gray-600">
        {packageItem.name}
      </div>
      <div>Mulai Dari</div>
      <div className="mb-6 text-xl font-semibold text-pv-green">
        {currencyFormatter.format(packageItem.price)}
      </div>
      <div className="line-clamp-5">
        <RenderHtml html={packageItem.content} />
      </div>
    </div>
  );
};

export default PackageCard;
