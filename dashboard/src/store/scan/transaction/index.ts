// Copyright (c) RoochNetwork
// SPDX-License-Identifier: Apache-2.0

// ** Redux Imports
import { createAsyncThunk, Dispatch, AnyAction } from '@reduxjs/toolkit'

// ** Store Generic Imports
import { CreateGenericSlice, GenericState } from '../../generic'

// ** sdk import
import { RoochClient, TransactionWithInfoPageView } from '@roochnetwork/rooch-sdk'

interface DataParams {
  dispatch: Dispatch<AnyAction>
  provider: RoochClient
  cursor: number
  limit: number
}

// ** Fetch Transaction
export const fetchData = createAsyncThunk('state/fetchData', async (params: DataParams) => {
  params.dispatch(start())

  try {
    let result = await params.provider.getTransactions(params.cursor, params.limit)
    params.dispatch(success(result))

    console.log(result)

    return result
  } catch (e: any) {
    params.dispatch(error(e.toString()))
  }
})

export const TransactionSlice = CreateGenericSlice({
  name: 'state',
  initialState: {
    result: {},
  } as GenericState<TransactionWithInfoPageView>,
  reducers: {},
})

export default TransactionSlice.reducer

const { start, error, success } = TransactionSlice.actions
