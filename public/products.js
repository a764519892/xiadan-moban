/* 商品简称对照表 —— 规则文档第八节
   新增商品时只改这个文件：short 简称 / full 说明 / stock 库存(null=未知) / set 套装团数 */
window.PRODUCTS = [
  {
    series: "十刻雪宝星",
    hint: "401~405",
    items: [
      { short: "十刻401晚秋", full: "401 晚秋", stock: 4 },
      { short: "十刻402独角兽", full: "402 独角兽", stock: 9 },
      { short: "十刻403星月夜", full: "403 星月夜", stock: 5 },
      { short: "十刻404橘子海", full: "404 橘子海", stock: 2 },
      { short: "十刻405小森林", full: "405 小森林", stock: 4 },
    ],
  },
  {
    series: "梵森雪宝星",
    hint: "300g 带环形针",
    items: [
      { short: "梵森02独角兽", full: "02 独角兽", stock: 1 },
      { short: "梵森03星月夜", full: "03 星月夜", stock: -1, note: "超卖待核实" },
      { short: "梵森05小森林", full: "05 小森林", stock: 0 },
    ],
  },
  {
    series: "梵森雪宝绒",
    hint: "色号 51~66",
    items: [
      { short: "雪宝绒51", full: "51 深海幽蓝", stock: 0 },
      { short: "雪宝绒53", full: "53 加州日落", stock: 0 },
      { short: "雪宝绒54", full: "54 忘川河畔", stock: 0 },
      { short: "雪宝绒55", full: "55 海盐少女", stock: 0 },
      { short: "雪宝绒57", full: "57 墨染山水", stock: 0 },
      { short: "雪宝绒58", full: "58 月光宝盒", stock: 0 },
      { short: "雪宝绒66", full: "66 半塘暖橘", stock: 0 },
    ],
  },
  {
    series: "澳芙羊绒线",
    hint: "17~43",
    items: [
      { short: "羊绒17", full: "17 浅灰色", stock: 0 },
      { short: "羊绒18", full: "18 中灰色", stock: 0 },
      { short: "羊绒22", full: "22 浅粉色", stock: 0 },
      { short: "羊绒24", full: "24 樱花粉", stock: 0 },
      { short: "羊绒25", full: "25 粉白花", stock: 0 },
      { short: "羊绒26", full: "26 橡皮红", stock: 0 },
      { short: "羊绒32", full: "32 玫红色", stock: 0 },
      { short: "羊绒39", full: "39 冰蓝色", stock: 0 },
      { short: "羊绒43", full: "43 雾蓝花 · 12团装按套卖", stock: 0, set: 12 },
    ],
  },
  {
    series: "诚信编织",
    hint: "290 / 雪球",
    items: [
      { short: "290浅蓝216", full: "290 中粗羊毛线 浅蓝 216", stock: 0 },
      { short: "290浅豆绿212", full: "290 中粗羊毛线 浅豆绿 212", stock: 0 },
      { short: "雪球04", full: "雪球冰条线 04 浅粉色", stock: 1 },
    ],
  },
  {
    series: "煜羊渐变纱线",
    hint: "02 / 03",
    items: [
      { short: "渐变02", full: "02 海盐芝士", stock: 0 },
      { short: "渐变03", full: "03 桃桃莓莓", stock: 0 },
    ],
  },
  {
    series: "煜羊琉璃轻岚",
    hint: "长绒羽毛纱",
    items: [
      { short: "琉璃02", full: "琉璃轻岚 02", stock: 0 },
      { short: "琉璃03", full: "琉璃轻岚 03", stock: 0 },
      { short: "琉璃05", full: "琉璃轻岚 05", stock: 0 },
      { short: "琉璃06", full: "琉璃轻岚 06", stock: 0 },
      { short: "琉璃08", full: "琉璃轻岚 08", stock: 0 },
      { short: "琉璃09", full: "琉璃轻岚 09", stock: 0 },
      { short: "琉璃10", full: "琉璃轻岚 10", stock: 0 },
      { short: "琉璃11", full: "琉璃轻岚 11", stock: 0 },
      { short: "琉璃12", full: "琉璃轻岚 12", stock: 0 },
      { short: "琉璃13", full: "琉璃轻岚 13", stock: 0 },
      { short: "琉璃14", full: "琉璃轻岚 14", stock: 0 },
      { short: "琉璃24", full: "琉璃轻岚 24", stock: 0 },
    ],
  },
];
