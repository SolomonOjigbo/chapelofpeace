import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Title from '../components/Title'
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Input,
  Modal,
  Stack
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import CreateIcon from '@mui/icons-material/Create'
import Sidebar from '../components/Sidebar'
import { useUserAuth } from '../../lib/auth'
import Loader from '../components/Loader'
import Swal from 'sweetalert2'
import useSWRInfinite from 'swr/infinite'
import { useState } from 'react'
import Axios from '../../config'
import { FileUploader } from 'react-drag-drop-files'
import { getMeditationsSWRCursor } from '../../lib/meditations'
import { styled } from '@mui/material/styles'
import Add from '@mui/icons-material/Add'
import { DatePicker, TimePicker } from 'antd'
import moment from 'moment'

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
  zIndex: 1,
  overflowY: 'scroll !important',
  height: '80vh',
  '& .MuiDialog-paper': {
    overflowY: 'scroll !important',
    height: '80vh'
  }
}

export default function Meditation () {
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [venue, setVenue] = useState('')
  const [content, setContent] = useState('')
  const [photo, setPhoto] = useState(null)
  const [openEdit, setOpenEdit] = React.useState(false)
  const handleOpenEdit = () => setOpenEdit(true)
  const handleCloseEdit = () => setOpenEdit(false)
  const [titleEdit, setTitleEdit] = useState('')
  const [dateEdit, setDateEdit] = useState('')
  const [timeEdit, setTimeEdit] = useState('')
  const [venueEdit, setVenueEdit] = useState('')
  const [contentEdit, setContentEdit] = useState('')
  const [photoEdit, setPhotoEdit] = useState(null)
  const [currentData, setCurrentData] = useState({})
  const fileTypes = ['JPEG', 'PNG', 'GIF']

  const getKey = (pageIndex, previousPageData) => {
    //if no user or reached the end, do not fetch
    if (previousPageData && !previousPageData.data) return null

    //first page, we do not
    if (pageIndex === 0)
      return { path: '/meditations', cursor: 0, limit: PAGE_SIZE }

    //add the cursor to the API e
    console.log(previousPageData.nextCursor)
    return {
      path: '/meditations',
      cursor: previousPageData.nextCursor,
      limit: PAGE_SIZE
    }
  }

  const { data, size, setSize, error, mutate } = useSWRInfinite(
    getKey,
    getMeditationsSWRCursor
  )
  const isLoading = !data && !error
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const allMeditations = data
    ? data.reduce((prev, curr) => [...prev, ...curr.data], [])
    : []
  const totalMeditations = allMeditations.length
const isEmpty = !data ? true : data?.[0]?.data.length === 0
const isReachingEnd =
  isEmpty ||
  (data && data[size - 1]?.data.length < PAGE_SIZE) ||
  Boolean(size > 0 && data && error)

  console.log('allMeditations>>>>>>', allMeditations)
  console.log('data and size>>>>>>', data, size)

  const loadMore = e => {
    e.preventDefault()
    setSize(pre => pre + 1)
  }

  if (isLoading) {
    return <Loader />
  }
  
  const handleUploadFileChange = file => {
    setPhoto(file)
  }

  const handleEditUploadFileChange = file => {
    setPhotoEdit(file)
  }
  const clearInput = () => {
    setTitle('')
    setDate('')
    setTime('')
    setVenue('')
    setContent('')
    setPhoto(null)
    setTitleEdit('')
    setDateEdit('')
    setTimeEdit('')
    setVenueEdit('')
    setContentEdit('')
    setPhotoEdit(null)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (
        title.trim() === '' ||
        date.trim() === '' ||
        time.trim() === '' ||
        venue.trim() === '' ||
        content.trim() === '' ||
        photo === null
      ) {
        handleClose()
        return Swal.fire({
          text: 'Please enter all Meditation Details',
          animation: true,
          confirmButtonColor: '#0000FF',
          timer: 3000
        })
      }
      const body = {
        title,
        date,
        time,
        venue,
        content,
        photo: 'Test.jpg'
      }
      await Axios.post('/meditations', body)
      clearInput()
      handleClose()
      Swal.fire({
        text: 'Meditation data sent successfully',
        icon: 'success',
        animation: true,
        confirmButtonColor: '#0000FF'
      }).then(() => {
        setSize(pre => pre + 1)
        // window.location.reload()
      })
    } catch (error) {
      console.log(error)
      handleClose()
      return Swal.fire({
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
            const res = await Axios.delete(`/meditations/${id}`)
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
      if (
        titleEdit.trim() === '' ||
        dateEdit.trim() === '' ||
        timeEdit.trim() === '' ||
        venueEdit.trim() === '' ||
        contentEdit.trim() === '' ||
        photoEdit === null
      ) {
        handleCloseEdit()
        return Swal.fire({
          text: 'Please enter all Meditation Details',
          animation: true,
          confirmButtonColor: '#0000FF',
          timer: 3000
        })
      }
      const body = {
        title: titleEdit,
        date: dateEdit,
        time: timeEdit,
        venue: venueEdit,
        content: contentEdit,
        photo: 'Edit.jpg'
      }
      const res = await Axios.patch(`/meditations/${currentData.id}`, body)
      if (res.status === 200) {
        // update the data in the component
        mutate(data => {
          const updatedData = data.map(item => {
            if (item._id === currentData._id) {
              return {
                ...item,
                title: titleEdit,
                date: dateEdit,
                time: timeEdit,
                venue: venueEdit,
                content: contentEdit,
                photo: 'Edit.jpg'
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
        text: 'Meditation Edited Successfully',
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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }))

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
                  <Title>All Meditation</Title>
                  <Stack spacing={2}>
                    <Item></Item>
                    <Item>
                      <Button
                        onClick={handleOpen}
                        variant='contained'
                        startIcon={<Add />}
                      >
                        Add Meditation
                      </Button>
                    </Item>
                  </Stack>
                  {/* Add Bible Story Modal */}
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
                        placeholder='Enter Meditation Title'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                      />
                      <label className='mt-4'>Date:</label>
                      <DatePicker
                        onChange={e => setDate(moment(e).format('DD-MM-YYYY'))}
                        size='large'
                        width='100%'
                        className='form-control datepicker'
                      />
                      <label className='mt-4'>Time:</label>
                      <TimePicker
                        onChange={e => setTime(moment(e).format('hh:mm:ss'))}
                        size='large'
                        width='100%'
                        className='form-control datepicker'
                      />
                      <label className='mt-4'>Venue:</label>
                      <Input
                        type='text'
                        label='Venue'
                        id='venue'
                        name='venue'
                        className='bordered form-control'
                        placeholder='Enter Meditation Venue'
                        value={venue}
                        onChange={e => setVenue(e.target.value)}
                      />
                      <label className='mt-4'>Content:</label>
                      <Input
                        type='text'
                        label='Content'
                        id='content'
                        name='content'
                        className='bordered form-control'
                        placeholder='Enter Content of Meditation'
                        value={content}
                        onChange={e => setContent(e.target.value)}
                      />
                      <label className='mt-4'>Photo:</label>
                      <FileUploader
                        multiple={true}
                        handleChange={handleUploadFileChange}
                        name='file'
                        className='form-control'
                        style={{ height: '300px', marginTop: '20px' }}
                        types={fileTypes}
                      />
                      <Button
                        variant='contained'
                        startIcon={<Add />}
                        sx={{ mt: 3 }}
                        onClick={handleSubmit}
                      >
                        Add Meditation
                      </Button>
                    </Box>
                  </Modal>

                  {/* Add Bible Story Modal */}
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
                        id='titleEdit'
                        name='titleEdit'
                        className='bordered form-control'
                        placeholder='Enter Meditation Title'
                        value={titleEdit}
                        onChange={e => setTitleEdit(e.target.value)}
                      />
                      <label className='mt-4'>Date:</label>
                      <DatePicker
                        onChange={e =>
                          setDateEdit(moment(e).format('DD-MM-YYYY'))
                        }
                        size='large'
                        width='100%'
                        className='form-control datepicker'
                      />
                      <label className='mt-4'>Time:</label>
                      <TimePicker
                        onChange={e =>
                          setTimeEdit(moment(e).format('hh:mm:ss'))
                        }
                        size='large'
                        width='100%'
                        className='form-control datepicker'
                      />
                      <label className='mt-4'>Venue:</label>
                      <Input
                        type='text'
                        label='Venue'
                        id='venueEdit'
                        name='venueEdit'
                        className='bordered form-control'
                        placeholder='Enter Meditation Venue'
                        value={venueEdit}
                        onChange={e => setVenueEdit(e.target.value)}
                      />
                      <label className='mt-4'>Content:</label>
                      <Input
                        type='text'
                        label='Content'
                        id='contentEdit'
                        name='contentEdit'
                        className='bordered form-control'
                        placeholder='Enter Content of Meditation'
                        value={contentEdit}
                        onChange={e => setContentEdit(e.target.value)}
                      />
                      <label className='mt-4'>Photo:</label>
                      <FileUploader
                        multiple={true}
                        handleChange={handleEditUploadFileChange}
                        name='file'
                        className='form-control'
                        style={{ height: '300px', marginTop: '20px' }}
                        types={fileTypes}
                      />
                      <Button
                        variant='contained'
                        startIcon={<Add />}
                        sx={{ mt: 3 }}
                        onClick={e => handleEditSubmit(e, currentData)}
                      >
                        Edit Meditation
                      </Button>
                    </Box>
                  </Modal>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                      <TableHead>
                        <TableRow>
                          <TableCell>S/N</TableCell>
                          <TableCell>Title</TableCell>
                          <TableCell align='center'>Date</TableCell>
                          <TableCell align='center'>Time</TableCell>
                          <TableCell align='center'>Venue</TableCell>
                          <TableCell align='center'>Content</TableCell>
                          <TableCell align='center'>Photo</TableCell>
                          <TableCell align='center'>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {allMeditations.map((row, i) => (
                          <TableRow
                            key={row.id}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 }
                            }}
                          >
                            <TableCell>{i + 1}</TableCell>
                            <TableCell align='center'>{row.title}</TableCell>
                            <TableCell align='center'>{row.date}</TableCell>
                            <TableCell align='center'>{row.time}</TableCell>
                            <TableCell align='center'>{row.venue}</TableCell>
                            <TableCell align='center'>{row.content}</TableCell>
                            <TableCell component='th' scope='row'>
                              {row.photo}
                            </TableCell>
                            <TableCell component='th' scope='row'>
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
                    <Button disabled={isLoadingMore} onClick={e => loadMore(e)}>
                      {isLoadingMore ? <Loader /> : 'Load More'}
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
