const CLASS_PASSWORD = "chem26";
const TEACHER_PASSWORD = "teacher26";
const STUDENTS = [
  { id: "00", name: "測試" },
  { id: "01", name: "周卓元" },
  { id: "02", name: "江富霽" },
  { id: "03", name: "羅烙謙" },
  { id: "04", name: "李梓烙" },
  { id: "05", name: "李思嫻" },
  { id: "06", name: "李恩樂" },
  { id: "07", name: "李依靜" },
  { id: "08", name: "盧柏喬" },
  { id: "09", name: "鄧心柔" },
  { id: "10", name: "楊銘" },
  { id: "11", name: "曾子軒" },
  { id: "12", name: "鄭曉樂" },
  { id: "13", name: "周正" },
  { id: "14", name: "崔蘊碎" },
  { id: "15", name: "尹俊熸" },
  { id: "16", name: "姚富喬" },
  { id: "17", name: "陳柏男" },
  { id: "18", name: "何溢熸" },
  { id: "19", name: "李盈富" },
  { id: "20", name: "張俊謙" },
  { id: "21", name: "譚沛傑" },
  { id: "22", name: "黃梓洛" },
  { id: "23", name: "龍小雨" },
  { id: "24", name: "曾俊彬" }
];
function svgDiamond(bg, inner) {
  return '<svg viewBox="0 0 120 120" width="150" height="150" aria-hidden="true"><polygon points="60,6 114,60 60,114 6,60" fill="'+bg+'" stroke="#1a1a1a" stroke-width="3"/>'+inner+'</svg>';
}
const ICONS = {
  corrosive: svgDiamond("#f6d021",'<g fill="none" stroke="#111" stroke-width="3.2" stroke-linecap="round"><path d="M38 28v22M82 28v22"/><path d="M32 28h12M76 28h12"/><path d="M38 50c2 14 10 22 22 28"/><path d="M82 50c-4 10-8 16-14 20"/><path d="M28 92h28v10H28z"/><path d="M70 78c10 6 16 14 18 22"/><path d="M66 96h20"/></g>'),
  explosive: svgDiamond("#f6d021",'<g fill="none" stroke="#111" stroke-width="3.2" stroke-linecap="round"><circle cx="60" cy="68" r="16"/><path d="M60 52v-10M48 56l-8-8M72 56l8-8M44 68h-10M76 68h10M50 80l-8 8M70 80l8 8"/></g>'),
  oxidizer: svgDiamond("#f6d021",'<g fill="none" stroke="#111" stroke-width="3.2" stroke-linecap="round"><circle cx="60" cy="78" r="14"/><path d="M60 28c6 10 8 18 0 28c-8-10-6-18 0-28z"/><path d="M48 36c8 2 12 8 12 14M72 36c-8 2-12 8-12 14"/></g>'),
  harmful: svgDiamond("#f6d021",'<g stroke="#111" stroke-width="8" stroke-linecap="round"><path d="M40 40l40 40M80 40L40 80"/></g>'),
  carcinogen: svgDiamond("#f6d021",'<g fill="none" stroke="#111" stroke-width="3.2" stroke-linecap="round"><circle cx="60" cy="46" r="8"/><path d="M48 78c0-12 6-18 12-18s12 6 12 18"/><path d="M44 62h32M52 90h16"/><path d="M38 54l-8 6M82 54l8 6"/></g>')
};
