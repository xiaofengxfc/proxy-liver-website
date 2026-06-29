/**
 * 鸣潮代肝 — Main JS
 */

// ====== 服务目录（按分类） ======
const SERVICE_CATEGORIES = [
  {
    name: '托管',
    desc: '期间会领取兑换码 + 版本签到 + 邮箱',
    items: [
      { id: 'daily', name: '日常套餐', icon: '', desc: '每日活跃打满', variants: [{ label: '月度', price: 40 }] },
      { id: 'daily_weekly', name: '日体套餐', icon: '', desc: '每日活跃 + 每日体力 + 周本', variants: [{ label: '月度', price: 80 }], tag: '最受欢迎' },
      { id: 'premium', name: '精托套餐', icon: '', desc: '日体套餐 + 期间活动 + 千道门扉 + 电台满级', variants: [{ label: '月度', price: 200 }] },
      { id: 'ultimate', name: '至尊套餐', icon: '', desc: '全托套餐 + 队伍升级角色武器培养材料 + 规划账号强度养成', variants: [{ label: '月度', price: 300 }], featured: true, tag: '推荐' },
    ],
  },
  {
    name: '地图探索度',
    items: [
      { id: 'explore_collect', name: '地图收集物', icon: '', desc: '全收集', variants: [{ label: '选配', price: 0 }], tag: '点击选配', isExplorePkg: 'collect' },
      { id: 'explore_areas', name: '瑝珑+黑海岸', icon: '', desc: '全收集', variants: [{ label: '选配', price: 0 }], tag: '点击选配', isExplorePkg: 'areas' },
      { id: 'explore_linaxita_full', name: '黎那汐塔', icon: '', desc: '全收集', variants: [{ label: '选配', price: 0 }], tag: '点击选配', isExplorePkg: 'linaxita_full' },
      { id: 'explore_luoyi', name: '罗伊冰原', icon: '', desc: '全收集', variants: [{ label: '选配', price: 0 }], tag: '点击选配', isExplorePkg: 'luoyi' },
    ],
  },
  {
    name: '任务',
    items: [
      { id: 'quest_tidal_1', name: '潮汐·第一章(1~6幕)', icon: '', desc: '15r/幕', variants: [{ label: '1幕', price: 15 }, { label: '3幕', price: 45 }, { label: '6幕', price: 90 }] },
      { id: 'quest_tidal_2', name: '潮汐·第一章(7~8幕)', icon: '', desc: '20r/幕', variants: [{ label: '1幕', price: 20 }, { label: '2幕', price: 40 }] },
      { id: 'quest_tidal_3', name: '潮汐·第二章(1~12幕)', icon: '', desc: '20r/幕', variants: [{ label: '6幕', price: 120 }, { label: '12幕', price: 240 }] },
      { id: 'quest_tidal_4', name: '潮汐·第三章(1~5幕)', icon: '', desc: '20r/幕', variants: [{ label: '3幕', price: 60 }, { label: '5幕', price: 100 }] },
      { id: 'quest_companion', name: '伴星任务', icon: '', desc: '12r/幕', variants: [{ label: '幕', price: 12 }], hasQty: true, unit: '幕', maxQty: 20 },
      { id: 'quest_danger', name: '危行任务', icon: '', desc: '12r/个', variants: [{ label: '个', price: 12 }], hasQty: true, unit: '个', maxQty: 20 },
      { id: 'quest_chronicle', name: '纪闻任务', icon: '', desc: '5~15r 看具体任务定价，自由输入数量', variants: [{ label: '个', price: 0 }], hasQty: true, unit: '个', maxQty: 99, noPrice: true },
      { id: 'quest_hidden', name: '隐藏任务', icon: '', desc: '5~15r 看具体任务定价，自由输入数量', variants: [{ label: '个', price: 0 }], hasQty: true, unit: '个', maxQty: 99, noPrice: true },
    ],
  },
  {
    name: '数据坞',
    items: [
      { id: 'data_all', name: '0~30级全包', icon: '', desc: '需账号等级40+', variants: [{ label: '全包', price: 300 }], tag: '推荐' },
      { id: 'data_0_10', name: '0~10级', icon: '', desc: '5r/级', variants: [{ label: '5级', price: 25 }, { label: '10级', price: 50 }] },
      { id: 'data_11_18', name: '11~18级', icon: '', desc: '8r/级', variants: [{ label: '4级', price: 32 }, { label: '8级', price: 64 }] },
      { id: 'data_19_30', name: '19~30级', icon: '', desc: '15r/级', variants: [{ label: '6级', price: 90 }, { label: '12级', price: 180 }] },
    ],
  },
];

