/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../scss/graph.scss";
import ReactApexChart from "react-apexcharts";

function CitasChart({ data }) {
  const weekData = data?.weeklyData.filter((week) => week);
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Citas",
        data: [weekData[0]?.week || 0, weekData[1]?.week || 0, weekData[2]?.week || 0, weekData[3]?.week || 0],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {},
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "solid",
        opacity: 1,
        colors: ["#eef3ff"],
      },
      stroke: {
        curve: "smooth",
        show: true,
        width: 3,
        colors: ["#336cfb"],
      },
      xaxis: {
        categories: ["semana 1", "semana 2", "semana 3", "semana 4"],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: "#a2a6b8",
            fontSize: "12px",
          },
        },
        crosshairs: {
          position: "front",
          stroke: {
            color: "#336cfb",
            width: 1,
            dashArray: 3,
          },
        },
        tooltip: {
          marker: {
            Colors: "#fff",
          },
          enabled: true,
          formatter: undefined,
          offsetY: 0,
          style: {
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: ["#a2a6b8"],
            fontSize: "12px",
          },
        },
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
            return val + " citas agendadas";
          },
        },
      },
      color: ["#f8f5ff"],
      grid: {
        borderColor: "#f6f6f6",
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true,
          },
        },
      },

      markers: {
        colors: "#fff",
        strokeColors: "#336cfb",
        strokeWidth: 3,
      },
    },
  });

  return (
    <>
      <p className="graph-title">Citas agendadas</p>
      <div className="line-chart-container">
        <div className="line-chart-info text-start">
          <p className="line-main-title">{data?.data?.currentWeek || 0}</p>
          <p className="line-sub-title">Semana actual</p>
        </div>
        <div className="line-chart-info text-end">
          <p className="line-main-title">{data?.data?.currentMonth || 0}</p>
          <p className="line-sub-title">Mes acutal</p>
        </div>
      </div>
      <div id="chart" className="line-chart chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={350} />
      </div>
    </>
  );
}

export default CitasChart;
