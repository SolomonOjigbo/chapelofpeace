import Axios, { authAxios } from '../../config'
import { getErrorMessage } from '../../utils'
import Swal from 'sweetalert2'

export const getAlumniSWRCursor = async ({
  limit,
  cursor = 0,
  sortBy = 'id',
  order = 'desc'
}) => {
  try {
    console.log(limit, cursor)
    const query = `sortBy=${sortBy}&order=${order}&limit=${limit}&cursor=${cursor}`
    const response = await Axios.get(`/alumni-announcements?${query}`)
    console.log('response', response.data)
    const data = response.data.data
    const nextCursor = data[data.length - 1].id
    console.log(nextCursor)
    return { data, nextCursor }
  } catch (error) {
    throw error
  }
}

export const getAlumniMembershipsSWRCursor = async ({
  limit,
  cursor = 0,
  sortBy = 'id',
  order = 'desc'
}) => {
  try {
    console.log(limit, cursor)
    const query = `sortBy=${sortBy}&order=${order}&limit=${limit}&cursor=${cursor}`
    const response = await Axios.get(`/alumni-memberships?${query}`)
    console.log('response', response.data)
    const data = response.data.data
    const nextCursor = data[data.length - 1].id
    console.log(nextCursor)
    return { data, nextCursor }
  } catch (error) {
    throw error
  }
}

