import { useState, useRef, useEffect, useCallback } from 'react'
import Head from 'next/head'


// ─────────────────────────────────────────────────────────────────────────────
// FONTS & CSS
// ─────────────────────────────────────────────────────────────────────────────
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');`;

const CSS = `
${FONTS}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

/* ══════════════════════ DARK THEME (default) ══════════════════════ */
:root{
  --bg:#080c14;--surface:#0f1420;--card:#141b28;--card2:#1a2235;--border:#232e44;
  --accent:#71a3c1;--accent2:#4e7fa0;--green:#10b981;--red:#f43f5e;--amber:#f59e0b;
  --text:#edf2f7;--muted:#7a8ba0;--radius:0px;
  --inp-bg:#0f1420;--entry-bg:#0f1420;--sum-bg:#0a0f1a;--code-bg:#0f1420;
  --shadow:0 8px 32px rgba(0,0,0,.5);--shadow-sm:0 2px 12px rgba(0,0,0,.3);
  --btn-cancel-bg:rgba(244,63,94,.12);--btn-cancel-border:#f43f5e;--btn-cancel-text:#fda4af;
  --btn-draft-bg:rgba(245,158,11,.1);--btn-draft-border:#f59e0b;--btn-draft-text:#fcd34d;
  --btn-save-bg:linear-gradient(135deg,#71a3c1,#4e7fa0);
  --btn-ghost-bg:#1a2235;--btn-ghost-border:#232e44;--btn-ghost-text:#7a8ba0;
  --nav-active-bg:linear-gradient(135deg,rgba(113,163,193,.15),rgba(78,127,160,.15));
  --nav-active-border:rgba(113,163,193,.4);
  --h-badge-site-bg:rgba(113,163,193,.15);--h-badge-email-bg:rgba(78,127,160,.15);
  --quick-hover:rgba(113,163,193,.08);--choice-hover:rgba(113,163,193,.08);
  --entry-accent-bg:rgba(113,163,193,.1);
  --glow:0 0 20px rgba(113,163,193,.2);
}
/* ══════════════════════ LIGHT THEME ══════════════════════ */
body.light,:root.light{
  --bg:#f0f4ff;--surface:#ffffff;--card:#ffffff;--card2:#f0f5ff;--border:#c8d5f0;
  --text:#0f1729 !important;--muted:#4a5878 !important;
  --inp-bg:#f8faff;--entry-bg:#edf2ff;--sum-bg:#edf2ff;--code-bg:#edf2ff;
  --shadow:0 8px 32px rgba(113,163,193,.12);--shadow-sm:0 2px 12px rgba(113,163,193,.08);
  --btn-cancel-bg:#fff1f3;--btn-cancel-border:#fda4af;--btn-cancel-text:#be123c;
  --btn-draft-bg:#fffbeb;--btn-draft-border:#f59e0b;--btn-draft-text:#92400e;
  --btn-save-bg:linear-gradient(135deg,#5a91b3,#3a6d8f);
  --btn-ghost-bg:#f0f5ff;--btn-ghost-border:#c8d5f0;--btn-ghost-text:#4a5878;
  --nav-active-bg:linear-gradient(135deg,#d4e8f5,#c5dcea);
  --nav-active-border:#93bdd4;
  --h-badge-site-bg:#d4e8f5;--h-badge-email-bg:#c5dcea;
  --quick-hover:#d4e8f5;--choice-hover:#d4e8f5;
  --entry-accent-bg:#d4e8f5;
  --glow:0 0 20px rgba(113,163,193,.15);
}

body{
  font-family:'Poppins',sans-serif;
  background:var(--bg);color:var(--text);
  min-height:100vh;transition:background .3s,color .3s;
  -webkit-font-smoothing:antialiased;
}
h1,h2,h3,h4,.logo,.page-title,.step-title,.section-title,.stat-val,.choice-btn-title,.quick-title,.analytics-title,.modal h3,.case-num-badge,.entry-label,.auth-title,.soon-title,.ann-title,.case-entry-num{
  font-family:'Plus Jakarta Sans',sans-serif;
}
button{cursor:pointer;font-family:'Poppins',sans-serif;}
input,textarea,select{font-family:'Poppins',sans-serif;}
a{color:var(--accent);text-decoration:none;}

/* ── Fancy scrollbars ── */
::-webkit-scrollbar{width:4px;height:4px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:rgba(113,163,193,.25);border-radius:99px;}
::-webkit-scrollbar-thumb:hover{background:rgba(113,163,193,.5);}
body.light ::-webkit-scrollbar-thumb{background:rgba(78,127,160,.2);}
body.light ::-webkit-scrollbar-thumb:hover{background:rgba(78,127,160,.45);}
*{scrollbar-width:thin;scrollbar-color:rgba(113,163,193,.25) transparent;}
body.light *{scrollbar-color:rgba(78,127,160,.2) transparent;}

/* ── Fancy scrollbars ── */
::-webkit-scrollbar{width:4px;height:4px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:rgba(113,163,193,.22);border-radius:99px;}
::-webkit-scrollbar-thumb:hover{background:rgba(113,163,193,.5);}
body.light ::-webkit-scrollbar-thumb{background:rgba(78,127,160,.18);}
body.light ::-webkit-scrollbar-thumb:hover{background:rgba(78,127,160,.42);}
*{scrollbar-width:thin;scrollbar-color:rgba(113,163,193,.22) transparent;}
body.light *{scrollbar-color:rgba(78,127,160,.18) transparent;}

/* ── Shell ── */
.shell{display:flex;min-height:100vh;}
.sidebar{
  width:240px;background:var(--surface);border-right:1px solid var(--border);
  display:flex;flex-direction:column;padding:20px 14px;gap:2px;
  position:sticky;top:0;height:100vh;flex-shrink:0;overflow-y:auto;
  box-shadow:var(--shadow-sm);
}
.logo{
  font-size:20px;font-weight:800;color:var(--text);
  padding:4px 10px 20px;letter-spacing:-.4px;
  display:flex;align-items:center;gap:10px;
}
.logo-icon{
  width:34px;height:34px;border-radius:0;
  background:var(--btn-save-bg);
  display:flex;align-items:center;justify-content:center;
  font-size:16px;flex-shrink:0;box-shadow:var(--glow);
}
.logo-text span{color:var(--accent);}
.nav-group{
  font-family:'Poppins',sans-serif;
  font-size:9px;font-weight:700;color:var(--muted);
  text-transform:uppercase;letter-spacing:1.5px;
  padding:14px 10px 4px;
}
.nav-item{
  display:flex;align-items:center;gap:10px;
  padding:10px 12px;border-radius:0;
  font-size:13px;font-weight:500;color:var(--muted);
  border:none;background:none;width:100%;text-align:left;
  transition:.18s;position:relative;
  font-family:'Poppins',sans-serif;
}
.nav-item:hover{background:var(--card2);color:var(--text);}
.nav-item.active{
  background:var(--nav-active-bg);color:var(--accent);
  border:1px solid var(--nav-active-border);font-weight:600;
}
.nav-badge{
  margin-left:auto;background:var(--accent);color:#fff;
  border-radius:0;font-size:10px;font-weight:700;
  padding:1px 7px;line-height:1.6;
}
.nav-custom-link{
  display:flex;align-items:center;gap:10px;
  padding:9px 12px;border-radius:0;
  font-size:12px;font-weight:500;color:var(--muted);
  transition:.18s;text-decoration:none;
}
.nav-custom-link:hover{background:var(--card2);color:var(--accent);}
.main-area{flex:1;overflow-y:auto;padding:32px;height:100vh;}

/* Theme toggle */
.theme-toggle{
  display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:0;
  font-size:13px;font-weight:500;color:var(--muted);
  border:1px solid var(--border);background:var(--card2);
  width:100%;text-align:left;transition:.18s;margin-top:auto;margin-bottom:6px;
  font-family:'Poppins',sans-serif;
}
.theme-toggle:hover{color:var(--text);border-color:var(--accent);}
.toggle-track{width:36px;height:20px;border-radius:10px;background:var(--border);position:relative;transition:.25s;flex-shrink:0;}
.toggle-track.on{background:var(--btn-save-bg);}
.toggle-thumb{width:14px;height:14px;border-radius:50%;background:#fff;position:absolute;top:3px;left:3px;transition:.25s;box-shadow:0 1px 4px rgba(0,0,0,.3);}
.toggle-track.on .toggle-thumb{left:19px;}

/* Profile mini */
.sidebar-profile{
  display:flex;align-items:center;gap:10px;padding:10px 12px;
  border-radius:0;border:1px solid var(--border);background:var(--card2);
  cursor:pointer;transition:.18s;margin-bottom:4px;
}
.sidebar-profile:hover{border-color:var(--accent);}
.profile-avatar{
  width:32px;height:32px;border-radius:50%;
  background:var(--btn-save-bg);
  display:flex;align-items:center;justify-content:center;
  font-size:14px;font-weight:700;color:#fff;flex-shrink:0;
}
.profile-name{font-size:12px;font-weight:600;color:var(--text);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.profile-role{font-size:10px;color:var(--muted);}

/* Page header */
.page-header{margin-bottom:28px;}
.page-title{font-size:26px;font-weight:800;letter-spacing:-.4px;}
.page-sub{color:var(--muted);font-size:13px;margin-top:5px;font-family:'Poppins',sans-serif;}
.back-btn{
  background:var(--card2);border:1px solid var(--border);color:var(--muted);
  font-size:13px;padding:7px 14px;border-radius:0;cursor:pointer;
  display:inline-flex;align-items:center;gap:6px;transition:.15s;font-weight:500;
  margin-bottom:10px;
}
.back-btn:hover{color:var(--text);border-color:var(--accent);}

/* Buttons */
.btn{
  padding:10px 20px;border-radius:0;font-size:13px;font-weight:600;
  border:none;transition:.2s;display:inline-flex;align-items:center;gap:7px;
  letter-spacing:.1px;font-family:'Poppins',sans-serif;
}
.btn:active{transform:scale(.96);}
.btn-ghost{background:var(--btn-ghost-bg);border:1.5px solid var(--btn-ghost-border);color:var(--btn-ghost-text);}
.btn-ghost:hover{border-color:var(--accent);color:var(--accent);background:var(--entry-accent-bg);}
.btn-cancel{background:var(--btn-cancel-bg);border:1.5px solid var(--btn-cancel-border);color:var(--btn-cancel-text);}
.btn-cancel:hover{filter:brightness(1.15);box-shadow:0 2px 12px rgba(244,63,94,.3);}
.btn-draft{background:var(--btn-draft-bg);border:1.5px solid var(--btn-draft-border);color:var(--btn-draft-text);}
.btn-draft:hover{filter:brightness(1.12);box-shadow:0 2px 12px rgba(245,158,11,.3);}
.btn-save{background:var(--btn-save-bg);color:#fff;border:none;box-shadow:0 3px 14px rgba(113,163,193,.4);}
.btn-save:hover{filter:brightness(1.1);box-shadow:0 5px 22px rgba(113,163,193,.55);}
.btn-danger{background:var(--btn-cancel-bg);border:1.5px solid var(--btn-cancel-border);color:var(--btn-cancel-text);}
.btn-danger:hover{filter:brightness(1.15);box-shadow:0 2px 12px rgba(244,63,94,.3);}
.btn-primary{background:var(--btn-save-bg);color:#fff;border:none;box-shadow:0 3px 12px rgba(113,163,193,.35);}
.btn-primary:hover{filter:brightness(1.1);box-shadow:0 5px 18px rgba(113,163,193,.5);}
.btn-amber{background:var(--btn-draft-bg);border:1.5px solid var(--btn-draft-border);color:var(--btn-draft-text);}
.btn-amber:hover{filter:brightness(1.12);}
.btn-green{background:linear-gradient(135deg,#10b981,#059669);color:#fff;border:none;box-shadow:0 3px 12px rgba(16,185,129,.35);}
.btn-green:hover{filter:brightness(1.1);}
.spacer{flex:1;}
.action-bar{display:flex;gap:10px;flex-wrap:wrap;margin-top:24px;padding-top:24px;border-top:1px solid var(--border);}

/* Stat cards */
.stat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:14px;margin-bottom:28px;}
.stat-card{
  background:var(--card);border:1px solid var(--border);border-radius:var(--radius);
  padding:20px;position:relative;overflow:hidden;transition:.2s;cursor:default;
}
.stat-card:hover{transform:translateY(-2px);box-shadow:var(--shadow-sm);border-color:rgba(113,163,193,.3);}
.stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;}
.stat-card.blue::before{background:linear-gradient(90deg,var(--accent),var(--accent2));}
.stat-card.green::before{background:linear-gradient(90deg,var(--green),#059669);}
.stat-card.amber::before{background:linear-gradient(90deg,var(--amber),#d97706);}
.stat-card.purple::before{background:linear-gradient(90deg,var(--accent2),var(--accent));}
.stat-card.red::before{background:linear-gradient(90deg,var(--red),#e11d48);}
.stat-label{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px;}
.stat-val{font-size:30px;font-weight:800;line-height:1;}
.stat-sub{font-size:11px;color:var(--muted);margin-top:6px;}
.stat-icon{position:absolute;top:16px;right:16px;font-size:20px;opacity:.3;}
.stat-card.blue .stat-val{color:var(--accent);}
.stat-card.green .stat-val{color:var(--green);}
.stat-card.amber .stat-val{color:var(--amber);}
.stat-card.purple .stat-val{color:var(--accent2);}
.stat-card.red .stat-val{color:var(--red);}

/* Section title */
.section-title{font-size:15px;font-weight:700;margin-bottom:16px;display:flex;align-items:center;gap:8px;letter-spacing:-.2px;}

/* Activity rows */
.activity-row{
  display:flex;align-items:center;gap:12px;padding:13px 16px;
  background:var(--card);border:1px solid var(--border);border-radius:0;
  margin-bottom:8px;transition:.15s;
}
.activity-row:hover{border-color:rgba(113,163,193,.3);transform:translateX(2px);}
.act-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
.act-dot.green{background:var(--green);}
.act-dot.blue{background:var(--accent);}
.act-dot.purple{background:var(--accent2);}
.act-info{flex:1;min-width:0;}
.act-title{font-size:13px;font-weight:600;}
.act-sub{font-size:11px;color:var(--muted);margin-top:2px;}
.act-badge{font-size:11px;font-weight:600;padding:3px 10px;border-radius:0;}
.act-badge.site{background:var(--h-badge-site-bg);color:var(--accent);}
.act-badge.email{background:var(--h-badge-email-bg);color:var(--accent2);}

/* Quick cards */
.quick-links{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:28px;}
.quick-card{
  background:var(--card);border:1px solid var(--border);border-radius:var(--radius);
  padding:18px 20px;cursor:pointer;transition:.2s;
  display:flex;align-items:center;gap:14px;
}
.quick-card:hover{border-color:var(--accent);background:var(--quick-hover);transform:translateY(-2px);box-shadow:var(--glow);}
.quick-icon{font-size:26px;}
.quick-title{font-size:14px;font-weight:700;}
.quick-sub{font-size:11px;color:var(--muted);margin-top:3px;font-family:'Poppins',sans-serif;}

/* Analytics */
.analytics-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:28px;}
.analytics-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:20px;}
.analytics-title{font-size:13px;font-weight:700;margin-bottom:16px;letter-spacing:-.1px;}
.bar-row{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
.bar-label{font-size:11px;color:var(--muted);width:90px;flex-shrink:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-family:'Poppins',sans-serif;}
.bar-track{flex:1;height:8px;background:var(--border);border-radius:0;overflow:hidden;}
.bar-fill{height:100%;border-radius:0;transition:width .8s cubic-bezier(.4,0,.2,1);}
.bar-fill.blue{background:linear-gradient(90deg,var(--accent),var(--accent2));}
.bar-fill.green{background:linear-gradient(90deg,var(--green),#059669);}
.bar-fill.amber{background:linear-gradient(90deg,var(--amber),#d97706);}
.bar-fill.red{background:linear-gradient(90deg,var(--red),#e11d48);}
.bar-fill.purple{background:var(--accent2);}
.bar-count{font-size:12px;font-weight:700;color:var(--text);width:22px;text-align:right;flex-shrink:0;font-family:'Poppins',sans-serif;}
.empty-analytics{color:var(--muted);font-size:12px;text-align:center;padding:24px 0;font-family:'Poppins',sans-serif;}

/* Choice buttons */
.choice-row{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:28px;}
.choice-btn{
  flex:1;min-width:170px;padding:26px 24px;border-radius:0;
  border:2px solid var(--border);background:var(--card);color:var(--text);
  font-size:15px;font-weight:700;display:flex;align-items:center;gap:16px;
  transition:.25s;text-align:left;position:relative;overflow:hidden;
  box-shadow:var(--shadow-sm);
  font-family:'Plus Jakarta Sans',sans-serif;
}
.choice-btn::before{
  content:'';position:absolute;top:0;left:0;right:0;height:3px;
  background:var(--btn-save-bg);opacity:0;transition:.25s;
}
.choice-btn:hover{border-color:var(--accent);background:var(--choice-hover);transform:translateY(-3px);box-shadow:var(--glow);}
.choice-btn:hover::before{opacity:1;}
.choice-icon{
  font-size:30px;width:54px;height:54px;border-radius:0;
  background:var(--entry-accent-bg);display:flex;align-items:center;justify-content:center;
  flex-shrink:0;border:1.5px solid var(--border);
}
.choice-btn-title{font-size:15px;font-weight:700;}
.choice-btn-sub{font-size:12px;color:var(--muted);font-weight:400;margin-top:4px;font-family:'Poppins',sans-serif;}

/* Form layout */
.form-cols{display:flex;gap:20px;align-items:flex-start;}
.form-left{flex:1;min-width:0;}
.form-right{width:272px;flex-shrink:0;position:sticky;top:0;align-self:flex-start;max-height:calc(100vh - 64px);overflow-y:auto;}

/* Right panel */
.right-panel{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow-sm);}
.right-panel-header{
  padding:14px 16px;border-bottom:1px solid var(--border);
  font-size:13px;font-weight:700;display:flex;align-items:center;gap:8px;
  background:linear-gradient(135deg,rgba(113,163,193,.08),rgba(78,127,160,.08));
}
.meta-stack{padding:12px 16px;border-bottom:1px solid var(--border);display:flex;flex-direction:column;gap:7px;background:var(--card2);}
.meta-row{display:flex;align-items:center;gap:7px;font-size:11px;color:var(--muted);font-family:'Poppins',sans-serif;}
.meta-row .meta-val{color:var(--text);font-weight:600;}
.meta-row .timer-val{color:var(--amber);font-weight:700;font-variant-numeric:tabular-nums;font-family:'Poppins',sans-serif;}
.summary-panel{padding:14px 16px;}
.summary-locked{text-align:center;padding:24px 0;}
.summary-locked-icon{font-size:32px;margin-bottom:8px;}

/* Copy row */
.copy-row-wrap{margin-bottom:10px;background:var(--sum-bg);border:1px solid var(--border);border-radius:0;padding:10px 12px;transition:.15s;}
.copy-row-wrap:hover{border-color:var(--accent);}
.copy-row-label{font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.8px;margin-bottom:5px;font-family:'Poppins',sans-serif;}
.copy-row-inner{display:flex;align-items:flex-start;gap:8px;}
.copy-row-val{flex:1;font-size:11px;color:var(--text);line-height:1.6;word-break:break-word;white-space:pre-wrap;font-family:'Poppins',sans-serif;}
.copy-row-btn{
  flex-shrink:0;background:var(--btn-save-bg);color:#fff;border:none;
  border-radius:0;padding:4px 10px;font-size:11px;font-weight:600;
  cursor:pointer;transition:.15s;white-space:nowrap;font-family:'Poppins',sans-serif;
}
.copy-row-btn:hover{filter:brightness(1.15);}
.copy-row-btn.done{background:var(--green);}

/* Step cards */
.step-card{border-radius:var(--radius);margin-bottom:8px;overflow:hidden;transition:.25s;border:1px solid var(--border);}
.step-card.locked{background:var(--entry-bg);opacity:.4;pointer-events:none;}
.step-card.unlocked{background:var(--card);}
.step-card.done{background:var(--card);border-color:rgba(16,185,129,.35);}
.step-card.open:not(.locked){border-color:rgba(113,163,193,.4);box-shadow:0 0 0 1px rgba(113,163,193,.1);}
.step-header{display:flex;align-items:center;gap:12px;padding:14px 18px;cursor:pointer;user-select:none;transition:.15s;}
.step-header:hover{background:var(--card2);}
.step-num{width:30px;height:30px;border-radius:50%;background:var(--border);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;color:var(--text);transition:.25s;font-family:'Poppins',sans-serif;}
.step-card.done .step-num{background:var(--green);color:#fff;box-shadow:0 0 0 4px rgba(16,185,129,.15);}
.step-card.open:not(.locked) .step-num{background:var(--btn-save-bg);color:#fff;box-shadow:0 0 0 4px rgba(113,163,193,.15);}
.step-card.locked .step-num{opacity:.4;}
.step-title{font-size:13px;font-weight:700;flex:1;letter-spacing:-.1px;}
.step-card.locked .step-title{color:var(--muted);}
.step-lock-icon{font-size:13px;color:var(--muted);}
.step-chevron{color:var(--muted);font-size:12px;transition:.25s;}
.step-card.open .step-chevron{transform:rotate(180deg);}
.step-body{padding:4px 18px 18px;animation:fadeIn .2s ease;}
@keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}

/* Fields */
.field{margin-bottom:14px;}
.field label{display:block;font-size:10px;font-weight:700;color:var(--muted);margin-bottom:5px;text-transform:uppercase;letter-spacing:.8px;font-family:'Poppins',sans-serif;}
.req{color:var(--red);}
.inp{
  width:100%;background:var(--inp-bg);border:1.5px solid var(--border);
  border-radius:0;color:var(--text);padding:10px 13px;font-size:13px;outline:none;
  transition:.15s;font-family:'Poppins',sans-serif;
}
.inp:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(113,163,193,.12);}
.inp::placeholder{color:var(--muted);opacity:.5;}
textarea.inp{resize:vertical;min-height:80px;line-height:1.6;}
select.inp{cursor:pointer;}

/* Radio */
.radio-group{display:flex;gap:10px;margin-top:4px;flex-wrap:wrap;}
.radio-label{display:flex;align-items:center;gap:8px;background:var(--inp-bg);border:1.5px solid var(--border);padding:9px 15px;border-radius:0;font-size:13px;cursor:pointer;transition:.15s;font-family:'Poppins',sans-serif;}
.radio-label:hover{border-color:var(--accent);}
.radio-label input{accent-color:var(--accent);}
.radio-label.selected-clarif{border-color:var(--amber);color:var(--amber);background:var(--btn-draft-bg);}
.radio-label.selected-complete{border-color:var(--green);color:var(--green);background:rgba(16,185,129,.08);}

/* Checkboxes */
.check-group{display:flex;flex-wrap:wrap;gap:9px;}
.check-label{display:flex;align-items:center;gap:8px;background:var(--inp-bg);border:1.5px solid var(--border);padding:9px 15px;border-radius:0;font-size:13px;cursor:pointer;transition:.15s;font-family:'Poppins',sans-serif;}
.check-label:hover{border-color:var(--accent);}
.check-label input{accent-color:var(--accent);}
.check-label.checked{border-color:var(--green);color:var(--green);background:rgba(16,185,129,.07);}

/* Copy name */
.copy-name{background:var(--inp-bg);border:1.5px solid var(--border);border-radius:0;padding:11px 14px;display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:4px;}
.copy-name-text{font-size:12px;color:var(--accent);font-weight:600;word-break:break-all;font-family:'Poppins',sans-serif;}
.copy-btn{background:var(--btn-save-bg);color:#fff;border:none;border-radius:0;padding:7px 14px;font-size:12px;font-weight:600;white-space:nowrap;transition:.15s;font-family:'Poppins',sans-serif;}
.copy-btn:hover{filter:brightness(1.1);}
.copy-btn.green{background:var(--green) !important;}

/* Entry cards */
.entry-card{background:var(--entry-bg);border:1.5px solid var(--border);border-radius:0;padding:15px;margin-bottom:10px;}
.entry-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:11px;}
.entry-label{font-size:13px;font-weight:700;color:var(--accent);font-family:'Plus Jakarta Sans',sans-serif;}
.entry-del{background:none;border:1px solid transparent;color:var(--muted);font-size:15px;padding:4px 7px;border-radius:0;transition:.15s;}
.entry-del:hover{color:var(--red);background:var(--btn-cancel-bg);border-color:var(--btn-cancel-border);}
.ai-row{display:flex;align-items:center;gap:8px;margin-top:6px;}
.ai-btn{background:linear-gradient(135deg,var(--accent2),var(--accent));color:#fff;border:none;border-radius:0;padding:5px 12px;font-size:11px;font-weight:600;transition:.15s;font-family:'Poppins',sans-serif;}
.ai-btn:disabled{opacity:.35;cursor:not-allowed;}
.add-entry-btn{background:none;border:2px dashed var(--border);border-radius:0;color:var(--muted);padding:12px;width:100%;font-size:13px;font-weight:600;transition:.18s;margin-top:4px;font-family:'Poppins',sans-serif;}
.add-entry-btn:hover{border-color:var(--accent);color:var(--accent);background:var(--entry-accent-bg);}
.copy-all-btn{background:var(--card2);border:1.5px solid var(--border);color:var(--text);border-radius:0;padding:10px 16px;font-size:13px;font-weight:600;margin-top:12px;display:flex;align-items:center;gap:8px;transition:.2s;width:100%;justify-content:center;font-family:'Poppins',sans-serif;}
.copy-all-btn:hover{border-color:var(--accent);color:var(--accent);background:var(--entry-accent-bg);}
.copy-all-btn.copied{border-color:var(--green) !important;color:var(--green) !important;background:rgba(16,185,129,.07) !important;}

/* Image upload */
.img-zone{border:2px dashed var(--border);border-radius:0;padding:22px;text-align:center;cursor:pointer;transition:.2s;position:relative;}
.img-zone:hover,.img-zone.drag{border-color:var(--accent);background:var(--entry-accent-bg);}
.img-zone input[type=file]{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%;}
.img-thumb-row{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px;}
.img-thumb{position:relative;width:100px;height:78px;border-radius:0;overflow:hidden;border:1.5px solid var(--border);}
.img-thumb img{width:100%;height:100%;object-fit:cover;}
.img-thumb-del{position:absolute;top:3px;right:3px;background:rgba(0,0,0,.7);border:none;color:#fff;border-radius:0;width:18px;height:18px;font-size:10px;display:flex;align-items:center;justify-content:center;cursor:pointer;}
.img-dl-btn{display:block;margin-top:4px;background:var(--card2);border:1px solid var(--border);color:var(--text);border-radius:0;padding:4px 8px;font-size:11px;width:100px;text-align:center;cursor:pointer;transition:.15s;font-family:'Poppins',sans-serif;}
.img-dl-btn:hover{border-color:var(--accent);color:var(--accent);}

/* Modals */
.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.75);display:flex;align-items:center;justify-content:center;z-index:999;backdrop-filter:blur(8px);animation:fadeIn .15s ease;}
.modal{background:var(--card);border:1px solid var(--border);border-radius:0;padding:32px;max-width:390px;width:90%;text-align:center;box-shadow:var(--shadow);animation:popIn .2s ease;}
@keyframes popIn{from{transform:scale(.92);opacity:0}to{transform:scale(1);opacity:1}}
.modal h3{font-size:20px;margin-bottom:8px;}
.modal p{color:var(--muted);font-size:13px;margin-bottom:24px;line-height:1.65;font-family:'Poppins',sans-serif;}
.modal-btns{display:flex;gap:10px;justify-content:center;}
.edit-modal{background:var(--card);border:1px solid var(--border);border-radius:0;padding:28px;max-width:500px;width:90%;max-height:85vh;overflow-y:auto;box-shadow:var(--shadow);animation:popIn .2s ease;}

/* Toast */
.toast{position:fixed;bottom:26px;right:26px;color:#fff;padding:12px 20px;border-radius:0;font-size:13px;font-weight:600;z-index:1000;animation:slideUp .3s ease;box-shadow:var(--shadow);font-family:'Poppins',sans-serif;}
.toast.success{background:linear-gradient(135deg,var(--green),#059669);}
.toast.error{background:linear-gradient(135deg,var(--red),#be123c);}
.toast.info{background:linear-gradient(135deg,var(--accent),var(--accent2));}
@keyframes slideUp{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}

/* Saved/Draft rows */
.saved-row{background:var(--card);border:1.5px solid var(--border);border-radius:0;padding:14px 16px;margin-bottom:10px;display:flex;align-items:center;gap:12px;transition:.2s;box-shadow:var(--shadow-sm);}
.saved-row:hover{border-color:var(--green);transform:translateX(3px);}
.saved-dot{width:10px;height:10px;border-radius:50%;background:linear-gradient(135deg,var(--green),#059669);flex-shrink:0;box-shadow:0 0 0 3px rgba(16,185,129,.15);}
.saved-info{flex:1;min-width:0;}
.saved-case{font-weight:700;font-size:13px;font-family:'Poppins',sans-serif;}
.saved-meta{color:var(--muted);font-size:11px;margin-top:3px;font-family:'Poppins',sans-serif;}
.saved-type{font-size:11px;font-weight:700;padding:4px 11px;border-radius:0;background:var(--h-badge-site-bg);color:var(--accent);white-space:nowrap;border:1px solid rgba(91,156,246,.25);}
.draft-row{background:var(--card);border:1.5px solid rgba(245,158,11,.4);border-radius:0;padding:14px 16px;margin-bottom:10px;display:flex;align-items:center;gap:12px;transition:.2s;}
.draft-row:hover{transform:translateX(3px);}
.draft-dot{width:10px;height:10px;border-radius:50%;background:linear-gradient(135deg,var(--amber),#d97706);flex-shrink:0;animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
.draft-badge{font-size:11px;font-weight:700;padding:4px 11px;border-radius:0;background:var(--btn-draft-bg);color:var(--btn-draft-text);white-space:nowrap;border:1px solid rgba(245,158,11,.35);}
.draft-resume{font-size:12px;font-weight:700;padding:8px 16px;border-radius:0;background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;border:none;cursor:pointer;transition:.18s;white-space:nowrap;box-shadow:0 2px 10px rgba(245,158,11,.4);font-family:'Poppins',sans-serif;}
.draft-resume:hover{filter:brightness(1.1);}

/* Case History */
.case-card{background:var(--card);border:1.5px solid var(--border);border-radius:0;margin-bottom:12px;overflow:hidden;transition:.25s;box-shadow:var(--shadow-sm);}
.case-card:hover{border-color:rgba(113,163,193,.35);}
.case-card.expanded{border-color:rgba(113,163,193,.5);box-shadow:var(--glow);}
.case-card-header{display:flex;align-items:center;gap:14px;padding:18px 20px;cursor:pointer;user-select:none;transition:.15s;}
.case-card-header:hover{background:var(--card2);}
.case-num-badge{font-size:16px;font-weight:800;color:var(--accent);background:var(--entry-accent-bg);border:1.5px solid rgba(91,156,246,.25);border-radius:0;padding:5px 14px;white-space:nowrap;}
.case-meta-main{font-size:13px;font-weight:600;margin-bottom:3px;font-family:'Poppins',sans-serif;}
.case-meta-sub{font-size:11px;color:var(--muted);font-family:'Poppins',sans-serif;}
.case-expand-btn{background:var(--btn-ghost-bg);border:1.5px solid var(--btn-ghost-border);color:var(--btn-ghost-text);border-radius:0;padding:6px 12px;font-size:12px;font-weight:600;display:flex;align-items:center;gap:5px;transition:.2s;white-space:nowrap;flex-shrink:0;font-family:'Poppins',sans-serif;}
.case-card:hover .case-expand-btn{border-color:var(--accent);color:var(--accent);}
.case-expand-icon{transition:.25s;display:inline-block;}
.case-card.expanded .case-expand-icon{transform:rotate(180deg);}
.case-body{border-top:1px solid var(--border);}
.case-body-inner{padding:20px;}
.case-section{background:var(--entry-bg);border:1px solid var(--border);border-radius:0;padding:16px;margin-bottom:12px;}
.case-section-title{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;display:flex;align-items:center;gap:6px;font-family:'Poppins',sans-serif;}
.case-field-row{display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border);}
.case-field-row:last-child{border-bottom:none;padding-bottom:0;}
.case-field-label{font-size:11px;color:var(--muted);width:120px;flex-shrink:0;font-weight:500;font-family:'Poppins',sans-serif;}
.case-field-val{font-size:13px;font-weight:600;flex:1;word-break:break-word;color:var(--text);font-family:'Poppins',sans-serif;}
.case-field-edit{background:var(--btn-ghost-bg);border:1.5px solid var(--btn-ghost-border);color:var(--btn-ghost-text);border-radius:0;padding:4px 10px;font-size:11px;font-weight:600;cursor:pointer;transition:.15s;flex-shrink:0;font-family:'Poppins',sans-serif;}
.case-field-edit:hover{border-color:var(--accent);color:var(--accent);background:var(--entry-accent-bg);}
.case-entry-card{background:var(--card);border:1.5px solid var(--border);border-radius:0;padding:12px 14px;margin-bottom:8px;}
.case-entry-card:last-child{margin-bottom:0;}
.case-entry-num{font-size:12px;font-weight:700;color:var(--accent);margin-bottom:6px;font-family:'Plus Jakarta Sans',sans-serif;}
.case-entry-field{font-size:13px;margin-bottom:4px;line-height:1.6;font-family:'Poppins',sans-serif;}
.case-entry-key{color:var(--muted);font-size:11px;font-weight:600;}
.case-device-chips{display:flex;flex-wrap:wrap;gap:7px;margin-top:4px;}
.case-device-chip{display:flex;align-items:center;gap:5px;padding:5px 12px;border-radius:0;font-size:12px;font-weight:600;border:1.5px solid;font-family:'Poppins',sans-serif;}
.case-device-chip.active{background:rgba(16,185,129,.1);border-color:rgba(16,185,129,.4);color:var(--green);}
.case-device-chip.inactive{background:var(--entry-bg);border-color:var(--border);color:var(--muted);opacity:.6;}
.case-checklist-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:6px;}
.case-check-item{display:flex;align-items:center;gap:7px;font-size:12px;padding:6px 10px;border-radius:0;background:var(--card);border:1px solid var(--border);font-family:'Poppins',sans-serif;}
.case-check-item.done{color:var(--green);border-color:rgba(16,185,129,.25);background:rgba(16,185,129,.06);}
.case-check-item.undone{color:var(--muted);}
.case-imgs{display:flex;flex-wrap:wrap;gap:10px;margin-top:8px;}
.case-img-thumb{width:88px;height:68px;border-radius:0;overflow:hidden;border:1.5px solid var(--border);cursor:pointer;transition:.2s;}
.case-img-thumb:hover{transform:scale(1.06);border-color:var(--accent);}
.case-img-thumb img{width:100%;height:100%;object-fit:cover;}
.case-actions{display:flex;gap:8px;margin-top:16px;padding-top:16px;border-top:1px solid var(--border);}
.h-btn{background:var(--btn-ghost-bg);border:1.5px solid var(--btn-ghost-border);color:var(--btn-ghost-text);border-radius:0;padding:8px 14px;font-size:12px;font-weight:700;transition:.18s;display:inline-flex;align-items:center;gap:6px;font-family:'Poppins',sans-serif;}
.h-btn:hover{border-color:var(--text);color:var(--text);}
.h-btn.danger:hover{border-color:var(--btn-cancel-border);color:var(--btn-cancel-text);background:var(--btn-cancel-bg);}
.h-btn.dl:hover{border-color:var(--green);color:var(--green);background:rgba(16,185,129,.08);}
.empty-history{text-align:center;padding:80px 0;color:var(--muted);font-size:14px;font-family:'Poppins',sans-serif;}
.lightbox-bg{position:fixed;inset:0;background:rgba(0,0,0,.92);display:flex;align-items:center;justify-content:center;z-index:1001;cursor:pointer;backdrop-filter:blur(8px);}
.lightbox-img{max-width:90vw;max-height:88vh;border-radius:0;box-shadow:var(--shadow);}

/* Inline edit */
.inline-edit-inp{background:var(--inp-bg);border:1.5px solid var(--accent);border-radius:0;color:var(--text);padding:6px 11px;font-size:13px;outline:none;flex:1;box-shadow:0 0 0 3px rgba(113,163,193,.12);font-family:'Poppins',sans-serif;}
.inline-save-btn{background:linear-gradient(135deg,var(--green),#059669);color:#fff;border:none;border-radius:0;padding:6px 12px;font-size:12px;font-weight:700;cursor:pointer;transition:.15s;font-family:'Poppins',sans-serif;}
.inline-cancel-btn{background:var(--btn-ghost-bg);border:1.5px solid var(--btn-ghost-border);color:var(--btn-ghost-text);border-radius:0;padding:6px 10px;font-size:12px;font-weight:600;cursor:pointer;transition:.15s;font-family:'Poppins',sans-serif;}

/* Soon */
.soon-wrap{display:flex;align-items:center;justify-content:center;min-height:60vh;flex-direction:column;gap:16px;}
.soon-badge{font-size:80px;animation:float 3s ease-in-out infinite;}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.soon-title{font-size:32px;font-weight:800;}
.soon-sub{color:var(--muted);font-size:15px;font-family:'Poppins',sans-serif;}

/* Search */
.search-wrap{position:relative;margin-bottom:20px;}
.search-inp{width:100%;background:var(--card);border:1.5px solid var(--border);border-radius:0;color:var(--text);padding:10px 14px 10px 40px;font-size:13px;outline:none;transition:.15s;font-family:'Poppins',sans-serif;}
.search-inp:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(113,163,193,.1);}
.search-icon{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:var(--muted);font-size:15px;}
.filter-row{display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap;}
.filter-btn{background:var(--card);border:1.5px solid var(--border);color:var(--muted);border-radius:0;padding:7px 14px;font-size:12px;font-weight:600;cursor:pointer;transition:.15s;font-family:'Poppins',sans-serif;}
.filter-btn:hover,.filter-btn.active{border-color:var(--accent);color:var(--accent);background:var(--entry-accent-bg);}

/* Auth pages */
.auth-page{min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg);position:relative;overflow:hidden;}
.auth-page::before{content:'';position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(113,163,193,.08),transparent 70%);top:-100px;right:-100px;pointer-events:none;}
.auth-page::after{content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(139,92,246,.06),transparent 70%);bottom:-50px;left:-50px;pointer-events:none;}
.auth-card{background:var(--card);border:1px solid var(--border);border-radius:0;padding:40px;width:100%;max-width:420px;box-shadow:var(--shadow);position:relative;z-index:1;}
.auth-logo{display:flex;align-items:center;gap:12px;margin-bottom:32px;justify-content:center;}
.auth-logo-icon{width:44px;height:44px;border-radius:0;background:var(--btn-save-bg);display:flex;align-items:center;justify-content:center;font-size:22px;box-shadow:var(--glow);}
.auth-logo-text{font-size:24px;font-weight:800;letter-spacing:-.5px;}
.auth-logo-text span{color:var(--accent);}
.auth-title{font-size:22px;font-weight:800;text-align:center;margin-bottom:6px;}
.auth-sub{font-size:13px;color:var(--muted);text-align:center;margin-bottom:28px;font-family:'Poppins',sans-serif;line-height:1.5;}
.auth-link{color:var(--accent);cursor:pointer;font-weight:600;background:none;border:none;font-size:13px;font-family:'Poppins',sans-serif;}
.auth-link:hover{text-decoration:underline;}
.auth-divider{text-align:center;color:var(--muted);font-size:12px;margin:20px 0;position:relative;font-family:'Poppins',sans-serif;}
.auth-divider::before,.auth-divider::after{content:'';position:absolute;top:50%;width:40%;height:1px;background:var(--border);}
.auth-divider::before{left:0;}.auth-divider::after{right:0;}

/* Profile */
.profile-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:28px;margin-bottom:20px;}
.profile-avatar-large{width:80px;height:80px;border-radius:50%;background:var(--btn-save-bg);display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:800;color:#fff;margin-bottom:0;box-shadow:var(--glow);flex-shrink:0;overflow:hidden;position:relative;cursor:pointer;}
.profile-avatar-large img{width:100%;height:100%;object-fit:cover;border-radius:50%;}
.profile-avatar-overlay{position:absolute;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;opacity:0;transition:.2s;border-radius:50%;font-size:18px;}
.profile-avatar-large:hover .profile-avatar-overlay{opacity:1;}
.profile-avatar-large input[type=file]{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%;}

/* Announcements */
.announcement-card{background:var(--card);border:1px solid var(--border);border-radius:0;padding:20px;margin-bottom:12px;transition:.2s;}
.announcement-card:hover{border-color:rgba(113,163,193,.3);}
.ann-header{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:10px;}
.ann-title{font-size:15px;font-weight:700;font-family:'Plus Jakarta Sans',sans-serif;}
.ann-meta{font-size:11px;color:var(--muted);margin-top:3px;font-family:'Poppins',sans-serif;}
.ann-body{font-size:13px;color:var(--muted);line-height:1.7;font-family:'Poppins',sans-serif;}
.ann-badge{font-size:11px;font-weight:700;padding:3px 10px;border-radius:0;white-space:nowrap;}
.ann-badge.info{background:var(--h-badge-site-bg);color:var(--accent);}
.ann-badge.urgent{background:rgba(244,63,94,.15);color:var(--red);}
.ann-badge.update{background:rgba(16,185,129,.12);color:var(--green);}

/* Links page */
.link-card{background:var(--card);border:1px solid var(--border);border-radius:0;padding:16px;margin-bottom:10px;display:flex;align-items:center;gap:14px;transition:.2s;}
.link-card:hover{border-color:rgba(113,163,193,.3);}
.link-icon{width:40px;height:40px;border-radius:0;background:var(--entry-accent-bg);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}
.link-info{flex:1;min-width:0;}
.link-title{font-size:13px;font-weight:600;font-family:'Poppins',sans-serif;}
.link-url{font-size:11px;color:var(--muted);margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:'Poppins',sans-serif;}
.link-actions{display:flex;gap:6px;flex-shrink:0;}

/* Special requestors */
.requestor-grid{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:20px;}
.requestor-chip{
  display:flex;align-items:center;gap:8px;padding:10px 16px;
  border-radius:0;background:var(--card);border:1.5px solid var(--border);
  font-size:13px;font-weight:600;font-family:'Poppins',sans-serif;
  transition:.2s;cursor:default;
}
.requestor-chip:hover{border-color:rgba(113,163,193,.4);}
.requestor-avatar{width:28px;height:28px;border-radius:50%;background:var(--btn-save-bg);display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:700;flex-shrink:0;}
.requestor-del{background:none;border:none;color:var(--muted);font-size:14px;padding:2px 4px;border-radius:0;transition:.15s;cursor:pointer;}
.requestor-del:hover{color:var(--red);}

/* ── Case History Edit Styles ── */
.edit-entry-card{background:var(--card);border:2px solid var(--accent);border-radius:0;padding:16px;margin-bottom:10px;position:relative;}
.edit-entry-card .entry-del{position:absolute;top:12px;right:12px;}
.edit-section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
.add-entry-btn-sm{background:none;border:2px dashed var(--border);border-radius:0;color:var(--muted);padding:8px 14px;font-size:12px;font-weight:600;transition:.18s;font-family:'Poppins',sans-serif;cursor:pointer;}
.add-entry-btn-sm:hover{border-color:var(--accent);color:var(--accent);background:var(--entry-accent-bg);}
.img-edit-grid{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px;}
.img-edit-item{position:relative;width:100px;height:78px;border-radius:0;overflow:hidden;border:2px solid var(--border);transition:.2s;}
.img-edit-item:hover{border-color:var(--accent);}
.img-edit-item img{width:100%;height:100%;object-fit:cover;}
.img-edit-del{position:absolute;top:4px;right:4px;background:rgba(244,63,94,.9);border:none;color:#fff;border-radius:0;width:20px;height:20px;font-size:11px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-weight:700;}
.img-edit-replace{position:absolute;bottom:4px;left:4px;right:4px;background:rgba(0,0,0,.75);border:none;color:#fff;border-radius:0;padding:2px 0;font-size:9px;font-weight:700;cursor:pointer;text-align:center;transition:.15s;font-family:'Poppins',sans-serif;}
.img-edit-replace:hover{background:rgba(91,156,246,.9);}
.img-add-zone{width:100px;height:78px;border-radius:0;border:2px dashed var(--border);display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:.2s;position:relative;color:var(--muted);font-size:11px;gap:4px;font-family:'Poppins',sans-serif;}
.img-add-zone:hover{border-color:var(--accent);color:var(--accent);background:var(--entry-accent-bg);}
.img-add-zone input{position:absolute;inset:0;opacity:0;cursor:pointer;}
.edit-mode-banner{background:linear-gradient(135deg,rgba(113,163,193,.12),rgba(78,127,160,.12));border:1.5px solid rgba(113,163,193,.3);border-radius:0;padding:10px 16px;margin-bottom:16px;display:flex;align-items:center;gap:10px;font-size:12px;font-weight:600;color:var(--accent);}
.field-row-edit{margin-bottom:12px;}
.field-row-edit label{display:block;font-size:10px;font-weight:700;color:var(--muted);margin-bottom:4px;text-transform:uppercase;letter-spacing:.8px;font-family:'Poppins',sans-serif;}
.device-edit-group{display:flex;gap:8px;flex-wrap:wrap;}
.checklist-edit-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;}
.checklist-edit-item{display:flex;align-items:center;gap:8px;background:var(--inp-bg);border:1.5px solid var(--border);padding:8px 12px;border-radius:0;cursor:pointer;transition:.15s;font-size:12px;font-family:'Poppins',sans-serif;}
.checklist-edit-item.checked{border-color:var(--green);background:rgba(16,185,129,.07);color:var(--green);}
.checklist-edit-item input{accent-color:var(--green);}

/* Donut chart */
.donut-wrap{display:flex;align-items:center;gap:20px;}
.donut-svg{flex-shrink:0;}
.donut-legend{display:flex;flex-direction:column;gap:8px;}
.donut-legend-item{display:flex;align-items:center;gap:8px;font-size:12px;font-family:'Poppins',sans-serif;}
.donut-legend-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;}

/* Sparkline */
.sparkline-wrap{position:relative;}

/* Login page specific */
.login-page{min-height:100vh;}

/* No border for active nav custom link */
.nav-custom-active{color:var(--accent) !important;background:var(--nav-active-bg) !important;border:1px solid var(--nav-active-border) !important;}

/* Break timer */
.break-bar{
  position:fixed;bottom:0;left:0;right:0;z-index:900;
  display:flex;align-items:center;gap:14px;
  padding:10px 20px;
  background:var(--surface);border-top:2px solid var(--accent);
  box-shadow:0 -4px 24px rgba(0,0,0,.4);
  font-family:'Poppins',sans-serif;font-size:13px;
  animation:slideUp .3s ease;
}
@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
.break-bar.warn{border-top-color:var(--amber);}
.break-bar.ended{border-top-color:var(--green);}
.break-label{font-weight:700;color:var(--text);}
.break-time{font-size:20px;font-weight:800;font-variant-numeric:tabular-nums;color:var(--accent);min-width:60px;}
.break-bar.warn .break-time{color:var(--amber);}
.break-bar.ended .break-time{color:var(--green);}
.break-progress{flex:1;height:6px;background:var(--border);}
.break-progress-fill{height:100%;background:var(--btn-save-bg);transition:width .5s linear;}
.break-bar.warn .break-progress-fill{background:linear-gradient(90deg,var(--amber),#d97706);}
.break-bar.ended .break-progress-fill{background:linear-gradient(90deg,var(--green),#059669);}
.break-stop{background:none;border:1.5px solid var(--border);color:var(--muted);padding:5px 12px;font-size:11px;font-weight:700;cursor:pointer;transition:.15s;font-family:'Poppins',sans-serif;}
.break-stop:hover{border-color:var(--red);color:var(--red);}
/* Break buttons in sidebar */
.break-btns{display:flex;flex-direction:column;gap:4px;padding:8px 0 4px;}
.break-btn{display:flex;align-items:center;gap:8px;padding:8px 12px;font-size:12px;font-weight:600;color:var(--muted);background:none;border:1px solid var(--border);cursor:pointer;transition:.18s;width:100%;text-align:left;font-family:'Poppins',sans-serif;}
.break-btn:hover{background:var(--card2);color:var(--text);border-color:var(--accent);}
.break-btn.active{background:var(--entry-accent-bg);color:var(--accent);border-color:var(--accent);}

/* DB status bar */
.db-status{
  display:flex;align-items:center;gap:8px;padding:8px 12px;
  font-size:11px;font-weight:600;font-family:'Poppins',sans-serif;
  border-top:1px solid var(--border);margin-top:4px;
  color:var(--muted);transition:.3s;
}
.db-dot{
  width:8px;height:8px;border-radius:50%;flex-shrink:0;transition:.3s;
}
.db-dot.connected{background:#10b981;box-shadow:0 0 6px rgba(16,185,129,.6);}
.db-dot.connecting{background:#f59e0b;animation:pulse-dot 1s ease-in-out infinite;}
.db-dot.error{background:#f43f5e;box-shadow:0 0 6px rgba(244,63,94,.5);}
@keyframes pulse-dot{0%,100%{opacity:1;}50%{opacity:.3;}}
.db-status.connected{color:var(--green);}
.db-status.error{color:var(--red);}
`;

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const cls = (...a) => a.filter(Boolean).join(" ");

