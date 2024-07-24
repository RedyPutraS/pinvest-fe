import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title
  //   Tooltip,
  //   Legend
);

const data = {
  labels: ["label 1", "label 2", "label 3", "label 4", "label 5", " label 6"], // responsible for how many bars are gonna show on the chart
  // create 12 datasets, since we have 12 items
  // data[0] = labels[0] (data for first bar - 'Standing costs') | data[1] = labels[1] (data for second bar - 'Running costs')
  // put 0, if there is no data for the particular bar
  datasets: [
    {
      label: "Washing and cleaning",
      data: [3, 4, 5, 2, 1, 5, 3],
      backgroundColor: "#144E84",
      borderRadius: 12,
      borderSkipped: false,
    },
    {
      label: "Traffic tickets",
      data: [4, 6, 8, 4, 2, 7, 4],
      backgroundColor: "#70B268",
      borderRadius: 12,

      borderSkipped: false,
    },
    {
      label: "Tolls",
      data: [8, 10, 9, 6, 3, 8, 6],
      backgroundColor: "rgba(50, 131, 202, 0.2)",
      borderRadius: 12,

      borderSkipped: false,
    },
  ],
};
export function Chart() {
  return (
    <div className="h-[280px]">
      <Bar
        data={data}
        options={{
          maintainAspectRatio: false,
          scales: {
            x: {
              display: false,

              grid: {
                display: false,
                drawOnChartArea: false,
                drawTicks: false,
              },
              stacked: true,
            },
            y: {
              display: false,
              grid: {
                display: false,
                drawOnChartArea: false,
                drawTicks: false,
              },
              stacked: false,
            },
          },
        }}
      />
    </div>
  );
}
