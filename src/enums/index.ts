export enum sidebarName {
  'Resource' = '云服务器',
  'Script' = '脚本服务',
  'Storage' = '文件存储',
  'User' = '账户设置',
}
export enum resourceStatus {
  '启动中' = 0,
  '运行中' = 1,
  '连接中断' = 2,
  '过期' = 3,
}
export enum resourceStatusColor {
  // 'bg-[#6A9DCB]' = 1,
  'bg-[#008FFF]' = 0,
  'bg-[#02C900]' = 1,
  'bg-[#FF0019]' = 2,
  'bg-[#AEAEAE]' = 3,
}
export enum executeStatus {
  '未执行' = 1,
  '执行中' = 2,
  '执行完成' = 3,
  '执行失败' = 4,
  '取消执行' = 4,
}
export enum executeStatusColor {
  'bg-[#6A9DCB]' = 1,
  'bg-[#008FFF]' = 2,
  'bg-[#00C900]' = 3,
  'bg-[#AEAEAE]' = 4,
}