export const transactionFilter = () => {
  const list = [
    {
      code: "",
      name: "Semua",
    },
    {
      code: "success",
      name: "Sukses",
    },
    {
      code: "failed",
      name: "Gagal",
    },
    {
      code: "booking",
      name: "Pesanan",
    },
  ];
  const getName = (code?: string): string =>
    list.find((v) => v.code === code)?.name ?? "";

  const getColor = (code?: string): string => {
    let color = "";
    switch (code) {
      case "success":
        color = "#70B268";
        break;
      case "failed":
      case "expired":
        color = "#EB4D2D";
        break;
      case "booking":
        color = "#144E84";
        break;
    }
    return color;
  };
  return {
    list,
    getName,
    getColor,
  };
};
