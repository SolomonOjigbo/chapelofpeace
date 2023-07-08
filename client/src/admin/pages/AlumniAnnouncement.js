import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Title from '../components/Title'
import {
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
  TableRow,
  Modal,
  Input
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import CreateIcon from '@mui/icons-material/Create'
import Add from '@mui/icons-material/Add'
import { styled } from '@mui/material/styles'
import useSWRInfinite from 'swr/infinite'
import { getAlumniSWRCursor } from '../../lib/alumni'
import Loader from '../components/Loader'
import Axios from '../../config'
import Swal from 'sweetalert2'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

const PAGE_SIZE = 5

const modalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  zIndex: 1
}

const AlumniAnnouncement = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [openEdit, setOpenEdit] = React.useState(false)
  const handleOpenEdit = () => setOpenEdit(true)
  const handleCloseEdit = () => setOpenEdit(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [titleEdit, setTitleEdit] = useState('')
  const [descriptionEdit, setDescriptionEdit] = useState('')
  const [currentData, setCurrentData] = useState({})

  const getKey = (pageIndex, previousPageData) => {
    //if no user or reached the end, do not fetch
    if (previousPageData && !previousPageData.data) return null

    //first page, we do not
    if (pageIndex === 0)
      return { path: '/alumni-announcements', cursor: 0, limit: PAGE_SIZE }

    //add the cursor to the API e
    console.log(previousPageData.nextCursor)
    return {
      path: '/alumni-announcements',
      cursor: previousPageData.nextCursor,
      limit: PAGE_SIZE
    }
  }

  const { data, size, setSize, error, mutate } = useSWRInfinite(
    getKey,
    getAlumniSWRCursor
  )

  const isLoading = !data && !error
  console.log('data, error and isLoading>>>>>>', data, error, isLoading)
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const allAlumniAnnouncement = data
    ? data.reduce((prev, curr) => [...prev, ...curr.data], [])
    : []
  const totalAlumniAnnouncement = allAlumniAnnouncement.length
  const isEmpty = !data ? true : data?.[0]?.data.length === 0
  const isReachingEnd =
    isEmpty ||
    (data && data[size - 1]?.data.length < PAGE_SIZE) ||
    Boolean(size > 0 && data && error)
  console.log('allAlumniAnnouncement>>>>>>', allAlumniAnnouncement)
  console.log('data and size>>>>>>', data, size)

  const loadMore = e => {
    e.preventDefault()
    setSize(pre => pre + 1)
  }

  if (isLoading) {
    return <Loader />
  }

  console.log('isReachingEnd', isReachingEnd)
  console.log('isLoadingMore', isLoadingMore)

  const clearInput = () => {
    setTitle('')
    setDescription('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (title.trim() === '' || description.trim() === '') {
        handleClose()
        return Swal.fire({
          text: 'Please enter all Alumni Announcement Details',
          animation: true,
          confirmButtonColor: '#0000FF',
          timer: 3000
        })
      }
      const body = {
        title,
        description
      }
      await Axios.post('/alumni-announcements', body)
      clearInput()
      handleClose()
      Swal.fire({
        text: 'Alumni Announcement data sent successfully',
        icon: 'success',
        animation: true,
        confirmButtonColor: '#0000FF'
      }).then(() => {
        window.location.reload()
      })
      // window.location.reload()
    } catch (error) {
      console.log(error)
      handleClose()
      Swal.fire({
        text: `${error.response.data.message}`,
        icon: 'error',
        animation: true,
        confirmButtonColor: '#0000FF'
      })
    }
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
            const res = await Axios.delete(`/alumni-announcements/${id}`)
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

  const handleEdit = async (e, row) => {
    e.preventDefault()
    handleOpenEdit()
    setCurrentData(row)
  }

  const handleEditSubmit = async (e, currentData) => {
    e.preventDefault()
    try {
      console.log('edit row', currentData)
      if (titleEdit.trim() === '' || descriptionEdit.trim() === '') {
        handleCloseEdit()
        return Swal.fire({
          text: 'Please enter all Alumni Announcement Details',
          animation: true,
          confirmButtonColor: '#0000FF',
          timer: 3000
        })
      }
      const body = {
        title: titleEdit,
        description: descriptionEdit
      }
      const res = await Axios.patch(
        `/alumni-announcements/${currentData.id}`,
        body
      )
      if (res.status === 200) {
        // update the data in the component
        mutate(data => {
          const updatedData = data.map(item => {
            if (item._id === currentData._id) {
              return {
                ...item,
                title: titleEdit,
                description: descriptionEdit
              }
            }
            return item
          })
          return updatedData
        }, false)
        setOpenEdit(false)
      }
      console.log('res client', res)
      clearInput()
      handleCloseEdit()
      Swal.fire({
        text: 'Alumni Announcement Edited successfully',
        icon: 'success',
        animation: true,
        confirmButtonColor: '#0000FF',
        timer: 3000
      }).then(() => {
        setSize(pre => pre + 1)
        // window.location.reload()
      })
    } catch (error) {
      console.log(error)
      handleCloseEdit()
      Swal.fire({
        text: `${error.response.data.message}`,
        icon: 'error',
        animation: true,
        confirmButtonColor: '#0000FF'
      })
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
                <Stack spacing={2}>
                  <Item>
                    <Title>
                      Alumni Announcement:(<b>{totalAlumniAnnouncement}</b>)
                    </Title>
                  </Item>
                  <Item>
                    <Button
                      onClick={handleOpen}
                      variant='contained'
                      startIcon={<Add />}
                    >
                      Add Announcement
                    </Button>
                  </Item>
                </Stack>
                {/* Add Announcement Modal */}
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby='modal-modal-title'
                  aria-describedby='modal-modal-description'
                >
                  <Box sx={modalStyles}>
                    <label className='mt-4'>Title:</label>
                    <Input
                      type='text'
                      label='Title'
                      id='title'
                      name='title'
                      className='bordered form-control'
                      placeholder='Enter Bible Story Title'
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                    />
                    <label className='mt-4'>Description:</label>
                    <Input
                      type='text'
                      label='Description'
                      id='description'
                      name='description'
                      className='bordered form-control'
                      placeholder='Enter Bible Story Description'
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                    />
                    <Button
                      variant='contained'
                      startIcon={<Add />}
                      sx={{ mt: 3 }}
                      onClick={e => handleSubmit(e)}
                    >
                      Add Alumni Announcement
                    </Button>
                  </Box>
                </Modal>

                {/* Edit/ Announcement Modal */}
                <Modal
                  open={openEdit}
                  onClose={handleCloseEdit}
                  aria-labelledby='modal-modal-title'
                  aria-describedby='modal-modal-description'
                >
                  <Box sx={modalStyles}>
                    <label className='mt-4'>Title:</label>
                    <Input
                      type='text'
                      label='Title'
                      id='title'
                      name='title'
                      className='bordered form-control'
                      placeholder='Enter Bible Story Title'
                      value={titleEdit}
                      onChange={e => setTitleEdit(e.target.value)}
                    />
                    <label className='mt-4'>Description:</label>
                    <Input
                      type='text'
                      label='Description'
                      id='description'
                      name='description'
                      className='bordered form-control'
                      placeholder='Enter Bible Story Description'
                      value={descriptionEdit}
                      onChange={e => setDescriptionEdit(e.target.value)}
                    />
                    <Button
                      variant='contained'
                      startIcon={<Add />}
                      sx={{ mt: 3 }}
                      onClick={e => handleEditSubmit(e, currentData)}
                    >
                      Update Alumni Announcement
                    </Button>
                  </Box>
                </Modal>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                      <TableHead>
                        <TableRow>
                          <TableCell>S/N</TableCell>
                          <TableCell align='right'>Title</TableCell>
                          <TableCell align='right'>Description</TableCell>
                          <TableCell align='center'>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {allAlumniAnnouncement.map((row, i) => (
                          <TableRow
                            key={row.id}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 }
                            }}
                          >
                            <TableCell sx={{ width: '10px' }}>
                              {i + 1}
                            </TableCell>
                            <TableCell align='right'>{row.title}</TableCell>
                            <TableCell align='right'>
                              {row.description}
                            </TableCell>
                            <TableCell align='right'>
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
                                <IconButton
                                  onClick={e => handleEdit(e, row)}
                                  aria-label='create'
                                  size='small'
                                >
                                  <CreateIcon fontSize='inherit' />
                                </IconButton>
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

export default AlumniAnnouncement
