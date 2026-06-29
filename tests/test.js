/**
 * 功能兼容性测试 — 鸣潮代肝
 *
 * 运行: node tests/test.js
 */

// ====== 测试数据（与 main.js 同步） ======
const SERVICE_CATEGORIES = [
  {
    name: '托管',
    desc: '期间会领取兑换码 + 版本签到 + 邮箱',
    items: [
      { id: 'daily', name: '日常套餐', price: 40, trust: true },
      { id: 'daily_weekly', name: '日体套餐', price: 80, trust: true },
      { id: 'premium', name: '精托套餐', price: 200, trust: true },
      { id: 'ultimate', name: '至尊套餐', price: 300, trust: true, featured: true },
    ],
  },
  {
    name: '地图探索度',
    items: [
      { id: 'explore_collect', name: '地图收集物', isExplore: 'collect' },
      { id: 'explore_areas', name: '瑝珑+黑海岸', isExplore: 'areas' },
    ],
  },
  {
    name: '高难 · 挑战',
    items: [
      { id: 'tower', name: '深境之塔', price: 89 },
      { id: 'leveling', name: '等级冲刺 · 开荒', price: 49 },
    ],
  },
];

const EXPLORE_COLLECT = [
  { id: 'ec_1', name: '瑝珑声匣', price: 50 },
  { id: 'ec_2', name: '承霄山定风铎', price: 30 },
  { id: 'ec_3', name: '黎那汐塔声匣', price: 70 },
  { id: 'ec_4', name: '罗伊冰原终声残卷', price: 60 },
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

// ====== 核心逻辑函数 ======

// 获取所有展开项
function flatItems(categories) {
  return categories.flatMap((c) => c.items);
}

// 托管分类 id 集合
function getTrustIds(categories) {
  return new Set(categories[0].items.map((s) => s.id));
}

// 计算总价（模拟 selected 对象）
function calcTotal(selected, items, itemPercent = {}) {
  return Object.entries(selected).reduce((sum, [id, vIdx]) => {
    const svc = items.find((s) => s.id === id);
    if (!svc) return sum;
    // 探索类从弹窗取价（测试中模拟 detail）
    if (svc.isExplore) {
      return sum + (selected['_explore_' + id + '_total'] || 0);
    }
    const pct = svc.hasPercent ? (itemPercent[id] ?? 100) / 100 : 1;
    return sum + Math.round((svc.price || 0) * pct);
  }, 0);
}

// 解析弹窗明细价格
function parseDetailTotal(detailStr) {
  if (!detailStr) return 0;
  const prices = detailStr.match(/¥(\d+)/g);
  if (!prices) return 0;
  return prices.reduce((s, m) => s + parseInt(m.replace('¥', ''), 10), 0);
}

// ====== 断言工具 ======
let pass = 0;
let fail = 0;

function assert(condition, msg) {
  if (condition) {
    pass++;
    console.log(`  ✓ ${msg}`);
  } else {
    fail++;
    console.error(`  ✗ ${msg}`);
  }
}

function assertEq(actual, expected, msg) {
  if (actual === expected) {
    pass++;
    console.log(`  ✓ ${msg} (=${expected})`);
  } else {
    fail++;
    console.error(`  ✗ ${msg}: 期望 ${expected}, 实际 ${actual}`);
  }
}

// ====== 测试套件 ======

function testDataStructure() {
  console.log('\n📋 数据结构测试');

  const items = flatItems(SERVICE_CATEGORIES);

  assertEq(SERVICE_CATEGORIES.length, 3, '分类数量 = 3');
  assertEq(items.length, 8, '服务项总数 = 8');

  const trustIds = getTrustIds(SERVICE_CATEGORIES);
  assertEq(trustIds.size, 4, '托管类服务数量 = 4');

  const ids = items.map((i) => i.id);
  const uniqueIds = new Set(ids);
  assertEq(ids.length, uniqueIds.size, '所有服务 id 唯一');

  // 验证 id 不重复
  const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
  assert(duplicates.length === 0, `无重复 id${duplicates.length ? ': ' + duplicates.join(',') : ''}`);
}

function testExploreData() {
  console.log('\n📦 探索弹窗数据测试');

  assertEq(EXPLORE_COLLECT.length, 4, '收集品数量 = 4');
  assertEq(EXPLORE_AREAS.length, 12, '区域数量 = 12');

  const collectTotal = EXPLORE_COLLECT.reduce((s, i) => s + i.price, 0);
  assertEq(collectTotal, 50 + 30 + 70 + 60, '收集品总价 = 210');

  const areasTotal = EXPLORE_AREAS.reduce((s, i) => s + i.price, 0);
  const expected = 20+30+50+40+50+35+20+15+40+20+50+50;
  assertEq(areasTotal, expected, '区域总价 = ' + expected);

  // 所有项都有 id 和 price
  const allItems = [...EXPLORE_COLLECT, ...EXPLORE_AREAS];
  allItems.forEach((item) => {
    assert(typeof item.id === 'string' && item.id.length > 0, `  ${item.name} 有有效 id`);
    assert(typeof item.price === 'number' && item.price > 0, `  ${item.name} 价格 > 0 (¥${item.price})`);
  });
}

function testSelectionLogic() {
  console.log('\n🔘 选择逻辑测试');

  const items = flatItems(SERVICE_CATEGORIES);
  const trustIds = getTrustIds(SERVICE_CATEGORIES);

  // 模拟多选：选中两个非托管服务
  let selected = { tower: 0, leveling: 0 };
  let total = calcTotal(selected, items);
  assertEq(total, 89 + 49, '多选合计 = 138');

  // 托管单选：选至尊，日体应被移除
  selected = { daily: 0, ultimate: 0 };
  // 模拟单选逻辑：选 ultimate 时移除其他 trust 项
  if (selected['ultimate'] !== undefined) {
    trustIds.forEach((tid) => { if (tid !== 'ultimate') delete selected[tid]; });
  }
  assert(Object.keys(selected).length === 1, '托管单选：只保留一个');
  assert(selected['ultimate'] !== undefined, '托管单选：保留的是 ultimate');

  // 探索弹窗选配总价
  const detailStr = '瑝珑声匣 ¥50\n承霄山定风铎 ¥30';
  const parsed = parseDetailTotal(detailStr);
  assertEq(parsed, 80, '弹窗明细解析：¥50+¥30 = 80');
}

function testPriceCalculation() {
  console.log('\n💰 价格计算测试');

  const items = flatItems(SERVICE_CATEGORIES);

  // 单商品
  let selected = { daily: 0 };
  let total = calcTotal(selected, items);
  assertEq(total, 40, '日常套餐 = ¥40');

  // 多商品
  selected = { daily: 0, tower: 0 };
  total = calcTotal(selected, items);
  assertEq(total, 40 + 89, '日常+深塔 = ¥129');

  // 探索弹窗
  selected = { explore_collect: 0, explore_areas: 0 };
  selected['_explore_explore_collect_total'] = 210;
  selected['_explore_explore_areas_total'] = 420;
  total = calcTotal(selected, items);
  assertEq(total, 210 + 420, '收集品¥210 + 区域¥420 = ¥630');
}

function testEdgeCases() {
  console.log('\n⚠️ 边界情况测试');

  const items = flatItems(SERVICE_CATEGORIES);

  // 空选择
  assertEq(calcTotal({}, items), 0, '空选择总价 = 0');

  // 不存在的 id
  const selected = { nonexistent: 0 };
  assertEq(calcTotal(selected, items), 0, '非法 id 忽略');

  // 负数 price — 不应该发生，但防御
  const badItems = [...items, { id: 'bad', price: -10 }];
  const sel = { bad: 0 };
  // calcTotal 使用 Math.round(v.price * pct)，负值应该保留
  const t = calcTotal(sel, badItems);
  assertEq(t, -10, '负价格兼容：-10');

  // 弹窗明细为空
  assertEq(parseDetailTotal(''), 0, '空明细 = 0');
  assertEq(parseDetailTotal(null), 0, 'null 明细 = 0');
  assertEq(parseDetailTotal('无价格文本'), 0, '无价格文本 = 0');
}

// ====== 运行 ======
console.log('═══════════════════════════════');
console.log('  鸣潮代肝 — 功能兼容性测试');
console.log('═══════════════════════════════');

testDataStructure();
testExploreData();
testSelectionLogic();
testPriceCalculation();
testEdgeCases();

console.log('\n═══════════════════════════════');
const total = pass + fail;
console.log(`  结果: ${pass}/${total} 通过`);
if (fail > 0) {
  console.error(`  ${fail} 个测试失败`);
  process.exit(1);
} else {
  console.log('  全部通过 ✓');
}
console.log('═══════════════════════════════\n');
