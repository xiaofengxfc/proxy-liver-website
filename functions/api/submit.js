/**
 * 表单提交 → Telegram 推送
 *
 * 环境变量（在 Cloudflare Pages 后台设置）:
 *   TELEGRAM_BOT_TOKEN  — BotFather 创建的机器人 token
 *   TELEGRAM_CHAT_ID    — 接收消息的聊天/群组 ID
 *
 * 用法:
 *   POST /api/submit
 *   Body: { name, contact, service, message }
 */

export async function onRequest(context) {
  // 只接受 POST
  if (context.request.method !== 'POST') {
    return new Response(JSON.stringify({ ok: false, error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', Allow: 'POST' },
    });
  }

  try {
    const body = await context.request.json();
    const { name, contact, service, message } = body;

    // 基础校验
    if (!contact) {
      return new Response(JSON.stringify({ ok: false, error: '联系方式不能为空' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const token = context.env.TELEGRAM_BOT_TOKEN;
    const chatId = context.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return new Response(JSON.stringify({ ok: false, error: '机器人未配置，请联系站长' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 编排消息文本
    const serviceMap = {
      daily: '每日委托 / 周常',
      explore: '地图探索',
      echo: '声骸刷取',
      tower: '深境之塔',
      leveling: '等级冲刺 / 开荒',
      monthly: '月卡套餐',
      other: '其他',
    };

    const text = [
      `📩 **鸣潮代肝 · 新咨询**`,
      ``,
      `👤 **称呼：** ${name || '未填写'}`,
      `📞 **联系方式：** ${contact}`,
      `📋 **服务类型：** ${serviceMap[service] || service || '未选择'}`,
      `💬 **备注：** ${message || '无'}`,
      ``,
      `🕐 ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}`,
    ].join('\n');

    // 发送到 Telegram
    const tgResp = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'Markdown',
          disable_web_page_preview: true,
        }),
      }
    );

    const tgResult = await tgResp.json();

    if (!tgResult.ok) {
      console.error('Telegram API error:', tgResult);
      return new Response(JSON.stringify({ ok: false, error: '消息推送失败' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Submit error:', err);
    return new Response(JSON.stringify({ ok: false, error: '服务器内部错误' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
