import * as React from 'react'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Title from './Title'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

function preventDefault (event) {
  event.preventDefault()
}
const COLORS = ['#8884d8', '#82ca9d', '#FFBB28', '#FF8042', '#AF19FF']
const pieData = [
  {
    name: 'Desktop',
    value: 54.85
  },
  {
    name: 'Mobile',
    value: 47.91
  },
  {
    name: 'Tablet',
    value: 16.85
  }
]
const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div
        className='custom-tooltip'
        style={{
          backgroundColor: '#ffff',
          padding: '5px',
          border: '1px solid #cccc'
        }}
      >
        <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
      </div>
    )
  }
  return null
}
export default function TotalUsersByDevice () {
  return (
    <React.Fragment>
      <Title>Users by device</Title>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart width={300} height={200}>
          <Pie
            data={pieData}
            color='#000000'
            dataKey='value'
            nameKey='name'
            cx='50%'
            cy='50%'
            outerRadius={50}
            fill='#8884d8'
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </React.Fragment>
  )
}
