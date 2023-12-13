export enum sidebarName {
  'Resource' = '云服务器',
  'Script' = '脚本服务',
  'Storage' = '文件存储',
  'User' = '账户设置',
  'Developer' = '开发者选项',
}
export enum resourceStatus {
  '启动中' = 0,
  '运行中' = 1,
  '已停止' = 2,
  '已过期' = 3,
}
export enum resourceStatusColor {
  // 'bg-[#6A9DCB]' = 1,
  'bg-[#008FFF]' = 0,
  'bg-[#02C900]' = 1,
  'bg-[#FF0019]' = 2,
  'bg-[#AEAEAE]' = 3,
}
export enum executeStatus {
  '待执行' = 1,
  '执行中' = 2,
  '已完成' = 3,
  '执行失败' = 4,
  '已取消' = 5,
}
export enum executeStatusColor {
  'bg-[#6A9DCB]' = 1,
  'bg-[#008FFF]' = 2,
  'bg-[#00C900]' = 3,
  'bg-[#F52222]' = 4,
  'bg-[#AEAEAE]' = 5,
}


export enum boundDomainStatus {
  '状态正常' = 1,
  '状态异常' = 2,
  '解析中...' = 3
}

export enum boundDomainStatusColor {
  'bg-[#00C900]' = 1,
  'bg-[#F52222]' = 2,
  'bg-[#008FFF]' = 3
}