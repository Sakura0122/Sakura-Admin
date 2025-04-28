import { useState, useEffect, useCallback } from 'react'
import usePagination from './usePagination'
import { Data, PageDto, PageVo } from '@/types/type.ts'
import { FormInstance } from 'antd'

interface UseTableOptions<TQuery, R> {
  /** 默认分页大小 */
  defaultPageSize?: number
  /** 静态查询参数 */
  params?: TQuery
  form?: FormInstance<TQuery>
  /** 参数格式化函数 */
  formatParams?: (params: PageDto<TQuery>) => any
  /** 结果格式化函数 */
  formatResult?: (data: PageVo<R>) => { list: R[]; total: number }
  /** 请求成功回调 */
  onSuccess?: (data: PageVo<R>) => void
  /** 是否立即请求 */
  immediate?: boolean
  /** API 请求函数 */
  api: (params: any) => Promise<Data<PageVo<R>>>
}

export default function useTable<TQuery extends Record<string, any>, R>({
  api,
  params = {} as TQuery,
  form,
  defaultPageSize = 10,
  formatParams,
  formatResult,
  onSuccess,
  immediate = true,
}: UseTableOptions<TQuery, R>) {
  const [list, setList] = useState<R[]>([])
  const { pagination, setPagination, reset } = usePagination({ pageSize: defaultPageSize })

  const getData = useCallback(async () => {
    let queryParams: PageDto<TQuery> = {
      currentPage: pagination.current as number,
      pageSize: pagination.pageSize as number,
      ...params,
      ...(form ? form.getFieldsValue() : {}),
    }

    if (formatParams) {
      queryParams = formatParams(queryParams)
    }

    const res = await api(queryParams)
    const { list: formattedList, total } = formatResult ? formatResult(res.data) : res.data

    setList(formattedList)
    setPagination((prev) => ({ ...prev, total }))

    if (onSuccess) {
      onSuccess(res.data)
    }
  }, [api, params, pagination.current, pagination.pageSize, formatParams, formatResult, onSuccess])

  const search = useCallback(() => {
    reset()
    getData()
  }, [reset, getData])

  useEffect(() => {
    if (immediate) {
      getData()
    }
  }, [pagination.current, pagination.pageSize])

  return { list, pagination, search, refresh: getData }
}
