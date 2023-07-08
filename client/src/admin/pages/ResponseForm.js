import React from 'react'
import Sidebar from '../components/Sidebar'
import Title from '../components/Title'
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import CreateIcon from '@mui/icons-material/Create'
import Add from '@mui/icons-material/Add'
import { styled } from '@mui/material/styles'
import { useUserAuth } from '../../lib/auth'
import { useEffect } from 'react'
import Loader from '../components/Loader'
import Swal from 'sweetalert2'
import useSWRInfinite from 'swr/infinite'

import moment from 'moment'
import Axios from '../../config'
import { getResponseSWRCursor } from '../../lib/responseForm'

const PAGE_SIZE = 5

const ResponseForm = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }))

  const getKey = (pageIndex, previousPageData) => {
    //if no user or reached the end, do not fetch
    if (previousPageData && !previousPageData.data) return null

    //first page, we do not
    if (pageIndex === 0)
      return { path: '/response', cursor: 0, limit: PAGE_SIZE }

    //add the cursor to the API e
    console.log(previousPageData.nextCursor)
    return {
      path: '/response',
      cursor: previousPageData.nextCursor,
      limit: PAGE_SIZE
    }
  }

  const { data, size, setSize, error, mutate } = useSWRInfinite(
    getKey,
    getResponseSWRCursor
  )
  const isLoading = !data && !error
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const allResponse = data
    ? data.reduce((prev, curr) => [...prev, ...curr.data], [])
    : []
  const totalResponse = allResponse.length
 const isEmpty = !data ? true : data?.[0]?.data.length === 0
  const isReachingEnd =
    isEmpty ||
    (data && data[size - 1]?.data.length < PAGE_SIZE) ||
    Boolean(size > 0 && data && error)
  console.log('allResponse>>>>>>', allResponse)
  console.log('data and size>>>>>>', data, size)

  const loadMore = e => {
    e.preventDefault()
    setSize(pre => pre + 1)
  }

  if (isLoading) {
    return <Loader />
  }

  const handleDelete = async (e, id) => {
    e.preventDefault()
    try {
      console.log('delete id', id)
      Swal.fire({
        text: 'Are you sure you want to delete this?',
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#ff0000'
      }).then(async result => {
        if (result.value) {
          try {
            const res = await Axios.delete(`/response/${id}`)
            setSize(pre => pre + 1)
            Swal.fire({
              text: `${res.data.message}`,
              icon: 'info'
            })
          } catch (error) {
            Swal.fire({
              text: `${error.response.data.message}`,
              icon: 'error',
              confirmButtonColor: '#0000FF'
            })
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
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
          <Container maxWidth='lg' sx={{ mt: 10, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Title>All Response</Title>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                      <TableHead>
                        <TableRow>
                          <TableCell>S/N</TableCell>
                          <TableCell align='center'>Name</TableCell>
                          <TableCell align='center'>Sex</TableCell>
                          <TableCell align='center'>Marital Status</TableCell>
                          <TableCell align='center'>Department</TableCell>
                          <TableCell align='center'>Level</TableCell>
                          <TableCell align='center'>Hostel Name</TableCell>
                          <TableCell align='center'>Room Number</TableCell>
                          <TableCell align='center'>
                            Residential Address
                          </TableCell>
                          <TableCell align='center'>Reason</TableCell>
                          <TableCell align='center'>Prayer Point</TableCell>
                          <TableCell align='center'>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {allResponse.map((row, i) => (
                          <TableRow
                            key={row.id}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 }
                            }}
                          >
                            <TableCell sx={{ width: '10px' }}>
                              {i + 1}
                            </TableCell>
                            <TableCell align='center'>{row.name}</TableCell>
                            <TableCell align='center'>{row.sex}</TableCell>
                            <TableCell align='center'>
                              {row.marital_status}
                            </TableCell>
                            <TableCell align='center'>
                              {row.department}
                            </TableCell>
                            <TableCell align='center'>{row.level}</TableCell>
                            <TableCell align='center'>
                              {row.hostel_name}
                            </TableCell>
                            <TableCell align='center'>
                              {row.room_number}
                            </TableCell>
                            <TableCell align='center'>
                              {row.residential_address}
                            </TableCell>
                            <TableCell align='center'>{row.reason}</TableCell>
                            <TableCell align='center'>
                              {row.prayer_point}
                            </TableCell>
                            <TableCell align='center'>
                              <Stack align='center'>
                                <IconButton
                                  onClick={e => handleDelete(e, row.id)}
                                  aria-label='delete'
                                  size='small'
                                >
                                  <DeleteIcon
                                    fontSize='inherit'
                                    color='error'
                                  />
                                </IconButton>
                                {/* <IconButton
                                  onClick={e => handleEdit(e, row)}
                                  aria-label='create'
                                  size='small'
                                >
                                  <CreateIcon fontSize='inherit' />
                                </IconButton> */}
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {
                    <Button
                      disabled={isReachingEnd || isLoadingMore}
                      onClick={e => loadMore(e)}
                    >
                      {isLoadingMore && !isReachingEnd ? (
                        <Loader />
                      ) : isReachingEnd ? (
                        'No more data'
                      ) : (
                        'Load more'
                      )}
                    </Button>
                  }
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default ResponseForm