// 拍平方便查找
const FLAT_ITEMS = SERVICE_CATEGORIES.flatMap((c) => c.items);

// ====== 探索弹窗数据 ======
const EXPLORE_COLLECT = [
  { id: 'ec_1', name: '瑝珑声匣', price: 50 },
  { id: 'ec_2', name: '承霄山定风铎', price: 30 },
  { id: 'ec_3', name: '黎那汐塔声匣', price: 70 },
  { id: 'ec_4', name: '罗伊冰原终声残卷', price: 60 },
];
const EXPLORE_LINAXITA = [
  { id: 'ln_1', name: '拉古那城', price: 10 },
  { id: 'ln_2', name: '埃弗拉德金库', price: 30 },
  { id: 'ln_3', name: '悲叹墓岛', price: 30 },
  { id: 'ln_4', name: '赞悼圣迹', price: 20 },
  { id: 'ln_5', name: '拂风水畔', price: 20 },
  { id: 'ln_6', name: '氤柔水境', price: 30 },
  { id: 'ln_7', name: '槲生半岛', price: 30 },
  { id: 'ln_8', name: '狄萨莱海脊', price: 40 },
  { id: 'ln_9', name: '黎乔利群岛', price: 20 },
  { id: 'ln_10', name: '下层金库', price: 30 },
  { id: 'ln_11', name: '阿维纽林', price: 20 },
  { id: 'ln_12', name: '贝奥海域', price: 20 },
  { id: 'ln_13', name: '七丘', price: 50 },
  { id: 'ln_14', name: '隐海试验场', price: 30 },
  { id: 'ln_15', name: '桑古伊斯狩原', price: 50 },
];
const EXPLORE_LUOYI = [
  { id: 'ly_1', name: '冰原运输港', price: 10 },
  { id: 'ly_2', name: '加拉尔冠阶', price: 15 },
  { id: 'ly_3', name: '盲望之塌', price: 20 },
  { id: 'ly_4', name: '元林遗址', price: 15 },
  { id: 'ly_5', name: '覆海原', price: 20 },
  { id: 'ly_6', name: '蚀刻平原', price: 40 },
  { id: 'ly_7', name: '星炬学院', price: 20 },
  { id: 'ly_8', name: '联运椎骨', price: 20 },
  { id: 'ly_9', name: '牙列石壑', price: 40 },
  { id: 'ly_10', name: '浮光林', price: 40 },
  { id: 'ly_11', name: '陷足流川', price: 30 },
  { id: 'ly_12', name: '复生丘原', price: 30 },
  { id: 'ly_13', name: '隐喙深腹', price: 15 },
  { id: 'ly_14', name: '巨目远野', price: 25 },
  { id: 'ly_15', name: '落日堤屿', price: 20 },
  { id: 'ly_16', name: '封存地', price: 10 },
  { id: 'ly_17', name: '寂静断崖', price: 20 },
  { id: 'ly_18', name: '恒黯之原', price: 20 },
];
const EXPLORE_AREAS = [
  { id: 'area_ylg', name: '云陵谷', price: 20 },
  { id: 'area_jzc', name: '今州城', price: 30 },
  { id: 'area_zqtd', name: '中曲台地', price: 50 },
  { id: 'area_hsgd', name: '荒石高地', price: 40 },
  { id: 'area_gxgs', name: '归墟港市', price: 50 },
  { id: 'area_wgzs', name: '无光之森', price: 35 },
  { id: 'area_wmg', name: '无明港', price: 20 },
  { id: 'area_bly', name: '北落野', price: 15 },
  { id: 'area_yz', name: '怨鸟泽', price: 40 },
  { id: 'area_hksm', name: '虎口山脉', price: 20 },
  { id: 'area_cxs', name: '乘霄山', price: 50 },
  { id: 'area_hha', name: '黑海岸', price: 50 },
];

