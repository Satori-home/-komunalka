'use strict';
// Комуналка для iPhone (і будь-якого браузера). Логіка та формат даних — ті самі, що на ПК і Android.

// ---------------- Допоміжне ----------------

const $ = s => document.querySelector(s);
const ICON = {
  dashboard: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z',
  speed: 'M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44zm-9.79 6.84a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z',
  payments: 'M19 14V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-9-1c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-6v11c0 1.1-.9 2-2 2H4v-2h17V7h2z',
  tune: 'M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z',
  add: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
  sync: 'M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z',
  close: 'M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
  check: 'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  bolt: 'M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z',
  water: 'M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z',
  bell: 'M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z',
  calendar: 'M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .9-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z',
  chart: 'M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z',
  trend: 'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z',
  warning: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
  chevron: 'M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z',
  cloudOff: 'M19.35 10.04A7.49 7.49 0 0 0 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46a5.497 5.497 0 0 1 8.05 4.87v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z',
  trash: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',
};
const ic = (n, color) => `<svg viewBox="0 0 24 24" fill="${color || 'currentColor'}" aria-hidden="true"><path d="${ICON[n]}"/></svg>`;

const MONTHS = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
const MONTHS_GEN = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];
const MONTHS_SHORT = ['січ', 'лют', 'бер', 'кві', 'тра', 'чер', 'лип', 'сер', 'вер', 'жов', 'лис', 'гру'];

const fmt = d => new Intl.NumberFormat('uk-UA', { minimumFractionDigits: d, maximumFractionDigits: d });
const nf2 = fmt(2), nf0 = fmt(0), nf1 = fmt(1), nf3 = fmt(3);
const money = v => nf2.format(v) + ' ₴';
const num = (v, d) => (d === 0 ? nf0 : d === 1 ? nf1 : d === 3 ? nf3 : nf2).format(v);
const r2 = v => Math.round(v * 100 + (v >= 0 ? 1e-7 : -1e-7)) / 100;
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = n => String(n).padStart(2, '0');
const plain = v => String(v).replace('.', ',');

// Дати зберігаються рядками «РРРР-ММ-ДД».
const iso = (y, m, d) => `${y}-${pad(m)}-${pad(d)}`;
const ymd = s => s.split('-').map(Number);
const addMonths = (s, n) => { let [y, m] = ymd(s); m += n; y += Math.floor((m - 1) / 12); m = (((m - 1) % 12) + 12) % 12 + 1; return iso(y, m, 1); };
const periodOf = s => addMonths(s, -1);
const monthName = s => { const [y, m] = ymd(s); return MONTHS[m - 1] + ' ' + y; };
const monthIdx = s => ymd(s)[1] - 1;
const dmy = s => { const [y, m, d] = ymd(s); return `${pad(d)}.${pad(m)}.${y}`; };
const monthText = s => { const [y, m] = ymd(s); return pad(m) + '.' + y; };
const today = () => { const d = new Date(); return iso(d.getFullYear(), d.getMonth() + 1, d.getDate()); };
function parseDMY(t) {
  const p = String(t).trim().split(/[./-]/);
  if (p.length !== 3) return null;
  let [d, m, y] = p.map(Number);
  if (y < 100) y += 2000;
  const dt = new Date(Date.UTC(y, m - 1, d));
  if (!y || dt.getUTCFullYear() !== y || dt.getUTCMonth() !== m - 1 || dt.getUTCDate() !== d) return null;
  return iso(y, m, d);
}
function parseMonth(t) {
  const p = String(t).trim().split(/[./-]/);
  if (p.length === 2) { const m = +p[0], y = +p[1]; return m >= 1 && m <= 12 && y > 1900 ? iso(y, m, 1) : null; }
  if (p.length === 3) { const v = parseDMY(t); return v ? v.slice(0, 8) + '01' : null; }
  return null;
}
function parseNum(t) {
  const v = String(t).replace(/[\s ]/g, '').replace(',', '.');
  return v === '' || isNaN(+v) ? null : +v;
}

// ---------------- Дані ----------------

const DEFAULT_SHARE = [1, 1, 1, 0.5, 0, 0, 0, 0, 0, 0.5, 1, 1];
const DEFAULT_TARIFF = { id: 't-2024-06-01', updatedAt: 0, deleted: false, from: '2024-06-01', water: 30.384, day: 4.32, nightCoef: 0.5, osbb: 1272.03, heating: 1600, rent: 18000 };
const KEY = 'komunalka.records', SKEY = 'komunalka.settings';

