import React, { useState } from "react";
import "../scss/graph.scss";
import ReactApexChart from "react-apexcharts";

function Column({ data }) {
  console.log(data, "data");

  const monthNameMappings = {
    enero: "Enero",
    febrero: "Febrero",
    marzo: "Marzo",
    abril: "Abril",
    mayo: "Mayo",
    junio: "Junio",
    julio: "Julio",
    agosto: "Agosto",
    septiembre: "Septiembre",
    octubre: "Octubre",
    noviembre: "Noviembre",
    diciembre: "Diciembre",
  };

  const sortedData = [...data?.lastSixMonthsData].sort((a, b) => {
    const monthOrder = new Date(`${a.year}-${a.month}`).getTime() - new Date(`${b.year}-${b.month}`).getTime();
    return monthOrder || a.totalAmount - b.totalAmount;
  });

  // Debugging logs to verify sortedData
  console.log("sortedData:", sortedData);

  const months = sortedData.map((data) => monthNameMappings[data.month]);
  const values = sortedData.map((data) => data.totalAmount);

  // Debugging logs to verify months and values
  console.log("months:", months);
  console.log("values:", values);

  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Ingresos",
        data: values,
      },
    ],
    options: {
      chart: {
        fontFamily: "inherit",
        type: "bar",
        height: "300px",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "15%",
          borderRadius: 5,
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: months,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: "#a1a5b7",
            fontSize: "12px",
          },
        },
        title: {
          text: "Meses",
          style: {
            color: "#a1a5b7",
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#a1a5b7",
            fontSize: "12px",
          },
        },
        title: {
          text: "Ingresos",
          style: {
            color: "#a1a5b7",
            fontSize: "12px",
          },
        },
      },
      fill: {
        opacity: 1,
      },
      states: {
        normal: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        hover: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: "none",
            value: 0,
          },
        },
      },
      tooltip: {
        style: {
          fontSize: "12px",
        },
        y: {
          formatter: function (val) {
            return "S/ " + val;
          },
        },
      },
      colors: ["#336cfb", "#e4e6ef"],
      grid: {
        borderColor: "#eff2f5",
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      title: {
        // text: "Ingresos según Pagos",
        align: "left",
        style: {
          fontSize: "16px",
          color: "#666",
        },
      },
    },
  });

  console.log("chartData:", chartData);

  return (
    <>
      <p className="graph-title">Ingresos según Pagos</p>
      <div className="line-chart-container">
        <div className="line-chart-info text-start">
          <p className="line-main-title">S/ {data?.currentMonthData || 0}</p>
          <p className="line-sub-title">Mes actual {data?.currentMonth}</p>
        </div>
        <div className="line-chart-info text-end">
          <p className="line-main-title">S/ {data?.currentYearData || 0}</p>
          <p className="line-sub-title">Año {data?.currentYear}</p>
        </div>
      </div>
      <div id="chart" className="line-chart chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
      </div>
    </>
  );
}

export default Column;
