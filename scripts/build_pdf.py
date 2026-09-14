#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_pdf.py · README.md → 鲍泽英-AI产品经理-作品集.pdf

和网页版的差异（刻意为之）：
  1. 表格去掉「仓库状态」列——纸面上点不了，🔒/🔓 只会占宽度
  2. 顶部的「下载 PDF」链接换成「在线版本」回链，指回 GitHub 主页
  3. GFM 的 [!IMPORTANT] 提示块转成「重要说明」灰底框

依赖：pandoc + Google Chrome（headless 打印，和初版 PDF 同一条链路）

用法：
    python3 scripts/build_pdf.py
"""

from __future__ import annotations
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
README = ROOT / "README.md"
OUT_PDF = ROOT / "鲍泽英-AI产品经理-作品集.pdf"
HOMEPAGE = "https://github.com/b-bzy/Jacob-pm-portfolio"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

DROP_COLUMNS = {"仓库状态"}


def drop_table_columns(md: str) -> str:
    """删掉 DROP_COLUMNS 里的表格列。逐个表格处理，非表格行原样返回。"""
    lines = md.split("\n")
    out: list[str] = []
    i = 0
    while i < len(lines):
        line = lines[i]
        is_header = line.startswith("|") and i + 1 < len(lines) and re.match(
            r"^\|[\s:|-]+\|$", lines[i + 1]
        )
        if not is_header:
            out.append(line)
            i += 1
            continue

        header_cells = [c.strip() for c in line.strip().strip("|").split("|")]
        drop_idx = {n for n, c in enumerate(header_cells) if c in DROP_COLUMNS}
        if not drop_idx:
            out.append(line)
            i += 1
            continue

        def strip_cells(row: str) -> str:
            cells = row.strip().strip("|").split("|")
            kept = [c for n, c in enumerate(cells) if n not in drop_idx]
            return "|" + "|".join(kept) + "|"

        # 表头 + 分隔行 + 连续的数据行
        out.append(strip_cells(line))
        out.append(strip_cells(lines[i + 1]))
        i += 2
        while i < len(lines) and lines[i].startswith("|"):
            out.append(strip_cells(lines[i]))
            i += 1
    return "\n".join(out)


def transform(md: str) -> str:
    # 1. 顶部链接：下载 PDF → 在线版本回链
    md = re.sub(
        r"^📄 \*\*\[下载 PDF 版作品集\].*$",
        f"🔗 在线版本（含各项目仓库直达链接）：{HOMEPAGE}",
        md,
        count=1,
        flags=re.M,
    )
    # 2. GFM alert → 普通引用块（CSS 里渲染成灰底框）
    md = re.sub(r"^> \[!\w+\]\s*$", "> **重要说明**\n>", md, flags=re.M)
    # 3. 去掉仓库状态列
    md = drop_table_columns(md)
    # 4. 去掉「🔓 Public / 🔒 Private」图例说明——列已删，图例就没意义了
    md = re.sub(r"^> \*\*🔓 Public\*\*.*?\n(> .*\n)*", "", md, flags=re.M)
    return md


CSS = """
@page { size: A4; margin: 16mm 14mm 16mm 14mm; }
* { box-sizing: border-box; }
body {
  font-family: "PingFang SC", "Helvetica Neue", "Hiragino Sans GB", sans-serif;
  font-size: 9.4pt; line-height: 1.75; color: #1a1a1a; margin: 0;
  -webkit-font-smoothing: antialiased;
}
body > p:first-of-type {
  background: #f6f6f7; border-radius: 6px; padding: 14px 16px;
  margin: 0 0 14px 0; font-size: 9.8pt; line-height: 1.85;
}
h1 { font-size: 17pt; margin: 0 0 12px; }
h2 {
  font-size: 13.5pt; margin: 26px 0 12px; padding-bottom: 7px;
  border-bottom: 1.5px solid #1a1a1a; break-after: avoid;
}
h3 {
  font-size: 11pt; margin: 18px 0 8px; padding-left: 9px;
  border-left: 3.5px solid #1a1a1a; break-after: avoid;
}
p { margin: 0 0 9px; }
a { color: #1a1a1a; text-decoration: none; border-bottom: 0.5px solid #bbb; }
hr { display: none; }
blockquote {
  background: #f6f6f7; border-radius: 6px; border: none;
  padding: 13px 16px; margin: 12px 0; font-size: 8.9pt; line-height: 1.7;
  break-inside: avoid;
}
blockquote p { margin: 0 0 7px; }
blockquote p:last-child { margin-bottom: 0; }
blockquote ul { margin: 6px 0; padding-left: 17px; }
table {
  width: 100%; border-collapse: collapse; margin: 10px 0 14px;
  font-size: 8.1pt; line-height: 1.55; break-inside: avoid;
}
th, td { border: 0.6px solid #d8d8d8; padding: 6px 7px; text-align: left; vertical-align: top; }
th { background: #f0f0f1; font-weight: 600; white-space: nowrap; }
td:first-child, th:first-child { text-align: center; white-space: nowrap; }
ul, ol { margin: 6px 0 10px; padding-left: 19px; }
li { margin: 3px 0; }
code {
  background: #f2f2f3; border-radius: 3px; padding: 1.5px 5px;
  font-family: "SF Mono", Menlo, monospace; font-size: 7.8pt; color: #444;
}
/* 项目详述里的角色行 + 技能标签行：整行都是 code，渲染成 chip 行 */
p > code { margin-right: 3px; }
strong { font-weight: 600; }
"""


def main() -> int:
    if not Path(CHROME).exists():
        sys.exit(f"找不到 Chrome：{CHROME}")

    md = transform(README.read_text(encoding="utf-8"))
    tmp_md = ROOT / ".build.md"
    tmp_html = ROOT / ".build.html"
    tmp_md.write_text(md, encoding="utf-8")

    subprocess.run(
        ["pandoc", str(tmp_md), "--from=gfm", "--to=html5", "--standalone",
         "--metadata", "title=AI 产品经理作品集", "-o", str(tmp_html)],
        check=True,
    )
    html = tmp_html.read_text(encoding="utf-8")
    # pandoc 的默认样式表换成我们自己的
    html = re.sub(r"<style>.*?</style>", f"<style>{CSS}</style>", html, flags=re.S)
    # standalone 模板会插一个 <h1 class="title">，纸面上不需要
    html = re.sub(r'<h1 class="title">.*?</h1>', "", html, flags=re.S)
    tmp_html.write_text(html, encoding="utf-8")

    subprocess.run(
        [CHROME, "--headless", "--disable-gpu", "--no-pdf-header-footer",
         f"--print-to-pdf={OUT_PDF}", tmp_html.as_uri()],
        check=True, capture_output=True,
    )

    tmp_md.unlink(missing_ok=True)
    tmp_html.unlink(missing_ok=True)
    size = OUT_PDF.stat().st_size
    print(f"✓ {OUT_PDF.name}  {size / 1024:.0f} KB")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
