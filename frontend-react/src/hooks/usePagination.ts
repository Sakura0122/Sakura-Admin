import { useState, useCallback } from 'react'
import { TablePaginationConfig } from 'antd'

export default function usePagination(initial?: TablePaginationConfig) {
  const [pageState, setPageState] = useState({
    current: initial?.current || 1,
    pageSize: initial?.pageSize || 10,
    total: initial?.total || 0,
  })

  const handleChange = useCallback((page: number, pageSize: number) => {
    setPageState((prev) => ({
      ...prev,
      current: page,
      pageSize,
    }))
  }, [])

  const handleSizeChange = useCallback((_: number, size: number) => {
    setPageState((prev) => ({
      ...prev,
      current: 1,
      pageSize: size,
    }))
  }, [])

  const pagination: TablePaginationConfig = {
    ...pageState,
    onChange: handleChange,
    onShowSizeChange: handleSizeChange,
    showSizeChanger: true,
  }

  return {
    pagination,
    setPagination: setPageState,
    reset: () => setPageState((prev) => ({ ...prev, current: 1 })),
  }
}
