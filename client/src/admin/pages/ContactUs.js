import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
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
import Loader from '../components/Loader'
import Swal from 'sweetalert2'
import useSWRInfinite from 'swr/infinite'
import { useState } from 'react'
import Axios from '../../config'
import { getContactUsSWRCursor } from '../../lib/contactUs'
import { validateEmail } from '../../utils'

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

const ChildrenSong = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  const [openEdit, setOpenEdit] = React.useState(false)
  const handleOpenEdit = () => setOpenEdit(true)
  const handleCloseEdit = () => setOpenEdit(false)
  const [nameEdit, setNameEdit] = useState('')
  const [emailEdit, setEmailEdit] = useState('')
  const [subjectEdit, setSubjectEdit] = useState('')
  const [contentEdit, setContentEdit] = useState('')
  const [currentData, setCurrentData] = useState({})

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
      return { path: '/contact-us', cursor: 0, limit: PAGE_SIZE }

    //add the cursor to the API e
    console.log(previousPageData.nextCursor)
    return {
      path: '/contact-us',
      cursor: previousPageData.nextCursor,
      limit: PAGE_SIZE
    }
  }

  const { data, size, setSize, error, mutate } = useSWRInfinite(
    getKey,
    getContactUsSWRCursor
  )
  const isLoading = !data && !error
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const allContactUs = data
    ? data.reduce((prev, curr) => [...prev, ...curr.data], [])
    : []
  const totalContactUs = allContactUs.length
  const isEmpty = !data ? true : data?.[0]?.data.length === 0
const isReachingEnd =
  isEmpty ||
  (data && data[size - 1]?.data.length < PAGE_SIZE) ||
  Boolean(size > 0 && data && error)

  console.log('allContactUs>>>>>>', allContactUs)
  console.log('data and size>>>>>>', data, size)

  const loadMore = e => {
    e.preventDefault()
    setSize(pre => pre + 1)
  }

  if (isLoading) {
    return <Loader />
  }

  const clearInput = () => {
    setNameEdit('')
    setEmailEdit('')
    setSubjectEdit('')
    setContentEdit('')
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
            const res = await Axios.delete(`/contact-us/${id}`)
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
        nameEdit.trim() === '' ||
        !validateEmail(emailEdit) === '' ||
        subjectEdit.trim() === '' ||
        contentEdit.trim() === ''
      ) {
        handleCloseEdit()
        return Swal.fire({
          text: 'Please enter all Contact Us Feedback Details',
          animation: true,
          confirmButtonColor: '#0000FF',
          timer: 3000
        })
      }
      const body = {
        name: nameEdit,
        email: emailEdit,
        subject: subjectEdit,
        content: contentEdit
      }
      const res = await Axios.patch(`/contact-us/${currentData.id}`, body)
      if (res.status === 200) {
        // update the data in the component
        mutate(data => {
          const updatedData = data.map(item => {
            if (item._id === currentData._id) {
              return {
                ...item,
                name: nameEdit,
                email: emailEdit,
                subject: subjectEdit,
                content: contentEdit
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
        text: 'Contact Form Feedback Edited Successfully',
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
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Title>Contact Us</Title>

                  {/* Edit Bible Story Modal */}
                  <Modal
                    open={openEdit}
                    onClose={handleCloseEdit}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                  >
                    <Box sx={modalStyles}>
                      <label className='mt-4'>Name:</label>
                      <Input
                        type='text'
                        label='Name'
                        id='name'
                        name='name'
                        className='bordered form-control'
                        placeholder='Enter Name'
                        value={nameEdit}
                        onChange={e => setNameEdit(e.target.value)}
                      />
                      <label className='mt-4'>Email:</label>
                      <Input
                        type='text'
                        label='Description'
                        id='email'
                        name='email'
                        className='bordered form-control'
                        placeholder='Enter Email'
                        value={emailEdit}
                        onChange={e => setEmailEdit(e.target.value)}
                      />
                      <label className='mt-4'>Subject:</label>
                      <Input
                        type='text'
                        label='Subject'
                        id='subject'
                        name='subject'
                        className='bordered form-control'
                        placeholder='Enter Subject'
                        value={subjectEdit}
                        onChange={e => setSubjectEdit(e.target.value)}
                      />
                      <label className='mt-4'>Content:</label>
                      <Input
                        type='text'
                        label='Description'
                        id='content'
                        name='content'
                        className='bordered form-control'
                        placeholder='Enter Content'
                        value={contentEdit}
                        onChange={e => setContentEdit(e.target.value)}
                      />
                      <Button
                        variant='contained'
                        startIcon={<Add />}
                        sx={{ mt: 3 }}
                        onClick={e => handleEditSubmit(e, currentData)}
                      >
                        Edit Contact Feedback
                      </Button>
                    </Box>
                  </Modal>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                      <TableHead>
                        <TableRow>
                          <TableCell>S/N</TableCell>
                          <TableCell align='center'>Name</TableCell>
                          <TableCell align='center'>Email</TableCell>
                          <TableCell align='center'>Subject</TableCell>
                          <TableCell align='center'>Content</TableCell>
                          <TableCell align='center'>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {allContactUs.map((row, i) => (
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
                            <TableCell align='center'>{row.email}</TableCell>
                            <TableCell align='center'>{row.subject}</TableCell>
                            <TableCell align='center'>{row.content}</TableCell>
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

export default ChildrenSong
