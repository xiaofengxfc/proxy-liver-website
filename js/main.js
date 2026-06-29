/**
 * 鸣潮代肝 — Main JS
 */

// ====== 服务目录（按分类） ======
const SERVICE_CATEGORIES = [
  {
    name: '📅 托管',
    desc: '期间会领取兑换码 + 版本签到 + 邮箱',
    items: [
      {
        id: 'daily',
        name: '日常套餐',
        icon: '📋',
        desc: '每日活跃打满',
        variants: [{ label: '月度', price: 40 }],
      },
      {
        id: 'daily_weekly',
        name: '日体套餐',
        icon: '⚔️',
        desc: '每日活跃 + 每日体力 + 周本',
        variants: [{ label: '月度', price: 80 }],
        tag: '最受欢迎',
      },
      {
        id: 'premium',
        name: '精托套餐',
        icon: '⭐',
        desc: '日体套餐 + 期间活动 + 千道门扉 + 电台满级',
        variants: [{ label: '月度', price: 200 }],
      },
      {
        id: 'ultimate',
        name: '至尊套餐',
        icon: '👑',
        desc: '全托套餐 + 队伍升级角色武器培养材料 + 规划账号强度养成',
        variants: [{ label: '月度', price: 300 }],
        featured: true,
        tag: '推荐',
      },
    ],
  },
  {
    name: '🗺️ 探索 · 收集',
    items: [
      {
        id: 'explore',
        name: '地图全探索',
        icon: '🗺️',
        desc: '宝箱、声匣、潮汐之遗、解谜任务全收集。',
        variants: [
          { label: '单区域', price: 69 },
          { label: '全区域', price: 199 },
        ],
        tag: '🔥 热销',
      },
      {
        id: 'echo',
        name: '声骸刷取',
        icon: '💎',
        desc: '指定套装、C1/C3/C4 主属性、副属性定制刷取。',
        variants: [
          { label: '10 次', price: 49 },
          { label: '30 次', price: 129 },
        ],
      },
    ],
  },
  {
    name: '⚡ 高难 · 挑战',
    items: [
      {
        id: 'tower',
        name: '深境之塔',
        icon: '🏆',
        desc: '凹星、满星通关。熟练配队 + 操作，奖励拿满。',
        variants: [
          { label: '单次', price: 89 },
          { label: '包月满星', price: 199 },
        ],
      },
      {
        id: 'leveling',
        name: '等级冲刺 · 开荒',
        icon: '🚀',
        desc: '新号速升、主线代过、世界等级突破。快速追赶大部队。',
        variants: [
          { label: '10 级', price: 49 },
          { label: '20 级', price: 89 },
        ],
        tag: '新号必选',
      },
    ],
  },
];

// 拍平方便查找
const FLAT_ITEMS = SERVICE_CATEGORIES.flatMap((c) => c.items);

