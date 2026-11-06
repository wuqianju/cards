#!/usr/bin/env sh
set -eu

# 微信开发者工具执行上传前钩子时会注入 installPath、envId 与 projectPath。
# 先将 TypeScript 编译为云函数运行时所需的 CommonJS JavaScript，再继续上传。
script_dir="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
(
  cd "$script_dir/cloudfunctions/cardbillFunctions"
  npm run predeploy
)

${installPath} cloud functions deploy --e ${envId} --n cardbillFunctions --r --project ${projectPath}
