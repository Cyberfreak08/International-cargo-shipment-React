import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CanvasJSReact from '@canvasjs/react-charts';
import { fetchQ2Data } from '../../Redux/reducers/revenueSlice';
import { Link } from 'react-router-dom';
import '../../assets/maxRevenueCategory.css'; 

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const MaxRevenueCategory = () => {
  const dispatch = useDispatch();
  const { q2Data, status, error } = useSelector((state) => state.revenue);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchQ2Data());
    }
  }, [status, dispatch]);

  const dataPoints = q2Data.map(item => ({
    label: item.category.category_name,
    y: item.customer.totalRevenue,
    customerName: item.customer.name,
    companyName: item.customer.company_name
  }));

  const options = {
    title: {
      text: "Revenue by Category"
    },
    data: [{
      type: "column",
      dataPoints: dataPoints
    }],
    toolTip: {
      content: "{label}: {y} - {customerName} ({companyName})"
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <div className="chart-header">
        <Link to="/dashboard" className="back-button">&lt; Back</Link>
        <h1>Revenue by Category</h1>
      </div>
      <div className="chart-container">
        <CanvasJSChart options={options} />
      </div>
    </div>
  );
}

export default MaxRevenueCategory;
