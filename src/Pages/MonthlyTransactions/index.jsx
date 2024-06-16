import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMonthlyTransactions } from "../../Redux/reducers/monthlyTransactionSlice";
import { Link } from "react-router-dom";
import { Card } from "antd";
import CanvasJSReact from "@canvasjs/react-charts";
import "../../assets/monthlyTransaction.css";

const { Meta } = Card;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const MonthlyTransactions = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.monthly);

  useEffect(() => {
    dispatch(fetchMonthlyTransactions(8, 12)); 
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const chartDataPoints = data.map((item) => ({
    label: `Category ID: ${item.categoryId}`,
    y: item.maxTransactions,
    maxTransactions: `Max Transactions: ${item.maxTransactions}`
  }));

  // CanvasJS chart options
  const chartOptions = {
    title: {
      text: "Max Monthly Transactions by Category",
    },
    data: [
      {
        type: "column",
        dataPoints: chartDataPoints,
      },
    ],
    toolTip: {
        content: "{label}: {y} - {maxTransactions}"
      }
  };

  return (
    <div className="container">
      <Link to="/dashboard" className="back-button">
        &lt; Back
      </Link>
      <h1>Top Customers by Category - Max Monthly Transactions</h1>

      <div className="card-container">
        {data.map((item) => (
          <Card key={item.categoryId} className="category-card">
            <Meta
              title={`Category ID: ${item.categoryId}`}
              description={`Max Transactions: ${item.maxTransactions}`}
            />
            <div className="customer-list">
              {item.customers.map((customer) => (
                <div key={customer.id} className="customer-item">
                  <p>Customer Name: {customer.name}</p>
                  <p>Company Name: {customer.company_name}</p>
                  <p>Total Transactions: {customer.totalTransactions}</p>
                  <p>Total Revenue: {customer.totalRevenue}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="chart-container">
        <CanvasJSChart options={chartOptions} />
      </div>

    </div>
  );
};

export default MonthlyTransactions;
