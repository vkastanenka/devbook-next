'use server'

// utils
import { serverRequestServer } from '@/actions/server-actions'

// types
import {
  Address,
  AddressCreateCurrentUserAddressReqBody,
  AddressUpdateAddressReqBody,
} from '@/types/address-types'

// constants
import { ADDRESSES_CURRENT_USER_ADDRESS } from '@/constants/server-endpoint-constants'

// Address

// Create address
export const addressCreateCurrentUserAddress = async (
  reqBody: AddressCreateCurrentUserAddressReqBody
) => {
  return await serverRequestServer<
    Address,
    AddressCreateCurrentUserAddressReqBody
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
