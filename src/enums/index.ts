export enum sidebarName {
  'Resource' = '云服务器',
  'Script' = '脚本服务',
  'Storage' = '文件存储',
  'User' = '账户设置',
}
export enum resourceStatus {
  '创建中' = 1,
  '启动中' = 2,
  '运行中' = 3,
  '已停止' = 4,
  '已过期' = 5,
}
export enum resourceStatusColor {
  'bg-[#6A9DCB]' = 1,
  'bg-[#008FFF]' = 2,
  'bg-[#02C900]' = 3,
  'bg-[#FF0019]' = 4,
  'bg-[#AEAEAE]' = 5,
}
export enum executeStatus {
  '待执行' = 1,
  '执行中' = 2,
  '已完成' = 3,
  '已取消' = 4,
}
export enum executeStatusColor {
  'bg-[#6A9DCB]' = 1,
  'bg-[#008FFF]' = 2,
  'bg-[#00C900]' = 3,
  'bg-[#AEAEAE]' = 4,
}