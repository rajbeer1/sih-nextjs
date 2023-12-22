import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export default function Linegraph({ datas, datakey }) {
  return (
    <LineChart
      width={500}
      height={300}
      data={datas}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid
        vhorizontal={true}
        vertical={false}
        strokeDasharray="3 3"
      />
      <XAxis dataKey="name" />
      <YAxis domain={['dataMin', 'dataMax']} />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey={datakey}
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}
