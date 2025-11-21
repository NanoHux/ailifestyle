APP名称：「AI生活管家」

web app，可以拆成三层：

产品结构 / 前端信息架构

核心对象：一天（DayPlan） + 时间块（TimeBlock） + 对话（Chat） + 复盘（Reflection）

核心页面：

「今天」主页（时间轴 + 卡片式 todo）

对话页（聊天为主，右侧/下方展示今日计划）

历史记录页（日历 + 日列表）

复盘 / 数据统计页

设置页（作息、偏好、AI 风格）

技术架构

前端：H5 SPA（建议 React + TypeScript + 状态管理 + 请求库）

后端：Node.js + TypeScript（Express / NestJS）

模块：Auth、Chat、Planning、Tracking、History、Settings

AI 层：DeepSeek API 封装 + 严格 JSON Schema 校验

所有对话和计划都走统一 API，前端只负责展示和交互。

数据库架构（核心表）

users / user_profiles：用户及偏好

chat_sessions & messages：问答记录（完整上下文）

day_plans：每天一条的日程规划

plan_blocks：一天里的多个时间段卡片

day_reflections：每天的总结 / 完成率

habit_templates（可选）：可复用的习惯任务模版

AI 输出固定格式（JSON）：包含 day_plan、blocks[]、notes、summary，后端解析入库，前端按卡片式时间线展示；晚上复盘时，把今日完成/未完成状态传给 AI，让 AI 生成下一天的 day_plan 和 blocks，并自动携带未完成任务。

下面一步步展开。

二、先完善产品结构与交互思路
2.1 核心用户目标

通过自然语言和 AI 聊天，让 AI 帮自己：

规划每天时间（细到时间段）

执行过程中实时查看/勾选

晚上复盘，把未完成内容合理迁移到第二天

逐渐形成更合理的生活方式（反馈闭环）

2.2 核心业务概念（业务模型）

DayPlan（某一天的计划）

维度：user + date

包含：这一天的总体目标、总结、以及多个时间块（TimeBlocks）

状态：draft / active / finished

TimeBlock（时间块 / 卡片）

示例：09:00–10:00 深度工作、10:00–10:20 休息 etc

字段：开始时间、预计时长、任务内容、注意事项、优先级、标签（工作/学习/健康）

状态：pending / in_progress / done / skipped / overdue

ChatSession & Message（对话会话和消息）

ChatSession：一段连续对话（可以以「日期」或「主题」区分）

Message：问/答 + 元数据（是否触发了新的一天规划？是否与某个 TimeBlock 关联？）

Reflection（复盘）

每天结束时：

用户告诉 AI：哪些完成 / 未完成

AI 输出：建议、教训、调整（睡眠、节奏、工作密度）

数据层：记录当天完成率 + AI 总结 + 用户自评

Habit / Template（可选后期）

常见重复项目：早起、运动、阅读等

AI 在规划时可优先考虑这些习惯模版

2.3 前端信息架构 / 页面
1）「今天」主页（核心使用页）

目的：把「今天的时间安排」可视化 + 可操作。

建议布局（移动端 H5 优先）：

顶部：日期 + 完成率（例如：2025-11-21 · 完成 5 / 8）

中部：时间轴 + 卡片列表（按开始时间排序）

卡片内容：

时间：09:00–10:30

标题：深度工作：项目 A

说明：简短描述

注意事项：比如「关闭社交媒体」「戴耳机」

状态按钮：✅ 完成 / ⏭ 跳过 / 🔁 推迟

底部：浮动按钮

「和 AI 聊天」：打开对话抽屉

「生成 / 更新今日计划」：显式按钮（重复用）

交互细节：

时间到了：前端根据本地时间判断一些卡片状态：

当前时间 > block.end → 自动标记为 overdue（不自动勾完成）

视觉表现：title 加删除线 / 卡片变灰，但仍可点击「已完成」或「跳过」

用户点击「完成」：

前端立即更新状态 + 乐观更新到后端

用户点击「推迟」：

弹出小窗口，选择推迟时长（30 分钟 / 1 小时 / 明天）

立即更新该 block 的 start/end（或生成新 block，旧 block 标记为 rescheduled）

2）对话页 / 对话抽屉

你需要让聊天和计划紧密结合，而不是两个孤立页面。

两种布局方案（可以二选一）：

