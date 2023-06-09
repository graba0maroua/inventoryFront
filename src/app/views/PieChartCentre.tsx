import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useFetchPieChartCentreQuery } from '../../features/Charts/PieChart';
import Loader from '../../Messages/Loader';

const PieChartCentre = () => {
  const { data, isLoading, isError } = useFetchPieChartCentreQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error occurred while fetching data.</div>;
  }

  const labels = data?.map((item) => item.groupe_id) || [];
  const chartData = {
    labels,
    datasets: [
      {
        data: data?.map((item) => item.scanned_count) || [],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    aspectRatio: 1, // Adjust this value to fit the chart within the container
  };

  return (
    <div className='chart'>
      <Doughnut data={chartData} />
    </div>
  );
};

export default PieChartCentre;