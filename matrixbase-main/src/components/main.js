import React from "react";
import Lchart from "./chartdemo";
import Header from "./header";
import Dash from "./dash";
import "./master.css";
import coindata from "./mockdata.json";
import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import Axios from "axios";
import json_data from "./mockdata2.json";

const Main = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["uToken"]);

  const [togglers, setToogler] = useState([]);
  const [view, setView] = useState(localStorage.getItem("cView") ? localStorage.getItem("cView") : "cards");

  const [activeTab, setActiveTab] = useState("10");
  const [chartType, setChartType] = useState("line");
  const [isLoading, setIsloading] = useState(false);

  const [oDuscisFinal, setODuscisFinal] = useState([]);
  const [ledgerNa, setLedgerNa] = useState([]);
  const [perfectMile, setPerfectMile] = useState([]);
  const [ledgerNaMetrics, setLedgerNaMetrics] = useState([]);
  const [amritaOutbound, setAmritaOutbound] = useState([]);
  const [path, setPath] = useState("");

  const [sortedarr, setSortedArr] = useState([]);

  const [ogData, setOgData] = useState([]);

  // const [activeData, setActiveData] = useState(props.isactive);

  function convertToJson(inputString) {
    // Split the input string into lines
    const lines = inputString.trim().split("\n");

    // Initialize an empty array to store individual JSON objects
    const jsonObjects = [];

    // Process each line and convert it to an object
    lines.forEach((line) => {
      // Parse each line as JSON
      const jsonObject = JSON.parse(line);

      // Add the object to the array
      jsonObjects.push(jsonObject);
    });

    // Convert the array of objects to a JSON string
    const jsonArray = JSON.stringify(jsonObjects, null, 2);

    return JSON.parse(jsonArray);
  }

  const changeView = (e) => {
    localStorage.setItem("cView", e);
    setView(e);
    window.location.reload();
  };

  useEffect(() => {
    setIsloading(true);
    console.log(props.isactive);
    const config = {
      headers: { "content-type": "application/json", Authorization: cookies.uToken },
    };

    Axios.post("http://127.0.0.1:8000/", { object_name: props.isactive }, config)
      .then((response) => {
        console.log(convertToJson(response.data));
        setOgData(convertToJson(response.data));
        setIsloading(false);
      })
      .catch(() => {
        setIsloading(false);
      });
    setPath(localStorage.getItem("bucket") + " > " + localStorage.getItem("file"));
  }, [props]);

  useEffect(() => {
    // Combine all arrays into a single array
    const combinedArray = ogData.slice().sort((a, b) => new Date(a.date) - new Date(b.date));

    console.log(combinedArray );
    // Update state for the sorted array
    setSortedArr(combinedArray);
  }, [ogData]);

  useEffect(() => {
    // Iterate through the JSON data and update state for each category
    ogData.forEach((item) => {
      switch (item.dataset) {
        case "afninbound_step2":
          setODuscisFinal((prevState) => [...prevState, item]);
          break;
        case "ledger_na":
          setLedgerNa((prevState) => [...prevState, item]);
          break;
        case "D_PERFECTMILE_PACKAGE_ITEMS_V2_NA":
          setPerfectMile((prevState) => [...prevState, item]);
          break;
        case "ledger_na_CUSTOMER_OUTBOUND_METRICS":
          setLedgerNaMetrics((prevState) => [...prevState, item]);
          break;
        case "AMRITA_OUTBOUND_CI_PACKAGE_NA":
          setAmritaOutbound((prevState) => [...prevState, item]);
          break;
        default:
          // Handle other cases if needed
          break;
      }
    });
  }, [ogData]);

  return (
    <>
      {isLoading && (
        <div style={{ height: "100vh", width: "100%" }} className="d-flex align-items-center">
          <div class="loader2 mx-auto"></div>
        </div>
      )}

      <div style={{ maxHeight: "95vh", overflowY: "scroll " }}>
        <h4 className="lead ps-3 text-secondary pt-2"> {path} </h4>
        {/* <div className="p-4 ">
          <div className="w-100 rounded-3 py-3">
            <h4 className="fs-2 mb-4 text-dark fw-bold">Workflows</h4>
         
            <div className=" d-flex align-items-center">
              <div data-aos="fade-right" data-aos-delay="200" className="card p-3 me-5 " style={{ width: "18rem" }}>
                <h6 className="card-subtitle text-muted"># Success Workflows </h6>
                <h3 className="fw-bold card-title text-info">{successWf}</h3>
              </div>

              <div data-aos="fade-right" data-aos-delay="400" className="card p-3 me-5 " style={{ width: "18rem" }}>
                <h6 className="card-subtitle text-muted"># Failed Workflows </h6>
                <h3 className="fw-bold card-title text-danger">{failedWf}</h3>
              </div>
            </div>
          </div>
        </div> */}

        <div className="px-3 pt-4">
          <div className=" d-flex align-items-center justify-content-between">
            <div className="togglers w-100">
              <div className="cToggles d-flex border border-1 border-secondary rounded-pill p-2 mb-2" style={{ width: "max-content", background: "#0f1b2a" }}>
                <button className={`rounded-pill btn ${chartType == "line" ? "btn-info text-light" : "btn-outline-info"}`} onClick={() => setChartType("line")}>
                  <i className="fa fa-line-chart rounded-circle"></i>
                </button>
                <button className={`rounded-pill btn ms-2 ${chartType == "bar" ? "btn-info text-light" : "btn-outline-info"}`} onClick={() => setChartType("bar")}>
                  <i className="fa fa-bar-chart"></i>
                </button>
              </div>
            </div>

            <div className="mb-1 text-end w-100">
              <button className={`btn btn-lg ${view == "cards" ? "btn-dark" : "btn-outline-dark"} p-1 px-2 me-1`} onClick={() => changeView("cards")}>
                <i class="fa fa-list-alt"></i>
              </button>
              <button className={`btn btn-lg ${view == "cards" ? "btn-outline-dark" : "btn-dark"} p-1 px-2`} onClick={() => changeView("list")}>
                <i class="fa fa-th-list"></i>
              </button>
            </div>
          </div>

          <div className="row mx-0 p-3 ps-0 pe-0 rounded" style={{ backgroundColor: "#0f1b2a" }}>
            {"ledger_na".toLowerCase().includes(props.tsearch) || props.tsearch == "" ? (
              <div className={`${view == "cards" ? "col-6" : "col-12"} d-flex`}>
                <div className="w-100   p-3 mb-3 shadow rounded-4" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
                  <Lchart
                    cdata={togglers}
                    cType={chartType}
                    sarr={sortedarr}
                    odf={oDuscisFinal}
                    lna={ledgerNa}
                    dppinav2={perfectMile}
                    lncom={ledgerNaMetrics}
                    aocipn={amritaOutbound}
                    dataname="ledger_na"
                    color={0}
                    origin={"workflows"}
                  />
                </div>

                <div className="h-100 opacity-0" style={{ background: "rgb(183, 183, 185)" }}>
                  <div className="vr"></div>
                </div>
              </div>
            ) : (
              ""
            )}

            {"O_DUSCIS_FINAL".toLowerCase().includes(props.tsearch) || props.tsearch == "" ? (
              <div className={`${view == "cards" ? "col-6" : "col-12"} d-flex`}>
                <div className="w-100   p-3 mb-3 shadow rounded-4" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
                  <Lchart
                    cdata={togglers}
                    cType={chartType}
                    sarr={sortedarr}
                    odf={oDuscisFinal}
                    lna={ledgerNa}
                    dppinav2={perfectMile}
                    lncom={ledgerNaMetrics}
                    aocipn={amritaOutbound}
                    dataname="O_DUSCIS_FINAL"
                    color={1}
                    origin={"workflows"}
                  />
                </div>

                <div className="h-100 opacity-0" style={{ background: "rgb(183, 183, 185)" }}>
                  <div className="vr"></div>
                </div>
              </div>
            ) : (
              ""
            )}

            {"D_PERFECTMILE_PACKAGE_ITEMS_V2_NA".toLowerCase().includes(props.tsearch) || props.tsearch == "" ? (
              <div className={`${view == "cards" ? "col-6" : "col-12"} d-flex`}>
                <div className="w-100   p-3 mb-3 shadow rounded-4" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
                  <Lchart
                    cdata={togglers}
                    cType={chartType}
                    sarr={sortedarr}
                    odf={oDuscisFinal}
                    lna={ledgerNa}
                    dppinav2={perfectMile}
                    lncom={ledgerNaMetrics}
                    aocipn={amritaOutbound}
                    dataname="D_PERFECTMILE_PACKAGE_ITEMS_V2_NA"
                    color={2}
                    origin={"workflows"}
                  />
                </div>

                <div className="h-100 opacity-0" style={{ background: "rgb(183, 183, 185)" }}>
                  <div className="vr"></div>
                </div>
              </div>
            ) : (
              ""
            )}
            {"ledger_na_CUSTOMER_OUTBOUND_METRICS".toLowerCase().includes(props.tsearch) || props.tsearch == "" ? (
              <div className={`${view == "cards" ? "col-6" : "col-12"} d-flex`}>
                <div className="w-100   p-3 mb-3 shadow rounded-4" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
                  <Lchart
                    cdata={togglers}
                    cType={chartType}
                    sarr={sortedarr}
                    odf={oDuscisFinal}
                    lna={ledgerNa}
                    dppinav2={perfectMile}
                    lncom={ledgerNaMetrics}
                    aocipn={amritaOutbound}
                    dataname="ledger_na_CUSTOMER_OUTBOUND_METRICS"
                    color={3}
                    origin={"workflows"}
                  />
                </div>

                <div className="h-100 opacity-0" style={{ background: "rgb(183, 183, 185)" }}>
                  <div className="vr"></div>
                </div>
              </div>
            ) : (
              ""
            )}
            {"AMRITA_OUTBOUND_CI_PACKAGE_NA".toLowerCase().includes(props.tsearch) || props.tsearch == "" ? (
              <div className={`${view == "cards" ? "col-6" : "col-12"} d-flex`}>
                <div className="w-100   p-3 mb-3 shadow rounded-4" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
                  <Lchart
                    cdata={togglers}
                    cType={chartType}
                    sarr={sortedarr}
                    odf={oDuscisFinal}
                    lna={ledgerNa}
                    dppinav2={perfectMile}
                    lncom={ledgerNaMetrics}
                    aocipn={amritaOutbound}
                    dataname="AMRITA_OUTBOUND_CI_PACKAGE_NA"
                    color={4}
                    origin={"workflows"}
                  />
                </div>

                <div className="h-100 opacity-0" style={{ background: "rgb(183, 183, 185)" }}>
                  <div className="vr"></div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
