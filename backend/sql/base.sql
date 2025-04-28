create database if not exists sakura default character set utf8mb4 collate utf8mb4_0900_ai_ci /*!80016 default encryption = 'n' */;

use sakura;

drop table if exists `sys_menu`;

create table `sys_menu`
(
    `id`          bigint      not null auto_increment comment '编号',
    `parent_id`   bigint      not null default '0' comment '所属上级',
    `type`        tinyint              default null comment '类型(1:菜单,2:按钮)',
    `title`       varchar(20) not null default '' comment '菜单标题',
    `component`   varchar(100)         default null comment '组件名称',
    `perms`       varchar(255)         default null comment '权限标识',
    `sort_value`  int         not null default '1' comment '排序',
    `status`      tinyint     not null default '1' comment '状态(0:禁止,1:正常)',
    `create_time` timestamp   not null default current_timestamp comment '创建时间',
    `update_time` timestamp   not null default current_timestamp on update current_timestamp comment '更新时间',
    `is_deleted`  tinyint     not null default '0' comment '删除标志（0代表存在 1代表删除',
    primary key (`id`),
    key `idx_parent_id` (`parent_id`)
) comment ='菜单表';

drop table if exists `sys_role`;

create table `sys_role`
(
    `id`          bigint      not null auto_increment comment '角色id',
    `role_name`   varchar(20) not null default '' comment '角色名称',
    `role_code`   varchar(20)          default null comment '角色编码',
    `description` varchar(255)         default null comment '描述',
    `create_time` timestamp   not null default current_timestamp comment '创建时间',
    `update_time` timestamp   not null default current_timestamp on update current_timestamp comment '更新时间',
    `is_deleted`  tinyint     not null default '0' comment '删除标志（0代表存在 1代表删除',
    primary key (`id`)
) comment ='角色';

drop table if exists `sys_role_menu`;

create table `sys_role_menu`
(
    `id`          bigint    not null auto_increment,
    `role_id`     bigint    not null default '0',
    `menu_id`     bigint    not null default '0',
    `create_time` timestamp not null default current_timestamp comment '创建时间',
    `update_time` timestamp not null default current_timestamp on update current_timestamp comment '更新时间',
    `is_deleted`  tinyint   not null default '0' comment '删除标志（0代表存在 1代表删除',
    primary key (`id`),
    key `idx_role_id` (`role_id`),
    key `idx_menu_id` (`menu_id`)
) comment ='角色菜单';

drop table if exists `sys_user`;

create table `sys_user`
(
    `id`          bigint       not null auto_increment comment 'id',
    `username`    varchar(20)  not null default '' comment '用户名',
    `password`    varchar(255) not null default '' comment '密码',
    `name`        varchar(50)           default null comment '姓名',
    `phone`       varchar(11)           default null comment '手机',
    `avatar`      varchar(255)          default null comment '头像',
    `description` varchar(255)          default null comment '描述',
    `status`      tinyint      not null default '1' comment '状态（1：正常 0：停用）',
    `create_time` timestamp    not null default current_timestamp comment '创建时间',
    `update_time` timestamp    not null default current_timestamp on update current_timestamp comment '更新时间',
    `is_deleted`  tinyint      not null default '0' comment '删除标志（0代表存在 1代表删除',
    primary key (`id`),
    unique key `idx_username` (`username`)
) comment ='用户表';

drop table if exists `sys_user_role`;

create table `sys_user_role`
(
    `id`          bigint    not null auto_increment comment '主键id',
    `role_id`     bigint    not null default '0' comment '角色id',
    `user_id`     bigint    not null default '0' comment '用户id',
    `create_time` timestamp not null default current_timestamp comment '创建时间',
    `update_time` timestamp not null default current_timestamp on update current_timestamp comment '更新时间',
    `is_deleted`  tinyint   not null default '0' comment '删除标志（0代表存在 1代表删除',
    primary key (`id`),
    key `idx_role_id` (`role_id`),
    key `idx_admin_id` (`user_id`)
) comment ='用户角色';
