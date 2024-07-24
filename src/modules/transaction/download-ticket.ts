import type { AxiosRequestConfig } from "axios";
import { useAuthStore } from "hooks/use-auth-store";
import { axios } from "utils";

export const downloadTicket = async (id: number, filename: string) => {
  const token = useAuthStore.getState().user;
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob",
  };
  const { data } = await axios.get(
    `/transaction/download-ticket/${id}`,
    config
  );
  const href = window.URL.createObjectURL(data);

  const anchorElement = document.createElement("a");

  anchorElement.href = href;
  anchorElement.download = `${filename}.pdf`;

  document.body.appendChild(anchorElement);
  anchorElement.click();

  document.body.removeChild(anchorElement);
  window.URL.revokeObjectURL(href);
};
