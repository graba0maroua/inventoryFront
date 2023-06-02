import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useFetchLineChartQuery } from '../../features/Charts/LineChart';
import Loader from '../../Messages/Loader';

const ChartComponent = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const { data, error, isLoading } = useFetchLineChartQuery();

  useEffect(() => {
    if (!data || !chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    const labels = data.map((item) => item.scanned_month);
    const scannedCountData = data.map((item) => item.scanned_count);
    const notScannedCountData = data.map((item) => item.not_scanned_count);

    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Scanned Count',
              data: scannedCountData,
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
              fill: false
            },
            {
              label: 'Not Scanned Count',
              data: notScannedCountData,
              borderColor: 'red',
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Mois'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Nombres'
              }
            }
          }
        }
      });
    }
  }, [data]);

  if (isLoading) {
    return <Loader/>
  }

  if (error) {
    return <div>Error fetching the data</div>;
  }

  return(    
    
        <canvas ref={chartRef} />
      
    );
};

export default ChartComponent;