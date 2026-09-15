const CLASS_PASSWORD = "chem26";
const TEACHER_PASSWORD = "teacher26";
const STUDENTS = [
  { id: "00", name: "測試" },
  { id: "01", name: "周卓元" },
  { id: "02", name: "江富霑" },
  { id: "03", name: "羅烙謙" },
  { id: "04", name: "李梓烑" },
  { id: "05", name: "李思嫻" },
  { id: "06", name: "李恩樂" },
  { id: "07", name: "李依靜" },
  { id: "08", name: "盧柏喬" },
  { id: "09", name: "鄧心柔" },
  { id: "10", name: "楊銘" },
  { id: "11", name: "曾子軒" },
  { id: "12", name: "鄭曉樂" },
  { id: "13", name: "周正" },
  { id: "14", name: "崔蘊祺" },
  { id: "15", name: "尹俊熹" },
  { id: "16", name: "姚富喬" },
  { id: "17", name: "陳栢男" },
  { id: "18", name: "何溢熹" },
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
  corrosive: svgDiamond('#fff', '<polygon points="60,6 114,60 60,114 6,60" fill="none" stroke="#e53935" stroke-width="8"/><g fill="#111"><rect x="28" y="34" width="18" height="22" rx="2"/><rect x="74" y="34" width="18" height="22" rx="2"/><rect x="68" y="68" width="30" height="10"/></g>'),
  flammable: svgDiamond('#fff', '<polygon points="60,6 114,60 60,114 6,60" fill="none" stroke="#e53935" stroke-width="8"/><path d="M60 28c10 14 22 22 22 38a22 22 0 1 1-44 0c0-10 8-20 14-28 2 10 10 14 10 14s-4-12 0-24c6 6 10 14 10 22" fill="#111"/>'),
  toxic: svgDiamond('#fff', '<polygon points="60,6 114,60 60,114 6,60" fill="none" stroke="#e53935" stroke-width="8"/><circle cx="60" cy="48" r="16" fill="#111"/><circle cx="54" cy="46" r="3" fill="#fff"/><circle cx="66" cy="46" r="3" fill="#fff"/><path d="M48 78h24M60 64v28M42 70l36 16M42 86l36-16" stroke="#111" stroke-width="5" fill="none"/>'),
  oxidizer: svgDiamond('#fff', '<polygon points="60,6 114,60 60,114 6,60" fill="none" stroke="#e53935" stroke-width="8"/><circle cx="60" cy="68" r="16" fill="none" stroke="#111" stroke-width="5"/><path d="M60 26c6 8 14 12 14 22a14 14 0 0 1-20-18c2 6 8 8 8 8s-2-8 0-16c4 4 7 9 7 14" fill="#111"/>'),
  explosive: svgDiamond('#fff', '<polygon points="60,6 114,60 60,114 6,60" fill="none" stroke="#e53935" stroke-width="8"/><path d="M44 70h32l-4 16H48z" fill="#111"/><path d="M52 70l8-22 8 22" fill="#111"/><path d="M60 38l14-10M60 38l-8-14M60 38l16 4M60 38l-16 2" stroke="#111" stroke-width="3"/>'),
  irritant: svgDiamond('#fff', '<polygon points="60,6 114,60 60,114 6,60" fill="none" stroke="#e53935" stroke-width="8"/><circle cx="60" cy="60" r="22" fill="none" stroke="#111" stroke-width="6"/><rect x="56" y="42" width="8" height="22" rx="2" fill="#111"/><circle cx="60" cy="74" r="4" fill="#111"/>')
};
