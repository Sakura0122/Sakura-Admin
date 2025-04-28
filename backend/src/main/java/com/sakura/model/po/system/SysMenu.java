package com.sakura.model.po.system;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import java.time.LocalDateTime;
import lombok.Data;

/**
 * 菜单表
 * @TableName sys_menu
 */
@TableName(value ="sys_menu")
@Data
public class SysMenu {
    /**
     * 编号
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 所属上级
     */
    private Long parentId;

    /**
     * 类型(1:菜单,2:按钮)
     */
    private Integer type;

    /**
     * 菜单标题
     */
    private String title;

    /**
     * 组件名称
     */
    private String component;

    /**
     * 权限标识
     */
    private String perms;

    /**
     * 排序
     */
    private Integer sortValue;

    /**
     * 状态(0:禁止,1:正常)
     */
    private Integer status;

    /**
     * 创建时间
     */
    private LocalDateTime createTime;

    /**
     * 更新时间
     */
    private LocalDateTime updateTime;

    /**
     * 删除标志（0代表存在 1代表删除
     */
    @TableLogic
    private Integer isDeleted;
}
