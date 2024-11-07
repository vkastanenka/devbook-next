'use server'

// utils
import { serverRequestServer } from '@/actions/server-actions'

// types
import {
  Address,
  AddressCreateUserAddressReqBody,
  AddressUpdateAddressReqBody,
} from '@/types/address-types'

// constants
import { ADDRESSES_CURRENT_USER_ADDRESS } from '@/constants/server-endpoint-constants'

// Address

// Create address
export const addressCreateCurrentUserAddress = async (
  reqBody: AddressCreateUserAddressReqBody
) => {
  return await serverRequestServer<
    Address,
    AddressCreateUserAddressReqBody
  >({
    data: reqBody,
    endpoint: ADDRESSES_CURRENT_USER_ADDRESS,
    method: 'post',
  })
}

// Update address
export const addressUpdateCurrentUserAddress = async (
  recordId: string,
  reqBody: AddressUpdateAddressReqBody
) => {
  return await serverRequestServer<Address, AddressUpdateAddressReqBody>({
    data: reqBody,
    endpoint: `${ADDRESSES_CURRENT_USER_ADDRESS}/${recordId}`,
    method: 'patch',
  })
}
