import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CanvasJSReact from "@canvasjs/react-charts";
import { fetchData } from "../../Redux/reducers/volumeSlice";
import { Link } from "react-router-dom";
import '../../assets/nationalVsInternational.css'; // Import the CSS file
import { routerConstant } from "../../utils/constants";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const NationalVsInternational = () => {
  const dispatch = useDispatch();
  const {
    national,
    international,
    nationalData,
    internationalData,
    status,
    error,
  } = useSelector((state) => state.volume);
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      const totalVolume = national + international;

      // Convert ISO strings back to Date objects
      const parsedNationalData = nationalData.map((d) => ({
        ...d,
        x: new Date(d.x),
      }));
      const parsedInternationalData = internationalData.map((d) => ({
        ...d,
        x: new Date(d.x),
      }));

      const volumeData = {
        "National vs International Customers": [
          {
            click: (e) => volumeChartDrilldownHandler(e),
            cursor: "pointer",
            explodeOnClick: false,
            innerRadius: "75%",
            legendMarkerType: "square",
            name: "National vs International Customers",
            radius: "100%",
            showInLegend: true,
            startAngle: 90,
            type: "doughnut",
            dataPoints: [
              { y: national, name: "National Customers", color: "#E7823A" },
              {
                y: international,
                name: "International Customers",
                color: "#546BC1",
              },
            ],
          },
        ],
        "National Customers": [
          {
            color: "#E7823A",
            name: "National Customers",
            type: "column",
            dataPoints: parsedNationalData,
          },
        ],
        "International Customers": [
          {
            color: "#546BC1",
            name: "International Customers",
            type: "column",
            dataPoints: parsedInternationalData,
          },
        ],
      };

      const nationalVsInternationalCustomersOption = {
        animationEnabled: true,
        theme: "light2",
        title: {
          text: "National VS International Customers",
        },
        subtitles: [
          {
            backgroundColor: "#2eacd1",
            fontSize: 16,
            fontColor: "white",
            padding: 5,
          },
        ],
        legend: {
          fontFamily: "calibri",
          fontSize: 14,
          itemTextFormatter: function (e) {
            return (
              e.dataPoint.name +
              ": " +
              Math.round((e.dataPoint.y / totalVolume) * 100) +
              "%"
            );
          },
        },
        data: volumeData["National vs International Customers"],
      };

      setChartOptions(nationalVsInternationalCustomersOption);
    }
  }, [national, international, nationalData, internationalData, status]);

  const volumeDrilldownedChartOptions = {
    animationEnabled: true,
    theme: "light2",
    axisX: {
      labelFontColor: "#717171",
      lineColor: "#a2a2a2",
      tickColor: "#a2a2a2",
    },
    axisY: {
      gridThickness: 0,
      includeZero: false,
      labelFontColor: "#717171",
      lineColor: "#a2a2a2",
      tickColor: "#a2a2a2",
      lineThickness: 1,
    },
    data: [],
  };

  const volumeChartDrilldownHandler = (e) => {
    const drilldownOptions = { ...volumeDrilldownedChartOptions };
    drilldownOptions.data = chartOptions.data.filter(
      (data) => data.name === e.dataPoint.name
    );
    drilldownOptions.title = { text: e.dataPoint.name };
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="header">
        <Link to={routerConstant.dashboard} className="back-button">← Back</Link>
        <h1>National VS International Customers</h1>
      </div>
      <div><CanvasJSChart options={chartOptions} /></div>
    </div>
  );
};

export default NationalVsInternational;