let db = { readings: {}, tariffs: {}, settlements: {}, heating: { share: DEFAULT_SHARE.slice(), updatedAt: 0 } };
let settings = { url: '', token: '', lastSync: 0 };
try { merge(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch (e) { /* порожньо */ }
try { Object.assign(settings, JSON.parse(localStorage.getItem(SKEY) || '{}')); } catch (e) { /* порожньо */ }

function save() { localStorage.setItem(KEY, JSON.stringify(toRecords())); }
function saveSettings() { localStorage.setItem(SKEY, JSON.stringify(settings)); }

// Формат записів спільний з ПК, Android і Google-скриптом: { type, id, updatedAt, deleted, data }.
function toRecords() {
  const out = [];
  const rec = (type, o, data) => out.push({ type, id: o.id, updatedAt: o.updatedAt, deleted: !!o.deleted, data });
  Object.values(db.readings).forEach(r => rec('reading', r, { date: r.date, wk: r.wk, wb: r.wb, day: r.day, night: r.night, exclude: !!r.exclude, note: r.note || null }));
  Object.values(db.tariffs).forEach(t => rec('tariff', t, { from: t.from, water: t.water, day: t.day, nightCoef: t.nightCoef, osbb: t.osbb, heating: t.heating, rent: t.rent }));
  Object.values(db.settlements).forEach(s => rec('settlement', s, { said: s.said || null, from: s.from, to: s.to, amount: s.amount, paid: s.paid == null ? null : s.paid, note: s.note || null }));
  out.push({ type: 'settings', id: 'heating', updatedAt: db.heating.updatedAt, deleted: false, data: { share: db.heating.share } });
  return out;
}

// Злиття: для кожного ідентифікатора перемагає новіша зміна.
function merge(records) {
  for (const o of records || []) {
    if (!o || !o.type || !o.id) continue;
    const upd = +o.updatedAt || 0, del = !!o.deleted, d = o.data || {};
    const newer = map => !map[o.id] || map[o.id].updatedAt < upd;
    try {
      if (o.type === 'reading' && newer(db.readings)) {
        db.readings[o.id] = { id: o.id, updatedAt: upd, deleted: del, date: d.date, wk: +d.wk || 0, wb: +d.wb || 0, day: +d.day || 0, night: +d.night || 0, exclude: !!d.exclude, note: d.note || null };
      } else if (o.type === 'tariff' && newer(db.tariffs)) {
        db.tariffs[o.id] = { id: o.id, updatedAt: upd, deleted: del, from: d.from, water: +d.water || 0, day: +d.day || 0, nightCoef: d.nightCoef == null ? 0.5 : +d.nightCoef, osbb: +d.osbb || 0, heating: +d.heating || 0, rent: +d.rent || 0 };
      } else if (o.type === 'settlement' && newer(db.settlements)) {
        db.settlements[o.id] = { id: o.id, updatedAt: upd, deleted: del, said: d.said || null, from: d.from, to: d.to, amount: +d.amount || 0, paid: d.paid == null ? null : +d.paid, note: d.note || null };
      } else if (o.type === 'settings' && o.id === 'heating' && upd > db.heating.updatedAt && Array.isArray(d.share) && d.share.length === 12) {
        db.heating = { share: d.share.map(Number), updatedAt: upd };
      }
    } catch (e) { /* пошкоджений запис пропускаємо */ }
  }
}

const live = map => Object.values(map).filter(x => !x.deleted);
const readings = () => live(db.readings).sort((a, b) => a.date < b.date ? -1 : 1);
const tariffs = () => live(db.tariffs).sort((a, b) => a.from < b.from ? -1 : 1);
const settlements = () => live(db.settlements).sort((a, b) => a.from < b.from ? -1 : 1);

function change(fn, message) {
  fn(Date.now());
  save();
  closeSheet();
  render(false);
  if (message) toast(message);
  sync();
}

// ---------------- Розрахунки ----------------

function tariffFor(period) {
  const list = tariffs();
  if (!list.length) return DEFAULT_TARIFF;
  let t = list[0];
  for (const x of list) if (x.from <= period) t = x;
  return t;
}

function fill(m) {
  const t = tariffFor(m.period);
  m.kwh = m.kwhDay + m.kwhNight;
  m.waterCost = r2(m.waterM3 * t.water);
  m.lightCost = r2((m.kwhDay + m.kwhNight * t.nightCoef) * t.day);
  m.osbb = t.osbb;
  m.heating = r2(t.heating * db.heating.share[monthIdx(m.period)]);
  m.utilities = r2(m.waterCost + m.lightCost + m.osbb + m.heating);
  m.rent = t.rent;
  m.withRent = r2(m.utilities + m.rent);
  return m;
}

function compute(prev, cur) {
  return fill({ r: cur, period: periodOf(cur.date), exclude: !!cur.exclude,
    waterM3: (cur.wk - prev.wk) + (cur.wb - prev.wb), kwhDay: cur.day - prev.day, kwhNight: cur.night - prev.night });
}

function rows() {
  const rs = readings();
  const out = [];
  for (let i = 1; i < rs.length; i++) out.push(compute(rs[i - 1], rs[i]));
  const inc = out.filter(m => !m.exclude);
  if (inc.length) {
    const avg = f => inc.reduce((s, m) => s + f(m), 0) / inc.length;
    const aw = avg(m => m.waterM3), ak = avg(m => m.kwh), mx = Math.max(...inc.map(m => m.utilities));
    out.forEach(m => { m.waterHigh = m.waterM3 > 1.3 * aw; m.lightHigh = m.kwh > 1.3 * ak; m.isMax = !m.exclude && m.utilities === mx; });
  }
  return out;
}

const forecastFor = (from, to, rs) => r2(rs.filter(m => m.period >= from && m.period <= to).reduce((s, m) => s + m.utilities, 0));

function stats(rs) {
  if (!rs.length) return null;
  const inc = rs.filter(m => !m.exclude);
  const since = addMonths(rs[rs.length - 1].period, -12);
  const l12 = inc.filter(m => m.period > since);
  const avg = (a, f) => a.length ? a.reduce((s, m) => s + f(m), 0) / a.length : 0;
  const years = {};
  inc.forEach(m => { const y = m.period.slice(0, 4); (years[y] = years[y] || []).push(m); });
  let said = 0, fc = 0;
  settlements().forEach(s => { said += s.amount; fc += forecastFor(s.from, s.to, rs); });
  // Прогноз на поточний місяць: той самий місяць рік тому або середнє останніх 3.
  const nextP = addMonths(rs[rs.length - 1].period, 1);
  const ly = rs.find(m => m.period === addMonths(nextP, -12));
  let next;
  if (ly) next = fill({ period: nextP, waterM3: ly.waterM3, kwhDay: ly.kwhDay, kwhNight: ly.kwhNight, basis: 'за споживанням: ' + monthName(ly.period).toLowerCase() });
  else {
    const l3 = (inc.length ? inc : rs).slice(-3);
    next = fill({ period: nextP, waterM3: Math.round(avg(l3, m => m.waterM3)), kwhDay: Math.round(avg(l3, m => m.kwhDay)), kwhNight: Math.round(avg(l3, m => m.kwhNight)), basis: 'за середнім останніх 3 міс.' });
  }
  return {
    last: rs[rs.length - 1], prev: rs[rs.length - 2], next,
    max: inc.reduce((a, m) => !a || m.utilities > a.utilities ? m : a, null),
    min: inc.reduce((a, m) => !a || m.utilities < a.utilities ? m : a, null),
    avg12: avg(l12, m => m.utilities), avgKwh12: avg(l12, m => m.kwh), avgWater12: avg(l12, m => m.waterM3),
    years: Object.keys(years).sort().map(y => ({ year: y, count: years[y].length, water: years[y].reduce((s, m) => s + m.waterM3, 0),
      kwh: years[y].reduce((s, m) => s + m.kwh, 0), utilities: years[y].reduce((s, m) => s + m.utilities, 0) })),
    said, forecast: fc,
  };
}

// ---------------- Синхронізація ----------------

let syncState = { s: 'idle' }, syncPending = false;
const syncConfigured = () => !!(settings.url && settings.token);

async function sync() {
  if (!syncConfigured()) return;
  if (syncState.s === 'run') { syncPending = true; return; }
  syncState = { s: 'run' };
  syncBits();
  try {
    // text/plain — «простий» запит без попередньої перевірки CORS; перенаправлення Apps Script браузер проходить сам.
    const res = await fetch(settings.url, { method: 'POST', redirect: 'follow', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ token: settings.token, records: toRecords() }) });
    const text = await res.text();
    let j;
    try { j = JSON.parse(text); } catch (e) { throw new Error('Таблиця відповіла не так, як очікувалося. Перевірте адресу (має закінчуватися на /exec).'); }
    if (!j.ok) throw new Error(j.error || 'Невідома помилка синхронізації');
    merge(j.records);
    save();
    settings.lastSync = Date.now();
    saveSettings();
    syncState = { s: 'ok', at: settings.lastSync };
    if (!sheetOpen) render(false);
    else syncBits();
  } catch (e) {
    syncState = { s: 'err', msg: e instanceof TypeError ? 'Немає зв\'язку з таблицею — дані збережено на телефоні' : e.message };
    syncBits();
  }
  if (syncPending) { syncPending = false; sync(); }
}

