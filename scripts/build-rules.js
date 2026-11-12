/* 把 rules.md 转成 public/rules-body.html
   改规则只改 rules.md，然后跑：node scripts/build-rules.js */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const md = fs.readFileSync(path.join(root, "rules.md"), "utf8");

function esc(s) {
  return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
}

function inline(s) {
  // 行内代码先抽出来，避免被其它规则改写
  const codes = [];
  s = s.replace(/`([^`]+)`/g, (_, c) => {
    codes.push(c);
    return "\u0000" + (codes.length - 1) + "\u0000";
  });
  s = esc(s);
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/\u0000(\d+)\u0000/g, (_, i) => "<code>" + esc(codes[Number(i)]) + "</code>");
  return s;
}

const lines = md.split(/\r?\n/);
const out = [];
let i = 0;

function isTableRow(l) {
  return /^\s*\|.*\|\s*$/.test(l);
}
function splitRow(l) {
  return l.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
}

while (i < lines.length) {
  const line = lines[i];

  // 代码块
  if (/^```/.test(line)) {
    const buf = [];
    i++;
    while (i < lines.length && !/^```/.test(lines[i])) {
      buf.push(lines[i]);
      i++;
    }
    i++;
    out.push("<pre><code>" + esc(buf.join("\n")) + "</code></pre>");
    continue;
  }

  // 表格
  if (isTableRow(line) && i + 1 < lines.length && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1])) {
    const head = splitRow(line);
    const aligns = splitRow(lines[i + 1]).map((c) =>
      /^:-+:$/.test(c) ? "center" : /^-+:$/.test(c) ? "right" : "left"
    );
    i += 2;
    const body = [];
    while (i < lines.length && isTableRow(lines[i])) {
      body.push(splitRow(lines[i]));
      i++;
    }
    let t = '<div class="table-scroll"><table><thead><tr>';
    head.forEach((h, k) => {
      const cls = aligns[k] === "right" ? ' class="num"' : "";
      t += "<th" + cls + ">" + inline(h) + "</th>";
    });
    t += "</tr></thead><tbody>";
    body.forEach((r) => {
      t += "<tr>";
      r.forEach((c, k) => {
        const cls = aligns[k] === "right" ? ' class="num"' : "";
        t += "<td" + cls + ">" + inline(c) + "</td>";
      });
      t += "</tr>";
    });
    t += "</tbody></table></div>";
    out.push(t);
    continue;
  }

  // 标题
  let m = line.match(/^(#{1,4})\s+(.*)$/);
  if (m) {
    const lv = m[1].length;
    const txt = inline(m[2]);
    const id = "s" + out.length;
    out.push('<h' + lv + ' id="' + id + '" class="section-anchor">' + txt + "</h" + lv + ">");
    i++;
    continue;
  }

  // 分隔线
  if (/^---+\s*$/.test(line)) {
    i++;
    continue;
  }

  // 引用块
  if (/^>\s?/.test(line)) {
    const buf = [];
    while (i < lines.length && /^>\s?/.test(lines[i])) {
      buf.push(lines[i].replace(/^>\s?/, ""));
      i++;
    }
    out.push("<blockquote><p>" + buf.map(inline).join("<br />") + "</p></blockquote>");
    continue;
  }

  // 有序列表
  if (/^\d+\.\s+/.test(line)) {
    const buf = [];
    while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
      buf.push(lines[i].replace(/^\d+\.\s+/, ""));
      i++;
    }
    out.push("<ol>" + buf.map((x) => "<li>" + inline(x) + "</li>").join("") + "</ol>");
    continue;
  }

  // 无序列表
  if (/^[-*]\s+/.test(line)) {
    const buf = [];
    while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
      buf.push(lines[i].replace(/^[-*]\s+/, ""));
      i++;
    }
    out.push("<ul>" + buf.map((x) => "<li>" + inline(x) + "</li>").join("") + "</ul>");
    continue;
  }

  // 空行
  if (!line.trim()) {
    i++;
    continue;
  }

  // 段落（合并连续非空行）
  const buf = [];
  while (
    i < lines.length &&
    lines[i].trim() &&
    !/^(#{1,4})\s+/.test(lines[i]) &&
    !/^```/.test(lines[i]) &&
    !/^---+\s*$/.test(lines[i]) &&
    !/^>\s?/.test(lines[i]) &&
    !/^\d+\.\s+/.test(lines[i]) &&
    !/^[-*]\s+/.test(lines[i]) &&
    !isTableRow(lines[i])
  ) {
    buf.push(lines[i]);
    i++;
  }
  if (buf.length) out.push("<p>" + buf.map(inline).join("<br />") + "</p>");
}

fs.writeFileSync(path.join(root, "public", "rules-body.html"), out.join("\n"), "utf8");
// 纯文本版，方便直接粘到微信群里
fs.writeFileSync(path.join(root, "public", "rules.txt"), md, "utf8");
console.log("rules-body.html 生成完成：" + out.length + " 块");