document.addEventListener('DOMContentLoaded', () => {

  // ====== 选配器状态（多选） ======
  const selected = {};   // selected[服务id] = variant索引
  const itemPercent = {}; // itemPercent[服务id] = 探索度 (1-100)
  const itemQty = {};     // itemQty[服务id] = 数量

  // ====== 探索选配状态 ======
  const exploreSel = {};     // exploreSel[子项id] = true/false
  const explorePct = {};     // explorePct[子项id] = 百分比

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

        let variantsHtml;
        if (svc.isExplorePkg) {
          let label = '选配';
          let price = 0;
          if (isSelected) {
            const detail = document.getElementById(svc.id + '_detail');
            if (detail && detail.value) {
              const prices = detail.value.match(/¥(\d+)/g);
              const count = detail.value.split('\n').filter(Boolean).length;
              if (prices) price = prices.reduce((s, m) => s + parseInt(m.replace('¥', ''), 10), 0);
              label = count + '项';
            }
          }
          variantsHtml = `<button class="order-variant active">${label} <span class="price">¥${price}</span></button>`;
        } else if (svc.hasQty) {
          const qty = itemQty[svc.id] || 1;
          const unitPrice = svc.variants[0]?.price || 0;
          const totalPrice = svc.noPrice ? 0 : qty * unitPrice;
          const priceLabel = svc.noPrice ? '咨询' : `¥${totalPrice}`;
          variantsHtml = `<button class="order-variant active">${qty}${svc.unit || ''} <span class="price">${priceLabel}</span></button>`;
        } else {
          variantsHtml = svc.variants.map((v, i) => `
            <button class="order-variant${i === activeIdx && isSelected ? ' active' : ''}"
                    data-service="${svc.id}" data-idx="${i}">
              ${v.label} <span class="price">¥${v.price}</span>
            </button>
          `).join('');
        }

        const badgeHtml = svc.tag
          ? `<span class="order-badge">${svc.tag}</span>`
          : '';

        html += `
          <div class="${classes}" data-service="${svc.id}">
            ${badgeHtml}
            <div class="order-item-header">
              <div class="order-check">${isSelected ? '✓' : ''}</div>
              <span class="order-item-title">${svc.name}</span>
            </div>
            <div class="order-item-desc">${svc.desc}</div>
            <div class="order-variants" data-service="${svc.id}">
              ${variantsHtml}
            </div>
            ${svc.hasPercent ? `
            <div class="order-percent" data-service="${svc.id}">
              <button class="percent-btn" data-action="minus">−</button>
              <span class="percent-value">${itemPercent[svc.id] || 100}%</span>
              <button class="percent-btn" data-action="plus">+</button>
            </div>` : ''}
            ${svc.hasQty ? `
            <div class="order-qty" data-service="${svc.id}">
              <button class="qty-btn" data-action="minus">−</button>
              <span class="qty-value">${itemQty[svc.id] || 1}</span>
              <span class="qty-unit">${svc.unit || ''}</span>
              <button class="qty-btn" data-action="plus">+</button>
            </div>` : ''}
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
      let price = variant.price;
      let label = variant.label;
      if (svc.isExplorePkg) {
        const detail = document.getElementById(id + '_detail');
        if (detail && detail.value) {
          const prices = detail.value.match(/¥(\d+)/g);
          if (prices) {
            price = prices.reduce((s, m) => s + parseInt(m.replace('¥', ''), 10), 0);
          }
          const selected = detail.value.split('\n').filter(Boolean);
          label = selected.length + '项';
        }
      }
      if (svc.hasQty) {
        const qty = itemQty[id] || 1;
        price = svc.noPrice ? 0 : qty * (svc.variants[0]?.price || 0);
        label = qty + (svc.unit || '');
      }
      return `
        <span class="order-bar-tag">
          ${svc.name} · ${label}
          <span class="tag-price">${svc.noPrice ? '咨询' : '¥' + price}</span>
          <span class="tag-remove" data-service="${id}">✕</span>
        </span>
      `;
    }).join('');

    // 总价
    const total = entries.reduce((sum, [id, vIdx]) => {
      const svc = FLAT_ITEMS.find((s) => s.id === id);
      if (svc.isExplorePkg) {
        // 探索选配：从 hidden input 取明细算总价
        const detail = document.getElementById(svc.id + '_detail');
        if (detail && detail.value) {
          const matched = detail.value.match(/¥(\d+)/g);
          if (matched) return sum + matched.reduce((s, m) => s + parseInt(m.replace('¥', ''), 10), 0);
        }
        return sum;
      }
      if (svc.hasQty) {
        if (svc.noPrice) return sum;
        const qty = itemQty[id] || 1;
        return sum + qty * (svc.variants[0]?.price || 0);
      }
      const variant = svc.variants[vIdx] || svc.variants[0];
      const pct = svc.hasPercent ? (itemPercent[id] ?? 100) / 100 : 1;
      return sum + Math.round(variant.price * pct);
    }, 0);
    orderTotal.textContent = `¥${total}`;

    // 写入隐藏字段 + 备注
    const summaryLines = entries.map(([id, vIdx]) => {
      const svc = FLAT_ITEMS.find((s) => s.id === id);
      if (svc.isExplorePkg) {
        const detail = document.getElementById(svc.id + '_detail');
        const dl = detail?.value ? detail.value.split('\n') : [];
        return ['瑝珑+黑海岸'].concat(dl.map((l) => '  ' + l)).join('\n');
      }
      if (svc.hasQty) {
        const qty = itemQty[id] || 1;
        if (svc.noPrice) return `${svc.name} — ${qty}${svc.unit}  咨询`;
        const total = qty * (svc.variants[0]?.price || 0);
        return `${svc.name} — ${qty}${svc.unit}  ¥${total}`;
      }
      const variant = svc.variants[vIdx] || svc.variants[0];
      const pct = svc.hasPercent ? (itemPercent[id] ?? 100) / 100 : 1;
      const adjusted = Math.round(variant.price * pct);
      const pctLabel = svc.hasPercent ? ` ${itemPercent[id] ?? 100}%` : '';
      return `${svc.name}${pctLabel} — ${variant.label}  ¥${adjusted}`;
    });
    summaryLines.push(`━━━━━━━━━━━━━━━`);
    summaryLines.push(`💰 合计：¥${total}`);

    const summaryText = summaryLines.join('\n');
    if (orderSummaryInput) orderSummaryInput.value = summaryText;

    if (messageField && !messageField.dataset.userEdited) {
      messageField.value = summaryText;
    }
  }

  // ====== 切换选择 ======
  // 托管类（第一个分类）单选，其余分类多选
  const TRUST_IDS = new Set(SERVICE_CATEGORIES[0].items.map((s) => s.id));
  // 数据坞（第三个分类）也单选
  if (SERVICE_CATEGORIES[3]) {
    SERVICE_CATEGORIES[3].items.forEach((s) => TRUST_IDS.add(s.id));
  }

  // ====== 探索弹窗（双模式） ======
  let exploreMode = '';

  function getExploreItems(mode) {
    if (mode === 'collect') return EXPLORE_COLLECT;
    if (mode === 'linaxita_full') return EXPLORE_LINAXITA;
    if (mode === 'luoyi') return EXPLORE_LUOYI;
    return EXPLORE_AREAS;
  }
  function getExploreKey(mode) {
    if (mode === 'collect') return 'explore_collect';
    if (mode === 'linaxita_full') return 'explore_linaxita_full';
    if (mode === 'luoyi') return 'explore_luoyi';
    return 'explore_areas';
  }
  function getExploreLabel(mode) {
    if (mode === 'collect') return '收集品';
    if (mode === 'linaxita_full') return '黎那汐塔 · 区域';
    if (mode === 'luoyi') return '罗伊冰原 · 区域';
    return '瑝珑+黑海岸 · 区域';
  }

  function openExploreModal(mode) {
    exploreMode = mode;
    const items = getExploreItems(mode);
    items.forEach((item) => { if (exploreSel[item.id] === undefined) exploreSel[item.id] = false; });
    document.getElementById('explore-modal-title').textContent = getExploreLabel(mode);
    renderExploreModal();
    document.getElementById('explore-modal').classList.add('show');
  }
  function closeExploreModal() {
    document.getElementById('explore-modal').classList.remove('show');
  }
  function renderExploreModal() {
    const items = getExploreItems(exploreMode);
    const allSel = items.every((item) => exploreSel[item.id]);
    let html = `<div class="explore-select-all" id="explore-select-all">
      <button class="btn btn-secondary" style="width:100%;justify-content:center;">${allSel ? '取消全选' : '☑ 全选'}</button>
    </div>`;
    html += `<div class="explore-section-title">${getExploreLabel(exploreMode)}</div>`;
    items.forEach((item) => {
      const sel = exploreSel[item.id];
      html += `<div class="explore-item${sel ? ' selected' : ''}" data-eid="${item.id}"><div class="explore-check">${sel ? '✓' : ''}</div><span class="explore-item-name">${item.name}</span><span class="explore-item-price">¥${item.price}</span></div>`;
    });
    document.getElementById('explore-modal-body').innerHTML = html;
    updateExploreTotal();
    bindExploreEvents();
  }
  function updateExploreTotal() {
    const items = getExploreItems(exploreMode);
    const total = items.reduce((s, item) => s + (exploreSel[item.id] ? item.price : 0), 0);
    document.getElementById('explore-total').innerHTML = `¥${total}`;
  }
  function bindExploreEvents() {
    document.querySelectorAll('#explore-modal-body .explore-item').forEach((el) => {
      el.addEventListener('click', () => { exploreSel[el.dataset.eid] = !exploreSel[el.dataset.eid]; renderExploreModal(); });
    });
    document.getElementById('explore-select-all')?.addEventListener('click', () => {
      const items = getExploreItems(exploreMode);
      const allSel = items.every((item) => exploreSel[item.id]);
      items.forEach((item) => { exploreSel[item.id] = !allSel; });
      renderExploreModal();
    });
  }
  document.getElementById('explore-modal-close').addEventListener('click', closeExploreModal);
  document.getElementById('explore-modal').addEventListener('click', (e) => { if (e.target === e.currentTarget) closeExploreModal(); });
  document.getElementById('explore-confirm').addEventListener('click', () => {
    const mode = exploreMode;
    const items = getExploreItems(mode);
    const key = getExploreKey(mode);
    let total = 0;
    const lines = [];
    items.forEach((item) => {
      if (exploreSel[item.id]) { total += item.price; lines.push(`${item.name} ¥${item.price}`); }
    });
    if (total === 0) {
      delete selected[key];
      document.getElementById(key + '_detail')?.remove();
      renderOrderGrid(); updateSummary(); bindOrderEvents(); bindRemoveEvents(); closeExploreModal();
      return;
    }
    selected[key] = 0;
    document.getElementById(key + '_detail')?.remove();
    const input = document.createElement('input');
    input.type = 'hidden'; input.id = key + '_detail'; input.value = lines.join('\n');
    document.body.appendChild(input);
    renderOrderGrid(); updateSummary(); bindOrderEvents(); bindRemoveEvents(); closeExploreModal();
  });

  function toggleService(id) {
    const svc = FLAT_ITEMS.find((s) => s.id === id);
    if (!svc) return;

    // 探索选配套餐 → 打开弹窗
    if (svc.isExplorePkg) {
      openExploreModal(svc.isExplorePkg);
      return;
    }

    if (selected[id] !== undefined) {
      delete selected[id];
    } else {
      // 如果是托管类，先清空其他托管项
      if (TRUST_IDS.has(id)) {
        TRUST_IDS.forEach((tid) => { if (tid !== id) delete selected[tid]; });
      }
      selected[id] = 0;
      if (svc.hasPercent && itemPercent[id] === undefined) {
        itemPercent[id] = 100;
      }
      if (svc.hasQty && itemQty[id] === undefined) {
        itemQty[id] = 1;
      }
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

    // 探索类：点击 variant 也打开弹窗
    if (svc.isExplorePkg) {
      openExploreModal(svc.isExplorePkg);
      return;
    }

    // 托管类：切 variant 时也清除其他托管项
    if (TRUST_IDS.has(serviceId)) {
      TRUST_IDS.forEach((tid) => { if (tid !== serviceId) delete selected[tid]; });
    }

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
    // 清除探索选配明细
    if (serviceId === 'explore_collect' || serviceId === 'explore_areas') {
      document.getElementById(serviceId + '_detail')?.remove();
    }
    renderOrderGrid();
    updateSummary();
    bindOrderEvents();
    bindRemoveEvents();
  }

  // ====== 调整探索度百分比 ======
  function adjustPercent(serviceId, delta) {
    const svc = FLAT_ITEMS.find((s) => s.id === serviceId);
    if (!svc || !svc.hasPercent) return;
    const cur = itemPercent[serviceId] ?? 100;
    let next = Math.round(cur / 10 + delta) * 10;
    next = Math.max(10, Math.min(100, next));
    itemPercent[serviceId] = next;
    renderOrderGrid();
    updateSummary();
    bindOrderEvents();
    bindRemoveEvents();
  }

  // ====== 调整数量 ======
  function adjustQty(serviceId, delta) {
    const svc = FLAT_ITEMS.find((s) => s.id === serviceId);
    if (!svc || !svc.hasQty) return;
    const cur = itemQty[serviceId] || 1;
    let next = cur + delta;
    next = Math.max(1, Math.min(svc.maxQty || 99, next));
    itemQty[serviceId] = next;
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
        if (e.target.closest('.order-percent')) return;
        if (e.target.closest('.order-qty')) return;
        toggleService(card.dataset.service);
      });
    });

    document.querySelectorAll('.order-variant').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        selectVariant(btn.dataset.service, btn.dataset.idx);
      });
    });

    document.querySelectorAll('.percent-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const svcId = btn.closest('.order-percent').dataset.service;
        const delta = btn.dataset.action === 'plus' ? 1 : -1;
        adjustPercent(svcId, delta);
      });
    });

    document.querySelectorAll('.percent-value').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const svcId = el.closest('.order-percent').dataset.service;
        const cur = itemPercent[svcId] ?? 100;
        const next = cur >= 100 ? 10 : 100;
        adjustPercent(svcId, next - cur);
      });
    });

    document.querySelectorAll('.qty-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const svcId = btn.closest('.order-qty').dataset.service;
        const delta = btn.dataset.action === 'plus' ? 1 : -1;
        adjustQty(svcId, delta);
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

  // ====== 提交订单 → 弹窗 ======
  const modal = document.getElementById('order-modal');
  const modalClose = document.getElementById('modal-close');
  const modalSummary = document.getElementById('modal-order-summary');
  const modalForm = document.getElementById('modal-form');
  const modalSubmitBtn = document.getElementById('modal-submit-btn');
  const modalOrderSummaryInput = document.getElementById('modal-order-summary');
  const modalGameInput = document.getElementById('modal-game');

  function openModal() {
    if (Object.keys(selected).length === 0) return;
    // 填充摘要
    const items = FLAT_ITEMS;
    const entries = Object.entries(selected).filter(([id]) => items.some((s) => s.id === id));
    const total = entries.reduce((sum, [id, vIdx]) => {
      const svc = items.find((s) => s.id === id);
      if (svc.isExplorePkg) {
        const detail = document.getElementById(svc.id + '_detail');
        if (detail && detail.value) {
          const prices = detail.value.match(/¥(\d+)/g);
          if (prices) return sum + prices.reduce((s, m) => s + parseInt(m.replace('¥', ''), 10), 0);
        }
        return sum;
      }
      if (svc.hasQty) {
        if (svc.noPrice) return sum;
        const qty = itemQty[id] || 1;
        return sum + qty * (svc.variants[0]?.price || 0);
      }
      const v = svc.variants[vIdx] || svc.variants[0];
      const pct = svc.hasPercent ? (itemPercent[id] ?? 100) / 100 : 1;
      return sum + Math.round(v.price * pct);
    }, 0);
    const lines = entries.map(([id, vIdx]) => {
      const svc = items.find((s) => s.id === id);
      if (svc.isExplorePkg) {
        const detail = document.getElementById(svc.id + '_detail');
        return detail?.value ? ['瑝珑+黑海岸'].concat(detail.value.split('\n').map((l) => '  ' + l)).join('\n') : '瑝珑+黑海岸';
      }
      if (svc.hasQty) {
        const qty = itemQty[id] || 1;
        if (svc.noPrice) return `${svc.name} — ${qty}${svc.unit}  咨询`;
        const total2 = qty * (svc.variants[0]?.price || 0);
        return `${svc.name} — ${qty}${svc.unit}  ¥${total2}`;
      }
      const v = svc.variants[vIdx] || svc.variants[0];
      const pct = svc.hasPercent ? (itemPercent[id] ?? 100) / 100 : 1;
      return `${svc.name} — ${v.label}  ¥${Math.round(v.price * pct)}`;
    });
    lines.push(`━━━━━━━━━━━━━━━`);
    lines.push(`💰 合计：¥${total}`);
    const text = lines.join('\n');
    modalSummary.textContent = text;
    modalOrderSummaryInput.value = text;
    modalGameInput.value = '鸣潮';
    // 清空旧值
    document.getElementById('modal-name').value = '';
    document.getElementById('modal-contact').value = '';
    document.getElementById('modal-message').value = '';
    modal.classList.add('show');
    setTimeout(() => document.getElementById('modal-name').focus(), 200);
  }

  function closeModal() {
    modal.classList.remove('show');
  }

  if (orderSubmitBtn) {
    orderSubmitBtn.addEventListener('click', openModal);
  }
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

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

  // ========== 弹窗表单 → POST → Telegram ==========
  if (modalForm) {
    modalForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = modalSubmitBtn;
      const original = btn.textContent;

      const name = document.getElementById('modal-name').value.trim();
      const contact = document.getElementById('modal-contact').value.trim();
      const message = document.getElementById('modal-message').value.trim();
      const orderSummary = document.getElementById('modal-order-summary').value;
      const game = document.getElementById('modal-game').value || '鸣潮';

      if (!name) {
        btn.textContent = '⚠ 请填写称呼';
        btn.style.background = '#f44747';
        setTimeout(() => { btn.textContent = original; btn.style.background = ''; }, 2000);
        return;
      }
      if (!contact) {
        btn.textContent = '⚠ 请填写联系方式';
        btn.style.background = '#f44747';
        setTimeout(() => { btn.textContent = original; btn.style.background = ''; }, 2000);
        return;
      }

      btn.textContent = '⏳ 提交中...';
      btn.style.pointerEvents = 'none';

      try {
        const resp = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, contact, game, message, order_summary: orderSummary }),
        });

        const result = await resp.json();

        if (result.ok) {
          btn.textContent = '✓ 已提交 · 客服将尽快联系';
          btn.style.background = '';
          closeModal();
          Object.keys(selected).forEach((k) => delete selected[k]);
          renderOrderGrid();
          bindOrderEvents();
          bindRemoveEvents();
          updateSummary();
          if (messageField) delete messageField.dataset.userEdited;
        } else {
          btn.textContent = '✗ ' + (result.error || '提交失败');
          btn.style.background = '#f44747';
        }
      } catch {
        btn.textContent = '✗ 网络错误，请重试';
        btn.style.background = '#f44747';
      }

      setTimeout(() => { btn.textContent = original; btn.style.background = ''; btn.style.pointerEvents = ''; }, 3000);
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
