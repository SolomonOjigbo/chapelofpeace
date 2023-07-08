import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import Chart from './components/DonationsChart'
import Deposits from './components/TotalDonations'
import Donations from './reports/Donations'
import BlogOverview from './reports/BlogOverview'
import UsersOverview from './reports/UsersOverview'
import Sidebar from './components/Sidebar'
import AlumniMembershipReport from './reports/AlumniMembershipReport'
import { useUserAuth } from '../lib/auth'
import { useEffect } from 'react'

const mdTheme = createTheme()

function DashboardContent() {
    useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }
  
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        component='main'
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto'
        }}
      >
        <Toolbar />
        <Container maxWidth='lg' sx={{ mt: 5, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240
                }}
              >
                <Chart />
              </Paper>
            </Grid>
            {/* Total Donations */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240
                }}
              >
                <Deposits />
              </Paper>
            </Grid>
            {/* Recent Donations */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Donations />
              </Paper>
            </Grid>

            {/* Blog Overview */}

            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <BlogOverview />
              </Paper>
            </Grid>

            {/* Users Overview */}

            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <UsersOverview />
              </Paper>
            </Grid>

            {/* Alumni Membership Overview */}

            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <AlumniMembershipReport />
              </Paper>
            </Grid>
          </Grid>
          {/* <Copyright sx={{ pt: 4 }} /> */}
        </Container>
      </Box>
    </Box>
  )
}

export default function Dashboard () {
  return <DashboardContent />
}
