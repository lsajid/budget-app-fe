import { Bar } from "react-chartjs-2"

export const BarChart = ({ chartData }) => {
    return (
      <div>
        <Bar
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "History"
              },
              legend: {
                display: true,
                position: "bottom"
             }
            }
          }}
        />
      </div>
    );
  };
  