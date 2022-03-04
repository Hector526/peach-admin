module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build', // 编译相关修改，发布版本
        'chore', // 其他修改，比如改变构建流程，增加依赖库，工具
        'ci',
        'upd', // 更新某功能
        'feat', // 新功能，新特性
        'fix', // 修改bug
        'perf', // 优化性能，体验
        'refactor', // 重构
        'revert',
        'style', // 格式（不影响代码运行的变动）
        'test',
      ],
    ],
  },
};