移动端：在「今天」页面底部点击「聊天」按钮 → 弹出全屏聊天页，顶部小条显示「今日计划概览」或悬浮一个缩略条

桌面端：左侧「聊天」/ 右侧「今日时间线」双栏布局

聊天里常见指令：

「帮我规划一下今天，从现在到晚上睡觉」

「下午 3 点加一个 20 分钟遛狗」

「刚刚这个计划太密了，给我留一些发呆 / 滚手机时间」

对应行为：

对话发出后 → 后端调用 AI → 返回固定 JSON → 更新 day_plan + plan_blocks → 前端刷新卡片列表，顶部弹出 toast 提示「今日计划已更新」。

聊天记录支持标签展示：比如在某条 AI 回复顶部显示「[生成了今日计划]」。

3）历史记录页

顶部：日历组件（只显示有数据的天高亮）

中部：选中某天后，展示：

完成率进度条

当天时间块列表（只读）

当天 AI 总结 & 用户复盘输入

底部：一个按钮「复制这天的结构给今天参考」，点击后可以让 AI 基于那天的结构生成新计划。

4）复盘 / 数据统计页（可以和历史合并）

每天晚上入口：

在「今天」页 21:00 后显示一个「开始复盘」按钮（或者固定在底部）

流程：

拉取今天全部 blocks 和状态（完成 / 未完成）

展示一个「复盘问卷」：

今日整体感觉如何？（1–5 星）

今天最大的收获是什么？

明天最想优先做的一件事？

提交后 → 后端把这些信息 + blocks 状态一起发送给 AI → 得到：

reflection_summary（今天总结）

tomorrow_plan（明天的 DayPlan + Blocks，包含未完成任务的迁移）

5）设置 / 偏好页

配置项（后端也会有对应字段）：

常规作息：起床时间、睡觉时间、上班时间

每天最大深度工作时长 / 时间段（如 上午 9–12，下午 2–5）

喜欢的节奏：紧凑 / 中庸 / 松弛

语言风格：冷静克制 / 健身教练式激励 / 温柔安慰

默认「一天」的起止时间（例：凌晨 4 点到次日 3:59）

三、技术架构设计
3.1 前端架构

推荐技术栈（H5）：

框架：React + TypeScript + Vite

路由：React Router

状态管理：Zustand 或 Redux Toolkit（简单即可）

数据请求：TanStack Query，用于管理异步请求和缓存

UI 组件库：Ant Design Mobile / Mantine / MUI（任选其一）

前端模块划分：

pages/Today：今日日程 + 卡片交互

pages/Chat：对话页或 Chat 抽屉组件

pages/History：历史 & 日历浏览

pages/Settings：用户偏好

components/TimeBlockCard：单个时间块卡片

components/DaySummary：完成情况 + 今日总结

components/ChatPanel：通用聊天组件（可嵌入 Today 页）

与后端交互 API 示例：

POST /api/chat/send：发送一条消息给 AI（可指定是否生成/更新计划）

GET /api/day-plan?date=2025-11-21：获取某天计划

PATCH /api/plan-block/:id：更新 block 状态（完成/推迟）

POST /api/reflection/finish：提交当天复盘，生成明日计划

GET /api/history/days：获取有计划的日期列表

GET /api/history/day-detail?date=...：带计划 + 总结 + 对话摘要

3.2 后端架构

推荐技术栈：

Node.js + TypeScript

框架可选：

简单：Express + 自己组织分层

工程化更强：NestJS（推荐，结构清晰）

分层结构（无论 Express 还是 Nest，大致类似）：

controllers：处理 HTTP 请求/响应

services：业务逻辑（生成计划、更新 block 状态、复盘等）

repositories：数据库访问层（用 Prisma / TypeORM）

ai：DeepSeek API 封装和 JSON 校验层

middlewares：鉴权、错误处理、logging

核心服务模块：

AuthService

用户注册 / 登录 / JWT

ChatService

保存 message, 根据上下文调用 AI

PlanningService

从 AI 返回结果解析出 DayPlan & PlanBlocks

处理「未完成任务」迁移到下一天

TrackingService

对 TimeBlock 状态变更（完成、跳过、推迟）

HistoryService

汇总每天完成率、长期统计

SettingsService

读写用户偏好（作息、节奏等）

3.3 AI 层（DeepSeek 集成）

