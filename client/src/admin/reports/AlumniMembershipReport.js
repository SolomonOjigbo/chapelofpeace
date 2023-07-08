import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Title from '../components/Title'

function createData (
  name,
  sex,
  marital_status,
  no_of_children,
  date_of_birth,
  country,
  state,
  city,
  email,
  phone_no,
  contact_address,
  residential_address,
  type_of_membership,
  department,
  faculty,
  permanent_address,
  year_of_graduation,
  service_unit,
  content,
  photo
) {
  return {
    name,
    sex,
    marital_status,
    no_of_children,
    date_of_birth,
    country,
    state,
    city,
    email,
    phone_no,
    contact_address,
    residential_address,
    type_of_membership,
    department,
    faculty,
    permanent_address,
    year_of_graduation,
    service_unit,
    content,
    photo
  }
}

const rows = [
  createData(
    'Spencer test',
    'male',
    'Single',
    '2-4-1998',
    'Nigeria',
    'Abuja',
    'Gwarimpa',
    'pencer@test.com',
    '08032146321',
    'mab global',
    'fynestone estate',
    'standard',
    'choir',
    'singing',
    'fynestone',
    '2020',
    'choir unit',
    'test',
    'test.jpg'
  ),
  createData(
    'Spencer test',
    'male',
    'Single',
    '2-4-1998',
    'Nigeria',
    'Abuja',
    'Gwarimpa',
    'pencer@test.com',
    '08032146321',
    'mab global',
    'fynestone estate',
    'standard',
    'choir',
    'singing',
    'fynestone',
    '2020',
    'choir unit',
    'test',
    'test.jpg'
  ),
  createData(
    'Spencer test',
    'male',
    'Single',
    '2-4-1998',
    'Nigeria',
    'Abuja',
    'Gwarimpa',
    'pencer@test.com',
    '08032146321',
    'mab global',
    'fynestone estate',
    'standard',
    'choir',
    'singing',
    'fynestone',
    '2020',
    'choir unit',
    'test',
    'test.jpg'
  ),
  createData(
    'Spencer test',
    'male',
    'Single',
    '2-4-1998',
    'Nigeria',
    'Abuja',
    'Gwarimpa',
    'pencer@test.com',
    '08032146321',
    'mab global',
    'fynestone estate',
    'standard',
    'choir',
    'singing',
    'fynestone',
    '2020',
    'choir unit',
    'test',
    'test.jpg'
  ),
  createData(
    'Spencer test',
    'male',
    'Single',
    '2-4-1998',
    'Nigeria',
    'Abuja',
    'Gwarimpa',
    'pencer@test.com',
    '08032146321',
    'mab global',
    'fynestone estate',
    'standard',
    'choir',
    'singing',
    'fynestone',
    '2020',
    'choir unit',
    'test',
    'test.jpg'
  )
]

export default function AlumniMembershipReport () {
  return (
    <>
      <Title>Recent Alumni Membership</Title>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>S/N</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell align='right'>Sex</TableCell>
              <TableCell align='right'>Marital Status</TableCell>
              <TableCell align='right'>No. of Children</TableCell>
              <TableCell align='right'>Date of Birth</TableCell>
              <TableCell align='right'>Country</TableCell>
              <TableCell align='right'>State</TableCell>
              <TableCell align='right'>City</TableCell>
              <TableCell align='right'>Email</TableCell>
              <TableCell align='right'>Phone Number</TableCell>
              <TableCell align='right'>Contact Address</TableCell>
              <TableCell align='right'>Residential Address</TableCell>
              <TableCell align='right'>Type of Membership</TableCell>
              <TableCell align='right'>Department</TableCell>
              <TableCell align='right'>Faculty</TableCell>
              <TableCell align='right'>Permanent Address</TableCell>
              <TableCell align='right'>Year of Graduation</TableCell>
              <TableCell align='right'>Service Unit</TableCell>
              <TableCell align='right'>Content</TableCell>
              <TableCell align='right'>Photo</TableCell>
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
                <TableCell align='right'>{row.name}</TableCell>
                <TableCell align='right'>{row.sex}</TableCell>
                <TableCell align='right'>{row.marital_status}</TableCell>
                <TableCell align='right'>{row.no_of_children}</TableCell>
                <TableCell align='right'>{row.date_of_birth}</TableCell>
                <TableCell align='right'>{row.country}</TableCell>
                <TableCell align='right'>{row.state}</TableCell>
                <TableCell align='right'>{row.city}</TableCell>
                <TableCell align='right'>{row.email}</TableCell>
                <TableCell align='right'>{row.phone_no}</TableCell>
                <TableCell align='right'>{row.contact_address}</TableCell>
                <TableCell align='right'>{row.residential_address}</TableCell>
                <TableCell align='right'>{row.type_of_membership}</TableCell>
                <TableCell align='right'>{row.department}</TableCell>
                <TableCell align='right'>{row.faculty}</TableCell>
                <TableCell align='right'>{row.permanent_address}</TableCell>
                <TableCell align='right'>{row.year_of_graduation}</TableCell>
                <TableCell align='right'>{row.service_unit}</TableCell>
                <TableCell align='right'>{row.content}</TableCell>
                <TableCell align='right'>{row.photo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
