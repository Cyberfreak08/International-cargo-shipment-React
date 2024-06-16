import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CanvasJSReact from "@canvasjs/react-charts";
import { fetchQuarterlyTransactions } from "../../Redux/reducers/quarterSlice";
import "../../assets/quarterResult.css";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const QuarterlyTransactions = () => {
  const [selectedQuarter, setSelectedQuarter] = useState(1);
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.quarter);

  const officeId = 1;

  useEffect(() => {
    dispatch(fetchQuarterlyTransactions(officeId, selectedQuarter));
  }, [dispatch, officeId, selectedQuarter]);

  const handleQuarterChange = (event) => {
    setSelectedQuarter(Number(event.target.value));
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const dataPoints = data
    ? [
        { label: "Transaction Count", y: data.count*100 },
        { label: "Transaction Volume", y: data.volume },
      ]
    : [];

  const options = {
    title: {
      text: "Quarterly Transactions",
    },
    data: [
      {
        type: "column",
        dataPoints: dataPoints,
      },
    ],
  };

  return (
    <div className="container">
      <div className="header">
        <Link to="/dashboard" className="back-button">
          &lt; Back
        </Link>
        <h1>International Cargo Shipment</h1>
      </div>
      <p className="description">
        International Cargo Shipment is a leading provider of freight
        transportation services, specializing in delivering Products,
        Electronics, and Consumer Goods across Europe. Operating from our
        central office in Singapore, we ensure efficient and reliable delivery
        to our customers.
      </p>

      <h3>Quarterly Transactions</h3>
      <div className="select-container">
        <label htmlFor="quarterSelect">Select Quarter:</label>
        <select
          id="quarterSelect"
          value={selectedQuarter}
          onChange={handleQuarterChange}
        >
          <option value="1">Q1 (Jan - Mar)</option>
          <option value="2">Q2 (Apr - Jun)</option>
          <option value="3">Q3 (Jul - Sep)</option>
          <option value="4">Q4 (Oct - Dec)</option>
        </select>
      </div>

      {data && (
        <>
          <div className="data-container">
            <div className="data-item">
              <h4>Transaction Count</h4>
              <p>{data.count}</p>
            </div>
            <div className="data-item">
              <h4>Transaction Volume (in Million Dollar)</h4>
              <p>${data.volume} million</p>
            </div>
          </div>

          <div className="chart-container">
            <CanvasJSChart options={options} />
          </div>
        </>
      )}
    </div>
  );
};

export default QuarterlyTransactions;
