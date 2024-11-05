'use server'

// utils
import axios from 'axios'
import { formatServerError } from '@/lib/utils'

// types
import { ServerResponse } from '@/types/server-types'
import {
  Address,
  AddressCreateAddressReqBody,
  AddressUpdateAddressReqBody,
} from '@/types/address-types'

// constants
import { ADDRESSES_CURRENT_USER_ADDRESS } from '@/constants/server-endpoint-constants'

// Address

// Create address
export const createAddress = async (reqBody: AddressCreateAddressReqBody) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${ADDRESSES_CURRENT_USER_ADDRESS}`
    const axiosResponse = await axios.post(url, reqBody)
    return axiosResponse.data as ServerResponse<Address>
  } catch (err) {
    formatServerError(err)
  }
}

// Update address
export const updateAddress = async (
  recordId: string,
  reqBody: AddressUpdateAddressReqBody
) => {
  try {
    const url = `${process.env.NEXT_DEVBOOK_API_URL}${ADDRESSES_CURRENT_USER_ADDRESS}/${recordId}`
    const axiosResponse = await axios.patch(url, reqBody)
    return axiosResponse.data as ServerResponse<Address>
  } catch (err) {
    formatServerError(err)
  }
}