你需要一层专门负责：

构造 prompt（把用户目标、历史、用户偏好、未完成任务等拼好）

调用 DeepSeek API

校验返回 JSON 结构（防止半结构化）

固定返回 JSON Schema（示例）：

{
  "date": "2025-11-21",
  "timezone": "Asia/Shanghai",
  "day_goal": "完成 XX 项目主要功能并保证午休和运动。",
  "blocks": [
    {
      "start": "09:00",
      "end": "10:30",
      "title": "深度工作：项目 A 核心功能",
      "description": "关闭所有社交媒体，专注编码。",
      "notes": "尽量一次性完成模块 X；遇到问题先记笔记再查资料。",
      "category": "work",
      "priority": "high",
      "from_previous_day_block_id": null
    }
  ],
  "overall_advice": "今天节奏稍微紧凑，中午务必保证休息时间，避免下午效率下滑。"
}


后台：

PlanningService.generateDayPlan(userId, date, userInput, context)：

组织 prompt，带上：

用户今日/明日描述

用户偏好（起床时间、喜欢的节奏）

昨天未完成的 blocks（描述和时长）

调用 DeepSeekClient.generatePlan(prompt) 得到 JSON

用 zod / joi 校验，失败则做兜底（比如只记录 AI 原文，不写计划）

写入 day_plans + plan_blocks 表

ReflectionService.generateTomorrowPlan(userId, todayDate)：

拉取今天所有 blocks 状态

组织「完成情况 + 用户主观感受」给 AI

得到明日计划 JSON，写入 DB

