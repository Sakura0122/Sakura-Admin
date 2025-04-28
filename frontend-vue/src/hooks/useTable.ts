import { ref, reactive, watch, onMounted, type Ref } from 'vue'
import type { Data, PageDto, PageVo } from '@/types/type.ts'

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
  list: Ref<R[]>
  /** 分页信息 */
  pagination: {
    currentPage: number
    pageSize: number
    total: number
  }
  /** 获取数据方法 */
  getList: (newParams?: TQuery) => Promise<void>
  /** 搜索 */
  search: () => void
}

export function useTable<TQuery extends Record<string, any>, R>(
  // 请求函数
  api: (params: PageDto<TQuery>) => Promise<Data<PageVo<R>>>,
  // 配置选项
  options: UseTableOptions<TQuery, R> = {},
): UseTableReturn<R, TQuery> {
  const { defaultPageSize = 10, params = {} as TQuery, immediate = true } = options

  // 响应式状态
  const paramsRef = ref<TQuery>(params)
  const list = ref<R[]>([]) as Ref<R[]>
  const pagination = reactive({
    currentPage: 1,
    pageSize: defaultPageSize,
    total: 0,
  })

  // 核心请求方法
  const getList = async (newParams?: TQuery) => {
    // 1. 更新参数（如果传入了新参数）
    if (newParams !== undefined) {
      paramsRef.value = newParams
      pagination.currentPage = 1 // 重置到第一页
    }

    // 2. 合并请求参数
    const requestParams: PageDto<TQuery> = {
      ...paramsRef.value,
      currentPage: pagination.currentPage,
      pageSize: pagination.pageSize,
    }

    // 3. 参数格式化
    const formattedParams = options.formatParams ? options.formatParams(requestParams) : requestParams

    // 4. 执行请求
    const response = await api(formattedParams)

    // 5. 结果格式化
    const { list: resultList, total } = options.formatResult
      ? options.formatResult(response.data)
      : { list: response.data.list, total: response.data.total }

    // 6. 更新状态
    list.value = resultList
    pagination.total = total

    // 7. 成功回调
    options.onSuccess?.(response.data)
  }

  // 立即执行请求
  onMounted(() => {
    if (immediate) getList()
  })

  // 监听分页参数变化
  watch(
    () => [pagination.currentPage, pagination.pageSize],
    () => getList(),
  )

  const search = () => {
    pagination.currentPage === 1 ? getList() : (pagination.currentPage = 1)
  }

  return {
    list,
    pagination,
    getList,
    search,
  }
}
