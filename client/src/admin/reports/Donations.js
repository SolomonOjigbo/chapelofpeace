import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Title from '../components/Title'

function createData (name, email, phone_no, amount, purpose) {
  return { name, email, phone_no, amount, purpose }
}

const rows = [
  createData('Spencer test', 'spencer@gmail.com', '08023456789', 24, 'Offering'),
  createData('Global test', 'global@gmail.com', '08023456789', 30, 'Tithe'),
  createData('Man test', 'man@gmail.com', '08023456789', 49, 'Building Project'),
  createData('First test', 'first@gmail.com', '08023456789', 53, 'Welfare'),
  createData('Last test', 'last@gmail.com', '08023456789', 14, 'Offering')
]

export default function Donations () {
  return (
    <>
      <Title>Recent Givings</Title>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>S/N</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell align='right'>Email</TableCell>
              <TableCell align='right'>Phone Number</TableCell>
              <TableCell align='right'>Amount</TableCell>
              <TableCell align='right'>Purpose of Giving</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{i + 1}</TableCell>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.email}</TableCell>
                <TableCell align='right'>{row.phone_no}</TableCell>
                <TableCell align='right'>{row.amount}</TableCell>
                <TableCell align='right'>{row.purpose}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
