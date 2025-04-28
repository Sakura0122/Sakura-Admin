/**
 * storage存储
 * @param key {string} 参数名称
 * @param value {any} 写入值
 */
function set(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value))
}

/**
 * storage读取
 * @param key {string} 参数名称
 * @returns storage值
 */
function get(key: string) {
  const value = localStorage.getItem(key)
  if (!value) return ''
  try {
    return JSON.parse(value)
  } catch (error) {
    console.error('localStorage读取失败', error)
    return value
  }
}

/**
 * 删除localStorage值
 * @param key {string} 参数名称
 */
function remove(key: string) {
  localStorage.removeItem(key)
}

/**
 * 清空localStorage值
 */
function clear() {
  localStorage.clear()
}

export default { set, get, remove, clear }
