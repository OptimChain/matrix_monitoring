import { React, useState, useEffect, useRef } from "react";
import { Line, Bar } from "react-chartjs-2";
import coindata from "./mockdata.json";
import { Chart as ChartJS } from "chart.js/auto";
const Lchart = (props) => {
  const colors = ["#b088f5", "#018977", "#e07f9d", "#486de8", "#3498db", "#9b59b6", "#e67e22", "#1abc9c", "#e91e63", "#00bcd4"];
  ChartJS.defaults.color = "rgba(255,255,255,0.8)";
  // const gdataRef = useRef({
  //   O_DUSCIS_FINAL: 0,
  //   ledger_na: 0,
  //   D_PERFECTMILE_PACKAGE_ITEMS_V2_NA: 0,
  //   ledger_na_CUSTOMER_OUTBOUND_METRICS: 0,
  //   AMRITA_OUTBOUND_CI_PACKAGE_NA: 0,
  // });

  // const data = {
  //   labels: props.sarr.map((ini, i) => new Date(ini.date).toISOString().split("T")[0]),
  //   datasets: [
  //     {
  //       label: "O_DUSCIS_FINAL",
  //       tension: 0,
  //       data: props.sarr.map((ini) => {
  //         ini.dataset == "O_DUSCIS_FINAL") {
  //           gdataRef.current.O_DUSCIS_FINAL = ini.value;
  //           return ini.value;
  //         } else {
  //           return gdataRef.current.O_DUSCIS_FINAL;
  //         }
  //       }),
  //       borderColor: colors[3],
  //       backgroundColor: colors[3],
  //       borderWidth: 2,
  //     },
  //     {
  //       label: "ledger_na",
  //       tension: 0,
  //       data: props.sarr.map((ini) => {
  //         ini.dataset == "ledger_na") {
  //           gdataRef.current.ledger_na = ini.value;
  //           return ini.value;
  //         } else {
  //           return gdataRef.current.ledger_na;
  //         }
  //       }),
  //       borderColor: colors[0],
  //       backgroundColor: colors[0],
  //       borderWidth: 2,
  //     },
  //     {
  //       label: "D_PERFECTMILE_PACKAGE_ITEMS_V2_NA",
  //       tension: 0,
  //       data: props.sarr.map((ini) => {
  //         ini.dataset == "D_PERFECTMILE_PACKAGE_ITEMS_V2_NA") {
  //           gdataRef.current.D_PERFECTMILE_PACKAGE_ITEMS_V2_NA = ini.value;
  //           return ini.value;
  //         } else {
  //           return gdataRef.current.O_DUSCIS_FINAL;
  //         }
  //       }),
  //       borderColor: colors[1],
  //       backgroundColor: colors[1],
  //       borderWidth: 2,
  //     },
  //     {
  //       label: "ledger_na_CUSTOMER_OUTBOUND_METRICS",
  //       tension: 0,
  //       data: props.sarr.map((ini) => {
  //         ini.dataset == "ledger_na_CUSTOMER_OUTBOUND_METRICS") {
  //           gdataRef.current.ledger_na_CUSTOMER_OUTBOUND_METRICS = ini.value;
  //           return ini.value;
  //         } else {
  //           return gdataRef.current.ledger_na_CUSTOMER_OUTBOUND_METRICS;
  //         }
  //       }),
  //       borderColor: colors[2],
  //       backgroundColor: colors[2],
  //       borderWidth: 2,
  //     },
  //     {
  //       label: "AMRITA_OUTBOUND_CI_PACKAGE_NA",
  //       tension: 0,
  //       data: props.sarr.map((ini) => {
  //         ini.dataset == "AMRITA_OUTBOUND_CI_PACKAGE_NA") {
  //           gdataRef.current.AMRITA_OUTBOUND_CI_PACKAGE_NA = ini.value;
  //           return ini.value;
  //         } else {
  //           return gdataRef.current.AMRITA_OUTBOUND_CI_PACKAGE_NA;
  //         }
  //       }),
  //       borderColor: colors[4],
  //       backgroundColor: colors[4],
  //       borderWidth: 2,
  //     },
  //   ],
  // };

  const data = {
    labels: props.sarr.map((ini, i) => new Date(ini.date).toISOString().split("T")[0]),
    datasets: [
      {
        label: props.dataname,
        tension: 0,
        data: props.sarr.map((ini) => (ini.dataset == props.dataname ? ini.value : 0)),
        borderColor: colors[props.color],
        backgroundColor: colors[props.color],
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 10,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        min: -10, // Set a custom max value for the y-axis to prevent stretching
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
      x: {
        grid: {
          color: "rgba(255,255,255,0.0)",
        },
      },
    },
    hover: {
      mode: "nearest",
      intersect: false,
    },
    tooltips: {
      mode: "index",
      intersect: false,
    },
  };

  return (
    <>
      {props.cType == "line" && <Line data={data} options={options} />}
      {props.cType == "bar" && <Bar data={data} options={options} />}
    </>
  );
};

export default Lchart;