// ── DB Connection Status Hook ──
function useDbStatus() {
  const [status, setStatus] = useState("connecting"); // connecting | connected | error
  const [lastSaved, setLastSaved] = useState(null);
  const [latency, setLatency] = useState(null);

  const check = useCallback(async () => {
    const t0 = Date.now();
    try {
      const res = await fetch("/api/db-status", { method:"GET", signal: AbortSignal.timeout(5000) });
      const ms = Date.now() - t0;
      if (res.ok) {
        setStatus("connected");
        setLatency(ms);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
      setLatency(null);
    }
  }, []);

  useEffect(() => {
    check();
    const interval = setInterval(check, 15000); // re-check every 15s
    return () => clearInterval(interval);
  }, [check]);

  // expose a "markSaved" so operations can update lastSaved time
  const markSaved = useCallback(() => setLastSaved(new Date()), []);

  return { status, latency, lastSaved, markSaved, recheck: check };
}

function copyToClipboard(text) {
  if (navigator.clipboard?.writeText)
    return navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  fallbackCopy(text); return Promise.resolve();
}
function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text; ta.style.cssText = "position:fixed;top:-9999px;opacity:0;";
  document.body.appendChild(ta); ta.focus(); ta.select();
  try { document.execCommand("copy"); } catch(e) {}
  document.body.removeChild(ta);
}
function fmtDT(d) {
  return d.toLocaleString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"});
}
function fmtElapsed(s) {
  const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=s%60;
  return h>0?`${h}:${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`:`${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
}
async function checkGrammar(text) {
  if (!text.trim()) return text;
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages",{
      method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,
        messages:[{role:"user",content:`Fix grammar, spelling and clarity. Return ONLY the corrected text:\n\n${text}`}]})
    });
    const d = await r.json();
    return d.content?.map(b=>b.text||"").join("")||text;
  } catch { return text; }
}

// ─────────────────────────────────────────────────────────────────────────────
// SMALL COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
function Toast({ msg, type }) {
  if(!msg) return null;
  return <div className={cls("toast", type||"success")}>{msg}</div>;
}

function useToast() {
  const [toast,setToast] = useState({});
  const show = (msg, type="success") => { setToast({msg,type}); setTimeout(()=>setToast({}),2800); };
  return [toast, show];
}

function CopyName({ name }) {
  const [c,setC] = useState(false);
  return (
    <div className="copy-name">
      <span className="copy-name-text">{name}</span>
      <button className={cls("copy-btn",c&&"green")}
        onClick={()=>copyToClipboard(name).then(()=>{setC(true);setTimeout(()=>setC(false),1800);})}>
        {c?"✓ Copied!":"Copy"}
      </button>
    </div>
  );
}

// Step card — single-open: receives openStep/setOpenStep from parent
function StepCard({ num, title, children, done, locked, openStep, setOpenStep }) {
  const isOpen = openStep === num;
  return (
    <div className={cls("step-card", locked?"locked":"unlocked", done&&"done", isOpen&&!locked&&"open")}>
      <div className="step-header" onClick={()=>{ if(!locked) setOpenStep(isOpen ? null : num); }}>
        <div className="step-num">{done?"✓":num}</div>
        <div className="step-title">{title}</div>
        {locked ? <span className="step-lock-icon">🔒</span> : <span className="step-chevron">▼</span>}
      </div>
      {isOpen&&!locked&&<div className="step-body" onClick={e=>e.stopPropagation()}>{children}</div>}
    </div>
  );
}

// Upload a single file to Supabase Storage — returns persistent URL
async function uploadImageToStorage(file, name) {
  const ext = file.name?.split(".").pop() || "png";
  const fileName = `${name}.${ext}`;
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async(e) => {
      try {
        const res = await fetch("/api/images/upload", {
          method:"POST", headers:{"Content-Type":"application/json"},
          body: JSON.stringify({ fileBase64: e.target.result, fileName, mimeType: file.type || "image/png" }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        resolve({ url: data.url, path: data.path, name, id: data.path, _inDB: true });
      } catch(err) {
        console.warn("Storage upload failed:", err.message);
        resolve(null); // caller handles failure
      }
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}

// Upload an array of RAM images (blob URLs with .file attached) to Storage
// Used when a new case is finally saved
async function uploadPendingImages(images) {
  return Promise.all((images || []).map(async(img) => {
    if (img._inDB || !img._file) return img; // already in DB or no file to upload
    const uploaded = await uploadImageToStorage(img._file, img.name);
    return uploaded || img; // fallback to original if upload fails
  }));
}

// immediateUpload=true  → upload to Storage right away (editing an already-saved case)
// immediateUpload=false → keep in RAM as blob (new unsaved form — upload on case save)
function ImageUpload({ baseName, multiple, onImages, immediateUpload=false, initialImages=[] }) {
  const [images,setImages] = useState(()=>initialImages||[]);
  const [drag,setDrag] = useState(false);
  const [uploading,setUploading] = useState(false);
  const ref = useRef(); const imgRef = useRef(images);
  useEffect(()=>{imgRef.current=images;},[images]);
  // Sync if parent passes new initialImages (e.g. draft restore)
  const prevInit = useRef(initialImages);
  useEffect(()=>{
    if(initialImages.length>0 && prevInit.current !== initialImages && images.length===0){
      setImages(initialImages); imgRef.current=initialImages; prevInit.current=initialImages;
    }
  },[initialImages]);

  const addFiles = useCallback(async(files) => {
    const cur = imgRef.current;
    setUploading(true);
    try {
      let next;
      if (immediateUpload) {
        // Edit mode on saved case: upload straight to Storage
        const uploaded = await Promise.all(
          Array.from(files).map((f, i) => {
            const name = multiple ? `backup-screenshot-${cur.length + i + 1}` : baseName;
            return uploadImageToStorage(f, name);
          })
        );
        const valid = uploaded.filter(Boolean);
        next = multiple ? [...cur, ...valid] : valid.slice(0, 1);
      } else {
        // New unsaved form: keep as RAM blob, attach _file for later upload
        const arr = Array.from(files).map((f, i) => ({
          _file: f,
          url: URL.createObjectURL(f),
          name: multiple ? `backup-screenshot-${cur.length + i + 1}` : baseName,
          id: `ram-${Date.now()}-${i}`,
          _inDB: false,
        }));
        next = multiple ? [...cur, ...arr] : arr.slice(0, 1);
      }
      setImages(next); onImages && onImages(next);
    } finally { setUploading(false); }
  }, [baseName, multiple, onImages, immediateUpload]);

  const remove = (id) => { const n = imgRef.current.filter(i => i.id !== id); setImages(n); onImages && onImages(n); };

  const dl = async(img) => {
    // Determine safe extension from URL or default to png
    const urlExt = (img.url||"").split("?")[0].split(".").pop().toLowerCase();
    const safeExt = ["jpg","jpeg","png","gif","webp"].includes(urlExt) ? urlExt : "png";
    const baseName = (img.name||"screenshot").replace(/\.[^/.]+$/,""); // strip any existing ext
    const fileName = `${baseName}.${safeExt}`;
    if (window.showDirectoryPicker) {
      try {
        const dir = await window.showDirectoryPicker({ mode:"readwrite", startIn:"downloads" });
        const fh = await dir.getFileHandle(fileName, { create:true });
        const wr = await fh.createWritable();
        const r = await fetch(img.url); const blob = await r.blob();
        await wr.write(blob); await wr.close(); return;
      } catch(e) { if (e.name === "AbortError") return; }
    }
    const a = document.createElement("a"); a.href = img.url; a.download = fileName; a.click();
  };

  useEffect(() => {
    const h = (e) => { const items = Array.from(e.clipboardData?.items||[]).filter(i=>i.kind==="file"); if(items.length) addFiles(items.map(i=>i.getAsFile())); };
    window.addEventListener("paste", h); return () => window.removeEventListener("paste", h);
  }, [addFiles]);

  return (
    <div>
      <div className={cls("img-zone", drag&&"drag")} onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);addFiles(e.dataTransfer.files);}} onClick={()=>!uploading&&ref.current?.click()}>
        <input ref={ref} type="file" accept="image/*" multiple={multiple} onChange={e=>addFiles(e.target.files)} style={{pointerEvents:"none"}}/>
        <div style={{fontSize:28,marginBottom:8}}>{uploading ? "⏳" : "🖼️"}</div>
        <div style={{fontSize:13,color:"var(--muted)"}}>
          {uploading
            ? (immediateUpload ? "Uploading to database…" : "Preparing image…")
            : <span>Click, drag-drop, or <kbd style={{background:"var(--border)",padding:"1px 6px",borderRadius:0,fontSize:10}}>Ctrl+V</kbd> to paste</span>
          }
        </div>
        <div style={{fontSize:11,color:"var(--muted)",marginTop:4}}>
          {immediateUpload
            ? <>Saved as: <span style={{color:"var(--accent)",fontWeight:600}}>{baseName}</span></>
            : <>Name on save: <span style={{color:"var(--accent)",fontWeight:600}}>{baseName}</span> · <span style={{color:"var(--amber)"}}>⏳ uploads when case is saved</span></>
          }
        </div>
      </div>
      {images.length > 0 && (
        <div className="img-thumb-row">
          {images.map(img => (
            <div key={img.id} style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
              <div className="img-thumb" style={{position:"relative"}}>
                <img src={img.url} alt=""/>
                <button className="img-thumb-del" onClick={()=>remove(img.id)}>✕</button>
                {img._inDB && <div style={{position:"absolute",bottom:0,left:0,right:0,background:"rgba(16,185,129,.85)",color:"#fff",fontSize:9,textAlign:"center",padding:"1px 0"}}>✓ in DB</div>}
                {!img._inDB && !immediateUpload && <div style={{position:"absolute",bottom:0,left:0,right:0,background:"rgba(245,158,11,.85)",color:"#fff",fontSize:9,textAlign:"center",padding:"1px 0"}}>⏳ on save</div>}
              </div>
              <button className="img-dl-btn" onClick={()=>dl(img)}>⬇ Save</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EntryCard({ entry, label, index, onChange, onDelete, showNumber }) {
  const [checking,setChecking]=useState(null);
  const ai=async(field)=>{ if(!entry[field]?.trim())return; setChecking(field); const c=await checkGrammar(entry[field]); onChange({...entry,[field]:c}); setChecking(null); };
  return (
    <div className="entry-card">
      <div className="entry-header">
        <span className="entry-label">{showNumber?`${label} #${entry.number||(index+1)}`:label}</span>
        {(showNumber||(index>0))&&<button className="entry-del" onClick={onDelete}>🗑</button>}
      </div>
      {showNumber&&(<div className="field"><label>Number <span className="req">*</span></label><input className="inp" placeholder="e.g. 25" value={entry.number} onChange={e=>onChange({...entry,number:e.target.value})}/></div>)}
      <div className="field"><label>Note (optional)</label><textarea className="inp" rows={3} value={entry.note} onChange={e=>onChange({...entry,note:e.target.value})} placeholder="Describe what was done or assumed..."/><div className="ai-row"><button className="ai-btn" disabled={!entry.note?.trim()||checking==="note"} onClick={()=>ai("note")}>{checking==="note"?"⏳ Checking...":"✨ AI Grammar Check"}</button></div></div>
      <div className="field"><label>Clarification (optional)</label><textarea className="inp" rows={3} value={entry.clarification} onChange={e=>onChange({...entry,clarification:e.target.value})} placeholder="Confirmation or extra details..."/><div className="ai-row"><button className="ai-btn" disabled={!entry.clarification?.trim()||checking==="clarification"} onClick={()=>ai("clarification")}>{checking==="clarification"?"⏳ Checking...":"✨ AI Grammar Check"}</button></div></div>
    </div>
  );
}

