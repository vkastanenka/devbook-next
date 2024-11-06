'use server'

// utils
import { serverRequestServer } from '@/actions/server-actions'

// types
import {
  Address,
  AddressCreateAddressReqBody,
  AddressUpdateAddressReqBody,
} from '@/types/address-types'

// constants
import { ADDRESSES_CURRENT_USER_ADDRESS } from '@/constants/server-endpoint-constants'

// Address

// Create address
export const addressCreateAddress = async (reqBody: AddressCreateAddressReqBody) => {
  return await serverRequestServer<Address, AddressCreateAddressReqBody>({
    data: reqBody,
    endpoint: ADDRESSES_CURRENT_USER_ADDRESS,
    method: 'post',
  })
}

// Update address
export const addressUpdateAddress = async (
  recordId: string,
  reqBody: AddressUpdateAddressReqBody
) => {
  return await serverRequestServer<Address, AddressUpdateAddressReqBody>({
    data: reqBody,
    endpoint: `${ADDRESSES_CURRENT_USER_ADDRESS}/${recordId}`,
    method: 'patch',
  })
}