四、数据库架构设计（以 PostgreSQL 为例）
4.1 用户与偏好
-- 用户
CREATE TABLE users (
  id              SERIAL PRIMARY KEY,
  email           VARCHAR(255) UNIQUE NOT NULL,
  password_hash   VARCHAR(255),         -- 也可以做魔法链接/第三方登录，则可为空
  created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 用户偏好
CREATE TABLE user_profiles (
  id              SERIAL PRIMARY KEY,
  user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  display_name    VARCHAR(100),
  timezone        VARCHAR(64) DEFAULT 'Asia/Shanghai',
  wake_time       TIME,                  -- 常规起床时间
  sleep_time      TIME,                  -- 常规睡觉时间
  work_start_time TIME,
  work_end_time   TIME,
  pace_preference VARCHAR(32),           -- 'tight'/'medium'/'relaxed'
  style_preference VARCHAR(32),          -- 'calm'/'coach'/'warm'
  created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

4.2 对话记录
-- 对话会话（可以按日期或主题）
CREATE TABLE chat_sessions (
  id              SERIAL PRIMARY KEY,
  user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title           VARCHAR(255),
  related_date    DATE,                  -- 若是与某天计划相关
  created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 单条消息
CREATE TABLE messages (
  id              SERIAL PRIMARY KEY,
  session_id      INT NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role            VARCHAR(16) NOT NULL,  -- 'user' or 'assistant' or 'system'
  content         TEXT NOT NULL,
  ai_raw_payload  JSONB,                 -- 原始 AI 返回的 JSON（若有）
  has_plan_update BOOLEAN DEFAULT FALSE, -- 是否触发了计划更新
  created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

4.3 每日计划与时间块
-- 一天的计划
CREATE TABLE day_plans (
  id              SERIAL PRIMARY KEY,
  user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_date       DATE NOT NULL,
  day_goal        TEXT,
  overall_advice  TEXT,                 -- AI 给的整体建议
  status          VARCHAR(16) DEFAULT 'active', -- 'draft'/'active'/'finished'
  created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, plan_date)
);

-- 时间块 / 卡片
CREATE TABLE plan_blocks (
  id              SERIAL PRIMARY KEY,
  day_plan_id     INT NOT NULL REFERENCES day_plans(id) ON DELETE CASCADE,
  start_time      TIME NOT NULL,
  end_time        TIME NOT NULL,
  title           VARCHAR(255) NOT NULL,
  description     TEXT,
  notes           TEXT,                 -- 注意事项
  category        VARCHAR(32),          -- 'work','study','health','life',...
  priority        VARCHAR(16),          -- 'high','medium','low'
  status          VARCHAR(16) DEFAULT 'pending',  -- 'pending','in_progress','done','skipped','overdue','rescheduled'
  from_previous_block_id INT REFERENCES plan_blocks(id),
  ai_block_id     VARCHAR(64),          -- 方便 AI 识别同一个 block
  created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

4.4 复盘与统计
-- 每日复盘
CREATE TABLE day_reflections (
  id              SERIAL PRIMARY KEY,
  user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_date       DATE NOT NULL,
  self_rating     INT,                   -- 1-5
  user_notes      TEXT,                  -- 用户自己写的复盘文字
  ai_summary      TEXT,                  -- AI 对今天的总结
  completion_rate NUMERIC(5,2),          -- 百分比
  created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, plan_date)
);

4.5 习惯模版（可选后期）
CREATE TABLE habit_templates (
  id              SERIAL PRIMARY KEY,
  user_id         INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name            VARCHAR(255) NOT NULL,
  default_duration_minutes INT,
  recommended_time_of_day VARCHAR(32),   -- 'morning','afternoon','evening'
  category        VARCHAR(32),
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

五、AI 交互流程示例（白天 & 晚上）
5.1 白天：生成/更新今日计划

用户在聊天中输入：「帮我安排一下今天，从现在到晚上 11 点。」

前端 POST /api/chat/send：

参数包括：message, intent: 'generate_today_plan'

后端：

ChatService 保存 user message

PlanningService：准备 context：

用户偏好 + 今天已有 DayPlan（如果已存在就是「更新」）

调用 DeepSeek，要求输出固定 JSON（如上 schema）

校验 JSON → 写 day_plans & plan_blocks

保存 AI message（含 ai_raw_payload）

前端收到：

assistant_message 文本版总结 + dayPlan 结构化数据

更新 Today 页面中的卡片列表

5.2 执行中：卡片状态更新

用户在卡片点「完成」：PATCH /api/plan-block/:id，body { status: 'done' }

后端更新 plan_blocks.status，可顺便更新当天完成率缓存

前端实时反映状态，划线或改变颜色

5.3 晚上：复盘 + 规划明天

用户点击「开始复盘」：

前端拉取 GET /api/day-plan + GET /api/plan-blocks + 已有完成状态

用户在复盘表单中提交自评：

POST /api/reflection/finish，body：

self_rating, user_notes

后端：

计算完成率 = 完成数 / 总块数

写入 day_reflections

准备 AI prompt：

输入：今天计划 + 各 block 的状态 + 用户自评

让 AI 输出：

今天总结（写入 ai_summary）

明日计划 JSON（写入新的 day_plans & plan_blocks）

前端：

展示 AI 写的「今日总结」

提示「明日计划已生成」→ 用户可以在「明天」预览（或到明天自动加载）

六、可选替代方案 / 扩展思路

后端基础设施

轻量方案：直接用 Supabase / Firebase（Auth + Postgres + 存储）+ Cloud Functions

重一点：自建 Postgres + Node 后端 + Docker 部署

AI 供应商

现阶段只用 DeepSeek

架构预留一个 ModelProvider 层，将来可以切换/增加模型（DeepSeek, OpenAI, Qwen 等）

前端容器化

未来做 iOS/Android 时，直接用 React Native / Expo 或者用 Capacitor 把 Web 打包成壳。

七、落地行动计划（你接下来可以按这个顺序干）

确定技术栈

前端：React + TS + Vite

后端：Node + TS +（Express 或 NestJS）

DB：Postgres（或你更熟悉的 MySQL，对应改语法即可）

先搭最小可用版本（MVP）

实现用户登录（可以先用假用户跳过）

后端打通一个简单 POST /api/chat/send → 调 DeepSeek → 回原文

前端实现一个简单聊天面板 + 纯文本返回

接入固定 JSON 的 AI 规划

设计 prompt + JSON schema

在后端实现 PlanningService.generateDayPlan：

调用 DeepSeek

校验 JSON

落库 day_plans & plan_blocks

前端 Today 页：按照 plan_blocks 渲染卡片时间线

做完「卡片状态更新」闭环

后端 PATCH /api/plan-block/:id

前端卡片上的完成/跳过/推迟操作 + 状态样式

加上「复盘 + 明日计划」流程

实现 day_reflections 表与 API

组织完整的复盘 prompt → 生成明日 DayPlan

最后再做「历史 & 设置」

日历视图、历史列表浏览

用户偏好页和对应的 DB 字段、AI context