function CopyRow({ label, value }) {
  const [c,setC]=useState(false);
  if(!value) return null;
  return (
    <div className="copy-row-wrap">
      <div className="copy-row-label">{label}</div>
      <div className="copy-row-inner">
        <div className="copy-row-val">{value}</div>
        <button className={cls("copy-row-btn",c&&"done")} onClick={()=>copyToClipboard(value).then(()=>{setC(true);setTimeout(()=>setC(false),1800);})}>{c?"✓":"📋"}</button>
      </div>
    </div>
  );
}

function StickyPanel({ startTimeRef, formRef, isSC, step4Done, buildEntriesText, buildEmailText, onTimerEnd }) {
  const [elapsed,setElapsed]=useState(0);
  const [now,setNow]=useState(new Date());
  const firedRef=useRef(false);
  useEffect(()=>{
    const t=setInterval(()=>{
      const secs=Math.floor((Date.now()-startTimeRef.current)/1000);
      setElapsed(secs); setNow(new Date());
      // Ring at 30 minutes milestone once
      if(!firedRef.current && secs>=1800){ firedRef.current=true; onTimerEnd&&onTimerEnd(); }
    },1000);
    return()=>clearInterval(t);
  },[startTimeRef,onTimerEnd]);
  const f=formRef.current;
  const emailTypeLabel=f.emailType==="clarification"?"Clarification":"Completed";
  const allImages=[...(f.images||[]),...(f.backupImages||[])];
  return (
    <div className="right-panel">
      <div className="right-panel-header">📋 Live Summary</div>
      <div className="meta-stack">
        <div className="meta-row">📅 <span>Started:</span> <span className="meta-val">{fmtDT(new Date(startTimeRef.current))}</span></div>
        <div className="meta-row">⏱ <span>Elapsed:</span> <span className="timer-val">{fmtElapsed(elapsed)}</span></div>
        <div className="meta-row">🕐 <span>Now:</span> <span className="meta-val">{fmtDT(now)}</span></div>
      </div>
      <div className="summary-panel">
        {!step4Done?(<div className="summary-locked"><div className="summary-locked-icon">🔒</div><div style={{fontSize:12,color:"var(--muted)",marginTop:4}}>Unlocks after Device Check</div></div>):(
          <>
            <CopyRow label="Case #" value={f.caseNum}/>
            <CopyRow label="Account #" value={f.accountNum}/>
            {!isSC&&<CopyRow label="Inbound #" value={f.inboundNum}/>}
            <CopyRow label="Amend Type" value={f.amendType}/>
            <CopyRow label={isSC?"Site Comments":"Assumptions"} value={isSC?buildEntriesText():buildEmailText()}/>
            {!isSC&&<CopyRow label="Email Type" value={emailTypeLabel}/>}
            {!isSC&&<CopyRow label="Email Address" value={f.emailAddress}/>}
            {allImages.length>0&&(<div className="copy-row-wrap"><div className="copy-row-label">Screenshots ({allImages.length})</div><div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:4}}>{allImages.map(img=>(<div key={img.id} style={{width:68,height:52,borderRadius:0,overflow:"hidden",border:"1.5px solid var(--border)"}}><img src={img.url} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>))}</div></div>)}
          </>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FORM DATA
// ─────────────────────────────────────────────────────────────────────────────
const emptyEntry = ()=>({id:Date.now()+Math.random(),number:"",note:"",clarification:""});
const emptyBase  = ()=>({
  caseNum:"",accountNum:"",amendType:"",inProgress:false,inboundNum:"",
  entries:[emptyEntry()],
  devices:{mobile:false,tablet:false,desktop:false},
  checklist:{backup:false,caseComment:false,combinedTracker:false,qaChecklist:false,completeJob:false,emailSales:false,trackerChecklist:false,completeStatus:false},
  images:[],backupImages:[],emailAddress:"",emailType:"clarification",
  _startTime: Date.now(), _elapsedAtSave: 0
});

function PostLiveForm({ mode, onSave, onBack, onDraft, draftData, user, onTimerEnd }) {
  const isSC = mode==="siteComment";
  const entryLabel = isSC?"Site Comment":"Assumption";
  const rawName = user?.name || "User";
  const userName = rawName.trim().replace(/\s+/g,"_");
  // Use custom filenames from profile if set
  const beforeName    = user?.beforeName  || `Post_Live_Amend_Before_${userName}_Amends`;
  const afterName     = user?.afterName   || `Post_Live_Amend_After_${userName}_Amends`;
  const screenshotName= user?.screenshotName || `Post_Live_Amend_Screenshot_${userName}_Amends`;

  // Restore form from draft or fresh
  const [form,setForm] = useState(()=> draftData ? {...emptyBase(),...draftData} : emptyBase());
  const formRef = useRef(form);
  useEffect(()=>{formRef.current=form;},[form]);

  // Timer: if draft, resume from where it left off
  const startTimeRef = useRef(
    draftData ? Date.now() - (draftData._elapsedAtSave||0)*1000 : Date.now()
  );

  const [openStep,setOpenStep] = useState(1);
  const [modal,setModal] = useState(null);
  const [toast,showToast] = useToast();
  const [copiedAll,setCopiedAll] = useState(false);
  const [autoSaved,setAutoSaved] = useState(null); // last auto-save timestamp

  // ── Auto-save to DB every 30 seconds ──
  useEffect(()=>{
    if(!onDraft)return;
    const interval=setInterval(()=>{
      const f=formRef.current;
      // Only auto-save if user has started filling in data
      if(!f.caseNum&&!f.accountNum&&!f.entries?.some(e=>e.note||e.clarification||e.number))return;
      const elapsed=Math.floor((Date.now()-startTimeRef.current)/1000);
      const clean=(imgs)=>(imgs||[]).map(({_file,url,name,id,path,_inDB})=>({url,name,id,path:path||id,_inDB:_inDB||false}));
      const cleanForm={...f,images:clean(f.images),backupImages:clean(f.backupImages),_elapsedAtSave:elapsed};
      onDraft(cleanForm,true); // true = silent (no toast)
      setAutoSaved(new Date().toLocaleTimeString());
    },30000);
    return()=>clearInterval(interval);
  },[onDraft]);

  const setF=(patch)=>setForm(f=>({...f,...patch}));

  const step1Done = !!(form.caseNum&&form.accountNum&&form.amendType&&(isSC||form.inboundNum));
  const step3Done = isSC
    ?form.entries.some(e=>e.number.trim())
    :form.entries.some(e=>e.note.trim()||e.clarification.trim());
  const step4Done = form.devices.mobile&&form.devices.tablet&&form.devices.desktop;
  const step7Done = Object.values(form.checklist).every(Boolean);

  const addEntry    = ()=>setF({entries:[...form.entries,emptyEntry()]});
  const updateEntry = (id,val)=>setF({entries:form.entries.map(e=>e.id===id?val:e)});
  const deleteEntry = (id)=>setF({entries:form.entries.filter(e=>e.id!==id)});

  const buildEntriesText = ()=>{
    const es=formRef.current.entries;
    let out="Post-Live Amends:\n";
    es.forEach(e=>{
      if(!e.number&&!e.note&&!e.clarification)return;
      out+="\n";
      if(isSC){ out+=`Site Comment #${e.number}:\n`; if(e.note)out+=`Note: ${e.note}\n`; if(e.clarification)out+=`\nClarification: ${e.clarification}\n`; }
      else { out+=`Assumption:\n`; if(e.note)out+=`Note: ${e.note}\n`; if(e.clarification)out+=`\nClarification:\n\n${e.clarification}\n`; }
      out+="\n";
    });
    return out.trimEnd();
  };
  const buildEmailText = ()=>{
    const f=formRef.current;
    const tl=f.emailType==="clarification"?"Clarification":"Completed";
    return `${buildEntriesText()}\n\n${tl} email sent to ${f.emailAddress||"—"}.`;
  };

  const handleCopyAll=()=>{ const txt=isSC?buildEntriesText():buildEmailText(); copyToClipboard(txt).then(()=>{setCopiedAll(true);setTimeout(()=>setCopiedAll(false),1800);}); };
  const handleSave=()=>{
    if(!step1Done)return showToast("Complete Step 1 first","error");
    if(!step4Done)return showToast("All 3 devices must be checked","error");
    if(!step7Done)return showToast("Complete the Final Checklist first","error");
    setModal("save");
  };

  const saveDraft = async(silent=false) => {
    const elapsed = Math.floor((Date.now() - startTimeRef.current)/1000);
    // Strip _file objects — can't JSON.stringify File objects (keep url for display)
    const stripFile=(imgs)=>(imgs||[]).map(({_file,url,name,id,path,_inDB})=>({url,name,id,path:path||id,_inDB:_inDB||false}));
    const cleanForm={...formRef.current,images:stripFile(formRef.current.images),backupImages:stripFile(formRef.current.backupImages),_elapsedAtSave:elapsed};
    onDraft&&onDraft(cleanForm,silent);
    if(!silent)showToast("📝 Draft saved to database!","info");
  };

  const stepProps = {openStep, setOpenStep};

  return (
    <div className="form-cols">
      <div className="form-left">

        <StepCard num={1} title="Case Information" done={step1Done} locked={false} {...stepProps}>
          <div className="field"><label>Case Number <span className="req">*</span></label><input className="inp" placeholder="e.g. 1234567" value={form.caseNum} onChange={e=>setF({caseNum:e.target.value})}/></div>
          <div className="field"><label>Account Number <span className="req">*</span></label><input className="inp" placeholder="e.g. ACC-9876" value={form.accountNum} onChange={e=>setF({accountNum:e.target.value})}/></div>
          {!isSC&&(<div className="field"><label>Inbound Number <span className="req">*</span></label><input className="inp" placeholder="Enter inbound number" value={form.inboundNum||""} onChange={e=>setF({inboundNum:e.target.value})}/></div>)}
          <div className="field"><label>Amend Type <span className="req">*</span></label><input className="inp" placeholder="e.g. Content, Layout, Link..." value={form.amendType} onChange={e=>setF({amendType:e.target.value})}/></div>
          <label className={cls("check-label",form.inProgress&&"checked")} style={{marginTop:4,width:"fit-content"}}><input type="checkbox" checked={form.inProgress} onChange={e=>setF({inProgress:e.target.checked})}/>In-Progress Salesforce</label>
        </StepCard>

        <StepCard num={2} title="Before Screenshot Name" done={false} locked={!step1Done} {...stepProps}>
          <p style={{fontSize:13,color:"var(--muted)",marginBottom:9}}>Save your before screenshot with this name.</p>
          <CopyName name={beforeName}/>
        </StepCard>

        <StepCard num={3} title={isSC?"Post-Live Amends Notepad":"Assumptions Notepad"} done={step3Done} locked={!step1Done} {...stepProps}>
          {form.entries.map((e,i)=>(<EntryCard key={e.id} entry={e} label={entryLabel} index={i} showNumber={isSC} onChange={val=>updateEntry(e.id,val)} onDelete={()=>deleteEntry(e.id)}/>))}
          {isSC&&<button className="add-entry-btn" onClick={addEntry}>＋ Add New Site Comment</button>}
          {!isSC&&(
            <div style={{marginTop:16,padding:"15px",background:"var(--code-bg)",borderRadius:0,border:"1.5px solid var(--border)"}}>
              <div className="field"><label>Email Address <span className="req">*</span></label><input className="inp" type="email" placeholder="client@email.com" value={form.emailAddress} onChange={e=>setF({emailAddress:e.target.value})}/></div>
              <div className="field" style={{marginBottom:0}}><label>Email Type <span className="req">*</span></label>
                <div className="radio-group">
                  <label className={cls("radio-label",form.emailType==="clarification"&&"selected-clarif")}><input type="radio" name="emailType" value="clarification" checked={form.emailType==="clarification"} onChange={()=>setF({emailType:"clarification"})}/>❓ Clarification</label>
                  <label className={cls("radio-label",form.emailType==="completed"&&"selected-complete")}><input type="radio" name="emailType" value="completed" checked={form.emailType==="completed"} onChange={()=>setF({emailType:"completed"})}/>✅ Completed</label>
                </div>
              </div>
            </div>
          )}
          <button className={cls("copy-all-btn",copiedAll&&"copied")} onClick={handleCopyAll}>{copiedAll?"✓ Copied!":"📋 Copy All "+(isSC?"Site Comments":"Assumptions + Email")}</button>
        </StepCard>

        <StepCard num={4} title="Device Check" done={step4Done} locked={!step3Done} {...stepProps}>
          <p style={{fontSize:12,color:"var(--muted)",marginBottom:11}}>All three must be checked <span className="req">*</span></p>
          <div className="check-group">
            {[["mobile","📱 Mobile"],["tablet","💻 Tablet"],["desktop","🖥️ Desktop"]].map(([k,l])=>(<label key={k} className={cls("check-label",form.devices[k]&&"checked")}><input type="checkbox" checked={form.devices[k]} onChange={e=>setF({devices:{...form.devices,[k]:e.target.checked}})}/>{l}</label>))}
          </div>
        </StepCard>

        <StepCard num={5} title="After Screenshot Name" done={false} locked={!step4Done} {...stepProps}>
          <p style={{fontSize:13,color:"var(--muted)",marginBottom:9}}>Save your after screenshot with this name.</p>
          <CopyName name={afterName}/>
        </StepCard>

        <StepCard num={6} title="Before/After Backup" done={false} locked={!step4Done} {...stepProps}>
          <p style={{fontSize:13,color:"var(--muted)",marginBottom:9}}>Upload screenshot — renamed automatically on download.</p>
          <CopyName name={screenshotName}/>
          <div style={{marginTop:12}}><ImageUpload baseName={screenshotName} multiple={false} onImages={imgs=>setF({images:imgs})} immediateUpload={false} initialImages={form.images||[]}/></div>
        </StepCard>

        <StepCard num="6b" title="Additional Backup Screenshots" done={false} locked={!step4Done} {...stepProps}>
          <p style={{fontSize:13,color:"var(--muted)",marginBottom:11}}>Each renamed <span style={{color:"var(--accent)",fontWeight:600}}>backup-screenshot-N</span> on download.</p>
          <ImageUpload baseName="backup-screenshot" multiple onImages={imgs=>setF({backupImages:imgs})} immediateUpload={false} initialImages={form.backupImages||[]}/>
        </StepCard>

        <StepCard num={7} title="Final Checklist" done={step7Done} locked={!step4Done} {...stepProps}>
          <p style={{fontSize:12,color:"var(--muted)",marginBottom:11}}>All items must be checked <span className="req">*</span></p>
          <div className="check-group" style={{flexDirection:"column"}}>
            {[["backup","Before/After Backup?"],["caseComment","Case Comment"],["combinedTracker","Combined Tracker?"],["qaChecklist","QA Checklist?"],["completeJob","Complete Job?"],["emailSales","Email Sales?"],["trackerChecklist","Tracker Checklist?"],["completeStatus","Complete Status Tracker?"]].map(([k,l])=>(<label key={k} className={cls("check-label",form.checklist[k]&&"checked")} style={{width:"fit-content"}}><input type="checkbox" checked={form.checklist[k]} onChange={e=>setF({checklist:{...form.checklist,[k]:e.target.checked}})}/>{l}</label>))}
          </div>
        </StepCard>

        <div className="action-bar">
          <button className="btn btn-cancel" onClick={()=>setModal("cancel")}>✕ Cancel</button>
          <button className="btn btn-ghost" onClick={()=>setModal("clear")}>🧹 Clear</button>
          <div className="spacer"/>
          <button className="btn btn-draft" onClick={saveDraft}>📝 Save Draft</button>
          {autoSaved&&<span style={{fontSize:11,color:"var(--muted)",alignSelf:"center",marginLeft:4}}>✓ Auto-saved {autoSaved}</span>}
          <button className="btn btn-save" onClick={handleSave}>💾 Save Case</button>
        </div>

        {modal==="cancel"&&(<div className="modal-bg"><div className="modal"><div style={{fontSize:36,marginBottom:10}}>⚠️</div><h3>Discard Form?</h3><p>Going back will delete all entered data.</p><div className="modal-btns"><button className="btn btn-ghost" onClick={()=>setModal(null)}>Keep Editing</button><button className="btn btn-danger" onClick={()=>{setModal(null);onBack();}}>Yes, Discard</button></div></div></div>)}
        {modal==="clear"&&(<div className="modal-bg"><div className="modal"><div style={{fontSize:36,marginBottom:10}}>🧹</div><h3>Clear All Fields?</h3><p>This resets every field. Cannot be undone.</p><div className="modal-btns"><button className="btn btn-ghost" onClick={()=>setModal(null)}>Cancel</button><button className="btn btn-danger" onClick={()=>{setForm(emptyBase());setModal(null);showToast("Cleared","info");}}>Clear</button></div></div></div>)}
        {modal==="save"&&(<div className="modal-bg"><div className="modal"><div style={{fontSize:36,marginBottom:10}}>💾</div><h3>Save Case?</h3><p>Case <strong style={{color:"var(--text)"}}>#{form.caseNum}</strong> — confirm everything is complete.</p><div className="modal-btns"><button className="btn btn-ghost" onClick={()=>setModal(null)}>Go Back</button><button className="btn btn-primary" onClick={()=>{setModal(null);showToast("Case saved! ✅");onSave&&onSave(formRef.current);}}>Confirm Save</button></div></div></div>)}
        <Toast msg={toast.msg} type={toast.type}/>
      </div>
      <div className="form-right">
        <StickyPanel startTimeRef={startTimeRef} formRef={formRef} isSC={isSC} step4Done={step4Done} buildEntriesText={buildEntriesText} buildEmailText={buildEmailText} onTimerEnd={onTimerEnd}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CHARTS
// ─────────────────────────────────────────────────────────────────────────────
function BarChart({ data, colorClass }) {
  const max = Math.max(...data.map(d=>d.val),1);
  return (
    <div>
      {data.map((d,i)=>(
        <div key={i} className="bar-row">
          <div className="bar-label" title={d.label}>{d.label}</div>
          <div className="bar-track"><div className={cls("bar-fill",Array.isArray(colorClass)?colorClass[i%colorClass.length]:colorClass)} style={{width:`${(d.val/max)*100}%`}}/></div>
          <div className="bar-count">{d.val}</div>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ data, size=100, stroke=14 }) {
  const r = (size-stroke)/2; const circ = 2*Math.PI*r;
  const total = data.reduce((s,d)=>s+d.val,0)||1;
  let off = 0;
  const colors = ["#71a3c1","#4e7fa0","#10b981","#f59e0b","#f43f5e"];
  return (
    <div className="donut-wrap">
      <svg className="donut-svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {data.map((d,i)=>{
          const pct = d.val/total; const len = pct*circ; const dashArr = `${len} ${circ-len}`;
          const rotation = (off/total)*360-90; off+=d.val;
          return <circle key={i} cx={size/2} cy={size/2} r={r} fill="none" stroke={colors[i%colors.length]} strokeWidth={stroke} strokeDasharray={dashArr} strokeDashoffset={-(rotation/360)*circ} strokeLinecap="round" style={{transition:"stroke-dasharray .8s cubic-bezier(.4,0,.2,1)"}}/>;
        })}
        <text x={size/2} y={size/2} textAnchor="middle" dy=".35em" fill="var(--text)" fontSize="14" fontWeight="800" fontFamily="Plus Jakarta Sans,sans-serif">{total}</text>
      </svg>
      <div className="donut-legend">
        {data.map((d,i)=>(<div key={i} className="donut-legend-item"><div className="donut-legend-dot" style={{background:colors[i%colors.length]}}/><span style={{color:"var(--muted)"}}>{d.label}</span><strong style={{marginLeft:"auto",paddingLeft:8}}>{d.val}</strong></div>))}
      </div>
    </div>
  );
}

function SparkLine({ data, color="#71a3c1", height=40, width=200 }) {
  if(!data||data.length<2) return <div style={{color:"var(--muted)",fontSize:11,textAlign:"center",paddingTop:16}}>Not enough data</div>;
  const max=Math.max(...data,1); const min=0;
  const pts=data.map((v,i)=>`${(i/(data.length-1))*width},${height-((v-min)/(max-min))*height}`).join(" ");
  const area=`0,${height} ${pts} ${width},${height}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{overflow:"visible"}}>
      <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity=".35"/><stop offset="100%" stopColor={color} stopOpacity="0"/></linearGradient></defs>
      <polygon points={area} fill="url(#sg)"/>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {data.map((v,i)=><circle key={i} cx={(i/(data.length-1))*width} cy={height-((v-min)/(max-min))*height} r="3" fill={color} stroke="var(--card)" strokeWidth="1.5"/>)}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────
function Dashboard({ savedCases, setPage, specialRequestors, addRequestor, removeRequestor, user }) {
  const [addingReq,setAddingReq] = useState(false);
  const [newReq,setNewReq] = useState("");
  const [toast,showToast] = useToast();
  const now = new Date();
  const total    = savedCases.length;
  const today    = savedCases.filter(c=>new Date(c.savedAt).toDateString()===now.toDateString()).length;
  const scCount  = savedCases.filter(c=>c._mode==="siteComment").length;
  const ibCount  = savedCases.filter(c=>c._mode==="inbound").length;
  const completed= savedCases.filter(c=>c.checklist&&Object.values(c.checklist).every(Boolean)).length;
  const rate     = total>0?Math.round((completed/total)*100):0;

  const byType={};savedCases.forEach(c=>{const k=c.amendType||"Unknown";byType[k]=(byType[k]||0)+1;});
  const typeData=Object.entries(byType).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([label,val])=>({label,val}));

  const dayKeys=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const byDay={};dayKeys.forEach(k=>{byDay[k]=0;});
  savedCases.forEach(c=>{const k=dayKeys[new Date(c.savedAt).getDay()];byDay[k]=(byDay[k]||0)+1;});
  const dayData=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(label=>({label,val:byDay[label]}));

  // Last 14 days sparkline
  const last14=[...Array(14)].map((_,i)=>{const d=new Date();d.setDate(d.getDate()-13+i);return savedCases.filter(c=>new Date(c.savedAt).toDateString()===d.toDateString()).length;});

  const greetHour=now.getHours();
  const greeting=greetHour<12?"Good morning 🌅":greetHour<17?"Good afternoon ☀️":"Good evening 🌙";

  const handleAddRequestor=()=>{
    const name=newReq.trim();
    if(!name)return;
    if(specialRequestors.includes(name)){showToast("Name already exists","error");return;}
    addRequestor(name);
    setNewReq(""); setAddingReq(false);
    showToast(`Added ${name}!`);
  };

  return (
    <div>
      <div style={{marginBottom:28}}>
        <h2 style={{fontSize:26,fontWeight:800,letterSpacing:"-.4px"}}>{greeting}, {user?.name?.split(" ")[0]||"there"}</h2>
        <p style={{color:"var(--muted)",fontSize:14,marginTop:5}}>{now.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card blue"><div className="stat-icon">📁</div><div className="stat-label">Total Cases</div><div className="stat-val">{total}</div><div className="stat-sub">All time</div></div>
        <div className="stat-card green"><div className="stat-icon">📅</div><div className="stat-label">Today</div><div className="stat-val">{today}</div><div className="stat-sub">Cases today</div></div>
        <div className="stat-card amber"><div className="stat-icon">💬</div><div className="stat-label">Site Comments</div><div className="stat-val">{scCount}</div><div className="stat-sub">Post-live</div></div>
        <div className="stat-card purple"><div className="stat-icon">📧</div><div className="stat-label">Inbound Email</div><div className="stat-val">{ibCount}</div><div className="stat-sub">Assumptions</div></div>
        <div className="stat-card green"><div className="stat-icon">✅</div><div className="stat-label">Completed</div><div className="stat-val">{rate}%</div><div className="stat-sub">Checklist rate</div></div>
        <div className="stat-card red"><div className="stat-icon">⚠️</div><div className="stat-label">Incomplete</div><div className="stat-val">{total-completed}</div><div className="stat-sub">Missing checklist</div></div>
      </div>

      {/* Charts row */}
      <div className="section-title">📊 Analytics</div>
      <div className="analytics-grid">
        <div className="analytics-card">
          <div className="analytics-title">Cases by Amend Type</div>
          {typeData.length>0?<BarChart data={typeData} colorClass={["blue","purple","green","amber","blue"]}/>:<div className="empty-analytics">Save cases to see data</div>}
        </div>
        <div className="analytics-card">
          <div className="analytics-title">Type Split</div>
          {total>0?<DonutChart data={[{label:"Site Comment",val:scCount},{label:"Inbound Email",val:ibCount}]}/>:<div className="empty-analytics">No data yet</div>}
        </div>
        <div className="analytics-card">
          <div className="analytics-title">Cases by Day of Week</div>
          {total>0?<BarChart data={dayData} colorClass={["blue","blue","blue","blue","blue","purple","amber"]}/>:<div className="empty-analytics">No data yet</div>}
        </div>
        <div className="analytics-card">
          <div className="analytics-title">Last 14 Days Activity</div>
          {total>0?(<div style={{paddingTop:8}}><SparkLine data={last14} width={220} height={50}/><div style={{fontSize:11,color:"var(--muted)",marginTop:8}}>Cases per day over the last 2 weeks</div></div>):<div className="empty-analytics">No data yet</div>}
        </div>
        <div className="analytics-card">
          <div className="analytics-title">Checklist Completion</div>
          {total>0?(<><BarChart data={[{label:"Completed",val:completed},{label:"Incomplete",val:total-completed}]} colorClass={["green","red"]}/><div style={{fontSize:11,color:"var(--muted)",marginTop:6,textAlign:"center"}}>{rate}% completion rate</div></>):<div className="empty-analytics">No data yet</div>}
        </div>
        <div className="analytics-card">
          <div className="analytics-title">Completion Rate</div>
          {total>0?<DonutChart data={[{label:"Complete",val:completed},{label:"Incomplete",val:total-completed}]}/>:<div className="empty-analytics">No data yet</div>}
        </div>
      </div>

      {/* Special Requestors */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <div className="section-title" style={{marginBottom:0}}>⭐ Special Requestors</div>
        <button className="btn btn-primary" style={{padding:"7px 14px",fontSize:12}} onClick={()=>setAddingReq(true)}>＋ Add Requestor</button>
      </div>
      <div className="requestor-grid">
        {specialRequestors.map((name,i)=>(
          <div key={i} className="requestor-chip">
            <div className="requestor-avatar">{name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}</div>
            <span>{name}</span>
            <button className="requestor-del" onClick={()=>removeRequestor(name)}>✕</button>
          </div>
        ))}
        {specialRequestors.length===0&&<div style={{color:"var(--muted)",fontSize:13}}>No special requestors yet.</div>}
      </div>
      {addingReq&&(<div className="modal-bg"><div className="modal"><div style={{fontSize:36,marginBottom:10}}>⭐</div><h3>Add Special Requestor</h3><div className="field" style={{textAlign:"left",marginBottom:16}}><label>Full Name</label><input className="inp" placeholder="e.g. John Smith" value={newReq} onChange={e=>setNewReq(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleAddRequestor()} autoFocus/></div><div className="modal-btns"><button className="btn btn-ghost" onClick={()=>{setAddingReq(false);setNewReq("");}}>Cancel</button><button className="btn btn-primary" onClick={handleAddRequestor}>Add</button></div></div></div>)}

      {/* Quick Actions */}
      <div className="section-title" style={{marginTop:4}}>⚡ Quick Actions</div>
      <div className="quick-links">
        <div className="quick-card" onClick={()=>setPage("postlive")}><span className="quick-icon">🚀</span><div><div className="quick-title">Post-Live Amends</div><div className="quick-sub">Site Comment or Inbound Email</div></div></div>
        <div className="quick-card" onClick={()=>setPage("prelive")}><span className="quick-icon">🔧</span><div><div className="quick-title">Pre-Live Amends</div><div className="quick-sub">Coming soon</div></div></div>
        <div className="quick-card" onClick={()=>setPage("history")}><span className="quick-icon">📂</span><div><div className="quick-title">Case History</div><div className="quick-sub">{total} case{total!==1?"s":""} saved</div></div></div>
        <div className="quick-card" onClick={()=>setPage("announcements")}><span className="quick-icon">📢</span><div><div className="quick-title">Announcements</div><div className="quick-sub">Team updates</div></div></div>
      </div>

      {/* Recent */}
      {savedCases.length>0&&(<>
        <div className="section-title">🕒 Recent Cases</div>
        {[...savedCases].reverse().slice(0,6).map((c,i)=>(
          <div key={i} className="activity-row">
            <div className={cls("act-dot",c._mode==="siteComment"?"blue":"purple")}/>
            <div className="act-info"><div className="act-title">Case #{c.caseNum} — {c.accountNum}</div><div className="act-sub">{c.amendType} · {c.savedAt}</div></div>
            <span className={cls("act-badge",c._mode==="siteComment"?"site":"email")}>{c._mode==="siteComment"?"Site Comment":"Inbound Email"}</span>
          </div>
        ))}
      </>)}
      {savedCases.length===0&&(<div style={{textAlign:"center",color:"var(--muted)",padding:"40px 0",fontSize:14}}><div style={{fontSize:48,marginBottom:12}}>📭</div>No cases saved yet. Start by creating a Post-Live Amend!</div>)}
      <Toast msg={toast.msg} type={toast.type}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SavedCaseCard (mini dropdown for PostLive page)
// ─────────────────────────────────────────────────────────────────────────────
function SavedCaseCard({ c, openId, setOpenId }) {
  const open = openId === c._id;
  const isSC=c._mode==="siteComment";
  const allImages=[...(c.images||[]),...(c.backupImages||[])];
  return (
    <div style={{background:"var(--card)",border:"1.5px solid var(--border)",borderRadius:0,marginBottom:10,overflow:"hidden",transition:".2s",boxShadow:"var(--shadow-sm)"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",cursor:"pointer"}} onClick={()=>setOpenId(open ? null : c._id)}>
        <div className="saved-dot"/>
        <div className="saved-info">
          <div className="saved-case">Case #{c.caseNum} — {c.accountNum}</div>
          <div className="saved-meta">{c.amendType} · {c.savedAt}</div>
        </div>
        <span className="saved-type">{isSC?"Site Comment":"Inbound Email"}</span>
        <span style={{color:"var(--muted)",fontSize:12,transition:".25s",display:"inline-block",transform:open?"rotate(180deg)":"none"}}>▼</span>
      </div>
      {open&&(
        <div style={{borderTop:"1px solid var(--border)",padding:"14px 16px",background:"var(--entry-bg)"}}>
          {(c.entries||[]).filter(e=>e.note||e.number||e.clarification).map((e,ei)=>(
            <div key={ei} className="case-entry-card" style={{marginBottom:8}}>
              <div className="case-entry-num">{isSC?`Site Comment #${e.number||ei+1}`:`Assumption ${ei+1}`}</div>
              {e.note&&<div className="case-entry-field"><span className="case-entry-key">Note: </span>{e.note}</div>}
              {e.clarification&&<div className="case-entry-field"><span className="case-entry-key">Clarification: </span>{e.clarification}</div>}
            </div>
          ))}
          {!isSC&&c.emailAddress&&(<div style={{fontSize:13,color:"var(--muted)",marginBottom:8}}>📧 {c.emailType==="clarification"?"Clarification":"Completed"} → <span style={{color:"var(--text)",fontWeight:600}}>{c.emailAddress}</span></div>)}
          {allImages.length>0&&(<div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:4}}>{allImages.map(img=>(<div key={img.id||img.name} style={{width:72,height:56,borderRadius:0,overflow:"hidden",border:"1.5px solid var(--border)"}}><img src={img.url} alt={img.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>))}</div>)}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// POST LIVE PAGE
// ─────────────────────────────────────────────────────────────────────────────
function PostLivePage({ onSaveCase, onFormActive, allSavedCases, dbDrafts, onSaveDraft, onDeleteDraft, user, onTimerEnd }) {
  const [mode,setMode]=useState(null);
  const [backConfirm,setBackConfirm]=useState(false);
  const [openSavedId,setOpenSavedId]=useState(null);

  const enterMode=(m)=>{setMode(m);onFormActive&&onFormActive(true);};
  const exitMode=()=>{setMode(null);onFormActive&&onFormActive(false);};

  // Current draft for this mode (from DB)
  const currentDraft=dbDrafts?.find(d=>d._mode===mode)||null;

  if(mode==="siteComment"||mode==="inbound"){
    return (
      <div>
        <div className="page-header">
          <button className="back-btn" onClick={()=>setBackConfirm(true)}>← Back</button>
          <div className="page-title">{mode==="siteComment"?"Post-Live — Site Comment":"Post-Live — Inbound Email"}</div>
          <div className="page-sub">{mode==="siteComment"?"Fill in each step. Steps unlock as you progress.":"Assumption-based format with email details."}</div>
        </div>
        <PostLiveForm mode={mode} draftData={currentDraft} user={user} onTimerEnd={onTimerEnd}
          onSave={f=>{
            // Keep _file refs intact — addCase will upload them to Storage
            const rec={...f,_mode:mode,savedAt:new Date().toLocaleString()};
            // Delete draft from DB — it's now a saved case
            if(currentDraft?._id) onDeleteDraft&&onDeleteDraft(currentDraft._id,mode);
            onSaveCase&&onSaveCase(rec);
            exitMode();
          }}
          onDraft={(f,silent=false)=>{
            // Save draft to DB — never exit the form (silent or not)
            onSaveDraft&&onSaveDraft(mode,{...f,_mode:mode});
          }}
          onBack={exitMode}/>
        {backConfirm&&(<div className="modal-bg"><div className="modal"><div style={{fontSize:36,marginBottom:10}}>⚠️</div><h3>Go Back?</h3><p>Going back will discard unsaved changes.</p><div className="modal-btns"><button className="btn btn-ghost" onClick={()=>setBackConfirm(false)}>Keep Editing</button><button className="btn btn-danger" onClick={()=>{setBackConfirm(false);exitMode();}}>Discard</button></div></div></div>)}
      </div>
    );
  }

  const recentAll = [...allSavedCases].reverse().slice(0,6);

  return (
    <div>
      <div className="page-header">
        <div className="page-title">🚀 Post-Live Amends</div>
        <div className="page-sub">Choose the type of amend to begin.</div>
      </div>
      <div className="choice-row">
        <button className="choice-btn" onClick={()=>enterMode("siteComment")}><span className="choice-icon">💬</span><div><div className="choice-btn-title">Site Comment</div><div className="choice-btn-sub">Step-by-step with live timer</div></div></button>
        <button className="choice-btn" onClick={()=>enterMode("inbound")}><span className="choice-icon">📧</span><div><div className="choice-btn-title">Inbound Email</div><div className="choice-btn-sub">Assumption-based format</div></div></button>
      </div>

      {dbDrafts&&dbDrafts.length>0&&(<div style={{marginBottom:22}}><div className="section-title">📝 Drafts <span style={{fontSize:11,color:"var(--muted)",fontWeight:400}}>(auto-saved to database)</span></div>{dbDrafts.map((d,i)=>(<div key={d._id||i} className="draft-row"><div className="draft-dot"/><div className="saved-info"><div className="saved-case">Case #{d.caseNum||"—"} — Account {d.accountNum||"—"}</div><div className="saved-meta">{d.amendType||"No amend type"} · Saved {d.draftAt}</div></div><span className="draft-badge">{d._mode==="siteComment"?"Site Comment":"Inbound Email"}</span><button className="draft-resume" onClick={()=>enterMode(d._mode)}>▶ Resume</button><button className="entry-del" title="Delete draft" onClick={()=>onDeleteDraft&&onDeleteDraft(d._id,d._mode)} style={{marginLeft:4}}>🗑</button></div>))}</div>)}

      {recentAll.length>0&&(
        <div>
          <div className="section-title">🕒 Recently Saved Cases</div>
          {recentAll.map((c,i)=>(<SavedCaseCard key={c._id||i} c={c} openId={openSavedId} setOpenId={setOpenSavedId}/>))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DOWNLOAD
// ─────────────────────────────────────────────────────────────────────────────
async function downloadCase(c) {
  const isSC=c._mode==="siteComment"; const entries=(c.entries||[]);
  let txt="Post-Live Amends:\n";
  entries.forEach(e=>{if(!e.number&&!e.note&&!e.clarification)return;txt+="\n";if(isSC){txt+=`Site Comment #${e.number}:\n`;if(e.note)txt+=`Note: ${e.note}\n`;if(e.clarification)txt+=`\nClarification: ${e.clarification}\n`;}else{txt+=`Assumption:\n`;if(e.note)txt+=`Note: ${e.note}\n`;if(e.clarification)txt+=`\nClarification:\n\n${e.clarification}\n`;}txt+="\n";});
  if(!isSC&&c.emailAddress){const tl=c.emailType==="clarification"?"Clarification":"Completed";txt+=`\n${tl} email sent to ${c.emailAddress}.`;}
  const meta=[`Post-Live Amends Case Export`,"─".repeat(36),`Saved: ${c.savedAt}`,`Type: ${isSC?"Site Comment":"Inbound Email"}`,`Case #: ${c.caseNum||"—"}`,`Account #: ${c.accountNum||"—"}`,...(isSC?[]:[`Inbound #: ${c.inboundNum||"—"}`]),`Amend Type: ${c.amendType||"—"}`,``,txt].join("\n");
  const zipName=`Case_${c.caseNum||"unknown"}_${c.accountNum||"acc"}`.replace(/[^a-zA-Z0-9_-]/g,"_");

  // Load JSZip
  if(!window.JSZip){await new Promise((res,rej)=>{const s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";s.onload=res;s.onerror=rej;document.head.appendChild(s);});}
  const zip=new window.JSZip();
  zip.file("case_data.txt",meta);
  for(const img of [...(c.images||[]),...(c.backupImages||[])]){
    try{const r=await fetch(img.url);const blob=await r.blob();const ext=(img.name||"screenshot").split(".").pop()||"png";zip.file(`${img.name||"screenshot"}.${ext}`,blob);}catch(e){console.warn("Image fetch failed:",e);}
  }
  const zipBlob=await zip.generateAsync({type:"blob"});

  // Try folder picker API (Chrome/Edge) — lets user choose where to save
  if(window.showDirectoryPicker){
    try{
      const dir=await window.showDirectoryPicker({mode:"readwrite",startIn:"downloads"});
      const fileHandle=await dir.getFileHandle(`${zipName}.zip`,{create:true});
      const writable=await fileHandle.createWritable();
      await writable.write(zipBlob);
      await writable.close();
      return; // Success — file saved to chosen folder
    }catch(e){
      if(e.name==="AbortError")return; // User cancelled picker — do nothing
      // Permission denied or other error — fall through to normal download
    }
  }
  // Fallback: normal browser download
  const a=document.createElement("a");a.href=URL.createObjectURL(zipBlob);a.download=`${zipName}.zip`;a.click();
}

// ─────────────────────────────────────────────────────────────────────────────
// INLINE EDIT
// ─────────────────────────────────────────────────────────────────────────────
function InlineEdit({ value, onSave }) {
  const [v,setV]=useState(value);
  return (
    <div style={{flex:1,display:"flex",gap:6}}>
      <input className="inline-edit-inp" value={v} onChange={e=>setV(e.target.value)} autoFocus onKeyDown={e=>e.key==="Enter"&&onSave(v)}/>
      <button className="inline-save-btn" onClick={()=>onSave(v)}>✓</button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CASE HISTORY — fully editable
// ─────────────────────────────────────────────────────────────────────────────
const CHECKLIST_LABELS={backup:"Before/After Backup",caseComment:"Case Comment",combinedTracker:"Combined Tracker",qaChecklist:"QA Checklist",completeJob:"Complete Job",emailSales:"Email Sales",trackerChecklist:"Tracker Checklist",completeStatus:"Complete Status Tracker"};
const emptyEditEntry=()=>({id:Date.now()+Math.random(),number:"",note:"",clarification:""});

// A single editable case card (extracted so it has its own state)
function EditableCaseCard({ c, onUpdate, onDelete, onLightbox, openId, setOpenId }) {
  const isSC = c._mode==="siteComment";
  const isOpen = openId === c._id;
  const setIsOpen = (val) => setOpenId(val ? c._id : null);
  const [editMode,setEditMode]=useState(false);
  const [draft,setDraft]=useState(null); // local edit draft
  const [deleteConfirm,setDeleteConfirm]=useState(false);
  const [toast,showToast]=useToast();

  const allImages=[...(c.images||[]),...(c.backupImages||[])];
  const checkDone=c.checklist?Object.values(c.checklist).filter(Boolean).length:0;
  const checkTotal=c.checklist?Object.keys(c.checklist).length:8;

  const startEdit=()=>{
    setDraft({...c,
      entries:(c.entries||[]).map(e=>({...e})),
      devices:{...(c.devices||{})},
      checklist:{...(c.checklist||{})},
      images:[...(c.images||[])],
      backupImages:[...(c.backupImages||[])],
    });
    setEditMode(true);
    setIsOpen(true);
  };
  const cancelEdit=()=>{setDraft(null);setEditMode(false);};
  const saveEdit=()=>{
    onUpdate(c._id,{...draft});
    setDraft(null);setEditMode(false);
    showToast("Case updated ✅");
  };

  const D = draft; // shorthand
  const setD=(patch)=>setDraft(d=>({...d,...patch}));

  // Entry helpers
  const updateEntry=(id,val)=>setD({entries:D.entries.map(e=>e.id===id?{...e,...val}:e)});
  const deleteEntry=(id)=>setD({entries:D.entries.filter(e=>e.id!==id)});
  const addEntry=()=>setD({entries:[...D.entries,emptyEditEntry()]});

  // Upload to Supabase Storage immediately, return persistent URL
  const uploadImg=async(file,name)=>{
    const ext=file.name?.split(".").pop()||"png";
    return new Promise(resolve=>{
      const reader=new FileReader();
      reader.onload=async(e)=>{
        try{
          const res=await fetch("/api/images/upload",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({fileBase64:e.target.result,fileName:`${name}.${ext}`,mimeType:file.type||"image/png"})});
          const data=await res.json();
          if(!res.ok)throw new Error(data.error||"Upload failed");
          resolve({url:data.url,path:data.path,name,id:data.path});
        }catch(err){
          console.warn("Edit upload failed:",err.message);
          resolve({url:URL.createObjectURL(file),name,id:`blob-${Date.now()}`,_unsynced:true});
        }
      };
      reader.onerror=()=>resolve({url:URL.createObjectURL(file),name,id:`blob-${Date.now()}`,_unsynced:true});
      reader.readAsDataURL(file);
    });
  };
  // Image helpers for edit mode
  const addImages=async(files,type)=>{
    const cur=D[type]||[];
    const uploaded=await Promise.all(Array.from(files).map((f,i)=>{
      const name=type==="backupImages"?`backup-screenshot-${cur.length+i+1}`:`screenshot-${cur.length+i+1}`;
      return uploadImg(f,name);
    }));
    setD({[type]:[...cur,...uploaded]});
  };
  const removeImage=(type,id)=>setD({[type]:(D[type]||[]).filter(img=>img.id!==id)});
  const replaceImage=async(type,id,file)=>{
    const existing=(D[type]||[]).find(img=>img.id===id);
    const uploaded=await uploadImg(file,existing?.name||"screenshot");
    setD({[type]:(D[type]||[]).map(img=>img.id===id?uploaded:img)});
  };

  return (
    <div className={cls("case-card",isOpen&&"expanded")}>
      {/* Header */}
      <div className="case-card-header" onClick={()=>setIsOpen(o=>!o)}>
        <div className="case-num-badge">#{c.caseNum||"—"}</div>
        <div style={{flex:1,minWidth:0,marginLeft:4}}>
          <div className="case-meta-main">{c.accountNum||"—"} &nbsp;·&nbsp; {c.amendType||"—"}</div>
          <div className="case-meta-sub">
            <span className={cls("act-badge",isSC?"site":"email")} style={{fontSize:10,padding:"2px 8px",marginRight:6}}>{isSC?"Site Comment":"Inbound Email"}</span>
            {c.savedAt}
            {allImages.length>0&&<span style={{marginLeft:8}}>🖼️ {allImages.length}</span>}
            {c.checklist&&<span style={{marginLeft:8,color:checkDone===checkTotal?"var(--green)":"var(--amber)"}}>✓ {checkDone}/{checkTotal}</span>}
          </div>
        </div>
        <div style={{display:"flex",gap:8,flexShrink:0}} onClick={e=>e.stopPropagation()}>
          {!editMode&&<button className="case-expand-btn" onClick={()=>{startEdit();}}>✏️ Edit</button>}
          <button className="case-expand-btn" onClick={()=>setIsOpen(o=>!o)}>
            <span className="case-expand-icon">▼</span>{isOpen?"Collapse":"Details"}
          </button>
        </div>
      </div>

      {/* Body */}
      {isOpen&&(
        <div className="case-body">
          <div className="case-body-inner">

            {editMode&&(
              <div className="edit-mode-banner">
                ✏️ Editing mode — all fields are now editable. Click Save when done.
              </div>
            )}

            {/* ── CASE INFO ── */}
            <div className="case-section">
              <div className="case-section-title">📋 Case Info</div>
              {editMode ? (
                <>
                  <div className="field-row-edit"><label>Case # <span className="req">*</span></label><input className="inp" value={D.caseNum||""} onChange={e=>setD({caseNum:e.target.value})}/></div>
                  <div className="field-row-edit"><label>Account # <span className="req">*</span></label><input className="inp" value={D.accountNum||""} onChange={e=>setD({accountNum:e.target.value})}/></div>
                  {!isSC&&<div className="field-row-edit"><label>Inbound #</label><input className="inp" value={D.inboundNum||""} onChange={e=>setD({inboundNum:e.target.value})}/></div>}
                  <div className="field-row-edit"><label>Amend Type</label><input className="inp" value={D.amendType||""} onChange={e=>setD({amendType:e.target.value})}/></div>
                  <label className={cls("check-label",D.inProgress&&"checked")} style={{marginTop:4,width:"fit-content",fontSize:12}}><input type="checkbox" checked={!!D.inProgress} onChange={e=>setD({inProgress:e.target.checked})}/>In-Progress Salesforce</label>
                </>
              ) : (
                <>
                  <div className="case-field-row"><div className="case-field-label">Case #</div><div className="case-field-val">{c.caseNum||"—"}</div></div>
                  <div className="case-field-row"><div className="case-field-label">Account #</div><div className="case-field-val">{c.accountNum||"—"}</div></div>
                  {!isSC&&<div className="case-field-row"><div className="case-field-label">Inbound #</div><div className="case-field-val">{c.inboundNum||"—"}</div></div>}
                  <div className="case-field-row"><div className="case-field-label">Amend Type</div><div className="case-field-val">{c.amendType||"—"}</div></div>
                  <div className="case-field-row"><div className="case-field-label">In-Progress</div><div className="case-field-val">{c.inProgress?"✅ Yes":"—"}</div></div>
                </>
              )}
            </div>

            {/* ── SITE COMMENTS / ASSUMPTIONS ── */}
            <div className="case-section">
              <div className="edit-section-header">
                <div className="case-section-title" style={{marginBottom:0}}>{isSC?"💬 Site Comments":"📝 Assumptions"}</div>
                {editMode&&<button className="add-entry-btn-sm" onClick={addEntry}>＋ Add {isSC?"Comment":"Assumption"}</button>}
              </div>
              {editMode ? (
                (D.entries||[]).map((e,ei)=>(
                  <div key={e.id} className="edit-entry-card">
                    {(isSC||(D.entries.length>1))&&<button className="entry-del" onClick={()=>deleteEntry(e.id)}>🗑</button>}
                    {isSC&&<div className="field-row-edit"><label>SC Number <span className="req">*</span></label><input className="inp" placeholder="e.g. 25" value={e.number||""} onChange={ev=>updateEntry(e.id,{number:ev.target.value})}/></div>}
                    <div className="field-row-edit"><label>Note</label><textarea className="inp" rows={3} value={e.note||""} onChange={ev=>updateEntry(e.id,{note:ev.target.value})} placeholder="Note..."/></div>
                    <div className="field-row-edit"><label>Clarification</label><textarea className="inp" rows={3} value={e.clarification||""} onChange={ev=>updateEntry(e.id,{clarification:ev.target.value})} placeholder="Clarification..."/></div>
                  </div>
                ))
              ) : (
                (c.entries||[]).filter(e=>e.note||e.clarification||e.number).length===0
                  ? <div style={{color:"var(--muted)",fontSize:12,padding:"8px 0"}}>No entries</div>
                  : (c.entries||[]).filter(e=>e.note||e.clarification||e.number).map((e,ei)=>(
                    <div key={ei} className="case-entry-card">
                      <div className="case-entry-num">{isSC?`Site Comment #${e.number||ei+1}`:`Assumption ${ei+1}`}</div>
                      {e.note&&<div className="case-entry-field"><span className="case-entry-key">Note: </span>{e.note}</div>}
                      {e.clarification&&<div className="case-entry-field"><span className="case-entry-key">Clarification: </span>{e.clarification}</div>}
                    </div>
                  ))
              )}
            </div>

            {/* ── EMAIL DETAILS (inbound) ── */}
            {!isSC&&(
              <div className="case-section">
                <div className="case-section-title">📧 Email Details</div>
                {editMode ? (
                  <>
                    <div className="field-row-edit"><label>Email Address</label><input className="inp" type="email" value={D.emailAddress||""} onChange={e=>setD({emailAddress:e.target.value})}/></div>
                    <div className="field-row-edit"><label>Email Type</label>
                      <div className="radio-group">
                        <label className={cls("radio-label",D.emailType==="clarification"&&"selected-clarif")}><input type="radio" checked={D.emailType==="clarification"} onChange={()=>setD({emailType:"clarification"})}/>❓ Clarification</label>
                        <label className={cls("radio-label",D.emailType==="completed"&&"selected-complete")}><input type="radio" checked={D.emailType==="completed"} onChange={()=>setD({emailType:"completed"})}/>✅ Completed</label>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="case-field-row"><div className="case-field-label">Email Address</div><div className="case-field-val">{c.emailAddress||"—"}</div></div>
                    <div className="case-field-row"><div className="case-field-label">Email Type</div><div className="case-field-val" style={{color:c.emailType==="clarification"?"var(--amber)":"var(--green)",fontWeight:700}}>{c.emailType==="clarification"?"❓ Clarification":"✅ Completed"}</div></div>
                  </>
                )}
              </div>
            )}

            {/* ── DEVICE CHECK ── */}
            <div className="case-section">
              <div className="case-section-title">📱 Device Check</div>
              {editMode ? (
                <div className="device-edit-group">
                  {[["mobile","📱 Mobile"],["tablet","💻 Tablet"],["desktop","🖥️ Desktop"]].map(([k,l])=>(
                    <label key={k} className={cls("check-label",D.devices?.[k]&&"checked")} style={{fontSize:12}}>
                      <input type="checkbox" checked={!!D.devices?.[k]} onChange={e=>setD({devices:{...D.devices,[k]:e.target.checked}})}/>{l}
                    </label>
                  ))}
                </div>
              ) : (
                <div className="case-device-chips">
                  {[["mobile","📱 Mobile"],["tablet","💻 Tablet"],["desktop","🖥️ Desktop"]].map(([k,l])=>(
                    <div key={k} className={cls("case-device-chip",c.devices?.[k]?"active":"inactive")}>{l}{c.devices?.[k]?" ✓":" ✗"}</div>
                  ))}
                </div>
              )}
            </div>

            {/* ── FINAL CHECKLIST ── */}
            {(c.checklist||editMode)&&(
              <div className="case-section">
                <div className="case-section-title">✅ Final Checklist{!editMode&&` — ${checkDone}/${checkTotal}`}</div>
                {editMode ? (
                  <div className="checklist-edit-grid">
                    {Object.entries(CHECKLIST_LABELS).map(([k,l])=>(
                      <label key={k} className={cls("checklist-edit-item",D.checklist?.[k]&&"checked")}>
                        <input type="checkbox" checked={!!D.checklist?.[k]} onChange={e=>setD({checklist:{...D.checklist,[k]:e.target.checked}})}/>
                        <span style={{fontSize:11}}>{l}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="case-checklist-grid">
                    {Object.entries(CHECKLIST_LABELS).map(([k,l])=>(
                      <div key={k} className={cls("case-check-item",c.checklist?.[k]?"done":"undone")}>
                        <span>{c.checklist?.[k]?"✅":"⬜"}</span><span style={{fontSize:11}}>{l}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── SCREENSHOTS ── */}
            <div className="case-section">
              <div className="edit-section-header">
                <div className="case-section-title" style={{marginBottom:0}}>🖼️ Screenshots {editMode?"":`(${allImages.length})`}</div>
              </div>
              {editMode ? (
                <>
                  {/* Main screenshots */}
                  <div style={{fontSize:11,fontWeight:700,color:"var(--muted)",marginBottom:6,textTransform:"uppercase",letterSpacing:".5px"}}>Main Screenshots</div>
                  <div className="img-edit-grid">
                    {(D.images||[]).map(img=>(
                      <div key={img.id} className="img-edit-item">
                        <img src={img.url} alt={img.name}/>
                        <button className="img-edit-del" onClick={()=>removeImage("images",img.id)}>✕</button>
                        <label className="img-edit-replace">
                          🔄 Replace
                          <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>e.target.files[0]&&replaceImage("images",img.id,e.target.files[0])}/>
                        </label>
                      </div>
                    ))}
                    <label className="img-add-zone">
                      <input type="file" accept="image/*" multiple onChange={e=>addImages(e.target.files,"images")}/>
                      <span style={{fontSize:20}}>＋</span>
                      <span>Add</span>
                    </label>
                  </div>
                  {/* Backup screenshots */}
                  <div style={{fontSize:11,fontWeight:700,color:"var(--muted)",margin:"14px 0 6px",textTransform:"uppercase",letterSpacing:".5px"}}>Backup Screenshots</div>
                  <div className="img-edit-grid">
                    {(D.backupImages||[]).map(img=>(
                      <div key={img.id} className="img-edit-item">
                        <img src={img.url} alt={img.name}/>
                        <button className="img-edit-del" onClick={()=>removeImage("backupImages",img.id)}>✕</button>
                        <label className="img-edit-replace">
                          🔄 Replace
                          <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>e.target.files[0]&&replaceImage("backupImages",img.id,e.target.files[0])}/>
                        </label>
                      </div>
                    ))}
                    <label className="img-add-zone">
                      <input type="file" accept="image/*" multiple onChange={e=>addImages(e.target.files,"backupImages")}/>
                      <span style={{fontSize:20}}>＋</span>
                      <span>Add</span>
                    </label>
                  </div>
                </>
              ) : (
                allImages.length===0
                  ? <div style={{color:"var(--muted)",fontSize:12,padding:"8px 0"}}>No screenshots</div>
                  : <>
                      <div className="case-imgs">
                        {allImages.map(img=>(<div key={img.id||img.name} className="case-img-thumb" title={img.name} onClick={()=>onLightbox(img.url)}><img src={img.url} alt={img.name}/></div>))}
                      </div>
                      <div style={{fontSize:11,color:"var(--muted)",marginTop:8}}>Click to enlarge</div>
                    </>
              )}
            </div>

            {/* ── ACTIONS ── */}
            <div className="case-actions">
              {editMode ? (
                <>
                  <button className="btn btn-ghost" onClick={cancelEdit}>✕ Cancel</button>
                  <div style={{flex:1}}/>
                  <button className="btn btn-save" onClick={saveEdit}>💾 Save Changes</button>
                </>
              ) : (
                <>
                  <button className="h-btn dl" onClick={()=>downloadCase(c)}>⬇️ Download ZIP</button>
                  <div style={{flex:1}}/>
                  <button className="h-btn" onClick={startEdit} style={{borderColor:"var(--accent)",color:"var(--accent)"}}>✏️ Edit Case</button>
                  <button className="h-btn danger" onClick={()=>setDeleteConfirm(true)}>🗑 Delete</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {deleteConfirm&&(<div className="modal-bg"><div className="modal">
        <div style={{fontSize:36,marginBottom:10}}>🗑</div><h3>Delete Case?</h3>
        <p>Case <strong>#{c.caseNum}</strong> will be permanently deleted.</p>
        <div className="modal-btns">
          <button className="btn btn-ghost" onClick={()=>setDeleteConfirm(false)}>Cancel</button>
          <button className="btn btn-danger" onClick={()=>{onDelete(c._id);setDeleteConfirm(false);}}>Delete</button>
        </div>
      </div></div>)}
      <Toast msg={toast.msg} type={toast.type}/>
    </div>
  );
}

function CaseHistory({ cases, onUpdate, onDelete }) {
  const [lightboxImg,setLightboxImg]=useState(null);
  const [search,setSearch]=useState("");
  const [filterMode,setFilterMode]=useState("all");
  const [filterDate,setFilterDate]=useState("");
  const [openCaseId,setOpenCaseId]=useState(null);

  // Filter
  const filtered = [...cases].reverse().filter(c=>{
    const q=search.toLowerCase();
    const matchQ=!q||c.caseNum?.toLowerCase().includes(q)||c.accountNum?.toLowerCase().includes(q)||c.amendType?.toLowerCase().includes(q)||c.entries?.some(e=>e.note?.toLowerCase().includes(q)||e.clarification?.toLowerCase().includes(q));
    const matchMode=filterMode==="all"||(filterMode==="site"&&c._mode==="siteComment")||(filterMode==="inbound"&&c._mode==="inbound");
    const matchDate=!filterDate||c.savedAt?.includes(filterDate);
    return matchQ&&matchMode&&matchDate;
  });

  return (
    <div>
      <div className="page-header">
        <div className="page-title">📂 Case History</div>
        <div className="page-sub">{cases.length} case{cases.length!==1?"s":""} saved — click ✏️ Edit to modify any field</div>
      </div>

      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input className="search-inp" placeholder="Search by case #, account, amend type, notes..." value={search} onChange={e=>setSearch(e.target.value)}/>
      </div>
      <div className="filter-row">
        {[["all","All"],["site","Site Comment"],["inbound","Inbound Email"]].map(([v,l])=>(<button key={v} className={cls("filter-btn",filterMode===v&&"active")} onClick={()=>setFilterMode(v)}>{l}</button>))}
        <input type="date" className="inp" style={{width:"auto",padding:"7px 12px",fontSize:12,marginLeft:"auto"}} value={filterDate} onChange={e=>setFilterDate(e.target.value)} title="Filter by date"/>
        {(search||filterDate||filterMode!=="all")&&<button className="filter-btn" onClick={()=>{setSearch("");setFilterDate("");setFilterMode("all");}}>✕ Clear</button>}
      </div>

      {filtered.length===0?(
        <div className="empty-history">
          <div style={{fontSize:52,marginBottom:14}}>📭</div>
          <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:18,fontWeight:800,marginBottom:6}}>{cases.length===0?"No cases yet":"No results"}</div>
          <div>{cases.length===0?"Complete and save a Post-Live Amend to see it here.":"Try adjusting your search or filters."}</div>
        </div>
      ):(
        filtered.map((c,i)=>(
          <EditableCaseCard key={c._id||i} c={c} onUpdate={onUpdate} onDelete={onDelete} onLightbox={setLightboxImg} openId={openCaseId} setOpenId={setOpenCaseId}/>
        ))
      )}

      {lightboxImg&&(<div className="lightbox-bg" onClick={()=>setLightboxImg(null)}><img className="lightbox-img" src={lightboxImg} alt="Screenshot"/></div>)}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ANNOUNCEMENTS
// ─────────────────────────────────────────────────────────────────────────────
function AnnouncementsPage({ announcements, addAnnouncement, removeAnnouncement, user }) {
  const [adding,setAdding]=useState(false);
  const [confirming,setConfirming]=useState(false);
  const [saving,setSaving]=useState(false);
  const [deleteTarget,setDeleteTarget]=useState(null);
  const [form,setForm]=useState({title:"",body:"",badge:"info"});
  const [toast,showToast]=useToast();

  const startPost=()=>{
    if(!form.title.trim())return showToast("Title required","error");
    setConfirming(true); // show confirm dialog first
  };

  const confirmPost=async()=>{
    setSaving(true);
    try{
      await addAnnouncement({...form,author:user.name,createdAt:new Date().toLocaleString()});
      setForm({title:"",body:"",badge:"info"});
      setAdding(false);setConfirming(false);
      showToast("✅ Announcement saved to database!");
    }catch(e){
      showToast("❌ Failed to save — check connection","error");
    }finally{setSaving(false);}
  };

  const confirmDelete=async()=>{
    if(!deleteTarget)return;
    try{
      await removeAnnouncement(deleteTarget);
      showToast("Removed","info");
    }catch(e){showToast("❌ Failed to delete","error");}
    setDeleteTarget(null);
  };

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
        <div><div className="page-title">📢 Announcements</div><div className="page-sub">Team updates and notices</div></div>
        <button className="btn btn-primary" onClick={()=>{setAdding(true);setConfirming(false);}}>＋ New Announcement</button>
      </div>

      {/* ── Write form ── */}
      {adding&&!confirming&&(<div className="modal-bg"><div className="edit-modal">
        <h3 style={{marginBottom:16}}>📢 New Announcement</h3>
        <div className="field"><label>Title <span className="req">*</span></label><input className="inp" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="Announcement title" autoFocus/></div>
        <div className="field"><label>Message</label><textarea className="inp" rows={4} value={form.body} onChange={e=>setForm(f=>({...f,body:e.target.value}))} placeholder="Write your message..."/></div>
        <div className="field"><label>Type</label><div className="radio-group">{[["info","ℹ️ Info"],["update","✅ Update"],["urgent","🚨 Urgent"]].map(([v,l])=>(<label key={v} className={cls("radio-label",form.badge===v&&"selected-clarif")}><input type="radio" checked={form.badge===v} onChange={()=>setForm(f=>({...f,badge:v}))}/>{l}</label>))}</div></div>
        <div className="modal-btns"><button className="btn btn-ghost" onClick={()=>setAdding(false)}>Cancel</button><button className="btn btn-primary" onClick={startPost}>Review & Post →</button></div>
      </div></div>)}

      {/* ── Confirm before saving to DB ── */}
      {confirming&&(<div className="modal-bg"><div className="modal">
        <div style={{fontSize:36,marginBottom:10}}>📢</div>
        <h3>Post Announcement?</h3>
        <p style={{color:"var(--muted)",fontSize:13,margin:"10px 0 4px"}}>Title: <strong style={{color:"var(--text)"}}>{form.title}</strong></p>
        {form.body&&<p style={{color:"var(--muted)",fontSize:12,marginBottom:4,maxHeight:80,overflow:"hidden",textOverflow:"ellipsis"}}>{form.body}</p>}
        <p style={{fontSize:12,color:"var(--muted)",marginBottom:16}}>This will be saved to the database and visible to your team.</p>
        <div className="modal-btns">
          <button className="btn btn-ghost" onClick={()=>setConfirming(false)} disabled={saving}>← Go Back</button>
          <button className="btn btn-primary" onClick={confirmPost} disabled={saving}>{saving?"Saving to DB…":"✅ Confirm & Post"}</button>
        </div>
      </div></div>)}

      {/* ── Delete confirm ── */}
      {deleteTarget&&(<div className="modal-bg"><div className="modal">
        <div style={{fontSize:36,marginBottom:10}}>🗑️</div>
        <h3>Delete Announcement?</h3>
        <p style={{color:"var(--muted)",fontSize:13,marginBottom:16}}>This will be permanently removed from the database.</p>
        <div className="modal-btns">
          <button className="btn btn-ghost" onClick={()=>setDeleteTarget(null)}>Cancel</button>
          <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
        </div>
      </div></div>)}

      {announcements.length===0&&(<div className="empty-history"><div style={{fontSize:52,marginBottom:14}}>📭</div><div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:18,fontWeight:800,marginBottom:6}}>No announcements</div><div>Post one to inform your team!</div></div>)}
      {announcements.map(a=>(
        <div key={a.id} className="announcement-card">
          <div className="ann-header">
            <div><div className="ann-title">{a.title}</div><div className="ann-meta">By {a.author} · {a.createdAt}</div></div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span className={cls("ann-badge",a.badge||"info")}>{a.badge==="urgent"?"🚨 Urgent":a.badge==="update"?"✅ Update":"ℹ️ Info"}</span>
              <button className="entry-del" onClick={()=>setDeleteTarget(a.id)}>🗑</button>
            </div>
          </div>
          {a.body&&<div className="ann-body">{a.body}</div>}
        </div>
      ))}
      <Toast msg={toast.msg} type={toast.type}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LINKS PAGE
// ─────────────────────────────────────────────────────────────────────────────
function LinksPage({ links, addLink, updateLink, removeLink }) {
  const [adding,setAdding]=useState(false);
  const [editing,setEditing]=useState(null); // link object being edited
  const [form,setForm]=useState({title:"",url:"",icon:"🔗"});
  const [editForm,setEditForm]=useState({title:"",url:"",icon:"🔗"});
  const [toast,showToast]=useToast();
  const ICONS=["🔗","📄","📊","🛠️","📧","🌐","📱","💼","📝","⚙️","🔑","📂","🏠","🎯","📌","💡","🔒","🚀","⭐","🧩"];

  const submit=()=>{
    if(!form.title.trim()||!form.url.trim())return showToast("Title and URL required","error");
    let url=form.url.trim();if(!url.startsWith("http"))url="https://"+url;
    addLink({...form,url});
    setForm({title:"",url:"",icon:"🔗"});setAdding(false);showToast("Link added!");
  };

  const startEdit=(l)=>{setEditing(l);setEditForm({title:l.title,url:l.url,icon:l.icon||"🔗"});};
  const saveEdit=()=>{
    if(!editForm.title.trim()||!editForm.url.trim())return showToast("Title and URL required","error");
    let url=editForm.url.trim();if(!url.startsWith("http"))url="https://"+url;
    updateLink(editing.id,{...editForm,url});
    setEditing(null);showToast("Link updated ✅");
  };
  const remove=(id)=>{removeLink(id);showToast("Link removed","info");};

  const iconPicker=(val,onChange)=>(
    <div style={{display:"flex",flexWrap:"wrap",gap:7,marginTop:4}}>
      {ICONS.map(ic=>(
        <button key={ic} style={{width:36,height:36,borderRadius:0,background:val===ic?"var(--entry-accent-bg)":"var(--card2)",border:val===ic?"1.5px solid var(--accent)":"1.5px solid var(--border)",fontSize:18,cursor:"pointer",transition:".15s"}} onClick={()=>onChange(ic)}>{ic}</button>
      ))}
    </div>
  );

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
        <div><div className="page-title">🔗 Quick Links</div><div className="page-sub">Custom links shown in the sidebar</div></div>
        <button className="btn btn-primary" onClick={()=>setAdding(true)}>＋ Add Link</button>
      </div>

      {/* Add modal */}
      {adding&&(<div className="modal-bg"><div className="edit-modal">
        <h3 style={{marginBottom:16}}>🔗 Add Quick Link</h3>
        <div className="field"><label>Label <span className="req">*</span></label><input className="inp" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="e.g. Salesforce" autoFocus/></div>
        <div className="field"><label>URL <span className="req">*</span></label><input className="inp" value={form.url} onChange={e=>setForm(f=>({...f,url:e.target.value}))} placeholder="https://..." onKeyDown={e=>e.key==="Enter"&&submit()}/></div>
        <div className="field"><label>Icon</label>{iconPicker(form.icon,ic=>setForm(f=>({...f,icon:ic})))}</div>
        <div className="modal-btns"><button className="btn btn-ghost" onClick={()=>setAdding(false)}>Cancel</button><button className="btn btn-primary" onClick={submit}>Add Link</button></div>
      </div></div>)}

      {/* Edit modal */}
      {editing&&(<div className="modal-bg"><div className="edit-modal">
        <h3 style={{marginBottom:16}}>✏️ Edit Link</h3>
        <div className="field"><label>Label <span className="req">*</span></label><input className="inp" value={editForm.title} onChange={e=>setEditForm(f=>({...f,title:e.target.value}))} autoFocus/></div>
        <div className="field"><label>URL <span className="req">*</span></label><input className="inp" value={editForm.url} onChange={e=>setEditForm(f=>({...f,url:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&saveEdit()}/></div>
        <div className="field"><label>Icon</label>{iconPicker(editForm.icon,ic=>setEditForm(f=>({...f,icon:ic})))}</div>
        <div className="modal-btns"><button className="btn btn-ghost" onClick={()=>setEditing(null)}>Cancel</button><button className="btn btn-save" onClick={saveEdit}>💾 Save Changes</button></div>
      </div></div>)}

      {links.length===0&&(<div className="empty-history"><div style={{fontSize:52,marginBottom:14}}>🔗</div><div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:18,fontWeight:800,marginBottom:6}}>No links yet</div><div>Add a link to have it appear in the sidebar.</div></div>)}

      {links.map(l=>(
        <div key={l.id} className="link-card">
          <div className="link-icon">{l.icon}</div>
          <div className="link-info"><div className="link-title">{l.title}</div><div className="link-url">{l.url}</div></div>
          <div className="link-actions">
            <a href={l.url} target="_blank" rel="noopener noreferrer" className="h-btn" style={{textDecoration:"none"}}>↗ Open</a>
            <button className="h-btn" style={{borderColor:"var(--accent)",color:"var(--accent)"}} onClick={()=>startEdit(l)}>✏️ Edit</button>
            <button className="h-btn danger" onClick={()=>remove(l.id)}>🗑</button>
          </div>
        </div>
      ))}
      <Toast msg={toast.msg} type={toast.type}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROFILE PAGE
// ─────────────────────────────────────────────────────────────────────────────
function ProfilePage({ user, setUser, onLogout }) {
  const [editing,setEditing]=useState(false);
  const [loading,setLoading]=useState(true);
  const [saving,setSaving]=useState(false);
  const [toast,showToast]=useToast();
  const avatarInputRef=useRef();

  const defNames=(name)=>{
    const n=(name||"User").trim().replace(/\s+/g,"_");
    return {beforeName:`Post_Live_Amend_Before_${n}_Amends`,afterName:`Post_Live_Amend_After_${n}_Amends`,screenshotName:`Post_Live_Amend_Screenshot_${n}_Amends`};
  };

  const [form,setForm]=useState({
    name:user.name||"",email:user.email||"",role:user.role||"",
    beforeName:user.beforeName||defNames(user.name).beforeName,
    afterName:user.afterName||defNames(user.name).afterName,
    screenshotName:user.screenshotName||defNames(user.name).screenshotName,
    avatarUrl:user.avatarUrl||"",
  });
  const [pwForm,setPwForm]=useState({next:"",confirm:""});

  // ── Load latest profile from DB on mount ──
  useEffect(()=>{
    fetch(`/api/profile?email=${encodeURIComponent(user.email)}`)
      .then(r=>r.json())
      .then(data=>{
        if(data && data.email){
          const merged={
            ...user,
            name:       data.name        || user.name,
            role:       data.role        || user.role||"",
            avatarUrl:  data.avatar_url  || user.avatarUrl||"",
            beforeName: data.before_name || user.beforeName||defNames(user.name).beforeName,
            afterName:  data.after_name  || user.afterName||defNames(user.name).afterName,
            screenshotName: data.screenshot_name || user.screenshotName||defNames(user.name).screenshotName,
          };
          setForm(f=>({...f,
            name:merged.name,role:merged.role,avatarUrl:merged.avatarUrl,
            beforeName:merged.beforeName,afterName:merged.afterName,screenshotName:merged.screenshotName,
          }));
          // Sync to localStorage so rest of app sees it
          localStorage.setItem("ch_user",JSON.stringify(merged));
          setUser(merged);
        }
      })
      .catch(()=>{})
      .finally(()=>setLoading(false));
  },[]);

  // ── Save profile to DB ──
  const saveProfile=async()=>{
    if(!form.name.trim())return showToast("Name required","error");
    setSaving(true);
    try{
      const payload={
        email:user.email,
        name:form.name,
        role:form.role,
        before_name:form.beforeName,
        after_name:form.afterName,
        screenshot_name:form.screenshotName,
        avatar_url:form.avatarUrl||null,
      };
      const res=await fetch("/api/profile",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
      const data=await res.json();
      if(!res.ok)return showToast(data.error||"Error saving profile","error");
      // Update local state and localStorage
      const updated={...user,...form,
        beforeName:form.beforeName,afterName:form.afterName,
        screenshotName:form.screenshotName,avatarUrl:form.avatarUrl||user.avatarUrl||""};
      localStorage.setItem("ch_user",JSON.stringify(updated));
      setUser(updated);
      setEditing(false);
      showToast("Profile saved ✅");
    }catch(e){showToast("Error saving profile","error");}
    finally{setSaving(false);}
  };

  // ── Avatar upload ──
  const handleAvatarChange=async(e)=>{
    const file=e.target.files?.[0]; if(!file)return;
    setForm(f=>({...f,avatarUrl:URL.createObjectURL(file)})); // preview
    try{
      const reader=new FileReader();
      reader.onload=async(ev)=>{
        const res=await fetch("/api/images/upload",{method:"POST",headers:{"Content-Type":"application/json"},
          body:JSON.stringify({fileBase64:ev.target.result,fileName:`avatar_${user.id}`,mimeType:file.type||"image/jpeg"})});
        const data=await res.json();
        if(res.ok){
          const newUrl=data.url;
          setForm(f=>({...f,avatarUrl:newUrl}));
          // Immediately persist to DB so it isn't lost
          await fetch("/api/profile",{method:"POST",headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email:user.email,avatar_url:newUrl})});
          const updated={...user,avatarUrl:newUrl};
          localStorage.setItem("ch_user",JSON.stringify(updated));
          setUser(updated);
          showToast("Photo updated ✅");
        }else{ showToast("Upload failed","error"); }
      };
      reader.readAsDataURL(file);
    }catch(e){ showToast("Upload error","error"); }
  };

  // ── Change password (still uses Supabase Auth via access token) ──
  const changePw=async()=>{
    if(pwForm.next.length<6)return showToast("Min. 6 characters","error");
    if(pwForm.next!==pwForm.confirm)return showToast("Passwords don't match","error");
    setSaving(true);
    try{
      const accessToken=localStorage.getItem("ch_token");
      const res=await fetch("/api/auth/password",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({accessToken,newPassword:pwForm.next})});
      const data=await res.json();
      if(!res.ok)return showToast(data.error||"Error","error");
      setPwForm({next:"",confirm:""});showToast("Password changed ✅");
    }catch(e){showToast("Error","error");}
    finally{setSaving(false);}
  };

  const initials=(form.name||user.name).split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();

  return (
    <div>
      <div className="page-header"><div className="page-title">👤 My Profile</div><div className="page-sub">Manage your account details and file naming</div></div>
      {loading&&<div style={{textAlign:"center",padding:"40px 0",color:"var(--muted)"}}>Loading profile…</div>}
      {!loading&&<>

      {/* ── Info card ── */}
      <div className="profile-card">
        <div style={{display:"flex",alignItems:"center",gap:20,marginBottom:20}}>
          <div className="profile-avatar-large" title="Click to change photo" onClick={()=>avatarInputRef.current?.click()}>
            {form.avatarUrl?<img src={form.avatarUrl} alt="Profile"/>:<span>{initials}</span>}
            <div className="profile-avatar-overlay">📷</div>
            <input ref={avatarInputRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{display:"none"}}/>
          </div>
          <div>
            <h3 style={{fontSize:20,fontWeight:800}}>{form.name||user.name}</h3>
            <p style={{color:"var(--muted)",fontSize:13,marginTop:3}}>{user.email}</p>
            {form.role&&<p style={{fontSize:12,color:"var(--accent)",marginTop:3,fontWeight:600}}>{form.role}</p>}
          </div>
          <div style={{marginLeft:"auto"}}><button className="btn btn-ghost" onClick={()=>setEditing(e=>!e)}>{editing?"Cancel":"✏️ Edit Profile"}</button></div>
        </div>
        {editing&&(<div style={{borderTop:"1px solid var(--border)",paddingTop:20}}>
          <div className="field"><label>Full Name</label><input className="inp" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/></div>
          <div className="field"><label>Role / Title</label><input className="inp" value={form.role} onChange={e=>setForm(f=>({...f,role:e.target.value}))} placeholder="e.g. Web Specialist"/></div>
          <button className="btn btn-primary" onClick={saveProfile} disabled={saving}>{saving?"Saving...":"Save Changes"}</button>
        </div>)}
      </div>

      {/* ── File naming card ── */}
      <div className="profile-card">
        <h3 style={{fontSize:16,fontWeight:700,marginBottom:4}}>🖼️ Screenshot File Names</h3>
        <p style={{fontSize:12,color:"var(--muted)",marginBottom:16}}>These names are used when uploading screenshots in Post-Live Amends. Fully independent from your profile name.</p>
        <div className="field">
          <label>Before Screenshot Name</label>
          <input className="inp" value={form.beforeName||""} onChange={e=>setForm(f=>({...f,beforeName:e.target.value}))}/>
          <div style={{fontSize:11,color:"var(--muted)",marginTop:4}}>Used in: Step 2 — Before Screenshot</div>
        </div>
        <div className="field">
          <label>After / Main Screenshot Name</label>
          <input className="inp" value={form.afterName||""} onChange={e=>setForm(f=>({...f,afterName:e.target.value}))}/>
          <div style={{fontSize:11,color:"var(--muted)",marginTop:4}}>Used in: Step 5 — After Screenshot</div>
        </div>
        <div className="field">
          <label>Backup Screenshot Name</label>
          <input className="inp" value={form.screenshotName||""} onChange={e=>setForm(f=>({...f,screenshotName:e.target.value}))}/>
          <div style={{fontSize:11,color:"var(--muted)",marginTop:4}}>Used in: Step 6 — Backup Screenshots</div>
        </div>
        <button className="btn btn-primary" onClick={saveProfile} disabled={saving}>{saving?"Saving...":"💾 Save File Names"}</button>
      </div>

      {/* ── Password card ── */}
      <div className="profile-card">
        <h3 style={{fontSize:16,fontWeight:700,marginBottom:16}}>🔒 Change Password</h3>
        <div className="field"><label>New Password</label><input className="inp" type="password" placeholder="Min. 6 characters" value={pwForm.next} onChange={e=>setPwForm(f=>({...f,next:e.target.value}))}/></div>
        <div className="field"><label>Confirm New Password</label><input className="inp" type="password" placeholder="••••••••" value={pwForm.confirm} onChange={e=>setPwForm(f=>({...f,confirm:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&changePw()}/></div>
        <button className="btn btn-primary" onClick={changePw} disabled={saving}>{saving?"Updating...":"Update Password"}</button>
      </div>

      {/* ── Danger zone ── */}
      <div className="profile-card" style={{borderColor:"rgba(244,63,94,.3)"}}>
        <h3 style={{fontSize:16,fontWeight:700,marginBottom:8,color:"var(--red)"}}>⚠️ Danger Zone</h3>
        <p style={{color:"var(--muted)",fontSize:13,marginBottom:14}}>Signing out will end your current session.</p>
        <button className="btn btn-danger" onClick={onLogout}>🚪 Sign Out</button>
      </div>
      </>}
      <Toast msg={toast.msg} type={toast.type}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTH PAGES
// ─────────────────────────────────────────────────────────────────────────────
function AuthLogo() {
  return (
    <div className="auth-logo">
      <div className="auth-logo-icon">⚡</div>
      <div className="auth-logo-text">Case<span>Hub</span></div>
    </div>
  );
}

function LoginPage({ onLogin, goSignup }) {
  const [form,setForm]=useState({email:"",password:""});
  const [err,setErr]=useState("");
  const [loading,setLoading]=useState(false);
  const submit=async()=>{
    if(!form.email||!form.password){setErr("Please fill all fields");return;}
    setLoading(true);setErr("");
    try{
      const res=await fetch("/api/auth/signin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
      const data=await res.json();
      if(!res.ok){setErr(data.error||"Sign in failed");return;}
      // Persist session to localStorage
      localStorage.setItem("ch_token",data.access_token);
      localStorage.setItem("ch_refresh",data.refresh_token);
      localStorage.setItem("ch_user",JSON.stringify(data.user));
      onLogin(data.user);
    }catch(e){setErr("Network error — please try again");}
    finally{setLoading(false);}
  };
  return (
    <div className="auth-page">
      <div className="auth-card">
        <AuthLogo/>
        <div className="auth-title">Welcome back</div>
        <div className="auth-sub">Sign in to your CaseHub workspace</div>
        {err&&<div style={{background:"var(--btn-cancel-bg)",border:"1px solid var(--btn-cancel-border)",color:"var(--btn-cancel-text)",borderRadius:0,padding:"10px 14px",fontSize:13,marginBottom:16,textAlign:"center"}}>{err}</div>}
        <div className="field"><label>Email</label><input className="inp" type="email" placeholder="you@email.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&submit()} disabled={loading}/></div>
        <div className="field"><label>Password</label><input className="inp" type="password" placeholder="••••••••" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&submit()} disabled={loading}/></div>
        <button className="btn btn-save" style={{width:"100%",justifyContent:"center",marginTop:4}} onClick={submit} disabled={loading}>{loading?"Signing in...":"Sign In →"}</button>
        <div className="auth-divider">or</div>
        <div style={{textAlign:"center",fontSize:13,color:"var(--muted)"}}>Don't have an account? <button className="auth-link" onClick={goSignup}>Sign up</button></div>
      </div>
    </div>
  );
}

function SignupPage({ onSignup, goLogin }) {
  const [form,setForm]=useState({name:"",email:"",password:"",confirm:""});
  const [err,setErr]=useState("");
  const [loading,setLoading]=useState(false);
  const submit=async()=>{
    if(!form.name||!form.email||!form.password){setErr("Please fill all fields");return;}
    if(form.password.length<6){setErr("Password must be at least 6 characters");return;}
    if(form.password!==form.confirm){setErr("Passwords do not match");return;}
    setLoading(true);setErr("");
    try{
      const res=await fetch("/api/auth/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
      const data=await res.json();
      if(!res.ok){setErr(data.error||"Sign up failed");return;}
      // Email confirmation required (Supabase default)
      if(data.needsConfirmation){
        setErr(""); 
        setForm(f=>({...f,_confirmed:true,_msg:data.message}));
        return;
      }
      localStorage.setItem("ch_token",data.access_token);
      localStorage.setItem("ch_refresh",data.refresh_token);
      localStorage.setItem("ch_user",JSON.stringify(data.user));
      onSignup(data.user);
    }catch(e){setErr("Network error — please try again");}
    finally{setLoading(false);}
  };
  return (
    <div className="auth-page">
      <div className="auth-card">
        <AuthLogo/>
        <div className="auth-title">Create account</div>
        <div className="auth-sub">Join your CaseHub workspace</div>
        {err&&<div style={{background:"var(--btn-cancel-bg)",border:"1px solid var(--btn-cancel-border)",color:"var(--btn-cancel-text)",borderRadius:0,padding:"10px 14px",fontSize:13,marginBottom:16,textAlign:"center"}}>{err}</div>}
        {form._confirmed&&<div style={{background:"rgba(16,185,129,.1)",border:"1px solid var(--green)",color:"var(--green)",borderRadius:0,padding:"14px",fontSize:13,marginBottom:16,textAlign:"center",lineHeight:1.6}}>✅ Account created!<br/><span style={{opacity:.8,fontSize:12}}>{form._msg}</span><br/><button className="auth-link" style={{marginTop:8,display:"block",textAlign:"center"}} onClick={goLogin}>← Back to Sign In</button></div>}
        {!form._confirmed&&<><div className="field"><label>Full Name</label><input className="inp" placeholder="Your name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} disabled={loading}/></div>
        <div className="field"><label>Email</label><input className="inp" type="email" placeholder="you@email.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} disabled={loading}/></div>
        <div className="field"><label>Password</label><input className="inp" type="password" placeholder="Min. 6 characters" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} disabled={loading}/></div>
        <div className="field"><label>Confirm Password</label><input className="inp" type="password" placeholder="••••••••" value={form.confirm} onChange={e=>setForm(f=>({...f,confirm:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&submit()} disabled={loading}/></div></>}
        {!form._confirmed&&<button className="btn btn-save" style={{width:"100%",justifyContent:"center",marginTop:4}} onClick={submit} disabled={loading}>{loading?"Creating account...":"Create Account →"}</button>}
        {!form._confirmed&&<><div className="auth-divider">or</div>
        <div style={{textAlign:"center",fontSize:13,color:"var(--muted)"}}>Already have an account? <button className="auth-link" onClick={goLogin}>Sign in</button></div></>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────────────
function App() {
  const [authPage,setAuthPage]=useState("login");
  const [user,setUser]=useState(null);
  const [sessionChecked,setSessionChecked]=useState(false); // prevents flash of login screen
  const [page,setPage]=useState("dashboard");
  const [pendingPage,setPendingPage]=useState(null);
  const [navConfirm,setNavConfirm]=useState(false);
  const dbStatus = useDbStatus();
  const [allCases,setAllCases]=useState([]);
  const [drafts,setDrafts]=useState([]);
  const [formActive,setFormActive]=useState(false);
  const [lightMode,setLightMode]=useState(()=>{
    if(typeof window!=="undefined"){return localStorage.getItem("ch_theme")==="light";}
    return false;
  });
  const [specialRequestors,setSpecialRequestors]=useState([]);
  const [announcements,setAnnouncements]=useState([]); // always loaded from DB
  const [links,setLinks]=useState([]);
  const [dataLoading,setDataLoading]=useState(false);
  const [breakTimer,setBreakTimer]=useState(null); // {label,endsAt,warnAt,warned,ended}

  useEffect(()=>{document.body.classList.toggle("light",lightMode);if(typeof window!=="undefined") localStorage.setItem("ch_theme",lightMode?"light":"dark");},[lightMode]);

  // ── Break timer tick + alarm ──
  useEffect(()=>{
    if(!breakTimer)return;
    const tick=setInterval(()=>{
      const now=Date.now();
      setBreakTimer(bt=>{
        if(!bt)return null;
        const secsLeft=Math.ceil((bt.endsAt-now)/1000);
        // 5-min warning
        if(!bt.warned && now>=bt.warnAt){
          playAlarm("warn");
          return {...bt,warned:true};
        }
        // Timer ended
        if(!bt.ended && secsLeft<=0){
          playAlarm("end");
          return {...bt,ended:true,secsLeft:0};
        }
        return {...bt,secsLeft:Math.max(0,secsLeft)};
      });
    },500);
    return()=>clearInterval(tick);
  },[breakTimer]);

  function playAlarm(type){
    try{
      const ctx=new (window.AudioContext||window.webkitAudioContext)();
      const beeps=type==="warn"?2:4;
      for(let i=0;i<beeps;i++){
        const o=ctx.createOscillator();
        const g=ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.frequency.value=type==="warn"?880:1046;
        o.type="sine";
        g.gain.setValueAtTime(0,ctx.currentTime+i*0.4);
        g.gain.linearRampToValueAtTime(0.4,ctx.currentTime+i*0.4+0.05);
        g.gain.linearRampToValueAtTime(0,ctx.currentTime+i*0.4+0.3);
        o.start(ctx.currentTime+i*0.4);
        o.stop(ctx.currentTime+i*0.4+0.35);
      }
    }catch(e){console.warn("Audio error",e);}
  }

  function startBreak(label,mins){
    const now=Date.now();
    const endsAt=now+mins*60*1000;
    const warnAt=endsAt-5*60*1000;
    setBreakTimer({label,mins,endsAt,warnAt,warned:warnAt<=now,ended:false,secsLeft:mins*60});
  }
  function stopBreak(){setBreakTimer(null);}

  // ── Play alarm when case timer hits 0 (passed as prop to PostLiveForm) ──
  const playEndAlarm=useCallback(()=>playAlarm("end"),[]);

  // ── On mount: restore session from localStorage ──
  useEffect(()=>{
    const tryRestore=async()=>{
      const stored=localStorage.getItem("ch_user");
      const refresh=localStorage.getItem("ch_refresh");
      if(!stored||!refresh){setSessionChecked(true);return;}
      try{
        const res=await fetch("/api/auth/refresh",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({refresh_token:refresh})});
        if(res.ok){
          const data=await res.json();
          localStorage.setItem("ch_token",data.access_token);
          localStorage.setItem("ch_refresh",data.refresh_token);
          localStorage.setItem("ch_user",JSON.stringify(data.user));
          setUser(data.user);
        }else{
          // Session expired or invalid — clear and show login
          const errData=await res.json().catch(()=>({}));
          console.warn("Session refresh failed:",errData.error||res.status);
          localStorage.removeItem("ch_token");
          localStorage.removeItem("ch_refresh");
          localStorage.removeItem("ch_user");
        }
      }catch(e){
        // Network error — try using cached user anyway
        try{setUser(JSON.parse(stored));}catch(_){}
      }
      setSessionChecked(true);
    };
    tryRestore();
  },[]);

  // ── Load all data when user is set ──
  useEffect(()=>{
    if(!user)return;
    setDataLoading(true);
    Promise.all([
      fetch(`/api/cases?email=${encodeURIComponent(user.email)}`).then(r=>r.json()).catch(()=>[]),
      fetch("/api/announcements").then(r=>r.json()).catch(()=>[]),
      fetch(`/api/links?email=${encodeURIComponent(user.email)}`).then(r=>r.json()).catch(()=>[]),
      fetch("/api/requestors").then(r=>r.json()).catch(()=>[]),
      fetch(`/api/drafts?email=${encodeURIComponent(user.email)}`).then(r=>r.json()).catch(()=>[]),
      fetch(`/api/profile?email=${encodeURIComponent(user.email)}`).then(r=>r.json()).catch(()=>({})),
    ]).then(([cases,anns,lnks,reqs,draftList,profile])=>{
      setAllCases(Array.isArray(cases)?cases:[]);
      setAnnouncements(Array.isArray(anns)?anns:[]);
      setLinks(Array.isArray(lnks)?lnks:[]);
      setSpecialRequestors(Array.isArray(reqs)?reqs:[]);
      setDrafts(Array.isArray(draftList)?draftList:[]);
      // Merge profile data into user object so filenames/avatar are always current
      if(profile && profile.email){
        const merged={...user,
          name:       profile.name         || user.name,
          role:       profile.role         || user.role||"",
          avatarUrl:  profile.avatar_url   || user.avatarUrl||"",
          beforeName: profile.before_name  || user.beforeName||"",
          afterName:  profile.after_name   || user.afterName||"",
          screenshotName: profile.screenshot_name || user.screenshotName||"",
        };
        localStorage.setItem("ch_user",JSON.stringify(merged));
        setUser(merged);
      }
    }).catch(console.error).finally(()=>setDataLoading(false));
  },[user?.email]);

  // ── Cases ──
  const addCase=async(c)=>{
    try{
      // Upload any RAM (blob) images to Supabase Storage before saving the case
      const uploadPending=async(imgs)=>{
        return Promise.all((imgs||[]).map(async(img)=>{
          if(img._inDB||!img._file)return{url:img.url,name:img.name,id:img.id||img.path,path:img.path||img.id};
          const uploaded=await uploadImageToStorage(img._file,img.name);
          return uploaded?{url:uploaded.url,name:uploaded.name,id:uploaded.path,path:uploaded.path}:{url:img.url,name:img.name,id:img.id,path:img.id};
        }));
      };
      const [uploadedImages,uploadedBackup]=await Promise.all([uploadPending(c.images),uploadPending(c.backupImages)]);
      const payload={
        ...c,
        userEmail:user.email,
        images:uploadedImages,
        backupImages:uploadedBackup,
        entries:(c.entries||[]).map(({_file,...rest})=>rest),
      };
      const res=await fetch("/api/cases",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
      const saved=await res.json();
      if(!res.ok){console.error("addCase API error:",saved.error);return;}
      setAllCases(a=>[saved,...a]);
      dbStatus.markSaved();
    }catch(e){
      console.error("addCase exception:",e);
    }
  };
  const updateCase=async(id,updated)=>{
    try{
      // EditableCaseCard already uploads immediately, but strip any residual _file refs
      const cleanImgs=(imgs)=>(imgs||[]).map(({_file,url,name,id,path,_inDB})=>({url,name,id,path:path||id,_inDB:_inDB||false}));
      const payload={
        ...updated,
        userEmail:user.email,
        images:cleanImgs(updated.images),
        backupImages:cleanImgs(updated.backupImages),
        entries:(updated.entries||[]).map(({_file,...rest})=>rest),
      };
      const res=await fetch(`/api/cases/${id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
      const saved=await res.json();
      if(!res.ok){console.error("updateCase error:",saved.error);return;}
      setAllCases(a=>a.map(c=>c._id===id?saved:c));
      dbStatus.markSaved();
    }catch(e){console.error("updateCase exception:",e);}
  };
  const deleteCase=async(id)=>{
    try{await fetch(`/api/cases/${id}`,{method:"DELETE"});}catch(e){console.error(e);}
    setAllCases(a=>a.filter(c=>c._id!==id));
  };

  // ── Drafts ──
  const saveDraft=async(mode,draftData)=>{
    // Strip File objects before saving
    const clean=(imgs)=>(imgs||[]).map(({file,url,name,id,path,type})=>({url,name,id,path:path||id||name,type}));
    const cleanData={...draftData,images:clean(draftData.images),backupImages:clean(draftData.backupImages)};
    try{
      const res=await fetch("/api/drafts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userEmail:user.email,mode,draftData:cleanData})});
      const saved=await res.json();
      if(res.ok){setDrafts(ds=>[...ds.filter(d=>d._mode!==mode),saved]);}
    }catch(e){console.error("saveDraft error:",e);}
  };
  const deleteDraft=async(id,mode)=>{
    try{await fetch(`/api/drafts/${id}`,{method:"DELETE"});}catch(e){console.error(e);}
    setDrafts(ds=>ds.filter(d=>d._id!==id&&d._mode!==mode));
  };

  // ── Announcements ──
  const addAnnouncement=async(a)=>{
    const res=await fetch("/api/announcements",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});
    const saved=await res.json();
    if(!res.ok)throw new Error(saved.error||"Failed to save announcement");
    setAnnouncements(p=>[saved,...p]); // only update state after DB confirms
  };
  const removeAnnouncement=async(id)=>{
    const res=await fetch(`/api/announcements/${id}`,{method:"DELETE"});
    if(!res.ok){const d=await res.json().catch(()=>({}));throw new Error(d.error||"Failed to delete");}
    setAnnouncements(a=>a.filter(x=>x.id!==id)); // only remove after DB confirms
  };

  // ── Links ──
  const addLink=async(l)=>{
    try{
      const res=await fetch("/api/links",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...l,userEmail:user.email})});
      const saved=await res.json();
      setLinks(p=>[...p,saved]);
    }catch(e){console.error(e);setLinks(p=>[...p,{...l,id:Date.now()}]);}
  };
  const updateLink=async(id,updates)=>{
    try{
      const res=await fetch(`/api/links/${id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(updates)});
      const saved=await res.json();
      if(res.ok) setLinks(l=>l.map(x=>x.id===id?saved:x));
    }catch(e){console.error(e);}
  };
  const removeLink=async(id)=>{
    try{await fetch(`/api/links/${id}`,{method:"DELETE"});}catch(e){console.error(e);}
    setLinks(l=>l.filter(x=>x.id!==id));
  };

  // ── Requestors ──
  const addRequestor=async(name)=>{
    try{await fetch("/api/requestors",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name})});}catch(e){console.error(e);}
    setSpecialRequestors(s=>[...s,name]);
  };
  const removeRequestor=async(name)=>{
    try{await fetch(`/api/requestors/${encodeURIComponent(name)}`,{method:"DELETE"});}catch(e){console.error(e);}
    setSpecialRequestors(s=>s.filter(x=>x!==name));
  };

  const handleNav=(id)=>{
    if(id===page)return;
    if(page==="postlive"&&formActive){setPendingPage(id);setNavConfirm(true);}
    else setPage(id);
  };

  const logout=()=>{
    localStorage.removeItem("ch_token");
    localStorage.removeItem("ch_refresh");
    localStorage.removeItem("ch_user");
    setUser(null);setAuthPage("login");setPage("dashboard");
    setAllCases([]);setDrafts([]);setLinks([]);setAnnouncements([]);setSpecialRequestors([]);
  };

  // ── Show nothing while checking stored session (prevents login flash) ──
  if(!sessionChecked){
    return (
      <>
        <style>{CSS}</style>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"var(--bg)",flexDirection:"column",gap:16}}>
          <div style={{fontSize:52,animation:"float 1.5s ease-in-out infinite"}}>⚡</div>
          <div style={{color:"var(--muted)",fontSize:14,fontFamily:"Poppins,sans-serif"}}>Loading CaseHub...</div>
        </div>
      </>
    );
  }

  // ── Auth screens ──
  if(!user){
    if(authPage==="signup") return <><style>{CSS}</style><SignupPage onSignup={(u)=>setUser(u)} goLogin={()=>setAuthPage("login")}/></>;
    return <><style>{CSS}</style><LoginPage onLogin={(u)=>setUser(u)} goSignup={()=>setAuthPage("signup")}/></>;
  }

  const coreNav=[
    {id:"dashboard",label:"Dashboard",icon:"🏠"},
    {group:"Work"},
    {id:"build",label:"Build",icon:"🏗️"},
    {id:"prelive",label:"Pre-Live Amends",icon:"🔧"},
    {id:"postlive",label:"Post-Live Amends",icon:"🚀"},
    {id:"history",label:"Case History",icon:"📂"},
    {group:"Tools"},
    {id:"announcements",label:"Announcements",icon:"📢"},
    {id:"links",label:"Quick Links",icon:"🔗"},
  ];

  const initials=user.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();

  return (
    <>
      <style>{CSS}</style>
      <div className="shell">
        <aside className="sidebar">
          <div className="logo">
            <div className="logo-icon">⚡</div>
            <div className="logo-text">Case<span>Hub</span></div>
          </div>

          {coreNav.map((n,i)=>
            n.group
              ?<div key={i} className="nav-group">{n.group}</div>
              :<button key={n.id} className={cls("nav-item",page===n.id&&"active")} onClick={()=>handleNav(n.id)}>
                <span>{n.icon}</span>{n.label}
                {n.id==="history"&&allCases.length>0&&<span className="nav-badge">{allCases.length}</span>}
                {n.id==="announcements"&&announcements.length>0&&<span className="nav-badge">{announcements.length}</span>}
              </button>
          )}

          {links.length>0&&(<>
            <div className="nav-group">Custom Links</div>
            {links.map(l=>(<a key={l.id} href={l.url} target="_blank" rel="noopener noreferrer" className={cls("nav-custom-link")}>{l.icon} {l.title}</a>))}
          </>)}

          <div style={{height:1,background:"var(--border)",margin:"12px 0 10px"}}/>
          {/* Break Timers */}
          <div className="nav-group">☕ Breaks</div>
          <div className="break-btns">
            {[{label:"☕ 15 min break",mins:15},{label:"🧘 30 min break",mins:30},{label:"🍱 Lunch 1h",mins:60}].map(({label,mins})=>(
              <button key={mins} className={cls("break-btn",breakTimer&&breakTimer.mins===mins&&"active")} onClick={()=>breakTimer?.mins===mins?stopBreak():startBreak(label,mins)}>
                <span>{label.split(" ")[0]}</span>
                <span style={{flex:1}}>{label.split(" ").slice(1).join(" ")}</span>
                {breakTimer?.mins===mins&&<span style={{fontSize:10,color:"var(--accent)"}}>▶</span>}
              </button>
            ))}
          </div>
          <div style={{height:1,background:"var(--border)",margin:"4px 0 10px"}}/>
          <div className="sidebar-profile" onClick={()=>handleNav("profile")}>
            <div className="profile-avatar" style={{overflow:"hidden",padding:0}}>
              {user.avatarUrl?<img src={user.avatarUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%"}}/>:<span>{initials}</span>}
            </div>
            <div><div className="profile-name">{user.name}</div><div className="profile-role">{user.role||"User"}</div></div>
          </div>
          <button className="theme-toggle" onClick={()=>setLightMode(l=>!l)}>
            <span>{lightMode?"🌙":"☀️"}</span>
            <span style={{flex:1,textAlign:"left"}}>{lightMode?"Dark Mode":"Light Mode"}</span>
            <div className={cls("toggle-track",!lightMode&&"on")}><div className="toggle-thumb"/></div>
          </button>

          {/* ── DB Status ── */}
          <div className={cls("db-status", dbStatus.status)} title={dbStatus.latency?`${dbStatus.latency}ms`:undefined} onClick={dbStatus.recheck} style={{cursor:"pointer"}}>
            <div className={cls("db-dot", dbStatus.status)}/>
            <div style={{flex:1,minWidth:0}}>
              {dbStatus.status==="connected"&&<span>DB Connected{dbStatus.latency?` · ${dbStatus.latency}ms`:""}</span>}
              {dbStatus.status==="connecting"&&<span>Connecting…</span>}
              {dbStatus.status==="error"&&<span>DB Offline ⚠</span>}
              {dbStatus.lastSaved&&<div style={{fontSize:9,opacity:.7,marginTop:1}}>Saved {dbStatus.lastSaved.toLocaleTimeString()}</div>}
            </div>
            {dbStatus.status==="error"&&<span style={{fontSize:9,opacity:.7}}>tap to retry</span>}
          </div>
        </aside>

        <main className="main-area" style={{paddingBottom:breakTimer?80:32}}>
          {dataLoading&&<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"80vh",flexDirection:"column",gap:16}}><div style={{fontSize:48,animation:"float 1.5s ease-in-out infinite"}}>⚡</div><div style={{color:"var(--muted)",fontSize:13,fontFamily:"Poppins,sans-serif"}}>Loading your workspace...</div></div>}
          {!dataLoading&&page==="dashboard"&&<Dashboard savedCases={allCases} setPage={setPage} specialRequestors={specialRequestors} addRequestor={addRequestor} removeRequestor={removeRequestor} user={user}/>}
          {!dataLoading&&page==="build"&&<div className="soon-wrap"><div className="soon-badge">🏗️</div><div className="soon-title">Build</div><div className="soon-sub">Coming soon — hang tight!</div></div>}
          {!dataLoading&&page==="prelive"&&<div className="soon-wrap"><div className="soon-badge">🔧</div><div className="soon-title">Pre-Live Amends</div><div className="soon-sub">Coming soon — hang tight!</div></div>}
          {!dataLoading&&page==="postlive"&&<PostLivePage onSaveCase={addCase} onFormActive={setFormActive} allSavedCases={allCases} dbDrafts={drafts} onSaveDraft={saveDraft} onDeleteDraft={deleteDraft} user={user} onTimerEnd={playEndAlarm}/>}
          {!dataLoading&&page==="history"&&<CaseHistory cases={allCases} onUpdate={updateCase} onDelete={deleteCase}/>}
          {!dataLoading&&page==="announcements"&&<AnnouncementsPage announcements={announcements} addAnnouncement={addAnnouncement} removeAnnouncement={removeAnnouncement} user={user}/>}
          {!dataLoading&&page==="links"&&<LinksPage links={links} addLink={addLink} updateLink={updateLink} removeLink={removeLink}/>}
          {!dataLoading&&page==="profile"&&<ProfilePage user={user} setUser={setUser} onLogout={logout}/>}
        </main>
      </div>

      {/* ── Break Timer Bar ── */}
      {breakTimer&&(()=>{
        const pct=breakTimer.ended?100:Math.round((1-(breakTimer.secsLeft/(breakTimer.mins*60)))*100);
        const st=breakTimer.ended?"ended":breakTimer.warned?"warn":"";
        const mm=Math.floor((breakTimer.secsLeft||0)/60);
        const ss=String((breakTimer.secsLeft||0)%60).padStart(2,"0");
        return (
          <div className={cls("break-bar",st)}>
            <span style={{fontSize:18}}>{breakTimer.label.split(" ")[0]}</span>
            <div>
              <div className="break-label">{breakTimer.label.split(" ").slice(1).join(" ")}</div>
              <div style={{fontSize:10,color:"var(--muted)"}}>
                {breakTimer.ended?"✅ Break over!":breakTimer.warned?"⚠️ 5 min warning!":"On break"}
              </div>
            </div>
            <div className="break-time">{breakTimer.ended?"Done!":mm+":"+ss}</div>
            <div className="break-progress" style={{flex:1}}>
              <div className="break-progress-fill" style={{width:pct+"%"}}/>
            </div>
            <button className="break-stop" onClick={stopBreak}>✕ End</button>
          </div>
        );
      })()}

      {navConfirm&&(<div className="modal-bg"><div className="modal"><div style={{fontSize:36,marginBottom:10}}>⚠️</div><h3>Leave Page?</h3><p>You have an unsaved form open. Leaving will discard all changes.</p><div className="modal-btns"><button className="btn btn-ghost" onClick={()=>{setNavConfirm(false);setPendingPage(null);}}>Stay</button><button className="btn btn-danger" onClick={()=>{setPage(pendingPage);setPendingPage(null);setNavConfirm(false);setFormActive(false);}}>Leave</button></div></div></div>)}
    </>
  );
}

export default function CaseHubPage(){return <App/>}