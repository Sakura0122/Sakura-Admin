import { type Directive, type DirectiveBinding } from 'vue'
import useUserStore from '@/stores/modules/user'

export const permission: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const requiredPerms = binding.value

    // 校验传入的权限值是否合法
    if (!requiredPerms || (typeof requiredPerms !== 'string' && !Array.isArray(requiredPerms))) {
      throw new Error(
        "需要提供权限标识！例如：v-permission=\"'sys:user:add'\" 或 v-permission=\"['sys:user:add', 'sys:user:edit']\"",
      )
    }

    const { buttons } = useUserStore()

    // 检查权限
    const hasAuth = Array.isArray(requiredPerms)
      ? requiredPerms.some((perm) => buttons.includes(perm))
      : buttons.includes(requiredPerms)

    // 如果没有权限，移除该元素
    if (!hasAuth && el.parentNode) {
      el.parentNode.removeChild(el)
    }
  },
}
