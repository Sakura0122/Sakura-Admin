import { useState, useEffect } from 'react'
import { Data, PageDto, PageVo } from '@/types/type.ts'

// Hook 配置选项
interface UseTableOptions<TQuery, R> {
  /** 默认分页大小 */
  defaultPageSize?: number
  /** 静态查询参数 */
  params?: TQuery
  /** 参数格式化函数 */
  formatParams?: (params: PageDto<TQuery>) => any
  /** 结果格式化函数 */
  formatResult?: (data: PageVo<R>) => { list: R[]; total: number }
  /** 请求成功回调 */
  onSuccess?: (data: PageVo<R>) => void
  /** 是否立即请求 */
  immediate?: boolean
}

// Hook 返回值类型
interface UseTableReturn<R, TQuery> {
  /** 表格数据列表 */
  list: R[]
  /** 分页信息 */
  pagination: {
    current: number
    defaultPageSize: number
    total: number
  }
  /** 获取数据方法 */
  getList: (newParams?: TQuery) => Promise<void>
  /** 搜索 */
  search: () => void
}

export function useTable1<TQuery extends Record<string, any>, R>(
  api: (params: PageDto<TQuery>) => Promise<Data<PageVo<R>>>,
  options: UseTableOptions<TQuery, R> = {},
): UseTableReturn<R, TQuery> {
  const { defaultPageSize = 10, params = {} as TQuery, immediate = true } = options

  // 分页状态
  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize,
    total: 0,
    showSizeChanger: true,
  })

  // 列表数据
  const [list, setList] = useState<R[]>([])

  // 核心请求方法
  const getList = async (newParams?: TQuery) => {
    try {
      // 合并请求参数
      const requestParams: PageDto<TQuery> = {
        ...(newParams ?? params),
        currentPage: pagination.current,
        pageSize: pagination.defaultPageSize,
      }
      console.log(params)

      // 参数格式化
      const formattedParams = options.formatParams ? options.formatParams(requestParams) : requestParams

      // 执行请求
      const response = await api(formattedParams)

      // 结果格式化
      const resultData = options.formatResult
        ? options.formatResult(response.data)
        : { list: response.data.list, total: response.data.total }

      // 更新状态
      setList(resultData.list)
      setPagination((prev) => ({ ...prev, total: resultData.total }))

      // 成功回调
      options.onSuccess?.(response.data)
    } catch (error) {
      console.error('请求失败:', error)
    }
  }

  // 初始化请求控制
  useEffect(() => {
    if (immediate) getList()
  }, [])

  // 搜索方法
  const search = (newParams?: TQuery) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: 1, // 强制回到第一页
    }))

    // 立即用新参数请求，不需要等待 state 更新
    getList(newParams)
  }

  return {
    list,
    pagination,
    getList,
    search,
  }
}