function syncText() {
  if (!syncConfigured()) return null;
  const t = ms => new Date(ms).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
  if (syncState.s === 'run') return 'Синхронізація…';
  if (syncState.s === 'ok') return 'Синхронізовано о ' + t(syncState.at);
  if (syncState.s === 'err') return syncState.msg;
  return settings.lastSync ? 'Остання синхронізація: ' + new Date(settings.lastSync).toLocaleString('uk-UA', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : null;
}

function syncButton() {
  if (!syncConfigured()) return `<button class="icon-btn" data-act="tab" data-v="3" aria-label="Налаштувати синхронізацію">${ic('cloudOff')}</button>`;
  const cls = syncState.s === 'run' ? 'spin' : syncState.s === 'ok' ? 'ok' : syncState.s === 'err' ? 'err' : '';
  return `<button class="icon-btn sync-btn ${cls}" data-act="sync" aria-label="Синхронізувати">${ic('sync')}</button>`;
}

// Оновлює лише індикатори синхронізації, не перебудовуючи екран.
function syncBits() {
  document.querySelectorAll('.sync-btn').forEach(b => { b.outerHTML = syncButton(); });
  document.querySelectorAll('.sync-text').forEach(el => {
    el.textContent = syncText() || '';
    el.style.color = syncState.s === 'err' ? 'var(--bad)' : '';
  });
}

// ---------------- Інтерфейс: каркас ----------------

const TABS = [['Огляд', 'dashboard'], ['Показники', 'speed'], ['Розрахунки', 'payments'], ['Налаштування', 'tune']];
let tab = +(sessionStorage.getItem('tab') || 0);
let range = 12, sel = -1, sheetOpen = false;

function renderNav() {
  $('#nav').innerHTML = TABS.map(([l, i], n) =>
    `<button class="${n === tab ? 'on' : ''}" data-act="tab" data-v="${n}"><span class="pill">${ic(i)}</span>${l}</button>`).join('');
}

function render(animate = true) {
  renderNav();
  const scr = $('#screen');
  const y = window.scrollY;
  scr.innerHTML = `<div class="${animate ? 'page' : ''}">${[overview, readingsScreen, settlementsScreen, settingsScreen][tab]()}</div>`;
  if (!animate) {
    scr.querySelectorAll('.rise').forEach(el => { el.style.animation = 'none'; el.style.opacity = 1; });
    window.scrollTo(0, y);
  }
  const fab = $('#fab');
  fab.hidden = !(tab === 1 || tab === 2);
  fab.innerHTML = ic('add') + (tab === 1 ? 'Показники' : 'Сума');
  fab.dataset.act = tab === 1 ? 'new-reading' : 'new-settlement';
  if (tab === 0) { drawChart(animate); countUp(animate); }
}

const rise = (i) => `class="rise" style="animation-delay:${i * 50}ms"`;
const head = (title, sub, extra = '') => `<div class="head"><div class="grow"><h1>${title}</h1>${sub != null ? `<div class="sub sync-text">${esc(sub)}</div>` : ''}</div>${extra}</div>`;
const line = (color, label, value, cls = '') => `<div class="line ${cls}"><span class="dot" style="background:${color}"></span><span class="lbl">${esc(label)}</span><span class="val">${value}</span></div>`;
const totals = m => line('transparent', 'Разом', money(m.utilities), 'total') + line('transparent', 'Оренда', `<span class="muted">${money(m.rent)}</span>`) +
  line('transparent', 'Разом з орендою', money(m.withRent), 'total accent');
const breakdown = m =>
  line('var(--water)', `Вода · ${num(m.waterM3, 0)} м³`, money(m.waterCost)) +
  line('var(--light)', `Світло · ${num(m.kwhDay, 0)} + ${num(m.kwhNight, 0)} кВт·год`, money(m.lightCost)) +
  line('var(--osbb)', 'ОСББ (прогноз)', money(m.osbb)) +
  line('var(--heat)', 'Опалення (прогноз)', money(m.heating)) + '<div class="sep"></div>' + totals(m);

// ---------------- Огляд ----------------

function overview() {
  const rs = rows(), st = stats(rs);
  const sub = syncText() || (st ? 'Останні показники від ' + dmy(st.last.r.date) : '');
  let h = head('Огляд', sub, syncButton()) +
    `<div ${rise(0)}><button class="btn mb" data-act="new-reading">${ic('add')}Внести показники</button></div>`;
  if (!st) {
    return h + `<div class="card" ${rise(1)}><div style="color:var(--accent);width:30px;height:30px">${ic('bolt')}</div>
      <h3 style="margin-top:8px">Даних ще немає</h3>
      <p class="muted">Підключіть синхронізацію з Google Таблицею — і сюди підтягнуться всі показники з ПК. Або внесіть перші показники вручну.</p>
      <button class="btn secondary" data-act="tab" data-v="3">Підключити синхронізацію</button></div>`;
  }
  const delta = st.prev && st.prev.utilities > 0 ? (st.last.utilities - st.prev.utilities) / st.prev.utilities * 100 : null;
  const kpi = (i, icon, color, label, value, sub, subColor) => `<div class="card" ${rise(i)}>
    <div class="kpi-top"><span class="kpi-ic">${ic(icon, color)}</span><span class="ellipsis">${esc(label)}</span></div>
    <div class="kpi-val count" data-v="${value}">${money(value)}</div>
    ${sub ? `<div class="kpi-sub" style="color:${subColor || 'var(--muted)'}">${esc(sub)}</div>` : ''}</div>`;
  h += '<div class="kpis">' +
    kpi(1, 'calendar', 'var(--accent)', monthName(st.last.period), st.last.utilities,
      delta == null ? null : (delta >= 0 ? '▲ ' : '▼ ') + nf0.format(Math.abs(delta)) + '% від ' + MONTHS_GEN[monthIdx(st.prev.period)], delta > 0 ? 'var(--bad)' : 'var(--good)') +
    kpi(2, 'chart', 'var(--water)', 'Середнє за 12 міс.', st.avg12, `≈ ${num(st.avgKwh12, 0)} кВт·год, ${num(st.avgWater12, 1)} м³`) +
    kpi(3, 'trend', 'var(--osbb)', 'Прогноз · ' + MONTHS_SHORT[monthIdx(st.next.period)], st.next.utilities, st.next.basis) +
    kpi(4, 'warning', 'var(--heat)', 'Найдорожчий', st.max ? st.max.utilities : 0, st.max ? monthName(st.max.period) : '') +
    '</div>';
  h += `<div class="card" ${rise(5)}>
    <div class="row"><h3 class="grow">Комуналка по місяцях</h3>
      <div class="seg">${[[12, '12'], [24, '24'], [0, 'Усі']].map(([v, l]) => `<button class="${range === v ? 'on' : ''}" data-act="range" data-v="${v}">${l}</button>`).join('')}</div></div>
    <div class="hint">Торкніться стовпчика, щоб побачити розбивку</div>
    <div id="chart"></div><div id="detail" style="margin-top:12px"></div></div>`;
  const diff = st.said - st.forecast, pct = st.forecast > 0 ? Math.abs(diff) / st.forecast * 100 : 0;
  const kv = (l, v, c) => `<div class="row" style="padding:4px 0"><span class="grow muted">${l}</span><span class="b" style="color:${c || 'var(--text)'}">${v}</span></div>`;
  h += `<div class="card" ${rise(6)}><h3>Мій прогноз vs орендодавець</h3><div class="hint" style="margin-bottom:10px">Наскільки точно програма вгадує суму, яку називає орендодавець</div>
    ${kv('Сказали сплатити', money(st.said))}${kv('Мій прогноз', money(st.forecast))}<div class="sep"></div>
    ${kv('Різниця', (diff > 0 ? '+' : '') + money(diff), pct <= 2 ? 'var(--good)' : 'var(--warn)')}
    <div class="muted small" style="margin-top:8px">${st.said === 0 ? 'Додайте суму від орендодавця на вкладці «Розрахунки».' : pct <= 2 ? 'Прогноз дуже точний.' :
      diff > 0 ? 'Орендодавець називає більше — підніміть прогноз ОСББ чи опалення в налаштуваннях.' : 'Орендодавець називає менше — прогноз ОСББ чи опалення можна знизити.'}</div></div>`;
  if (st.years.length) {
    h += `<div class="card" ${rise(7)}><h3 style="margin-bottom:6px">По роках</h3>` + st.years.map(y => `<div class="sep"></div>
      <div class="list-row"><div class="main"><div class="b" style="font-size:16px">${y.year}</div><div class="faint small">${y.count} міс · ${num(y.water, 0)} м³ · ${num(y.kwh, 0)} кВт·год</div></div>
      <div class="right"><div class="b">${money(y.utilities)}</div><div class="muted small">${money(y.utilities / y.count)} / міс</div></div></div>`).join('') +
      '<div class="faint tiny" style="margin-top:10px">Місяці з позначкою «не враховувати» сюди не входять.</div></div>';
  }
  return h;
}

function chartRows() { const rs = rows(); return range ? rs.slice(-range) : rs; }

function drawChart(animate) {
  const box = $('#chart');
  if (!box) return;
  const rs = chartRows();
  if (sel < 0 || sel >= rs.length) sel = rs.length - 1;
  const W = box.clientWidth || 320, H = 220, axis = 34, bottom = 18, h = H - bottom;
  const max = Math.max(...rs.map(m => m.utilities), 1);
  const raw = max / 4, mag = Math.pow(10, Math.floor(Math.log10(raw))), n = raw / mag;
  const step = (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * mag;
  const lines = Math.max(1, Math.ceil(max / step)), top = step * lines;
  const slot = (W - axis) / rs.length, bw = Math.min(slot * 0.62, 28);
  const every = rs.length <= 12 ? 1 : rs.length <= 24 ? 2 : 3;
  let s = `<svg class="chart" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
  for (let i = 0; i <= lines; i++) {
    const y = h - h * i / lines;
    s += `<line x1="${axis}" x2="${W}" y1="${y}" y2="${y}" stroke="var(--line)"/>`;
    if (i) { const v = step * i; s += `<text x="0" y="${y + 3}">${v >= 1000 ? num(v / 1000, v % 1000 ? 1 : 0) + 'к' : num(v, 0)}</text>`; }
  }
  rs.forEach((m, i) => {
    const x0 = axis + slot * i, x = x0 + (slot - bw) / 2;
    s += `<g data-act="bar" data-i="${i}">`;
    s += `<rect x="${x0 + 1}" y="0" width="${slot - 2}" height="${h}" rx="6" fill="${i === sel ? 'var(--surface2)' : 'transparent'}"/>`;
    let y = h;
    [[m.waterCost, '--water'], [m.lightCost, '--light'], [m.osbb, '--osbb'], [m.heating, '--heat']].forEach(([v, c], p) => {
      const sh = v / top * h;
      if (sh > 0.5) {
        s += `<rect class="bar" style="transition-delay:${i * 25 + p * 40}ms" x="${x}" y="${y - sh}" width="${bw}" height="${Math.max(sh - 2, 1)}" rx="3" fill="var(${c})" opacity="${m.exclude ? 0.3 : 1}"/>`;
        y -= sh;
      }
    });
    if ((rs.length - 1 - i) % every === 0) s += `<text class="${i === sel ? 'sel' : ''}" x="${x0 + slot / 2}" y="${H - 3}" text-anchor="middle">${MONTHS_SHORT[monthIdx(m.period)]}</text>`;
    s += '</g>';
  });
  box.innerHTML = s + '</svg>';
  const svg = box.firstChild;
  if (animate) requestAnimationFrame(() => requestAnimationFrame(() => svg.classList.add('grown')));
  else svg.classList.add('grown');
  const m = rs[sel];
  $('#detail').innerHTML = m ? `<div class="row"><span class="grow b" style="font-size:15px">${monthName(m.period)}</span>${m.exclude ? '<span class="tag warn">не враховується</span>' : ''}</div>
    <div style="margin-top:6px">${breakdown(m)}</div>` : '';
}

// Числа «набігають» до значення.
function countUp(animate) {
  if (!animate) return;
  document.querySelectorAll('.count').forEach(el => {
    const v = +el.dataset.v, t0 = performance.now() + 100;
    const step = t => {
      const k = Math.min(1, Math.max(0, (t - t0) / 750));
      el.textContent = money(v * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    };
    el.textContent = money(0);
    requestAnimationFrame(step);
  });
}

// ---------------- Показники ----------------

function readingsScreen() {
  const rs = rows().reverse(), first = readings()[0];
  let h = head('Показники', 'Торкніться місяця, щоб змінити його');
  h += rs.map((m, i) => `<div class="card tap" ${i < 12 ? rise(i) : ''} data-act="edit-reading" data-id="${m.r.id}" style="${m.exclude ? 'opacity:.6;' : ''}padding:16px">
    <div class="list-row"><div class="main">
      <div class="title">${monthName(m.period)}${m.exclude ? '<span class="tag">не враховується</span>' : ''}</div>
      <div class="small" style="margin-top:3px"><span style="color:${m.waterHigh ? 'var(--warn)' : 'var(--water)'}">${num(m.waterM3, 0)} м³</span>
        <span class="faint"> · </span><span style="color:${m.lightHigh ? 'var(--warn)' : 'var(--light)'}">${num(m.kwh, 0)} кВт·год</span></div>
      <div class="faint tiny ellipsis">${dmy(m.r.date)}${m.r.note ? ' · ' + esc(m.r.note) : ''}</div></div>
    <div class="right"><div class="b" style="font-size:16px;color:${m.isMax ? 'var(--bad)' : 'var(--text)'}">${money(m.utilities)}</div>
      <div class="small" style="color:var(--accent)">з орендою ${money(m.withRent)}</div></div></div></div>`).join('');
  if (first) h += `<div class="card tap" data-act="edit-reading" data-id="${first.id}" style="padding:16px"><div class="b muted">Початкові показники</div>
    <div class="faint small">${dmy(first.date)} · вода ${plain(first.wk)} / ${plain(first.wb)} · світло ${plain(first.day)} / ${plain(first.night)}</div></div>`;
  else h += '<p class="muted">Поки порожньо. Підключіть синхронізацію в налаштуваннях або внесіть перші показники.</p>';
  return h;
}

// ---------------- Розрахунки ----------------

function periodText(s) {
  const [fy, fm] = ymd(s.from), [ty, tm] = ymd(s.to);
  if (s.from === s.to) return monthName(s.from);
  if (fy === ty) return MONTHS[fm - 1] + ' – ' + MONTHS[tm - 1].toLowerCase() + ' ' + ty;
  return monthName(s.from) + ' – ' + monthName(s.to).toLowerCase();
}

function settlementsScreen() {
  const rs = rows(), st = stats(rs) || { said: 0, forecast: 0 };
  const diff = st.said - st.forecast, okc = d => Math.abs(d) <= st.forecast * 0.02 ? 'var(--good)' : 'var(--warn)';
  const kv = (l, v, c) => `<div class="row" style="padding:4px 0"><span class="grow muted">${l}</span><span class="b" style="color:${c || 'var(--text)'}">${v}</span></div>`;
  let h = head('Розрахунки', 'Суми, які називає орендодавець, і порівняння з прогнозом') +
    `<div class="card" ${rise(0)}>${kv('Сказали сплатити всього', money(st.said))}${kv('Мій прогноз за ті самі періоди', money(st.forecast))}
     <div class="sep"></div>${kv('Різниця', (diff > 0 ? '+' : '') + money(diff), okc(diff))}</div>`;
  const items = settlements().reverse();
  if (!items.length) h += '<p class="muted">Поки порожньо. Коли орендодавець назве суму — додайте її тут.</p>';
  h += items.map((s, i) => {
    const fc = forecastFor(s.from, s.to, rs), d = s.amount - fc;
    return `<div class="card tap" ${rise(i + 1)} data-act="edit-settlement" data-id="${s.id}" style="padding:16px"><div class="list-row">
      <div class="main"><div class="b" style="font-size:15px">${periodText(s)}</div><div class="faint small">прогноз ${money(fc)}${s.paid != null ? ' · сплачено ' + num(s.paid, 2) : ''}</div></div>
      <div class="right"><div class="b">${money(s.amount)}</div><div class="small" style="color:${Math.abs(d) <= fc * 0.02 ? 'var(--good)' : 'var(--warn)'}">${d > 0 ? '+' : ''}${money(d)}</div></div></div>
      ${s.note ? `<div class="faint small" style="margin-top:6px">${esc(s.note)}</div>` : ''}</div>`;
  }).join('');
  return h;
}

// ---------------- Налаштування ----------------

// Застосунок з головного екрана iPhone відкриває посилання у вбудованому вікні, яке не вміє
// передавати .ics у Календар. Схема x-safari-https:// (iOS 17+) відкриває файл у звичайному Safari.
const standalone = () => navigator.standalone === true || matchMedia('(display-mode: standalone)').matches;
const icsUrl = () => new URL('reminders.ics', location.href).href;
const icsHref = () => standalone() && /iPhone|iPad|iPod/.test(navigator.userAgent) ? 'x-safari-' + icsUrl() : 'reminders.ics';

function settingsScreen() {
  const ts = tariffs().reverse();
  let h = head('Налаштування', null);
  h += `<div class="card" ${rise(0)}><div class="row"><span style="color:var(--accent);width:24px">${ic('sync')}</span><h3 class="grow">Синхронізація з ПК</h3>${syncButton()}</div>
    <div class="hint" style="margin:6px 0 12px">Телефон, Android і ПК обмінюються даними через вашу Google Таблицю. Адресу і ключ ви отримали, коли встановлювали скрипт.</div>
    <div class="field"><label>Адреса (URL)</label><input id="sUrl" inputmode="url" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="https://script.google.com/macros/s/…/exec" value="${esc(settings.url)}"></div>
    <div class="field"><label>Ключ синхронізації</label><input id="sToken" autocapitalize="off" autocorrect="off" spellcheck="false" value="${esc(settings.token)}"></div>
    <button class="btn" data-act="save-sync">${ic('sync')}Зберегти й синхронізувати</button>
    <div class="small sync-text" style="margin-top:10px;${syncState.s === 'err' ? 'color:var(--bad)' : 'color:var(--muted)'}">${esc(syncText() || '')}</div></div>`;

  h += `<div class="card" ${rise(1)}><div class="row"><span style="color:var(--light);width:24px">${ic('bell')}</span><h3 class="grow">Нагадування</h3></div>
    <div class="muted small" style="margin:8px 0 12px">На iPhone нагадування надсилає стандартний Календар — надійно, навіть коли застосунок закрито.
    Додайте дві події, що повторюються щомісяця: <b>останній день о 20:00</b> і <b>1-ше число о 09:00</b>.</div>
    <a class="btn secondary" href="${icsHref()}" ${standalone() ? '' : 'target="_blank" rel="noopener"'} style="text-decoration:none">${ic('calendar')}Додати нагадування в Календар</a>
    <div class="hint" style="margin-top:8px">Відкриється Safari із запитом календаря — натисніть «Додати все». Щоб змінити час: відкрийте подію → «Змінити» → «Для всіх майбутніх подій».</div>
    <div class="hint" style="margin-top:8px">Не відкрилося? Скопіюйте адресу, вставте її в Safari й натисніть «Додати все»:</div>
    <div class="row" style="margin-top:6px"><span class="grow small ellipsis" style="color:var(--accent)">${esc(icsUrl())}</span>
      <button class="icon-btn" style="width:auto;padding:0 12px;color:var(--text);background:var(--surface2);height:36px" data-act="copy-ics">Копіювати</button></div></div>`;

  h += '<div class="section-title">Тарифи</div><div class="hint" style="margin-bottom:10px">Новий тариф — з датою, з якої він діє. Старі місяці рахуються за старими.</div>';
  h += ts.map((t, i) => `<div class="card tap" data-act="edit-tariff" data-id="${t.id}" style="padding:16px"><div class="list-row"><div class="main">
      <div class="b" style="font-size:15px">з ${dmy(t.from)}${i === 0 ? '<span class="tag good">діє зараз</span>' : ''}</div>
      <div class="muted small">вода ${num(t.water, 3)} · світло ${num(t.day, 2)} (ніч ×${plain(t.nightCoef)})</div>
      <div class="faint small">ОСББ ${num(t.osbb, 2)} · опалення ${num(t.heating, 0)} · оренда ${num(t.rent, 0)}</div></div>
      <span class="faint" style="width:22px">${ic('chevron')}</span></div></div>`).join('');
  if (!ts.length) h += '<p class="faint small">Використовуються стандартні тарифи. Вони підтягнуться з ПК після синхронізації.</p>';
  h += `<button class="btn secondary" data-act="new-tariff">${ic('add')}Новий тариф</button>`;

  h += '<div class="section-title">Опалювальний сезон</div><div class="hint" style="margin-bottom:10px">Торкніться місяця: 0% → 50% → 100%. 50% — сезон почався чи закінчився посеред місяця.</div>';
  h += '<div class="tiles">' + MONTHS.map((name, m) => {
    const v = db.heating.share[m];
    return `<button class="tile" data-act="heat" data-m="${m}"><div class="fill" style="height:${v * 100}%;opacity:${v ? 0.18 + 0.22 * v : 0}"></div>
      <span class="muted small">${name}</span><span class="pct" style="color:${v ? 'var(--text)' : 'var(--faint)'}">${Math.round(v * 100)}%</span></button>`;
  }).join('') + '</div>';
  h += '<p class="faint small" style="margin-top:24px">Комуналка для iPhone 1.2 · дані зберігаються на телефоні й у вашій Google Таблиці</p>';
  return h;
}

// ---------------- Форми (виїжджають знизу) ----------------

function openSheet(title, body, bind) {
  $('#sheetInner').innerHTML = `<div class="sheet-head"><button class="icon-btn" data-act="close" aria-label="Закрити">${ic('close')}</button><h2>${title}</h2></div>${body}`;
  const sh = $('#sheet');
  sh.scrollTop = 0;
  requestAnimationFrame(() => sh.classList.add('open'));
  if (!sheetOpen) history.pushState({ sheet: 1 }, '');
  sheetOpen = true;
  document.body.style.overflow = 'hidden';
  if (bind) bind();
}

function closeSheet(fromHistory) {
  if (!sheetOpen) return;
  sheetOpen = false;
  $('#sheet').classList.remove('open');
  document.body.style.overflow = '';
  if (!fromHistory && history.state && history.state.sheet) history.back();
  document.activeElement && document.activeElement.blur && document.activeElement.blur();
}
window.addEventListener('popstate', () => closeSheet(true));

const field = (id, label, value, opts = {}) => `<div class="field"><label for="${id}">${label}</label>
  <input id="${id}" value="${esc(value)}" ${opts.num ? 'inputmode="decimal"' : ''} ${opts.hint ? `placeholder="${esc(opts.hint)}"` : ''} autocomplete="off">
  ${opts.help != null ? `<div class="help" id="${id}Help">${esc(opts.help)}</div>` : ''}</div>`;
const val = id => $('#' + id).value;
const toggle = (id, on, label) => `<div class="switch"><span class="grow">${label}</span><button class="tog ${on ? 'on' : ''}" id="${id}" data-act="tog" role="switch" aria-checked="${on}"></button></div>`;

function readingEditor(old) {
  const all = readings(), last = all[all.length - 1];
  const def = last ? addMonths(last.date, 1) : today().slice(0, 8) + '01';
  const v = x => old ? plain(x) : '';
  openSheet(old ? 'Редагування' : 'Нові показники', `
    ${field('rDate', 'Дата зняття показників', dmy(old ? old.date : def), { hint: 'дд.мм.рррр', help: '' })}
    <div class="sec" style="color:var(--light)">${ic('bolt')}<span style="color:var(--text)">Світло</span></div>
    <div class="pair">${field('rDay', 'День (1.5.8.2)', v(old && old.day), { num: 1, help: '' })}${field('rNight', 'Ніч (1.5.8.1)', v(old && old.night), { num: 1, help: '' })}</div>
    <div class="sec" style="color:var(--water)">${ic('water')}<span style="color:var(--text)">Вода</span></div>
    <div class="pair">${field('rWk', 'Кухня, м³', v(old && old.wk), { num: 1, help: '' })}${field('rWb', 'Туалет/душ, м³', v(old && old.wb), { num: 1, help: '' })}</div>
    <div class="calc" id="rCalc"></div>
    ${toggle('rEx', old ? old.exclude : false, 'Не враховувати в підсумках')}
    ${field('rNote', 'Примітка', old ? old.note || '' : '', { hint: 'наприклад: були у відпустці' })}
    <div class="err" id="rErr"></div>
    <button class="btn" data-act="save-reading">${ic('check')}Зберегти</button>
    ${old ? `<button class="btn danger" data-act="del-reading" style="margin-top:6px">${ic('trash')}Видалити</button>` : ''}`, () => {
    const ctx = { old };
    const upd = () => {
      const d = parseDMY(val('rDate'));
      const others = all.filter(r => !old || r.id !== old.id);
      ctx.d = d;
      ctx.prev = d ? others.filter(r => r.date < d).pop() : null;
      ctx.next = d ? others.find(r => r.date > d) : null;
      ctx.others = others;
      $('#rDate').classList.toggle('bad', !d);
      $('#rDateHelp').textContent = d ? 'Споживання за ' + monthName(periodOf(d)).toLowerCase() : 'Невірна дата';
      const p = ctx.prev;
      [['rDay', 'day'], ['rNight', 'night'], ['rWk', 'wk'], ['rWb', 'wb']].forEach(([id, k]) => { $('#' + id + 'Help').textContent = p ? 'попередній: ' + plain(p[k]) : ''; });
      ctx.nums = ['rWk', 'rWb', 'rDay', 'rNight'].map(id => parseNum(val(id)));
      const c = $('#rCalc');
      if (!p) c.innerHTML = '<span class="muted small">Це найперші показники — з них почнеться відлік.</span>';
      else if (!d || ctx.nums.some(x => x == null)) c.innerHTML = '<span class="muted small">Введіть усі чотири показники — тут з\'явиться розрахунок.</span>';
      else { const [wk, wb, day, night] = ctx.nums; c.innerHTML = breakdown(compute(p, { date: d, wk, wb, day, night })); }
    };
    $('#sheet').oninput = upd;
    upd();
    readingEditor.ctx = ctx;
    if (!old) setTimeout(() => $('#rDay').focus({ preventScroll: true }), 350);
  });
}

function saveReading() {
  const c = readingEditor.ctx, err = $('#rErr');
  if (!c.d) return (err.textContent = 'Вкажіть дату у форматі 01.11.2026.');
  if (c.nums.some(x => x == null)) return (err.textContent = 'Заповніть усі чотири показники числами.');
  if (c.others.some(r => r.date === c.d)) return (err.textContent = 'Показники на цю дату вже є.');
  const names = ['кухня', 'туалет/душ', 'світло день', 'світло ніч'], keys = ['wk', 'wb', 'day', 'night'];
  for (let i = 0; i < 4; i++) {
    if (c.prev && c.nums[i] < c.prev[keys[i]]) return (err.textContent = `Показник «${names[i]}» менший за попередній (${plain(c.prev[keys[i]])}).`);
    if (c.next && c.nums[i] > c.next[keys[i]]) return (err.textContent = `Показник «${names[i]}» більший за наступний місяць (${plain(c.next[keys[i]])}).`);
  }
  const [wk, wb, day, night] = c.nums, id = 'r-' + c.d, note = val('rNote').trim() || null, ex = $('#rEx').classList.contains('on');
  change(now => {
    if (c.old && c.old.id !== id) db.readings[c.old.id] = Object.assign({}, c.old, { deleted: true, updatedAt: now });
    db.readings[id] = { id, updatedAt: now, deleted: false, date: c.d, wk, wb, day, night, exclude: ex, note };
  }, c.old ? 'Зміни збережено' : 'Показники за ' + monthName(periodOf(c.d)).toLowerCase() + ' додано');
}

function settlementEditor(old) {
  const rs = rows(), lastP = rs.length ? rs[rs.length - 1].period : today().slice(0, 8) + '01';
  openSheet(old ? 'Редагування суми' : 'Сума від орендодавця', `
    ${field('sSaid', 'Коли назвали суму', old ? (old.said ? dmy(old.said) : '') : dmy(today()), { hint: 'дд.мм.рррр (необов\'язково)' })}
    <div class="pair">${field('sFrom', 'Період з', monthText(old ? old.from : lastP), { hint: 'мм.рррр' })}${field('sTo', 'по', monthText(old ? old.to : lastP), { hint: 'мм.рррр' })}</div>
    ${field('sAmount', 'Сума від орендодавця, ₴', old ? plain(old.amount) : '', { num: 1, help: 'Тільки комуналка, без оренди' })}
    ${field('sPaid', 'Фактично сплатили, ₴', old && old.paid != null ? plain(old.paid) : '', { num: 1, help: 'Якщо сплатили іншу суму — необов\'язково' })}
    <div class="calc" id="sCalc"></div>
    ${field('sNote', 'Примітка', old ? old.note || '' : '')}
    <div class="err" id="sErr"></div>
    <button class="btn" data-act="save-settlement">${ic('check')}Зберегти</button>
    ${old ? `<button class="btn danger" data-act="del-settlement" style="margin-top:6px">${ic('trash')}Видалити</button>` : ''}`, () => {
    const upd = () => {
      const f = parseMonth(val('sFrom')), t = parseMonth(val('sTo')), c = $('#sCalc');
      if (!f || !t || t < f) { c.innerHTML = '<span class="muted small">Вкажіть період, наприклад 08.2024 – 09.2024.</span>'; return; }
      const fc = forecastFor(f, t, rs), n = rs.filter(m => m.period >= f && m.period <= t).length, a = parseNum(val('sAmount'));
      c.innerHTML = line('var(--accent)', `Мій прогноз · ${n} міс.`, money(fc)) +
        (a == null ? '' : line(Math.abs(a - fc) <= fc * 0.02 ? 'var(--good)' : 'var(--warn)', 'Різниця', (a - fc > 0 ? '+' : '') + money(a - fc)));
    };
    $('#sheet').oninput = upd;
    upd();
    settlementEditor.old = old;
  });
}

function saveSettlement() {
  const old = settlementEditor.old, err = $('#sErr');
  const f = parseMonth(val('sFrom')), t = parseMonth(val('sTo'));
  if (!f || !t) return (err.textContent = 'Вкажіть період у форматі 08.2024.');
  if (t < f) return (err.textContent = 'Кінець періоду раніше за початок.');
  const a = parseNum(val('sAmount'));
  if (a == null) return (err.textContent = 'Вкажіть суму числом.');
  const saidT = val('sSaid').trim(), said = saidT ? parseDMY(saidT) : null;
  if (saidT && !said) return (err.textContent = 'Дата має бути у форматі 01.11.2026.');
  const paidT = val('sPaid').trim(), paid = paidT ? parseNum(paidT) : null;
  if (paidT && paid == null) return (err.textContent = '«Фактично сплатили» має бути числом.');
  const id = old ? old.id : (crypto.randomUUID ? crypto.randomUUID().replace(/-/g, '') : Date.now().toString(36) + Math.random().toString(36).slice(2));
  change(now => { db.settlements[id] = { id, updatedAt: now, deleted: false, said, from: f, to: t, amount: a, paid, note: val('sNote').trim() || null }; },
    old ? 'Зміни збережено' : 'Суму додано');
}

function tariffEditor(old) {
  const ts = tariffs(), b = old || ts[ts.length - 1] || DEFAULT_TARIFF;
  openSheet(old ? 'Редагування тарифу' : 'Новий тариф', `
    ${field('tFrom', 'Діє з', dmy(old ? old.from : today().slice(0, 8) + '01'), { hint: 'дд.мм.рррр', help: 'Застосовується до місяців споживання, починаючи з цієї дати' })}
    ${field('tWater', 'Вода, ₴ за м³', plain(b.water), { num: 1, help: 'Разом із водовідведенням' })}
    <div class="pair">${field('tDay', 'Світло (день), ₴', plain(b.day), { num: 1 })}${field('tCoef', 'Коеф. ночі', plain(b.nightCoef), { num: 1, help: '0,5 = половина' })}</div>
    ${field('tOsbb', 'ОСББ, ₴ / міс (прогноз)', plain(b.osbb), { num: 1 })}
    ${field('tHeat', 'Опалення за повний місяць, ₴ (прогноз)', plain(b.heating), { num: 1, help: 'Множиться на частку опалення місяця' })}
    ${field('tRent', 'Оренда, ₴ / міс', plain(b.rent), { num: 1 })}
    <div class="err" id="tErr"></div>
    <button class="btn" data-act="save-tariff">${ic('check')}Зберегти</button>
    ${old && ts.length > 1 ? `<button class="btn danger" data-act="del-tariff" style="margin-top:6px">${ic('trash')}Видалити</button>` : ''}`, () => { tariffEditor.old = old; });
}

function saveTariff() {
  const old = tariffEditor.old, err = $('#tErr'), f = parseDMY(val('tFrom'));
  if (!f) return (err.textContent = 'Вкажіть дату у форматі 01.11.2026.');
  const n = ['tWater', 'tDay', 'tCoef', 'tOsbb', 'tHeat', 'tRent'].map(id => parseNum(val(id)));
  if (n.some(x => x == null)) return (err.textContent = 'Усі поля мають бути числами.');
  if (tariffs().some(t => (!old || t.id !== old.id) && t.from === f)) return (err.textContent = 'Тариф із цією датою вже є.');
  const id = 't-' + f;
  change(now => {
    if (old && old.id !== id) db.tariffs[old.id] = Object.assign({}, old, { deleted: true, updatedAt: now });
    db.tariffs[id] = { id, updatedAt: now, deleted: false, from: f, water: n[0], day: n[1], nightCoef: n[2], osbb: n[3], heating: n[4], rent: n[5] };
  }, old ? 'Тариф збережено' : 'Новий тариф додано');
}

function remove(map, item, what, message) {
  if (!confirm(`Видалити ${what}? Запис зникне і на інших пристроях після синхронізації.`)) return;
  change(now => { map[item.id] = Object.assign({}, item, { deleted: true, updatedAt: now }); }, message);
}

// ---------------- Події ----------------

let toastTimer;
function toast(t) {
  const el = $('#toast');
  el.textContent = t;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
}

document.addEventListener('click', e => {
  const a = e.target.closest('[data-act]');
  if (!a) return;
  const act = a.dataset.act, id = a.dataset.id;
  switch (act) {
    case 'tab': tab = +a.dataset.v; sessionStorage.setItem('tab', tab); window.scrollTo(0, 0); render(); break;
    case 'sync': sync(); break;
    case 'range': range = +a.dataset.v; sel = -1; document.querySelectorAll('.seg button').forEach(b => b.classList.toggle('on', b === a)); drawChart(true); break;
    case 'bar': sel = +a.dataset.i; drawChart(false); break;
    case 'heat': {
      const m = +a.dataset.m, v = db.heating.share[m];
      const share = db.heating.share.slice();
      share[m] = v >= 1 ? 0 : v >= 0.5 ? 1 : 0.5;
      db.heating = { share, updatedAt: Date.now() };
      save();
      const nv = share[m], fill = a.querySelector('.fill'), pct = a.querySelector('.pct');
      fill.style.height = nv * 100 + '%'; fill.style.opacity = nv ? 0.18 + 0.22 * nv : 0;
      pct.textContent = Math.round(nv * 100) + '%'; pct.style.color = nv ? 'var(--text)' : 'var(--faint)';
      toast(MONTHS[m] + ': опалення ' + Math.round(nv * 100) + '%');
      sync();
      break;
    }
    case 'save-sync':
      settings.url = val('sUrl').trim(); settings.token = val('sToken').trim(); saveSettings();
      if (!syncConfigured()) { toast('Вкажіть адресу і ключ'); break; }
      sync();
      break;
    case 'copy-ics':
      (navigator.clipboard ? navigator.clipboard.writeText(icsUrl()) : Promise.reject())
        .then(() => toast('Адресу скопійовано — вставте її в Safari'), () => toast(icsUrl()));
      break;
    case 'tog':a.classList.toggle('on'); a.setAttribute('aria-checked', a.classList.contains('on')); break;
    case 'close': closeSheet(); break;
    case 'new-reading': readingEditor(null); break;
    case 'edit-reading': readingEditor(db.readings[id]); break;
    case 'save-reading': saveReading(); break;
    case 'del-reading': remove(db.readings, readingEditor.ctx.old, 'показники', 'Показники видалено'); break;
    case 'new-settlement': settlementEditor(null); break;
    case 'edit-settlement': settlementEditor(db.settlements[id]); break;
    case 'save-settlement': saveSettlement(); break;
    case 'del-settlement': remove(db.settlements, settlementEditor.old, 'запис', 'Запис видалено'); break;
    case 'new-tariff': tariffEditor(null); break;
    case 'edit-tariff': tariffEditor(db.tariffs[id]); break;
    case 'save-tariff': saveTariff(); break;
    case 'del-tariff': remove(db.tariffs, tariffEditor.old, 'тариф', 'Тариф видалено'); break;
  }
});

// Перемальовуємо діаграму під нову ширину (поворот екрана).
let resizeTimer;
window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => tab === 0 && drawChart(false), 150); });

// Синхронізуємо, коли застосунок знову на екрані.
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') sync(); });

if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
// Просимо iOS/браузер не очищати сховище застосунку, коли бракує місця.
if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});

render();
if (new URLSearchParams(location.search).has('new')) readingEditor(null);
sync();