document.addEventListener('DOMContentLoaded', () => {

  // ====== 选配器状态（多选） ======
  const selected = {};   // selected[服务id] = variant索引

  // ====== DOM 引用 ======
  const orderGrid = document.getElementById('order-grid');
  const orderBar = document.getElementById('order-bar');
  const orderBarItems = document.getElementById('order-bar-items');
  const orderTotal = document.getElementById('order-total');
  const orderSubmitBtn = document.getElementById('order-submit');
  const orderSummaryInput = document.getElementById('order-summary-input');
  const messageField = document.getElementById('message');

  // ====== 渲染选配器 ======
  function renderOrderGrid() {
    let html = '';

    SERVICE_CATEGORIES.forEach((cat) => {
      html += `<div class="order-category">`;
      html += `<div class="order-category-title">${cat.name}</div>`;
      if (cat.desc) html += `<div class="order-category-desc">${cat.desc}</div>`;
      html += `<div class="order-category-grid">`;

      cat.items.forEach((svc) => {
        const isSelected = selected[svc.id] !== undefined;
        const activeIdx = isSelected ? selected[svc.id] : 0;
        const classes = [
          'order-item',
          isSelected ? 'selected' : '',
          svc.featured ? 'featured' : '',
        ].filter(Boolean).join(' ');

        const variantsHtml = svc.variants.map((v, i) => `
          <button class="order-variant${i === activeIdx && isSelected ? ' active' : ''}"
                  data-service="${svc.id}" data-idx="${i}">
            ${v.label} <span class="price">¥${v.price}</span>
          </button>
        `).join('');

        const badgeHtml = svc.tag
          ? `<span class="order-badge">${svc.tag}</span>`
          : '';

        html += `
          <div class="${classes}" data-service="${svc.id}">
            ${badgeHtml}
            <div class="order-item-header">
              <div class="order-check">${isSelected ? '✓' : ''}</div>
              <span class="order-item-icon">${svc.icon}</span>
              <span class="order-item-title">${svc.name}</span>
            </div>
            <div class="order-item-desc">${svc.desc}</div>
            <div class="order-variants" data-service="${svc.id}">
              ${variantsHtml}
            </div>
          </div>
        `;
      });

      html += `</div></div>`;
    });

    orderGrid.innerHTML = html;
  }

  // ====== 更新摘要栏（多选合计） ======
  function updateSummary() {
    const entries = Object.entries(selected).filter(([id]) =>
      FLAT_ITEMS.some((s) => s.id === id)
    );

    const hasItems = entries.length > 0;
    orderBar.classList.toggle('show', hasItems);

    if (!hasItems) {
      orderBarItems.innerHTML = '<span class="order-bar-empty">尚未选择任何服务</span>';
      orderTotal.textContent = '¥0';
      if (orderSummaryInput) orderSummaryInput.value = '';
      return;
    }

    // 渲染标签（每个选中项一个）
    orderBarItems.innerHTML = entries.map(([id, vIdx]) => {
      const svc = FLAT_ITEMS.find((s) => s.id === id);
      const variant = svc.variants[vIdx] || svc.variants[0];
      return `
        <span class="order-bar-tag">
          ${svc.icon} ${svc.name} · ${variant.label}
          <span class="tag-price">¥${variant.price}</span>
          <span class="tag-remove" data-service="${id}">✕</span>
        </span>
      `;
    }).join('');

    // 总价
    const total = entries.reduce((sum, [id, vIdx]) => {
      const svc = FLAT_ITEMS.find((s) => s.id === id);
      const variant = svc.variants[vIdx] || svc.variants[0];
      return sum + variant.price;
    }, 0);
    orderTotal.textContent = `¥${total}`;

    // 写入隐藏字段 + 备注
    const summaryLines = entries.map(([id, vIdx]) => {
      const svc = FLAT_ITEMS.find((s) => s.id === id);
      const variant = svc.variants[vIdx] || svc.variants[0];
      return `${svc.icon} ${svc.name} — ${variant.label}  ¥${variant.price}`;
    });
    summaryLines.push(`━━━━━━━━━━━━━━━`);
    summaryLines.push(`💰 合计：¥${total}`);

    const summaryText = summaryLines.join('\n');
    if (orderSummaryInput) orderSummaryInput.value = summaryText;

    if (messageField && !messageField.dataset.userEdited) {
      messageField.value = summaryText;
    }
  }

  // ====== 切换选择（多选 — 点一下选，再点取消） ======
  function toggleService(id) {
    const svc = FLAT_ITEMS.find((s) => s.id === id);
    if (!svc) return;

    if (selected[id] !== undefined) {
      delete selected[id];
    } else {
      selected[id] = 0; // 默认第一个 variant
    }
    renderOrderGrid();
    updateSummary();
    bindOrderEvents();
    bindRemoveEvents();
  }

  // ====== 切换 variant ======
  function selectVariant(serviceId, idx) {
    idx = parseInt(idx, 10);
    const svc = FLAT_ITEMS.find((s) => s.id === serviceId);
    if (!svc || !svc.variants[idx]) return;

    // 如果未选中，先选上
    if (selected[serviceId] === undefined) {
      selected[serviceId] = idx;
    } else {
      selected[serviceId] = idx;
    }
    renderOrderGrid();
    updateSummary();
    bindOrderEvents();
    bindRemoveEvents();
  }

  // ====== 移除单项 ======
  function removeItem(serviceId) {
    delete selected[serviceId];
    renderOrderGrid();
    updateSummary();
    bindOrderEvents();
    bindRemoveEvents();
  }

  // ====== 绑定事件 ======
  function bindOrderEvents() {
    document.querySelectorAll('.order-item').forEach((card) => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.order-variant')) return;
        toggleService(card.dataset.service);
      });
    });

    document.querySelectorAll('.order-variant').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        selectVariant(btn.dataset.service, btn.dataset.idx);
      });
    });
  }

  // ====== 摘要栏移除按钮 ======
  function bindRemoveEvents() {
    document.querySelectorAll('.tag-remove').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeItem(btn.dataset.service);
      });
    });
  }

  // ====== 提交订单 → 滚动联系表单 ======
  if (orderSubmitBtn) {
    orderSubmitBtn.addEventListener('click', () => {
      if (Object.keys(selected).length === 0) return;
      const contact = document.querySelector('#contact');
      if (contact) {
        contact.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const nameInput = document.getElementById('name');
          if (nameInput) nameInput.focus();
        }, 500);
      }
    });
  }

  // ====== 备注：标记用户手动编辑 ======
  if (messageField) {
    messageField.addEventListener('input', () => {
      messageField.dataset.userEdited = '1';
    });
  }

  // ====== 初始化 ======
  renderOrderGrid();
  bindOrderEvents();
  bindRemoveEvents();
  updateSummary();

  // =============================================
  // 通用交互
  // =============================================

  // ========== Scroll Nav ==========
  const nav = document.querySelector('nav');
  const scrollObserver = new IntersectionObserver(
    ([e]) => nav.classList.toggle('scrolled', !e.isIntersecting),
    { rootMargin: '-60px 0px 0px' }
  );
  const hero = document.querySelector('.hero');
  if (hero) scrollObserver.observe(hero);

  // ========== Fade-in on scroll ==========
  const fadeEls = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          fadeObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  fadeEls.forEach((el) => fadeObserver.observe(el));

  // ========== FAQ accordion ==========
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach((i) => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ========== Smooth scroll for nav links ==========
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ========== Contact Form → POST → Telegram ==========
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('form-submit-btn');
      const original = btn.textContent;

      const data = {
        name: form.querySelector('#name')?.value?.trim() || '',
        contact: form.querySelector('#contact-input')?.value?.trim() || '',
        service: form.querySelector('#service')?.value || '',
        message: form.querySelector('#message')?.value?.trim() || '',
        order_summary: form.querySelector('#order-summary-input')?.value || '',
      };

      if (!data.contact) {
        btn.textContent = '⚠ 请填写联系方式';
        btn.style.background = '#ff4d4f';
        setTimeout(() => {
          btn.textContent = original;
          btn.style.background = '';
        }, 2000);
        return;
      }

      btn.textContent = '⏳ 提交中...';
      btn.style.pointerEvents = 'none';

      try {
        const resp = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const result = await resp.json();

        if (result.ok) {
          btn.textContent = '✓ 已提交 · 客服将尽快联系';
          btn.style.background = '';
          form.reset();
          // 清空选中
          Object.keys(selected).forEach((k) => delete selected[k]);
          renderOrderGrid();
          bindOrderEvents();
          bindRemoveEvents();
          updateSummary();
          if (messageField) delete messageField.dataset.userEdited;
        } else {
          btn.textContent = '✗ ' + (result.error || '提交失败');
          btn.style.background = '#ff4d4f';
        }
      } catch {
        btn.textContent = '✗ 网络错误，请重试';
        btn.style.background = '#ff4d4f';
      }

      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.style.pointerEvents = '';
      }, 3000);
    });
  }

  // ========== Stat counter animation ==========
  const statEls = document.querySelectorAll('.hero-stat-num');
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target;
          const target = parseInt(el.dataset.target, 10);
          if (!target || el.dataset.counted) return;
          el.dataset.counted = '1';
          const suffix = el.dataset.suffix || '';
          let current = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = current + suffix;
          }, 30);
        }
      });
    },
    { threshold: 0.5 }
  );
  statEls.forEach((el) => statObserver.observe(el));
});
