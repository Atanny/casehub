import { useState, useRef, useEffect, useCallback } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'


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
  --accent:#f5945c;--accent2:#d4724a;--green:#10b981;--red:#f43f5e;--amber:#f59e0b;
  --text:#edf2f7;--muted:#7a8ba0;--radius:0px;
  --inp-bg:#0f1420;--entry-bg:#0f1420;--sum-bg:#0a0f1a;--code-bg:#0f1420;
  --shadow:0 8px 32px rgba(0,0,0,.5);--shadow-sm:0 2px 12px rgba(0,0,0,.3);
  --btn-cancel-bg:rgba(244,63,94,.12);--btn-cancel-border:#f43f5e;--btn-cancel-text:#fda4af;
  --btn-draft-bg:rgba(245,158,11,.1);--btn-draft-border:#f59e0b;--btn-draft-text:#fcd34d;
  --btn-save-bg:linear-gradient(135deg,#f5945c,#d4724a);
  --btn-ghost-bg:#1a2235;--btn-ghost-border:#232e44;--btn-ghost-text:#7a8ba0;
  --nav-active-bg:linear-gradient(135deg,rgba(245,148,92,.15),rgba(212,114,74,.15));
  --nav-active-border:rgba(245,148,92,.4);
  --h-badge-site-bg:rgba(245,148,92,.15);--h-badge-email-bg:rgba(212,114,74,.15);
  --quick-hover:rgba(245,148,92,.08);--choice-hover:rgba(245,148,92,.08);
  --entry-accent-bg:rgba(245,148,92,.1);
  --glass-bg:rgba(20,27,40,.55);--glass-border:rgba(255,255,255,.07);--glass-blur:blur(18px);
  --glass-shadow:0 8px 32px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.06);
}
/* ══════════════════════ LIGHT THEME ══════════════════════ */
body.light,:root.light{
  --bg:linear-gradient(135deg,#fef3ec 0%,#fde8d8 50%,#fef0e8 100%);--surface:#fdf5ef;--card:#fff8f3;--card2:#fef0e6;--border:#f0d5c0;
  --text:#1a0f08 !important;--muted:#6b4e38 !important;
  --inp-bg:#fff8f3;--entry-bg:#fef0e6;--sum-bg:#fef0e6;--code-bg:#fef0e6;
  --shadow:0 8px 32px rgba(180,90,40,.1);--shadow-sm:0 2px 12px rgba(180,90,40,.07);
  --btn-cancel-bg:#fff1f3;--btn-cancel-border:#fda4af;--btn-cancel-text:#be123c;
  --btn-draft-bg:#fffbeb;--btn-draft-border:#f59e0b;--btn-draft-text:#92400e;
  --btn-save-bg:linear-gradient(135deg,#f5945c,#e07840);
  --btn-ghost-bg:#fef0e6;--btn-ghost-border:#f0d5c0;--btn-ghost-text:#6b4e38;
  --nav-active-bg:linear-gradient(135deg,rgba(245,148,92,.18),rgba(212,114,74,.12));
  --nav-active-border:rgba(245,148,92,.5);
  --h-badge-site-bg:rgba(245,148,92,.15);--h-badge-email-bg:rgba(212,114,74,.12);
  --quick-hover:rgba(245,148,92,.08);--choice-hover:rgba(245,148,92,.06);
  --entry-accent-bg:rgba(245,148,92,.1);
  --glass-bg:rgba(255,248,243,.72);--glass-border:rgba(255,255,255,.75);--glass-blur:blur(18px);
  --glass-shadow:0 8px 32px rgba(180,90,40,.1),inset 0 1px 0 rgba(255,255,255,.9);
}

body{
  font-family:'Poppins',sans-serif;
  background:var(--bg);color:var(--text);
  min-height:100vh;transition:background .3s,color .3s;
  -webkit-font-smoothing:antialiased;
}
body.light{background:linear-gradient(135deg,#fef3ec 0%,#fde8d8 50%,#fef0e8 100%) !important;}
h1,h2,h3,h4,.logo,.page-title,.step-title,.section-title,.stat-val,.choice-btn-title,.quick-title,.analytics-title,.modal h3,.case-num-badge,.entry-label,.auth-title,.soon-title,.ann-title,.case-entry-num{
  font-family:'Plus Jakarta Sans',sans-serif;
}
button{cursor:pointer;font-family:'Poppins',sans-serif;}
input,textarea,select{font-family:'Poppins',sans-serif;}
a{color:var(--accent);text-decoration:none;}

/* ── Fancy scrollbars ── */
::-webkit-scrollbar{width:4px;height:4px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:rgba(245,148,92,.25);border-radius:99px;}
::-webkit-scrollbar-thumb:hover{background:rgba(245,148,92,.5);}
body.light ::-webkit-scrollbar-thumb{background:rgba(212,114,74,.2);}
body.light ::-webkit-scrollbar-thumb:hover{background:rgba(212,114,74,.45);}
*{scrollbar-width:thin;scrollbar-color:rgba(245,148,92,.25) transparent;}
body.light *{scrollbar-color:rgba(212,114,74,.2) transparent;}

/* ── Shell ── */
.shell{display:flex;min-height:100vh;}
.sidebar{
  width:240px;background:var(--glass-bg);border-right:1px solid var(--glass-border);
  display:flex;flex-direction:column;padding:20px 14px;gap:2px;
  position:sticky;top:0;height:100vh;flex-shrink:0;overflow-y:auto;
  backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);
  box-shadow:var(--glass-shadow);
}
.logo{
  font-size:18px;font-weight:800;color:var(--text);
  padding:4px 10px 20px;letter-spacing:-.5px;
  display:flex;align-items:center;gap:9px;
}
.logo-icon{
  width:30px;height:30px;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;
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

/* TOC nav card — sticky column between sidebar and form */
.toc-card{
  width:148px;flex-shrink:0;
  position:sticky;top:20px;align-self:flex-start;
  background:var(--glass-bg);border:1px solid var(--glass-border);
  backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);
  box-shadow:var(--glass-shadow);overflow:hidden;
}
.toc-card-header{
  padding:10px 12px 8px;border-bottom:1px solid var(--border);
  font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;
  color:var(--muted);font-family:'Poppins',sans-serif;
  display:flex;align-items:center;gap:6px;
}
.toc-item{
  display:flex;align-items:center;width:100%;text-align:left;background:none;border:none;
  padding:7px 12px;font-size:11px;color:var(--muted);cursor:pointer;
  font-family:'Poppins',sans-serif;transition:.12s;line-height:1.4;border-left:2px solid transparent;
  gap:6px;
}
.toc-item:hover{color:var(--text);background:var(--card2);}
.toc-item.active{color:var(--accent);font-weight:700;border-left-color:var(--accent);background:var(--entry-accent-bg);}
.toc-num{font-size:9px;opacity:.5;font-variant-numeric:tabular-nums;flex-shrink:0;width:14px;}
.form-progress-pill{
  position:fixed;bottom:24px;right:24px;z-index:900;
  display:flex;align-items:center;justify-content:flex-start;gap:10px;
  padding:11px 16px;
  background:var(--accent);color:#fff;
  cursor:pointer;transition:.2s;
  box-shadow:0 4px 24px rgba(245,148,92,.45);
  font-family:'Poppins',sans-serif;
}
.form-progress-pill:hover{background:var(--accent2);transform:translateY(-2px);box-shadow:0 8px 32px rgba(245,148,92,.5);}
.form-progress-pill-dot{width:8px;height:8px;border-radius:50%;background:#fff;animation:pulse-dot 1.4s ease-in-out infinite;}
.nav-inprogress{
  margin-left:auto;display:flex;align-items:center;gap:4px;
  font-size:9px;font-weight:700;color:var(--accent);
  font-family:'Poppins',sans-serif;letter-spacing:.3px;
  animation:pulse-dot 1.4s ease-in-out infinite;
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
.btn-save{background:var(--btn-save-bg);color:#fff;border:none;box-shadow:0 2px 12px rgba(245,148,92,.3),inset 0 1px 0 rgba(255,255,255,.15);}
.btn-save:hover{filter:brightness(1.08);box-shadow:0 4px 18px rgba(245,148,92,.45),inset 0 1px 0 rgba(255,255,255,.2);}
.btn-danger{background:var(--btn-cancel-bg);border:1.5px solid var(--btn-cancel-border);color:var(--btn-cancel-text);}
.btn-danger:hover{filter:brightness(1.15);box-shadow:0 2px 12px rgba(244,63,94,.3);}
.btn-primary{background:var(--btn-save-bg);color:#fff;border:none;box-shadow:0 2px 12px rgba(245,148,92,.3),inset 0 1px 0 rgba(255,255,255,.15);}
.btn-primary:hover{filter:brightness(1.08);box-shadow:0 4px 18px rgba(245,148,92,.45),inset 0 1px 0 rgba(255,255,255,.2);}
.btn-amber{background:var(--btn-draft-bg);border:1.5px solid var(--btn-draft-border);color:var(--btn-draft-text);}
.btn-amber:hover{filter:brightness(1.12);}
.btn-green{background:linear-gradient(135deg,#10b981,#059669);color:#fff;border:none;box-shadow:0 3px 12px rgba(16,185,129,.35);}
.btn-green:hover{filter:brightness(1.1);}
.spacer{flex:1;}
.action-bar{display:flex;gap:10px;flex-wrap:wrap;margin-top:24px;padding-top:24px;border-top:1px solid var(--border);}

/* Stat cards */
.stat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:14px;margin-bottom:28px;}
.stat-card{
  background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:var(--radius);
  padding:20px;position:relative;overflow:hidden;transition:.2s;cursor:default;
  backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);
}
.stat-card:hover{transform:translateY(-2px);box-shadow:var(--glass-shadow);border-color:rgba(245,148,92,.35);}
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
.activity-row:hover{border-color:rgba(245,148,92,.3);transform:translateX(2px);}
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
  background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:var(--radius);
  padding:18px 20px;cursor:pointer;transition:.2s;
  display:flex;align-items:center;gap:14px;
  backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);
}
.quick-card:hover{border-color:var(--accent);background:var(--quick-hover);transform:translateY(-2px);box-shadow:var(--glass-shadow);}
.quick-icon{font-size:26px;}
.quick-title{font-size:14px;font-weight:700;}
.quick-sub{font-size:11px;color:var(--muted);margin-top:3px;font-family:'Poppins',sans-serif;}

/* Analytics */
.analytics-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:28px;}
.analytics-card{background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:var(--radius);padding:20px;backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);}
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
  border:1.5px solid var(--glass-border);background:var(--glass-bg);color:var(--text);
  font-size:15px;font-weight:700;display:flex;align-items:center;gap:16px;
  transition:.25s;text-align:left;position:relative;overflow:hidden;
  backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);
  box-shadow:var(--glass-shadow);
  font-family:'Plus Jakarta Sans',sans-serif;
}
.choice-btn::before{
  content:'';position:absolute;top:0;left:0;right:0;height:3px;
  background:var(--btn-save-bg);opacity:0;transition:.25s;
}
.choice-btn:hover{border-color:var(--accent);background:var(--choice-hover);transform:translateY(-3px);box-shadow:var(--glass-shadow);}
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
.form-right{width:300px;flex-shrink:0;position:sticky;top:0;align-self:flex-start;max-height:calc(100vh - 64px);overflow-y:auto;}

/* Right panel */
.right-panel{background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:var(--radius);overflow:hidden;backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);box-shadow:var(--glass-shadow);}
.right-panel-header{
  padding:16px 18px;border-bottom:1px solid var(--border);
  font-size:15px;font-weight:800;display:flex;align-items:center;gap:10px;
  background:linear-gradient(135deg,rgba(245,148,92,.1),rgba(212,114,74,.08));
  font-family:'Plus Jakarta Sans',sans-serif;letter-spacing:-.2px;
}
.meta-stack{display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;border-bottom:1px solid var(--border);}
.meta-row{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:14px 10px;gap:5px;text-align:center;border-right:1px solid var(--border);}
.meta-row:last-child{border-right:none;}
.meta-row .meta-label{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:var(--muted);white-space:nowrap;}
.meta-row .meta-val{color:var(--text);font-weight:700;font-size:11px;font-family:'Poppins',sans-serif;line-height:1.3;text-align:center;}
.meta-row .timer-val{color:var(--accent);font-weight:800;font-size:22px;font-variant-numeric:tabular-nums;font-family:'Plus Jakarta Sans',sans-serif;letter-spacing:-.5px;line-height:1.1;}
.summary-panel{padding:14px 16px;}
.summary-locked{text-align:center;padding:24px 0;}
.summary-locked-icon{font-size:32px;margin-bottom:8px;}

/* Copy row */
.copy-row-wrap{margin-bottom:8px;background:var(--sum-bg);border:1px solid var(--border);border-radius:0;padding:10px 14px;transition:.15s;}
.copy-row-wrap:hover{border-color:var(--accent);}
.copy-row-label{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.8px;margin-bottom:6px;font-family:'Poppins',sans-serif;}
.copy-row-inner{display:flex;align-items:flex-start;gap:8px;}
.copy-row-val{flex:1;font-size:13px;color:var(--text);line-height:1.65;word-break:break-word;white-space:pre-wrap;font-family:'Poppins',sans-serif;font-weight:500;}
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
.step-card.unlocked{background:var(--glass-bg);backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);}
.step-card.done{background:var(--glass-bg);border-color:rgba(16,185,129,.35);backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);}
.step-card.open:not(.locked){border-color:rgba(245,148,92,.4);box-shadow:0 0 0 1px rgba(245,148,92,.1);}
.step-header{display:flex;align-items:center;gap:12px;padding:14px 18px;cursor:pointer;user-select:none;transition:.15s;}
.step-header:hover{background:var(--card2);}
.step-num{width:30px;height:30px;border-radius:50%;background:var(--border);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;color:var(--text);transition:.25s;font-family:'Poppins',sans-serif;}
.step-card.done .step-num{background:var(--green);color:#fff;box-shadow:0 0 0 4px rgba(16,185,129,.15);}
.step-card.open:not(.locked) .step-num{background:var(--btn-save-bg);color:#fff;box-shadow:0 0 0 4px rgba(245,148,92,.15);}
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
.inp:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(245,148,92,.12);}
.inp::placeholder{color:var(--muted);opacity:.5;}
textarea.inp{resize:vertical;min-height:80px;line-height:1.6;}
select.inp{cursor:pointer;}

/* Radio */
.radio-group{display:flex;gap:8px;margin-top:4px;flex-wrap:wrap;}
.radio-label{
  display:inline-flex;align-items:center;gap:8px;
  background:var(--inp-bg);border:1.5px solid var(--border);
  padding:8px 14px;border-radius:0;font-size:12px;cursor:pointer;
  transition:.15s;font-family:'Poppins',sans-serif;
  line-height:1;user-select:none;white-space:nowrap;
}
.radio-label:hover{border-color:var(--accent);}
.radio-label input[type="radio"]{
  appearance:none;-webkit-appearance:none;
  width:14px;height:14px;min-width:14px;min-height:14px;
  border:2px solid var(--border);border-radius:50%;
  background:var(--inp-bg);
  cursor:pointer;transition:.15s;
  margin:0;padding:0;flex-shrink:0;
  position:relative;top:0;
  box-sizing:border-box;
}
.radio-label input[type="radio"]::after{
  content:"";display:block;
  width:6px;height:6px;border-radius:50%;
  background:transparent;transition:.15s;
  position:absolute;top:2px;left:2px;
}
.radio-label input[type="radio"]:checked{border-color:var(--accent);}
.radio-label input[type="radio"]:checked::after{background:var(--accent);}
.radio-label.selected-clarif{border-color:var(--amber);color:var(--amber);background:var(--btn-draft-bg);}
.radio-label.selected-clarif input[type="radio"]{border-color:var(--amber);}
.radio-label.selected-clarif input[type="radio"]:checked::after{background:var(--amber);}
.radio-label.selected-complete{border-color:var(--green);color:var(--green);background:rgba(16,185,129,.08);}
.radio-label.selected-complete input[type="radio"]{border-color:var(--green);}
.radio-label.selected-complete input[type="radio"]:checked::after{background:var(--green);}

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
.entry-card{background:var(--entry-bg);border:1.5px solid var(--border);border-radius:0;padding:15px;margin-bottom:10px;transition:.2s;}
.entry-card.saved{background:var(--card);border-color:var(--border);opacity:.92;}
.entry-card.dragging{opacity:.35;border-style:dashed;}
.drag-skeleton{
  height:72px;border:2px dashed var(--accent);background:var(--entry-accent-bg);
  border-radius:0;margin-bottom:10px;opacity:.6;
  display:flex;align-items:center;justify-content:center;
  font-size:11px;color:var(--accent);font-weight:600;font-family:'Poppins',sans-serif;
  letter-spacing:.5px;gap:8px;pointer-events:none;
}
.link-drag-skeleton{
  height:60px;border:2px dashed var(--accent);background:var(--entry-accent-bg);
  border-radius:0;margin-bottom:10px;opacity:.6;
  display:flex;align-items:center;justify-content:center;
  font-size:11px;color:var(--accent);font-weight:600;font-family:'Poppins',sans-serif;
  letter-spacing:.5px;gap:8px;pointer-events:none;
}
.drag-skeleton{
  height:72px;border:2px dashed var(--accent);background:var(--entry-accent-bg);
  border-radius:0;margin-bottom:10px;opacity:.5;
  display:flex;align-items:center;justify-content:center;
  font-size:11px;color:var(--accent);font-weight:600;font-family:'Poppins',sans-serif;
  letter-spacing:.5px;gap:8px;
}
.link-drag-skeleton{
  height:60px;border:2px dashed var(--accent);background:var(--entry-accent-bg);
  border-radius:0;margin-bottom:10px;opacity:.5;
  display:flex;align-items:center;justify-content:center;
  font-size:11px;color:var(--accent);font-weight:600;font-family:'Poppins',sans-serif;
  letter-spacing:.5px;gap:8px;
}
.entry-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:11px;gap:8px;}
.entry-label{font-size:13px;font-weight:700;color:var(--accent);font-family:'Plus Jakarta Sans',sans-serif;}
.drag-handle{display:flex;flex-direction:column;gap:3px;padding:4px 6px;cursor:grab;flex-shrink:0;opacity:.4;transition:.15s;}
.drag-handle:hover{opacity:1;}
.drag-handle span{display:block;width:16px;height:2px;background:var(--muted);border-radius:1px;}
.entry-saved-preview{font-size:12px;color:var(--text);line-height:1.7;white-space:pre-wrap;word-break:break-word;padding:6px 0 2px;}
.entry-saved-preview em{color:var(--muted);font-style:italic;}
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
.modal{background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:0;padding:32px;max-width:390px;width:90%;text-align:center;backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);box-shadow:var(--glass-shadow);animation:popIn .2s ease;}
@keyframes popIn{from{transform:scale(.92);opacity:0}to{transform:scale(1);opacity:1}}
.modal h3{font-size:20px;margin-bottom:8px;}
.modal p{color:var(--muted);font-size:13px;margin-bottom:24px;line-height:1.65;font-family:'Poppins',sans-serif;}
.modal-btns{display:flex;gap:10px;justify-content:center;}
.edit-modal{background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:0;padding:28px;max-width:500px;width:90%;max-height:85vh;overflow-y:auto;backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);box-shadow:var(--glass-shadow);animation:popIn .2s ease;}

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
.case-card{background:var(--glass-bg);border:1.5px solid var(--glass-border);border-radius:0;margin-bottom:12px;overflow:hidden;transition:.25s;backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);box-shadow:var(--glass-shadow);}
.case-card:hover{border-color:rgba(245,148,92,.35);}
.case-card.expanded{border-color:rgba(245,148,92,.5);box-shadow:var(--glass-shadow);}
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
.inline-edit-inp{background:var(--inp-bg);border:1.5px solid var(--accent);border-radius:0;color:var(--text);padding:6px 11px;font-size:13px;outline:none;flex:1;box-shadow:0 0 0 3px rgba(245,148,92,.12);font-family:'Poppins',sans-serif;}
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
.search-inp:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(245,148,92,.1);}
.search-icon{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:var(--muted);font-size:15px;}
.filter-row{display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap;}
.filter-btn{background:var(--card);border:1.5px solid var(--border);color:var(--muted);border-radius:0;padding:7px 14px;font-size:12px;font-weight:600;cursor:pointer;transition:.15s;font-family:'Poppins',sans-serif;}
.filter-btn:hover,.filter-btn.active{border-color:var(--accent);color:var(--accent);background:var(--entry-accent-bg);}

/* Auth pages */
.auth-page{min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg);position:relative;overflow:hidden;}
.auth-page::before{content:'';position:absolute;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(245,148,92,.12),transparent 70%);top:-120px;right:-120px;pointer-events:none;}
.auth-page::after{content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(245,148,92,.07),transparent 70%);bottom:-80px;left:-80px;pointer-events:none;}
.auth-card{background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:0;padding:40px;width:100%;max-width:420px;backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);box-shadow:var(--glass-shadow);position:relative;z-index:1;}
.auth-logo{display:flex;align-items:center;gap:12px;margin-bottom:32px;justify-content:center;}
.auth-logo-icon{width:40px;height:40px;display:flex;align-items:center;justify-content:center;}
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
.profile-card{background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:var(--radius);padding:28px;margin-bottom:20px;backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);box-shadow:var(--glass-shadow);}
.profile-avatar-large{width:80px;height:80px;border-radius:50%;background:var(--btn-save-bg);display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:800;color:#fff;margin-bottom:0;box-shadow:var(--glass-shadow);flex-shrink:0;overflow:hidden;position:relative;cursor:pointer;}
.profile-avatar-large img{width:100%;height:100%;object-fit:cover;border-radius:50%;}
.profile-avatar-overlay{position:absolute;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;opacity:0;transition:.2s;border-radius:50%;font-size:18px;}
.profile-avatar-large:hover .profile-avatar-overlay{opacity:1;}
.profile-avatar-large input[type=file]{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%;}

/* Announcements */
.announcement-card{background:var(--card);border:1px solid var(--border);border-radius:0;padding:20px;margin-bottom:12px;transition:.2s;}
.announcement-card:hover{border-color:rgba(245,148,92,.3);}
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
.link-card:hover{border-color:rgba(245,148,92,.3);}
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
.requestor-chip:hover{border-color:rgba(245,148,92,.4);}
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
.edit-mode-banner{background:linear-gradient(135deg,rgba(245,148,92,.12),rgba(212,114,74,.12));border:1.5px solid rgba(245,148,92,.3);border-radius:0;padding:10px 16px;margin-bottom:16px;display:flex;align-items:center;gap:10px;font-size:12px;font-weight:600;color:var(--accent);}
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
  background:var(--glass-bg);border-top:2px solid var(--accent);
  backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);
  box-shadow:0 -4px 32px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.07);
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
/* Alarm overlay */
@keyframes alarmPulse{0%,100%{box-shadow:0 0 0 0 rgba(245,148,92,.6)}50%{box-shadow:0 0 0 18px rgba(245,148,92,0)}}
.alarm-overlay{position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:1100;display:flex;align-items:center;justify-content:center;animation:fadeIn .2s ease;backdrop-filter:blur(12px);}
.alarm-modal{background:var(--glass-bg);border:2px solid var(--accent);border-radius:0;padding:40px 44px;text-align:center;max-width:420px;width:90%;backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);box-shadow:0 0 60px rgba(245,148,92,.35),var(--glass-shadow);animation:popIn .25s ease,alarmPulse 1.4s ease-in-out infinite;}
.alarm-icon{font-size:56px;display:block;margin-bottom:16px;animation:float 1s ease-in-out infinite;}
.alarm-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:24px;font-weight:800;margin-bottom:8px;color:var(--accent);}
.alarm-sub{font-size:14px;color:var(--muted);margin-bottom:28px;line-height:1.6;}
.alarm-btns{display:flex;gap:12px;justify-content:center;}
.alarm-snooze{background:var(--btn-draft-bg);border:1.5px solid var(--btn-draft-border);color:var(--btn-draft-text);padding:12px 24px;font-size:14px;font-weight:700;font-family:'Poppins',sans-serif;cursor:pointer;transition:.15s;}
.alarm-snooze:hover{filter:brightness(1.15);}
.alarm-dismiss{background:var(--btn-save-bg);border:none;color:#fff;padding:12px 28px;font-size:14px;font-weight:700;font-family:'Poppins',sans-serif;cursor:pointer;transition:.15s;box-shadow:0 3px 14px rgba(245,148,92,.4);}
.alarm-dismiss:hover{filter:brightness(1.1);}
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
  return d.toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});
}
function fmtElapsed(s) {
  const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=s%60;
  return h>0?`${h}:${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`:`${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
}
async function checkGrammar(text) {
  if (!text.trim()) return {result:text,changes:0};
  try {
    const r = await fetch("/api/grammar",{
      method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({text})
    });
    if(!r.ok) return {result:text,changes:0};
    const d = await r.json();
    return {result:d.result||text, changes:d.changes||0};
  } catch { return {result:text,changes:0}; }
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

function CopyName({ name, onCopy }) {
  const [c,setC] = useState(false);
  return (
    <div className="copy-name">
      <span className="copy-name-text">{name}</span>
      <button className={cls("copy-btn",c&&"green")}
        onClick={()=>copyToClipboard(name).then(()=>{setC(true);onCopy&&onCopy();setTimeout(()=>setC(false),1800);})}>
        {c?"✓ Copied!":"Copy"}
      </button>
    </div>
  );
}

// Step card — single-open: receives openStep/setOpenStep from parent
function StepCard({ num, title, children, done, locked, openStep, setOpenStep }) {
  const isOpen = openStep === num;
  return (
    <div id={`step-${num}`} className={cls("step-card", locked?"locked":"unlocked", done&&"done", isOpen&&!locked&&"open")}>
      <div className="step-header" onClick={()=>{ if(!locked) setOpenStep(isOpen ? null : num); }}>
        <div className="step-num">{done?"✓":num}</div>
        <div className="step-title">{title}</div>
        {locked ? <span className="step-lock-icon"> </span> : <span className="step-chevron">▼</span>}
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
        <div style={{fontSize:28,marginBottom:8}}>{uploading ? <Icon name="loading" size={28} color="var(--accent)"/> : <Icon name="image" size={28} color="var(--muted)"/>}</div>
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

function EntryCard({ entry, label, index, onChange, onDelete, showNumber, onDragHandleMouseDown, onDragHandleMouseUp }) {
  const [checking,setChecking]=useState(null);
  // New entries start in edit mode; saved entries start locked
  const [saved,setSaved]=useState(!!entry._saved);
  const ai=async(field)=>{ if(!entry[field]?.trim())return; setChecking(field); const {result,changes}=await checkGrammar(entry[field]); onChange({...entry,[field]:result}); setChecking(changes>0?`fixed-${field}`:null); setTimeout(()=>setChecking(null),2000); };
  const handleSave=()=>{ setSaved(true); onChange({...entry,_saved:true}); };
  const handleEdit=()=>{ setSaved(false); onChange({...entry,_saved:false}); };

  return (
    <div className={cls("entry-card",saved&&"saved")}>
      <div className="entry-header">
        {/* Drag handle — only this triggers drag */}
        <div className="drag-handle" title="Drag to reorder"
          onMouseDown={e=>{e.stopPropagation();onDragHandleMouseDown&&onDragHandleMouseDown();}}
          onMouseUp={()=>onDragHandleMouseUp&&onDragHandleMouseUp()}
          onTouchStart={()=>onDragHandleMouseDown&&onDragHandleMouseDown()}>
          <span/><span/><span/>
        </div>
        <span className="entry-label" style={{flex:1}}>{showNumber?`${label} #${entry.number||(index+1)}`:label}</span>
        {saved
          ? <button className="h-btn" style={{fontSize:11,padding:"3px 10px",borderColor:"var(--accent)",color:"var(--accent)"}} onClick={handleEdit}><Icon name="edit" size={11} style={{marginRight:4}}/>Edit</button>
          : <button className="btn btn-primary" style={{fontSize:11,padding:"4px 12px"}} onClick={handleSave}><Icon name="save" size={11} style={{marginRight:4}}/>Save</button>
        }
        {(showNumber||(index>0))&&<button className="entry-del" onClick={onDelete}><Icon name="trash" size={13} color="var(--red)"/></button>}
      </div>
      {saved ? (
        <div className="entry-saved-preview">
          {entry.number&&<div style={{fontSize:11,color:"var(--muted)",marginBottom:4}}>#{entry.number}</div>}
          {entry.note ? <div>{entry.note}</div> : <em>No note</em>}
          {entry.clarification&&<div style={{marginTop:6,paddingTop:6,borderTop:"1px solid var(--border)",color:"var(--muted)",fontSize:12}}>{entry.clarification}</div>}
        </div>
      ) : (
        <>
          {showNumber&&(<div className="field"><label>Number <span className="req">*</span></label><input draggable={false} className="inp" placeholder="e.g. 25" value={entry.number} onChange={e=>onChange({...entry,number:e.target.value})}/></div>)}
          <div className="field"><label>Note (optional)</label><textarea draggable={false} className="inp" rows={3} value={entry.note} onChange={e=>onChange({...entry,note:e.target.value})} placeholder="Describe what was done or assumed..."/><div className="ai-row"><button className="ai-btn" disabled={!entry.note?.trim()||checking==="note"} onClick={()=>ai("note")}>{checking==="note"?"Checking...":(checking===`fixed-note`?"✓ Fixed!":"Grammar Check")}</button></div></div>
          <div className="field"><label>Clarification (optional)</label><textarea draggable={false} className="inp" rows={3} value={entry.clarification} onChange={e=>onChange({...entry,clarification:e.target.value})} placeholder="Confirmation or extra details..."/><div className="ai-row"><button className="ai-btn" disabled={!entry.clarification?.trim()||checking==="clarification"} onClick={()=>ai("clarification")}>{checking==="clarification"?"Checking...":(checking===`fixed-clarification`?"✓ Fixed!":"Grammar Check")}</button></div></div>
        </>
      )}
    </div>
  );
}

function CopyRow({ label, value }) {
  const [c,setC]=useState(false);
  const empty = !value || !value.trim();
  return (
    <div className="copy-row-wrap">
      <div className="copy-row-label">{label}</div>
      {empty ? (
        <div style={{fontSize:12,color:"var(--muted)",fontStyle:"italic",padding:"3px 0"}}>—</div>
      ) : (
        <div className="copy-row-inner">
          <div className="copy-row-val">{value}</div>
          <button className={cls("copy-row-btn",c&&"done")} onClick={()=>copyToClipboard(value).then(()=>{setC(true);setTimeout(()=>setC(false),1800);})}>{c?"✓":"📋"}</button>
        </div>
      )}
    </div>
  );
}

// ── GreetingRow — multi-message panel in Live Summary ──
function GreetingRow({ greetingMessages, caseNum, inboundNum, isSC }) {
  const DEFAULT_MSGS = [{ id:"default", label:"Check-in", base:"Hi po Ms. Tina, magpapacheck lang po", fillType:"caseNum" }];
  const msgs = (greetingMessages&&greetingMessages.length>0) ? greetingMessages : DEFAULT_MSGS;
  const [copiedId,setCopiedId]=useState(null);

  // Build the filled message — radio picks which number(s) to insert
  const buildMsg=(m)=>{
    const b=(m.base||m.template||"Hi po Ms. Tina, magpapacheck lang po").trim();
    if(m.fillType==="siteComment") return `${b} Site Comment #${caseNum||"—"}`;
    if(m.fillType==="caseNum")     return `${b} Case #${caseNum||"—"}`;
    if(m.fillType==="inbound")     return `${b} Inbound #${inboundNum||"—"}`;
    return `${b} Case #${caseNum||"—"}`;
  };

  const copy=(m)=>{
    const txt=buildMsg(m);
    copyToClipboard(txt).then(()=>{setCopiedId(m.id);setTimeout(()=>setCopiedId(null),1800);});
  };

  if(!caseNum) return null;

  return (
    <div className="copy-row-wrap" style={{paddingBottom:0}}>
      <div className="copy-row-label">Messages</div>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginTop:4}}>
        {msgs.map(m=>(
          <div key={m.id} style={{background:"var(--entry-bg)",border:"1.5px solid var(--border)",padding:"8px 10px",display:"flex",flexDirection:"column",gap:4}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:6}}>
              <span style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".6px",color:"var(--accent)",fontFamily:"'Poppins',sans-serif"}}>{m.label||"Message"}</span>
              <button className={copiedId===m.id?"copy-row-btn done":"copy-row-btn"} onClick={()=>copy(m)} style={{flexShrink:0,padding:"2px 8px",fontSize:10}}>{copiedId===m.id?"✓ Copied":"📋 Copy"}</button>
            </div>
            <div style={{fontSize:12,color:"var(--text)",lineHeight:1.5,wordBreak:"break-word"}}>{buildMsg(m)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StickyPanel({ startTimeRef, form, isSC, buildEntriesText, buildEmailText, onTimerEnd, specialRequestors, timerLimitSecs, greetingMessages }) {
  const [elapsed,setElapsed]=useState(0);
  const [now,setNow]=useState(new Date());
  const firedRef=useRef(false);
  useEffect(()=>{
    const t=setInterval(()=>{
      const secs=Math.floor((Date.now()-startTimeRef.current)/1000);
      setElapsed(secs); setNow(new Date());
      const limit=timerLimitSecs||1800;
      if(!firedRef.current && secs>=limit){ firedRef.current=true; onTimerEnd&&onTimerEnd(); }
    },1000);
    return()=>clearInterval(t);
  },[startTimeRef,onTimerEnd]);
  // form is real React state — re-renders on every form change, images update instantly
  const f=form;
  const emailTypeLabel=f.emailType==="clarification"?"Clarification":"Completed";
  const allImages=[...(f.images||[]),...(f.backupImages||[])];
  return (
    <div className="right-panel">
      <div className="right-panel-header"> Live Summary</div>
      <div className="meta-stack">
        <div className="meta-row">
          <span className="meta-label">📅 Started</span>
          <span className="meta-val">{fmtDT(new Date(startTimeRef.current))}</span>
        </div>
        <div className="meta-row">
          <span className="meta-label"> Elapsed</span>
          <span className="timer-val">{fmtElapsed(elapsed)}</span>
        </div>
        <div className="meta-row">
          <span className="meta-label">🕐 Now</span>
          <span className="meta-val">{fmtDT(now)}</span>
        </div>
      </div>
      <div className="summary-panel">
        <CopyRow label="Case #" value={f.caseNum}/>
        <CopyRow label="Account #" value={f.accountNum}/>
        {!isSC&&<CopyRow label="Inbound #" value={f.inboundNum}/>}
        <CopyRow label="Amend Type" value={f.amendType}/>
        {f.caseNum&&(
          <GreetingRow greetingMessages={greetingMessages} caseNum={f.caseNum} inboundNum={f.inboundNum} isSC={isSC}/>
        )}
        <CopyRow label={isSC?"Site Comments":"Assumptions"} value={isSC?buildEntriesText():buildEmailText()}/>
        {!isSC&&<CopyRow label="Email Type" value={emailTypeLabel}/>}
        {!isSC&&<CopyRow label="Email Address" value={f.emailAddress}/>}
        {allImages.length>0&&(<div className="copy-row-wrap"><div className="copy-row-label">Screenshots ({allImages.length})</div><div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:4}}>{allImages.map(img=>(<div key={img.id} style={{width:68,height:52,borderRadius:0,overflow:"hidden",border:"1.5px solid var(--border)"}}><img src={img.url} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>))}</div></div>)}
        {specialRequestors&&specialRequestors.length>0&&(
          <div style={{borderTop:"1px solid var(--border)",paddingTop:14,marginTop:6}}>
            <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:".8px",color:"var(--muted)",marginBottom:10,fontFamily:"'Poppins',sans-serif"}}>Special Requestors</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {specialRequestors.map((name,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:6,background:"var(--entry-accent-bg)",border:"1px solid rgba(245,148,92,.25)",padding:"5px 10px",fontSize:12,fontWeight:600,color:"var(--accent)",fontFamily:"'Poppins',sans-serif"}}>
                  <span style={{width:20,height:20,borderRadius:"50%",background:"var(--btn-save-bg)",display:"inline-flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:9,fontWeight:700,flexShrink:0}}>
                    {name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}
                  </span>
                  {name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


// ─── Flat SVG Icon System ──────────────────────────────
function Icon({ name, size=16, color="currentColor", style={} }) {
  const [mounted,setMounted]=useState(false);
  useEffect(()=>setMounted(true),[]);
  const s = { width:size, height:size, display:"inline-block", flexShrink:0, ...style };
  const sp = { display:"inline-flex",alignItems:"center",verticalAlign:"middle",flexShrink:0,width:size,height:size };
  if(!mounted) return <span style={sp}/>;
  const icons = {
    dashboard:    <svg viewBox="0 0 16 16" fill="none" style={s}><rect x="1" y="1" width="6" height="6" fill={color}/><rect x="9" y="1" width="6" height="6" fill={color} opacity=".5"/><rect x="1" y="9" width="6" height="6" fill={color} opacity=".5"/><rect x="9" y="9" width="6" height="6" fill={color} opacity=".25"/></svg>,
    postlive:     <svg viewBox="0 0 16 16" fill="none" style={s}><rect x="2" y="2" width="12" height="12" rx="0" stroke={color} strokeWidth="1.5"/><path d="M5 8.5l2.5 2.5L11 6" stroke={color} strokeWidth="1.5" strokeLinecap="square"/></svg>,
    prelive:      <svg viewBox="0 0 16 16" fill="none" style={s}><rect x="2" y="2" width="12" height="12" stroke={color} strokeWidth="1.5"/><path d="M5 8h6M8 5v6" stroke={color} strokeWidth="1.5" strokeLinecap="square"/></svg>,
    history:      <svg viewBox="0 0 16 16" fill="none" style={s}><circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.5"/><path d="M8 5v3.5l2.5 1.5" stroke={color} strokeWidth="1.5" strokeLinecap="square"/></svg>,
    announcements:<svg viewBox="0 0 16 16" fill="none" style={s}><path d="M3 6h2v5H3V6zM5 6l7-4v13L5 11V6z" fill={color} opacity=".8"/><rect x="8" y="12" width="2" height="3" rx="1" fill={color}/></svg>,
    links:        <svg viewBox="0 0 16 16" fill="none" style={s}><path d="M6 9.5a3.5 3.5 0 004.95-4.95L9.54 3.15A3.5 3.5 0 004.6 8.1" stroke={color} strokeWidth="1.5" strokeLinecap="square"/><path d="M10 6.5a3.5 3.5 0 00-4.95 4.95l1.41 1.4A3.5 3.5 0 0011.4 7.9" stroke={color} strokeWidth="1.5" strokeLinecap="square"/></svg>,
    profile:      <svg viewBox="0 0 16 16" fill="none" style={s}><circle cx="8" cy="5" r="3" stroke={color} strokeWidth="1.5"/><path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke={color} strokeWidth="1.5" strokeLinecap="square"/></svg>,
    analytics:    <svg viewBox="0 0 16 16" fill="none" style={s}><rect x="1" y="9" width="3" height="6" fill={color}/><rect x="6" y="5" width="3" height="10" fill={color} opacity=".7"/><rect x="11" y="1" width="3" height="14" fill={color} opacity=".45"/></svg>,
    requestors:   <svg viewBox="0 0 16 16" fill="none" style={s}><polygon points="8,1 10,6 15,6 11,9.5 12.5,15 8,11.5 3.5,15 5,9.5 1,6 6,6" fill={color} opacity=".8"/></svg>,
    quickaction:  <svg viewBox="0 0 16 16" fill="none" style={s}><path d="M9 1L4 9h5l-2 6 7-8h-5l2-6z" fill={color}/></svg>,
    sitecomment:  <svg viewBox="0 0 16 16" fill="none" style={s}><rect x="1" y="2" width="14" height="10" rx="0" stroke={color} strokeWidth="1.5"/><path d="M4 14l3-2h5" stroke={color} strokeWidth="1.5" strokeLinecap="square"/><path d="M4 6h8M4 8.5h5" stroke={color} strokeWidth="1.4" strokeLinecap="square" opacity=".6"/></svg>,
    inbound:      <svg viewBox="0 0 16 16" fill="none" style={s}><rect x="1" y="3" width="14" height="10" stroke={color} strokeWidth="1.5"/><path d="M1 3l7 6 7-6" stroke={color} strokeWidth="1.5" strokeLinecap="square"/></svg>,
    draft:        <svg viewBox="0 0 16 16" fill="none" style={s}><rect x="3" y="1" width="10" height="14" stroke={color} strokeWidth="1.5"/><path d="M6 5h4M6 8h4M6 11h2" stroke={color} strokeWidth="1.4" strokeLinecap="square" opacity=".7"/></svg>,
    save:         <svg viewBox="0 0 16 16" fill="none" style={s}><path d="M2 2h9l3 3v9H2V2z" stroke={color} strokeWidth="1.5"/><rect x="5" y="10" width="6" height="4" stroke={color} strokeWidth="1.4"/><rect x="5" y="2" width="5" height="4" fill={color} opacity=".5"/></svg>,
    trash:        <svg viewBox="0 0 16 16" fill="none" style={s}><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10" stroke={color} strokeWidth="1.5" strokeLinecap="square"/></svg>,
    edit:         <svg viewBox="0 0 16 16" fill="none" style={s}><path d="M10 2l4 4-8 8H2v-4l8-8z" stroke={color} strokeWidth="1.5" strokeLinecap="square"/></svg>,
    back:         <svg viewBox="0 0 16 16" fill="none" style={s}><path d="M10 3L5 8l5 5" stroke={color} strokeWidth="1.5" strokeLinecap="square"/></svg>,
    check:        <svg viewBox="0 0 16 16" fill="none" style={s}><path d="M2 8l4.5 5L14 3" stroke={color} strokeWidth="2" strokeLinecap="square"/></svg>,
    warn:         <svg viewBox="0 0 16 16" fill="none" style={s}><path d="M8 1L1 14h14L8 1z" stroke={color} strokeWidth="1.5" strokeLinecap="square"/><path d="M8 6v4M8 12v1" stroke={color} strokeWidth="1.5" strokeLinecap="square"/></svg>,
    clear:        <svg viewBox="0 0 16 16" fill="none" style={s}><path d="M2 4h12M5 4V2h6v2M4 4l8 10H4L2 4" stroke={color} strokeWidth="1.5" strokeLinecap="square"/></svg>,
    pin:          <svg viewBox="0 0 16 16" fill="none" style={s}><path d="M10 2l4 4-2 2-1-1-4 4 1 1-2 2-4-4 2-2 1 1 4-4-1-1 2-2zM5 11l-3 3" stroke={color} strokeWidth="1.5" strokeLinecap="square"/></svg>,
    image:        <svg viewBox="0 0 16 16" fill="none" style={s}><rect x="1" y="2" width="14" height="12" stroke={color} strokeWidth="1.5"/><circle cx="5.5" cy="6" r="1.5" fill={color} opacity=".7"/><path d="M1 11l4-4 3 3 2-2 5 5" stroke={color} strokeWidth="1.4" strokeLinecap="square" opacity=".8"/></svg>,
    copy:         <svg viewBox="0 0 16 16" fill="none" style={s}><rect x="5" y="1" width="10" height="12" stroke={color} strokeWidth="1.5"/><rect x="1" y="4" width="10" height="12" fill="var(--bg)" stroke={color} strokeWidth="1.5"/></svg>,
    close:        <svg viewBox="0 0 16 16" fill="none" style={s}><path d="M3 3l10 10M13 3L3 13" stroke={color} strokeWidth="1.5" strokeLinecap="square"/></svg>,
    play:         <svg viewBox="0 0 16 16" fill="none" style={s}><path d="M4 2l10 6-10 6V2z" fill={color}/></svg>,
    loading:      <svg viewBox="0 0 16 16" fill="none" style={s}><circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.5" opacity=".25"/><path d="M8 2a6 6 0 016 6" stroke={color} strokeWidth="1.5" strokeLinecap="square"/></svg>,
    empty:        <svg viewBox="0 0 16 16" fill="none" style={s}><rect x="2" y="2" width="12" height="12" stroke={color} strokeWidth="1.5" opacity=".4"/><path d="M6 6h4M6 10h2" stroke={color} strokeWidth="1.4" strokeLinecap="square" opacity=".4"/></svg>,
    coffee:       <svg viewBox="0 0 16 16" fill="none" style={s}><path d="M3 5h8v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" stroke={color} strokeWidth="1.5"/><path d="M11 7h1a2 2 0 010 4h-1" stroke={color} strokeWidth="1.5"/><path d="M6 2v2M8 1v2" stroke={color} strokeWidth="1.5" strokeLinecap="square"/></svg>,
    meditate:     <svg viewBox="0 0 16 16" fill="none" style={s}><circle cx="8" cy="3" r="2" stroke={color} strokeWidth="1.5"/><path d="M4 8c0-2 1.5-3.5 4-3.5S12 6 12 8" stroke={color} strokeWidth="1.5" strokeLinecap="square"/><path d="M1 11h14M4 11v3M12 11v3M8 8v3" stroke={color} strokeWidth="1.5" strokeLinecap="square"/></svg>,
    lunch:        <svg viewBox="0 0 16 16" fill="none" style={s}><path d="M3 2v12M6 2v5a3 3 0 003 3v4M9 2v4a3 3 0 003-3V2" stroke={color} strokeWidth="1.5" strokeLinecap="square"/></svg>,
    lock:         <svg viewBox="0 0 16 16" fill="none" style={s}><rect x="3" y="7" width="10" height="8" stroke={color} strokeWidth="1.5"/><path d="M5 7V5a3 3 0 016 0v2" stroke={color} strokeWidth="1.5"/><circle cx="8" cy="11" r="1.5" fill={color}/></svg>,
    user:         <svg viewBox="0 0 16 16" fill="none" style={s}><circle cx="8" cy="5" r="3" stroke={color} strokeWidth="1.5"/><path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke={color} strokeWidth="1.5" strokeLinecap="square"/></svg>,
    signout:      <svg viewBox="0 0 16 16" fill="none" style={s}><path d="M6 14H2V2h4" stroke={color} strokeWidth="1.5" strokeLinecap="square"/><path d="M10 5l4 3-4 3M14 8H6" stroke={color} strokeWidth="1.5" strokeLinecap="square"/></svg>,
    announce:     <svg viewBox="0 0 16 16" fill="none" style={s}><path d="M3 6h2v5H3V6zM5 6l7-4v13L5 11V6z" fill={color} opacity=".8"/></svg>,
    camera:       <svg viewBox="0 0 16 16" fill="none" style={s}><path d="M1 5h14v9H1V5z" stroke={color} strokeWidth="1.5"/><circle cx="8" cy="9.5" r="2.5" stroke={color} strokeWidth="1.5"/><path d="M5 5l1.5-2h3L11 5" stroke={color} strokeWidth="1.5" strokeLinecap="square"/></svg>,
    casebox:      <svg viewBox="0 0 16 16" fill="none" style={s}><rect x="1" y="4" width="14" height="11" stroke={color} strokeWidth="1.5"/><path d="M5 4V2h6v2" stroke={color} strokeWidth="1.5" strokeLinecap="square"/><path d="M1 8h14" stroke={color} strokeWidth="1.5"/></svg>,
    timer:        <svg viewBox="0 0 16 16" fill="none" style={s}><circle cx="8" cy="9" r="6" stroke={color} strokeWidth="1.5"/><path d="M8 6v3.5l2 2" stroke={color} strokeWidth="1.5" strokeLinecap="square"/><path d="M6 1h4" stroke={color} strokeWidth="2" strokeLinecap="square"/></svg>,
    bell:         <svg viewBox="0 0 16 16" fill="none" style={s}><path d="M8 1v1M8 1a5 5 0 015 5v4l1.5 1.5H1.5L3 11V7a5 5 0 015-5z" stroke={color} strokeWidth="1.5" strokeLinecap="square"/><path d="M6 13a2 2 0 004 0" stroke={color} strokeWidth="1.5"/></svg>,
    password:     <svg viewBox="0 0 16 16" fill="none" style={s}><circle cx="4" cy="8" r="2" stroke={color} strokeWidth="1.5"/><path d="M6 8h8M11 6v4M13 7v2" stroke={color} strokeWidth="1.5" strokeLinecap="square"/></svg>,
    snooze:       <svg viewBox="0 0 16 16" fill="none" style={s}><circle cx="8" cy="9" r="6" stroke={color} strokeWidth="1.5"/><path d="M5.5 7h3L5.5 11H9" stroke={color} strokeWidth="1.5" strokeLinecap="square"/><path d="M3 3L2 2M13 3l1-2" stroke={color} strokeWidth="1.5" strokeLinecap="square"/></svg>,
    inprogress:   <svg viewBox="0 0 16 16" fill="none" style={s}><circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.5"/><path d="M8 5v3.5l2.5 1.5" stroke={color} strokeWidth="1.5" strokeLinecap="square"/><circle cx="8" cy="8" r="2" fill={color} opacity=".25"/></svg>,
  };
  const el = icons[name] || <svg viewBox="0 0 16 16" style={s}/>;
  return <span style={sp}>{el}</span>;
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


// ── Table of Contents / Outline Panel — sticky card column ──────────────────
function TocPanel({ openStep, setOpenStep, isSC, page }) {
  if(page!=="postlive") return null;
  const steps=[
    {num:1,label:"Case Info"},
    {num:2,label:"Before Name"},
    {num:3,label:isSC?"Amends Notepad":"Assumptions"},
    {num:"6b",label:"Extra Backups"},
    {num:4,label:"Device Check"},
    {num:5,label:"After Name"},
    {num:6,label:"Before/After"},
    {num:7,label:"Checklist"},
  ];
  return (
    <div className="toc-card">
      <div className="toc-card-header">
        <Icon name="dashboard" size={10} color="var(--muted)"/>Steps
      </div>
      {steps.map(s=>(
        <button key={s.num} className={cls("toc-item",openStep===s.num&&"active")}
          onClick={()=>{
            setOpenStep(s.num);
            setTimeout(()=>{
              const el=document.getElementById(`step-${s.num}`);
              if(el) el.scrollIntoView({behavior:"smooth",block:"start"});
            },50);
          }}>
          <span className="toc-num">{s.num}</span>
          <span style={{flex:1,textAlign:"left"}}>{s.label}</span>
        </button>
      ))}
    </div>
  );
}
function PostLiveForm({ mode, onSave, onBack, onSaveDraftDirect, draftData, user, onTimerEnd, specialRequestors, timerLimitSecs }) {
  const isSC = mode==="siteComment";
  const entryLabel = isSC?"Site Comment":"Assumption";
  const rawName = user?.name || "User";
  const userName = rawName.trim().replace(/\s+/g,"_");
  const beforeName    = user?.beforeName  || `Post_Live_Amend_Before_${userName}_Amends`;
  const afterName     = user?.afterName   || `Post_Live_Amend_After_${userName}_Amends`;
  const screenshotName= user?.screenshotName || `Post_Live_Amend_Screenshot_${userName}_Amends`;

  const [form,setForm] = useState(()=> draftData ? {...emptyBase(),...draftData} : emptyBase());
  const formRef = useRef(form);
  useEffect(()=>{formRef.current=form;},[form]);

  const startTimeRef = useRef(
    draftData ? Date.now() - (draftData._elapsedAtSave||0)*1000 : Date.now()
  );

  // isDraft: true if this is a resumed draft with real content — unlock steps accordingly
  const isDraft = !!(draftData && (draftData.caseNum || draftData.accountNum || draftData._elapsedAtSave));

  const [openStep,setOpenStep] = useState(1);
  const [modal,setModal] = useState(null);
  const [toast,showToast] = useToast();
  const [copiedAll,setCopiedAll] = useState(false);
  const [autoSaved,setAutoSaved] = useState(null);
  const [draftSaving,setDraftSaving] = useState(false);
  const dragEntryIdxRef = useRef(-1);
  const [dragEntryIdx,setDragEntryIdx] = useState(-1);
  const dragOverIdxRef = useRef(-1);
  const [dragOverIdx,setDragOverIdx] = useState(-1);
  const dragHandleActiveRef = useRef(false);

  // ── Auto-save every 30s ──
  useEffect(()=>{
    if(!onSaveDraftDirect)return;
    const interval=setInterval(()=>{
      const f=formRef.current;
      if(!f.caseNum&&!f.accountNum&&!f.entries?.some(e=>e.note||e.clarification||e.number))return;
      const elapsed=Math.floor((Date.now()-startTimeRef.current)/1000);
      const clean=(imgs)=>(imgs||[]).map(({_file,url,name,id,path,_inDB})=>({url,name,id,path:path||id,_inDB:_inDB||false}));
      const cleanForm={...f,images:clean(f.images),backupImages:clean(f.backupImages),_elapsedAtSave:elapsed};
      onSaveDraftDirect(cleanForm).then(()=>setAutoSaved(new Date().toLocaleTimeString())).catch(()=>{});
    },30000);
    return()=>clearInterval(interval);
  },[onSaveDraftDirect]);

  // ── Save draft on page refresh/close ──
  useEffect(()=>{
    const handleUnload=()=>{
      const f=formRef.current;
      // Only save if there's something worth saving
      if(!f.caseNum&&!f.accountNum&&!f.entries?.some(e=>e.note||e.clarification||e.number))return;
      const elapsed=Math.floor((Date.now()-startTimeRef.current)/1000);
      const clean=(imgs)=>(imgs||[]).map(({_file,url,name,id,path,_inDB})=>({url,name,id,path:path||id,_inDB:_inDB||false}));
      const cleanForm={...f,images:clean(f.images),backupImages:clean(f.backupImages),_elapsedAtSave:elapsed,_mode:mode};
      // sendBeacon is the only reliable way to fire a request on page unload
      const payload=JSON.stringify({userEmail:user?.email,mode,draftData:cleanForm});
      navigator.sendBeacon("/api/drafts",new Blob([payload],{type:"application/json"}));
    };
    window.addEventListener("beforeunload",handleUnload);
    return()=>window.removeEventListener("beforeunload",handleUnload);
  },[mode,user]);

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
  const moveEntry   = (from,to)=>setF(f=>{const arr=[...f.entries];const[m]=arr.splice(from,1);arr.splice(to,0,m);return{...f,entries:arr};});

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

  const getCleanForm = () => {
    const elapsed = Math.floor((Date.now() - startTimeRef.current)/1000);
    const strip=(imgs)=>(imgs||[]).map(({_file,url,name,id,path,_inDB})=>({url,name,id,path:path||id,_inDB:_inDB||false}));
    return {...formRef.current,images:strip(formRef.current.images),backupImages:strip(formRef.current.backupImages),_elapsedAtSave:elapsed};
  };

  const openDraftModal = () => setModal("draft");

  const confirmSaveDraft = async() => {
    if(draftSaving) return;
    setDraftSaving(true);
    try{
      await onSaveDraftDirect(getCleanForm());
      setModal(null);
      onBack(); // go back to Post-Live Amends list
    }catch(e){
      setDraftSaving(false);
      showToast("❌ Failed to save draft — check connection","error");
    }
  };

  const stepProps = {openStep, setOpenStep};

  return (
    <div className="form-cols">
      <TocPanel openStep={openStep} setOpenStep={setOpenStep} isSC={isSC} page="postlive"/>
      <div className="form-left">

        <StepCard num={1} title="Case Information" done={step1Done} locked={false} {...stepProps}>
          <div className="field"><label>Case Number <span className="req">*</span></label><input className="inp" placeholder="e.g. 1234567" value={form.caseNum} onChange={e=>setF({caseNum:e.target.value})}/></div>
          <div className="field"><label>Account Number <span className="req">*</span></label><input className="inp" placeholder="e.g. ACC-9876" value={form.accountNum} onChange={e=>setF({accountNum:e.target.value})}/></div>
          {!isSC&&(<div className="field"><label>Inbound Number <span className="req">*</span></label><input className="inp" placeholder="Enter inbound number" value={form.inboundNum||""} onChange={e=>setF({inboundNum:e.target.value})}/></div>)}
          <div className="field"><label>Amend Type <span className="req">*</span></label><input className="inp" placeholder="e.g. Content, Layout, Link..." value={form.amendType} onChange={e=>setF({amendType:e.target.value})}/></div>
          <label className={cls("check-label",form.inProgress&&"checked")} style={{marginTop:4,width:"fit-content"}}><input type="checkbox" checked={form.inProgress} onChange={e=>setF({inProgress:e.target.checked})}/>In-Progress Salesforce</label>
        </StepCard>

        <StepCard num={2} title="Before Screenshot Name" done={form._beforeCopied} locked={!step1Done&&!isDraft} {...stepProps}>
          <p style={{fontSize:13,color:"var(--muted)",marginBottom:9}}>Save your before screenshot with this name.</p>
          <CopyName name={beforeName} onCopy={()=>setF({_beforeCopied:true})}/>
        </StepCard>

        <StepCard num={3} title={isSC?"Post-Live Amends Notepad":"Assumptions Notepad"} done={step3Done} locked={!step1Done&&!isDraft} {...stepProps}>
          {form.entries.map((e,i)=>(
            <div key={e.id}>
              {dragOverIdx===i&&dragEntryIdx!==i&&(
                <div className="drag-skeleton"><Icon name="draft" size={14} color="var(--accent)"/>Drop here</div>
              )}
              <div
                draggable
                onDragStart={ev=>{
                  // Only allow drag if mousedown was on the drag-handle
                  if(!dragHandleActiveRef.current){ev.preventDefault();return;}
                  ev.dataTransfer.effectAllowed="move";
                  dragEntryIdxRef.current=i;setDragEntryIdx(i);
                }}
                onDragOver={ev=>{ev.preventDefault();ev.dataTransfer.dropEffect="move";if(dragOverIdxRef.current!==i){dragOverIdxRef.current=i;setDragOverIdx(i);}}}
                onDrop={ev=>{ev.preventDefault();const from=dragEntryIdxRef.current;if(from!==-1&&from!==i)moveEntry(from,i);dragEntryIdxRef.current=-1;dragOverIdxRef.current=-1;setDragEntryIdx(-1);setDragOverIdx(-1);dragHandleActiveRef.current=false;}}
                onDragEnd={()=>{dragEntryIdxRef.current=-1;dragOverIdxRef.current=-1;setDragEntryIdx(-1);setDragOverIdx(-1);dragHandleActiveRef.current=false;}}
                style={{userSelect:"none",opacity:dragEntryIdx===i?0.25:1,transition:"opacity .12s"}}>
                <EntryCard entry={e} label={entryLabel} index={i} showNumber={isSC} onChange={val=>updateEntry(e.id,val)} onDelete={()=>deleteEntry(e.id)} onDragHandleMouseDown={()=>{dragHandleActiveRef.current=true;}} onDragHandleMouseUp={()=>{dragHandleActiveRef.current=false;}}/>
              </div>
            </div>
          ))}
          {isSC&&<button className="add-entry-btn" onClick={addEntry}>＋ Add New Site Comment</button>}
          {!isSC&&(
            <div style={{marginTop:16,padding:"15px",background:"var(--code-bg)",borderRadius:0,border:"1.5px solid var(--border)"}}>
              <div className="field"><label>Email Address <span className="req">*</span></label><input className="inp" type="email" placeholder="client@email.com" value={form.emailAddress} onChange={e=>setF({emailAddress:e.target.value})}/></div>
              <div className="field" style={{marginBottom:0}}><label>Email Type <span className="req">*</span></label>
                <div className="radio-group">
                  <label className={cls("radio-label",form.emailType==="clarification"&&"selected-clarif")}><input type="radio" name="emailType" value="clarification" checked={form.emailType==="clarification"} onChange={()=>setF({emailType:"clarification"})} style={{display:"none"}}/>Clarification</label>
                  <label className={cls("radio-label",form.emailType==="completed"&&"selected-complete")}><input type="radio" name="emailType" value="completed" checked={form.emailType==="completed"} onChange={()=>setF({emailType:"completed"})} style={{display:"none"}}/>Completed</label>
                </div>
              </div>
            </div>
          )}
          <button className={cls("copy-all-btn",copiedAll&&"copied")} onClick={handleCopyAll}>{copiedAll?"✓ Copied!":"📋 Copy All "+(isSC?"Site Comments":"Assumptions + Email")}</button>
        </StepCard>

        <StepCard num="6b" title={`Additional Backup Screenshots${form.backupImages?.length>0?" ("+form.backupImages.length+")":""}`} done={form.backupImages?.length>0} locked={!step1Done&&!isDraft} {...stepProps}>
          <p style={{fontSize:13,color:"var(--muted)",marginBottom:11}}>Each renamed <span style={{color:"var(--accent)",fontWeight:600}}>backup-screenshot-N</span> on download.</p>
          <ImageUpload baseName="backup-screenshot" multiple onImages={imgs=>setF({backupImages:imgs,checklist:{...formRef.current.checklist}})} immediateUpload={false} initialImages={form.backupImages||[]}/>
        </StepCard>

        <StepCard num={4} title="Device Check" done={step4Done} locked={!step3Done&&!isDraft} {...stepProps}>
          <p style={{fontSize:12,color:"var(--muted)",marginBottom:11}}>All three must be checked <span className="req">*</span></p>
          <div className="check-group">
            {[["mobile","Mobile"],["tablet","Tablet"],["desktop","Desktop"]].map(([k,l])=>(<label key={k} className={cls("check-label",form.devices[k]&&"checked")}><input type="checkbox" checked={form.devices[k]} onChange={e=>setF({devices:{...form.devices,[k]:e.target.checked}})}/>{l}</label>))}
          </div>
        </StepCard>

        <StepCard num={5} title="After Screenshot Name" done={form._afterCopied} locked={!step4Done&&!isDraft} {...stepProps}>
          <p style={{fontSize:13,color:"var(--muted)",marginBottom:9}}>Save your after screenshot with this name.</p>
          <CopyName name={afterName} onCopy={()=>setF({_afterCopied:true})}/>
        </StepCard>

        <StepCard num={6} title="Before/After Backup" done={form._screenshotCopied||(form.images&&form.images.length>0)} locked={!step4Done&&!isDraft} {...stepProps}>
          <p style={{fontSize:13,color:"var(--muted)",marginBottom:9}}>Upload screenshot — renamed automatically on download.</p>
          <CopyName name={screenshotName} onCopy={()=>setF({_screenshotCopied:true})}/>
          <div style={{marginTop:12}}><ImageUpload baseName={screenshotName} multiple={false} onImages={imgs=>setF({images:imgs,checklist:{...formRef.current.checklist,backup:imgs.length>0}})} immediateUpload={false} initialImages={form.images||[]}/></div>
        </StepCard>

        <StepCard num={7} title="Final Checklist" done={step7Done} locked={!step4Done&&!isDraft} {...stepProps}>
          <p style={{fontSize:12,color:"var(--muted)",marginBottom:11}}>All items must be checked <span className="req">*</span></p>
          <div className="check-group" style={{flexDirection:"column"}}>
            {[["backup","Before/After Backup?"],["caseComment","Case Comment"],["combinedTracker","Combined Tracker?"],["qaChecklist","QA Checklist?"],["completeJob","Complete Job?"],["emailSales","Email Sales?"],["trackerChecklist","Complete Status Tracker?"],["completeStatus","Tracker Checklist?"]].map(([k,l])=>(<label key={k} className={cls("check-label",form.checklist[k]&&"checked")} style={{width:"fit-content"}}><input type="checkbox" checked={form.checklist[k]} onChange={e=>setF({checklist:{...form.checklist,[k]:e.target.checked}})}/>{l}</label>))}
          </div>
        </StepCard>

        <div className="action-bar">
          <button className="btn btn-cancel" onClick={()=>setModal("cancel")}>✕ Cancel</button>
          <button className="btn btn-ghost" onClick={()=>setModal("clear")}>🧹 Clear</button>
          <div className="spacer"/>
          <button className="btn btn-draft" onClick={openDraftModal}> Save Draft</button>
          {autoSaved&&<span style={{fontSize:11,color:"var(--muted)",alignSelf:"center",marginLeft:4}}>✓ Auto-saved {autoSaved}</span>}
          <button className="btn btn-save" onClick={handleSave}>💾 Save Case</button>
        </div>

        {modal==="cancel"&&(<div className="modal-bg"><div className="modal"><div style={{marginBottom:14}}><Icon name="warn" size={40} color="var(--amber)"/></div><h3>Discard Form?</h3><p>Going back will delete all entered data.</p><div className="modal-btns"><button className="btn btn-ghost" onClick={()=>setModal(null)}>Keep Editing</button><button className="btn btn-danger" onClick={()=>{setModal(null);onBack();}}>Yes, Discard</button></div></div></div>)}
        {modal==="clear"&&(<div className="modal-bg"><div className="modal"><div style={{marginBottom:14}}><Icon name="clear" size={40} color="var(--red)"/></div><h3>Clear All Fields?</h3><p>This resets every field. Cannot be undone.</p><div className="modal-btns"><button className="btn btn-ghost" onClick={()=>setModal(null)}>Cancel</button><button className="btn btn-danger" onClick={()=>{setForm(emptyBase());setModal(null);showToast("Cleared","info");}}>Clear</button></div></div></div>)}
        {modal==="save"&&(<div className="modal-bg"><div className="modal"><div style={{marginBottom:14}}><Icon name="save" size={40} color="var(--accent)"/></div><h3>Save Case?</h3><p>Case <strong style={{color:"var(--text)"}}>#{form.caseNum}</strong> — confirm everything is complete.</p><div className="modal-btns"><button className="btn btn-ghost" onClick={()=>setModal(null)}>Go Back</button><button className="btn btn-primary" onClick={()=>{setModal(null);showToast("Case saved! ✅");onSave&&onSave(formRef.current);}}>Confirm Save</button></div></div></div>)}
        {modal==="draft"&&(<div className="modal-bg"><div className="modal">
          <div style={{marginBottom:14}}><Icon name="draft" size={44} color="var(--amber)"/></div>
          <h3 style={{marginBottom:8}}>Save as Draft?</h3>
          <p style={{color:"var(--muted)",fontSize:13,marginBottom:8,lineHeight:1.6}}>
            Your progress will be saved and you can resume anytime from Post-Live Amends.
          </p>
          <div style={{background:"var(--entry-accent-bg)",border:"1.5px solid var(--accent)",borderRadius:0,padding:"12px 16px",marginBottom:18,display:"flex",flexDirection:"column",gap:6}}>
            {form.caseNum&&<div style={{fontSize:13,fontWeight:700,color:"var(--text)"}}>Case #{form.caseNum}</div>}
            <div style={{fontSize:12,color:"var(--muted)"}}> Time on case: <strong style={{color:"var(--accent)",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:15}}>{fmtElapsed(Math.floor((Date.now()-startTimeRef.current)/1000))}</strong></div>
            <div style={{fontSize:11,color:"var(--muted)"}}>This time will be restored when you resume.</div>
          </div>
          <div className="modal-btns">
            <button className="btn btn-ghost" onClick={()=>setModal(null)}>Keep Editing</button>
            <button className="btn btn-draft" onClick={confirmSaveDraft} disabled={draftSaving} style={{opacity:draftSaving?.6:1}}>{draftSaving?"Saving…":"💾 Save & Go Back"}</button>
          </div>
        </div></div>)}
        <Toast msg={toast.msg} type={toast.type}/>
      </div>
      <div className="form-right">
        <StickyPanel startTimeRef={startTimeRef} form={form} isSC={isSC} buildEntriesText={buildEntriesText} buildEmailText={buildEmailText} onTimerEnd={onTimerEnd} specialRequestors={specialRequestors} timerLimitSecs={timerLimitSecs} greetingMessages={user?.greetingMessages}/>
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
  const colors = ["#f5945c","#d4724a","#10b981","#f59e0b","#f43f5e"];
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

function SparkLine({ data, color="#f5945c", height=40, width=200 }) {
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


  return (
    <div>
      <div style={{marginBottom:28}}>
        <h2 style={{fontSize:26,fontWeight:800,letterSpacing:"-.4px"}}>{greeting}, {user?.name?.split(" ")[0]||"there"}</h2>
        <p style={{color:"var(--muted)",fontSize:14,marginTop:5}}>{now.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card blue"><div className="stat-icon">📁</div><div className="stat-label">Total Cases</div><div className="stat-val">{total}</div><div className="stat-sub">All time</div></div>
        <div className="stat-card green"><div className="stat-icon">📅</div><div className="stat-label">Today</div><div className="stat-val">{today}</div><div className="stat-sub">Cases today</div></div>
        <div className="stat-card amber"><div className="stat-icon"> </div><div className="stat-label">Site Comments</div><div className="stat-val">{scCount}</div><div className="stat-sub">Post-live</div></div>
        <div className="stat-card purple"><div className="stat-icon"> </div><div className="stat-label">Inbound Email</div><div className="stat-val">{ibCount}</div><div className="stat-sub">Assumptions</div></div>
        <div className="stat-card green"><div className="stat-icon">✅</div><div className="stat-label">Completed</div><div className="stat-val">{rate}%</div><div className="stat-sub">Checklist rate</div></div>
        <div className="stat-card red"><div className="stat-icon"> </div><div className="stat-label">Incomplete</div><div className="stat-val">{total-completed}</div><div className="stat-sub">Missing checklist</div></div>
      </div>

      {/* Charts row */}
      <div className="section-title">Analytics</div>
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

      {/* Quick Actions */}
      <div className="section-title" style={{marginTop:4}}>Quick Actions</div>
      <div className="quick-links">
        <div className="quick-card" onClick={()=>setPage("postlive")}><span className="quick-icon"><Icon name="postlive" size={22}/></span><div><div className="quick-title">Post-Live Amends</div><div className="quick-sub">Site Comment or Inbound Email</div></div></div>
        <div className="quick-card" onClick={()=>setPage("prelive")}><span className="quick-icon"><Icon name="prelive" size={22}/></span><div><div className="quick-title">Pre-Live Amends</div><div className="quick-sub">Coming soon</div></div></div>
        <div className="quick-card" onClick={()=>setPage("history")}><span className="quick-icon"><Icon name="history" size={22}/></span><div><div className="quick-title">Case History</div><div className="quick-sub">{total} case{total!==1?"s":""} saved</div></div></div>
        <div className="quick-card" onClick={()=>setPage("announcements")}><span className="quick-icon"><Icon name="announce" size={22}/></span><div><div className="quick-title">Announcements</div><div className="quick-sub">Team updates</div></div></div>
      </div>

      {/* Recent */}
      {savedCases.length>0&&(<>
        <div className="section-title">Recent Cases</div>
        {[...savedCases].slice(0,6).map((c,i)=>(
          <div key={i} className="activity-row">
            <div className={cls("act-dot",c._mode==="siteComment"?"blue":"purple")}/>
            <div className="act-info"><div className="act-title">Case #{c.caseNum} — {c.accountNum}</div><div className="act-sub">{c.amendType} · {c.savedAt}</div></div>
            <span className={cls("act-badge",c._mode==="siteComment"?"site":"email")}>{c._mode==="siteComment"?"Site Comment":"Inbound Email"}</span>
          </div>
        ))}
      </>)}
      {savedCases.length===0&&(<div style={{textAlign:"center",color:"var(--muted)",padding:"40px 0",fontSize:14}}><div style={{marginBottom:16}}><Icon name="empty" size={52} color="var(--muted)"/></div>No cases saved yet. Start by creating a Post-Live Amend!</div>)}
      <Toast msg={toast.msg} type={toast.type}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SavedCaseCard (mini dropdown for PostLive page)
// ─────────────────────────────────────────────────────────────────────────────
function SavedCaseCard({ c, openId, setOpenId, idx=0 }) {
  const cardId = c._id || `local-${idx}`;
  const open = openId === cardId;
  const isSC=c._mode==="siteComment";
  const allImages=[...(c.images||[]),...(c.backupImages||[])];
  return (
    <div style={{background:"var(--card)",border:"1.5px solid var(--border)",borderRadius:0,marginBottom:10,overflow:"hidden",transition:".2s",boxShadow:"var(--shadow-sm)"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",cursor:"pointer"}} onClick={()=>setOpenId(open ? null : cardId)}>
        <div className="saved-dot"/>
        <div className="saved-info">
          <div className="saved-case">Case #{c.caseNum} — {c.accountNum}</div>
          <div className="saved-meta">{c.amendType} · {c.savedAt}{c.endedAt&&<span style={{marginLeft:8,color:"var(--green)",fontWeight:700}}>✓ {c.endedAt}</span>}</div>
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
          {!isSC&&c.emailAddress&&(<div style={{fontSize:13,color:"var(--muted)",marginBottom:8}}><Icon name="inbound" size={12} style={{marginRight:4,verticalAlign:"middle"}}/>{c.emailType==="clarification"?"Clarification":"Completed"} → <span style={{color:"var(--text)",fontWeight:600}}>{c.emailAddress}</span></div>)}
          {allImages.length>0&&(
            <div style={{marginTop:10}}>
              <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".8px",color:"var(--muted)",marginBottom:8}}>Screenshots ({allImages.length})</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
                {allImages.map(img=>{
                  const isValidUrl=(img.url||"").startsWith("https://");
                  return (
                    <div key={img.id||img.name} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,maxWidth:80}}>
                      <div style={{width:80,height:60,borderRadius:0,overflow:"hidden",border:"1.5px solid var(--border)",background:"var(--entry-bg)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        {isValidUrl
                          ? <img src={img.url} alt={img.name||""} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}
                              onError={e=>{e.currentTarget.style.display="none";e.currentTarget.parentNode.querySelector(".img-fallback").style.display="flex";}}
                            />
                          : null
                        }
                        <div className="img-fallback" style={{display:isValidUrl?"none":"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",gap:3}}>
                          <Icon name="image" size={20} color="var(--muted)"/>
                        </div>
                      </div>
                      <div style={{fontSize:9,color:"var(--muted)",textAlign:"center",wordBreak:"break-all",lineHeight:1.3,maxWidth:80,fontFamily:"'Poppins',sans-serif"}}>
                        {(img.name||"screenshot").replace(/\.[^.]+$/,"").slice(0,22)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// POST LIVE PAGE
// ─────────────────────────────────────────────────────────────────────────────
function PostLivePage({ onSaveCase, onFormActive, allSavedCases, dbDrafts, onSaveDraft, onDeleteDraft, user, onTimerEnd, specialRequestors=[], alarmMins=30 }) {
  const [mode,setMode]=useState(null);
  const [backConfirm,setBackConfirm]=useState(false);
  const [openSavedId,setOpenSavedId]=useState(null);
  const [toast,showToast]=useToast();

  const enterMode=(m)=>{setMode(m);onFormActive&&onFormActive(true);};
  const exitMode=()=>{setMode(null);onFormActive&&onFormActive(false);};

  const currentDraft=dbDrafts?.find(d=>d._mode===mode)||null;

  if(mode==="siteComment"||mode==="inbound"){
    const handleSaveDraft=async(formData)=>{
      const elapsed=formData._elapsedAtSave||0;
      await onSaveDraft(mode,{...formData,_mode:mode});
    };
    return (
      <div>
        <div className="page-header">
          <button className="back-btn" onClick={()=>setBackConfirm(true)}>← Back</button>
          <div className="page-title">{mode==="siteComment"?"Post-Live — Site Comment":"Post-Live — Inbound Email"}</div>
          <div className="page-sub">{mode==="siteComment"?"Fill in each step. Steps unlock as you progress.":"Assumption-based format with email details."}</div>
        </div>
        <PostLiveForm mode={mode} draftData={currentDraft} user={user} onTimerEnd={onTimerEnd} specialRequestors={specialRequestors} timerLimitSecs={alarmMins*60}
          onSave={f=>{
            const now=new Date();const rec={...f,_mode:mode,savedAt:now.toLocaleString(),endedAt:now.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})};
            if(currentDraft?._id) onDeleteDraft&&onDeleteDraft(currentDraft._id,mode);
            onSaveCase&&onSaveCase(rec);
            exitMode();
          }}
          onSaveDraftDirect={handleSaveDraft}
          onBack={exitMode}/>
        {backConfirm&&(<div className="modal-bg"><div className="modal"><div style={{marginBottom:14}}><Icon name="pin" size={40} color="var(--accent)"/></div><h3>Go Back?</h3><p>Your form and timer will keep running. You can resume at any time — your progress is safe.</p><div className="modal-btns"><button className="btn btn-ghost" onClick={()=>setBackConfirm(false)}>Keep Editing</button><button className="btn btn-primary" onClick={()=>{setBackConfirm(false);exitMode();}}>Minimise</button></div></div></div>)}
      </div>
    );
  }

  const recentAll = [...allSavedCases].slice(0,6);

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Post-Live Amends</div>
        <div className="page-sub">Choose the type of amend to begin.</div>
      </div>
      <div className="choice-row">
        <button className="choice-btn" onClick={()=>enterMode("siteComment")}><span className="choice-icon"><Icon name="sitecomment" size={28} color="var(--accent)"/></span><div><div className="choice-btn-title">Site Comment</div><div className="choice-btn-sub">Step-by-step with live timer</div></div></button>
        <button className="choice-btn" onClick={()=>enterMode("inbound")}><span className="choice-icon"><Icon name="inbound" size={28} color="var(--accent)"/></span><div><div className="choice-btn-title">Inbound Email</div><div className="choice-btn-sub">Assumption-based format</div></div></button>
      </div>

      {dbDrafts&&dbDrafts.length>0&&(<div style={{marginBottom:22}}><div className="section-title">Drafts <span style={{fontSize:11,color:"var(--muted)",fontWeight:400}}>(auto-saved to database)</span></div>{dbDrafts.map((d,i)=>(<div key={d._id||i} className="draft-row"><div className="draft-dot"/><div className="saved-info"><div className="saved-case">Case #{d.caseNum||"—"} — Account {d.accountNum||"—"}</div><div className="saved-meta">{d.amendType||"No amend type"} · Saved {d.draftAt}</div></div><span className="draft-badge">{d._mode==="siteComment"?"Site Comment":"Inbound Email"}</span><button className="draft-resume" onClick={()=>enterMode(d._mode)}><Icon name="play" size={11} style={{marginRight:4}}/>Resume</button><button className="entry-del" title="Delete draft" onClick={()=>onDeleteDraft&&onDeleteDraft(d._id,d._mode)} style={{marginLeft:4}}><Icon name="trash" size={13} color="var(--red)"/></button></div>))}</div>)}

      <div>
        <div className="section-title">Recently Saved Cases</div>
        {recentAll.length===0&&<div style={{color:"var(--muted)",fontSize:13,padding:"8px 0"}}>No cases saved yet. Complete a form to see it here.</div>}
        {recentAll.map((c,i)=>(<SavedCaseCard key={c._id||`local-${i}`} c={c} idx={i} openId={openSavedId} setOpenId={setOpenSavedId}/>))}
      </div>
      <Toast msg={toast.msg} type={toast.type}/>
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
const CHECKLIST_LABELS={backup:"Before/After Backup",caseComment:"Case Comment",combinedTracker:"Combined Tracker",qaChecklist:"QA Checklist",completeJob:"Complete Job",emailSales:"Email Sales",trackerChecklist:"Complete Status Tracker",completeStatus:"Tracker Checklist"};
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
            {c.savedAt}{c.endedAt&&<span style={{marginLeft:8,color:"var(--green)",fontWeight:600}}> · Done {c.endedAt}</span>}
            {allImages.length>0&&<span style={{marginLeft:8,opacity:.7}}>{allImages.length} img</span>}
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
              <div className="case-section-title">Case Info</div>
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
                <div className="case-section-title" style={{marginBottom:0}}>{isSC?"Site Comments":"Assumptions"}</div>
                {editMode&&<button className="add-entry-btn-sm" onClick={addEntry}>＋ Add {isSC?"Comment":"Assumption"}</button>}
              </div>
              {editMode ? (
                (D.entries||[]).map((e,ei)=>(
                  <div key={e.id} className="edit-entry-card">
                    {(isSC||(D.entries.length>1))&&<button className="entry-del" onClick={()=>deleteEntry(e.id)}><Icon name="trash" size={13} color="var(--red)"/></button>}
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
                <div className="case-section-title">Email Details</div>
                {editMode ? (
                  <>
                    <div className="field-row-edit"><label>Email Address</label><input className="inp" type="email" value={D.emailAddress||""} onChange={e=>setD({emailAddress:e.target.value})}/></div>
                    <div className="field-row-edit"><label>Email Type</label>
                      <div className="radio-group">
                        <label className={cls("radio-label",D.emailType==="clarification"&&"selected-clarif")}><input type="radio" checked={D.emailType==="clarification"} onChange={()=>setD({emailType:"clarification"})}/>Clarification</label>
                        <label className={cls("radio-label",D.emailType==="completed"&&"selected-complete")}><input type="radio" checked={D.emailType==="completed"} onChange={()=>setD({emailType:"completed"})}/>Completed</label>
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
                  {[["mobile","Mobile"],["tablet","Tablet"],["desktop","Desktop"]].map(([k,l])=>(
                    <label key={k} className={cls("check-label",D.devices?.[k]&&"checked")} style={{fontSize:12}}>
                      <input type="checkbox" checked={!!D.devices?.[k]} onChange={e=>setD({devices:{...D.devices,[k]:e.target.checked}})}/>{l}
                    </label>
                  ))}
                </div>
              ) : (
                <div className="case-device-chips">
                  {[["mobile","Mobile"],["tablet","Tablet"],["desktop","Desktop"]].map(([k,l])=>(
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
                <div className="case-section-title" style={{marginBottom:0}}> Screenshots {editMode?"":`(${allImages.length})`}</div>
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
        <div style={{marginBottom:14}}><Icon name="trash" size={40} color="var(--red)"/></div><h3>Delete Case?</h3>
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
  const filtered = [...cases].filter(c=>{
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
          <div style={{marginBottom:14}}><Icon name="empty" size={52} color="var(--muted)"/></div>
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
function AnnouncementsPage({ announcements, addAnnouncement, updateAnnouncement, removeAnnouncement, user }) {
  const [adding,setAdding]=useState(false);
  const [confirming,setConfirming]=useState(false);
  const [saving,setSaving]=useState(false);
  const [deleteTarget,setDeleteTarget]=useState(null);
  const [editTarget,setEditTarget]=useState(null); // announcement being edited
  const [editForm,setEditForm]=useState({title:"",body:"",badge:"info"});
  const [form,setForm]=useState({title:"",body:"",badge:"info"});
  const [toast,showToast]=useToast();

  const BADGE_OPTS=[["info","ℹ️ Info"],["update","✅ Update"],["urgent","🚨 Urgent"]];

  const startPost=()=>{
    if(!form.title.trim())return showToast("Title required","error");
    setConfirming(true);
  };

  const confirmPost=async()=>{
    setSaving(true);
    try{
      await addAnnouncement({...form,author:user.name,createdAt:new Date().toLocaleString()});
      setForm({title:"",body:"",badge:"info"});
      setAdding(false);setConfirming(false);
      showToast("✅ Announcement posted!");
    }catch(e){
      showToast("❌ Failed to save — check connection","error");
    }finally{setSaving(false);}
  };

  const startEdit=(a)=>{
    setEditTarget(a);
    setEditForm({title:a.title,body:a.body||"",badge:a.badge||"info"});
  };

  const saveEdit=async()=>{
    if(!editForm.title.trim())return showToast("Title required","error");
    setSaving(true);
    try{
      await updateAnnouncement(editTarget.id,{title:editForm.title,body:editForm.body,badge:editForm.badge});
      setEditTarget(null);
      showToast("✅ Announcement updated!");
    }catch(e){
      showToast("❌ Failed to update","error");
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

  const isAuthor=(a)=> a.author && user?.name && a.author===user.name;

  const badgePicker=(val,onChange)=>(
    <div className="radio-group">
      {BADGE_OPTS.map(([v,l])=>(
        <label key={v} className={cls("radio-label",val===v&&"selected-clarif")}>
          <input type="radio" checked={val===v} onChange={()=>onChange(v)}/>{l}
        </label>
      ))}
    </div>
  );

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
        <div><div className="page-title"> Announcements</div><div className="page-sub">Team updates and notices</div></div>
        <button className="btn btn-primary" onClick={()=>{setAdding(true);setConfirming(false);}}>＋ New Announcement</button>
      </div>

      {/* ── Write form ── */}
      {adding&&!confirming&&(<div className="modal-bg"><div className="edit-modal">
        <h3 style={{marginBottom:16}}>New Announcement</h3>
        <div className="field"><label>Title <span className="req">*</span></label><input className="inp" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="Announcement title" autoFocus/></div>
        <div className="field"><label>Message</label><textarea className="inp" rows={4} value={form.body} onChange={e=>setForm(f=>({...f,body:e.target.value}))} placeholder="Write your message..."/></div>
        <div className="field"><label>Type</label>{badgePicker(form.badge,v=>setForm(f=>({...f,badge:v})))}</div>
        <div className="modal-btns"><button className="btn btn-ghost" onClick={()=>setAdding(false)}>Cancel</button><button className="btn btn-primary" onClick={startPost}>Review & Post →</button></div>
      </div></div>)}

      {/* ── Confirm before posting ── */}
      {confirming&&(<div className="modal-bg"><div className="modal">
        <div style={{marginBottom:14}}><Icon name="announce" size={40} color="var(--accent)"/></div>
        <h3>Post Announcement?</h3>
        <p style={{color:"var(--muted)",fontSize:13,margin:"10px 0 4px"}}>Title: <strong style={{color:"var(--text)"}}>{form.title}</strong></p>
        {form.body&&<p style={{color:"var(--muted)",fontSize:12,marginBottom:4,maxHeight:80,overflow:"hidden"}}>{form.body}</p>}
        <p style={{fontSize:12,color:"var(--muted)",marginBottom:16}}>Visible to your whole team.</p>
        <div className="modal-btns">
          <button className="btn btn-ghost" onClick={()=>setConfirming(false)} disabled={saving}>← Go Back</button>
          <button className="btn btn-primary" onClick={confirmPost} disabled={saving}>{saving?"Saving…":"✅ Confirm & Post"}</button>
        </div>
      </div></div>)}

      {/* ── Edit modal (author only) ── */}
      {editTarget&&(<div className="modal-bg"><div className="edit-modal">
        <h3 style={{marginBottom:16}}>✏️ Edit Announcement</h3>
        <div className="field"><label>Title <span className="req">*</span></label><input className="inp" value={editForm.title} onChange={e=>setEditForm(f=>({...f,title:e.target.value}))} autoFocus/></div>
        <div className="field"><label>Message</label><textarea className="inp" rows={4} value={editForm.body} onChange={e=>setEditForm(f=>({...f,body:e.target.value}))}/></div>
        <div className="field"><label>Type</label>{badgePicker(editForm.badge,v=>setEditForm(f=>({...f,badge:v})))}</div>
        <div style={{fontSize:11,color:"var(--muted)",marginBottom:14}}>Only you can edit this — posted by {editTarget.author}</div>
        <div className="modal-btns">
          <button className="btn btn-ghost" onClick={()=>setEditTarget(null)} disabled={saving}>Cancel</button>
          <button className="btn btn-save" onClick={saveEdit} disabled={saving}>{saving?"Saving…":"💾 Save Changes"}</button>
        </div>
      </div></div>)}

      {/* ── Delete confirm ── */}
      {deleteTarget&&(<div className="modal-bg"><div className="modal">
        <div style={{marginBottom:14}}><Icon name="trash" size={40} color="var(--red)"/></div>
        <h3>Delete Announcement?</h3>
        <p style={{color:"var(--muted)",fontSize:13,marginBottom:16}}>This will be permanently removed.</p>
        <div className="modal-btns">
          <button className="btn btn-ghost" onClick={()=>setDeleteTarget(null)}>Cancel</button>
          <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
        </div>
      </div></div>)}

      {announcements.length===0&&(<div className="empty-history"><div style={{marginBottom:14}}><Icon name="empty" size={52} color="var(--muted)"/></div><div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:18,fontWeight:800,marginBottom:6}}>No announcements</div><div>Post one to inform your team!</div></div>)}

      {announcements.map(a=>(
        <div key={a.id} className="announcement-card">
          <div className="ann-header">
            <div style={{flex:1,minWidth:0}}>
              <div className="ann-title">{a.title}</div>
              <div className="ann-meta">By {a.author} · {a.createdAt}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
              <span className={cls("ann-badge",a.badge||"info")}>{a.badge==="urgent"?"🚨 Urgent":a.badge==="update"?"✅ Update":"ℹ️ Info"}</span>
              {isAuthor(a)&&(
                <button className="h-btn" style={{borderColor:"var(--accent)",color:"var(--accent)",padding:"4px 10px",fontSize:11}} onClick={()=>startEdit(a)}>✏️ Edit</button>
              )}
              {isAuthor(a)&&(
                <button className="entry-del" onClick={()=>setDeleteTarget(a.id)}><Icon name="trash" size={13} color="var(--red)"/></button>
              )}
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
function LinksPage({ links, setLinks, addLink, updateLink, removeLink }) {
  const dragLinkRef=useRef(null);
  const [dragLinkActive,setDragLinkActive]=useState(null);
  const [dragLinkOver,setDragLinkOver]=useState(null);
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

      {links.map((l,i)=>(
        <div key={l.id}>
          {dragLinkOver===i&&dragLinkActive!==i&&(
            <div className="link-drag-skeleton"><Icon name="links" size={14} color="var(--accent)"/>Drop here</div>
          )}
          <div className="link-card"
            draggable
            onDragStart={()=>{dragLinkRef.current=i;setDragLinkActive(i);}}
            onDragOver={e=>{e.preventDefault();if(dragLinkOver!==i)setDragLinkOver(i);}}
            onDrop={()=>{
              const from=dragLinkRef.current;
              if(from!=null&&from!==i){const arr=[...links];const[m]=arr.splice(from,1);arr.splice(i,0,m);setLinks(arr);}
              dragLinkRef.current=null;setDragLinkActive(null);setDragLinkOver(null);
            }}
            onDragEnd={()=>{dragLinkRef.current=null;setDragLinkActive(null);setDragLinkOver(null);}}
            style={{cursor:"grab",userSelect:"none",opacity:dragLinkActive===i?0.25:1,transition:"opacity .12s"}}
          >
          <div className="drag-handle" title="Drag to reorder" style={{flexDirection:"row",gap:3,padding:"6px 4px"}}>
            <span style={{width:2,height:16,background:"var(--muted)",borderRadius:1,display:"block"}}/>
            <span style={{width:2,height:16,background:"var(--muted)",borderRadius:1,display:"block"}}/>
            <span style={{width:2,height:16,background:"var(--muted)",borderRadius:1,display:"block"}}/>
          </div>
          <div className="link-icon">{l.icon}</div>
          <div className="link-info"><div className="link-title">{l.title}</div><div className="link-url">{l.url}</div></div>
          <div className="link-actions">
            <a href={l.url} target="_blank" rel="noopener noreferrer" className="h-btn" style={{textDecoration:"none"}}>↗ Open</a>
            <button className="h-btn" style={{borderColor:"var(--accent)",color:"var(--accent)"}} onClick={()=>startEdit(l)}>✏️ Edit</button>
            <button className="h-btn danger" onClick={()=>remove(l.id)}><Icon name="trash" size={13} color="var(--red)"/></button>
          </div>
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
function ProfilePage({ user, setUser, onLogout, timerLimit, saveTimerLimit, specialRequestors=[], addRequestor, removeRequestor }) {
  const [editing,setEditing]=useState(false);
  const [loading,setLoading]=useState(true);
  const [saving,setSaving]=useState(false);
  const [toast,showToast]=useToast();
  const avatarInputRef=useRef();
  const [newReq,setNewReq]=useState("");
  const [addingReq,setAddingReq]=useState(false);
  const handleAddRequestor=()=>{
    const name=newReq.trim();
    if(!name)return showToast("Name required","error");
    if(specialRequestors.includes(name)){showToast("Already exists","error");return;}
    addRequestor(name);setNewReq("");setAddingReq(false);showToast(`Added ${name}!`);
  };

  const defNames=(name)=>{
    const n=(name||"User").trim().replace(/\s+/g,"_");
    return {beforeName:`Post_Live_Amend_Before_${n}_Amends`,afterName:`Post_Live_Amend_After_${n}_Amends`,screenshotName:`Post_Live_Amend_Screenshot_${n}_Amends`};
  };

  const defaultMsgs=[{id:"default",label:"Check-in",base:"Hi po Ms. Tina, magpapacheck lang po",fillType:"caseNum"}];
  const [form,setForm]=useState({
    name:user.name||"",email:user.email||"",role:user.role||"",
    beforeName:user.beforeName||defNames(user.name).beforeName,
    afterName:user.afterName||defNames(user.name).afterName,
    screenshotName:user.screenshotName||defNames(user.name).screenshotName,
    avatarUrl:user.avatarUrl||"",
    greetingMessages:(user.greetingMessages||defaultMsgs).map(m=>({...m,base:m.base||(m.template||"").replace("[Case #]","").replace("[Inbound #]","").replace("[Type]","").trim()})),
  });
  const [pwForm,setPwForm]=useState({next:"",confirm:""});
  const [timerInput,setTimerInput]=useState(String(timerLimit||30));

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
            greetingMessages: ((data.greeting_messages && data.greeting_messages.length>0) ? data.greeting_messages : (user.greetingMessages||defaultMsgs))
              .map(m=>({...m, base: m.base || (m.template||"").replace("[Case #]","").replace("[Inbound #]","").replace("[Type]","").trim() })),
          };
          setForm(f=>({...f,
            name:merged.name,role:merged.role,avatarUrl:merged.avatarUrl,
            beforeName:merged.beforeName,afterName:merged.afterName,screenshotName:merged.screenshotName,
            greetingMessages:(merged.greetingMessages||defaultMsgs).map(m=>({...m,base:m.base||(m.template||"").replace("[Case #]","").replace("[Inbound #]","").replace("[Type]","").trim()})),
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
        greeting_messages:form.greetingMessages||[],
      };
      const res=await fetch("/api/profile",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
      const data=await res.json();
      if(!res.ok)return showToast(data.error||"Error saving profile","error");
      // Update local state and localStorage
      const updated={...user,...form,
        beforeName:form.beforeName,afterName:form.afterName,
        screenshotName:form.screenshotName,avatarUrl:form.avatarUrl||user.avatarUrl||"",
        greetingMessages:form.greetingMessages||[]};
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
      <div className="page-header"><div className="page-title">Profile & Settings</div><div className="page-sub">Manage your account, requestors, and preferences</div></div>
      {loading&&<div style={{textAlign:"center",padding:"40px 0",color:"var(--muted)"}}>Loading profile…</div>}
      {!loading&&<>

      {/* ── Info card ── */}
      <div className="profile-card">
        <div style={{display:"flex",alignItems:"center",gap:20,marginBottom:20}}>
          <div className="profile-avatar-large" title="Click to change photo" onClick={()=>avatarInputRef.current?.click()}>
            {form.avatarUrl?<img src={form.avatarUrl} alt="Profile"/>:<span>{initials}</span>}
            <div className="profile-avatar-overlay"><Icon name="camera" size={18} color="#fff"/></div>
            <input ref={avatarInputRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{display:"none"}}/>
          </div>
          <div>
            <h3 style={{fontSize:20,fontWeight:800}}>{form.name||user.name}</h3>
            <p style={{color:"var(--muted)",fontSize:13,marginTop:3}}>{user.email}</p>
            {form.role&&<p style={{fontSize:12,color:"var(--accent)",marginTop:3,fontWeight:600}}>{form.role}</p>}
          </div>
          <div style={{marginLeft:"auto"}}><button className="btn btn-ghost" onClick={()=>setEditing(e=>!e)}>{editing?"Cancel":"Edit Profile"}</button></div>
        </div>
        {editing&&(<div style={{borderTop:"1px solid var(--border)",paddingTop:20}}>
          <div className="field"><label>Full Name</label><input className="inp" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/></div>
          <div className="field"><label>Role / Title</label><input className="inp" value={form.role} onChange={e=>setForm(f=>({...f,role:e.target.value}))} placeholder="e.g. Web Specialist"/></div>
          <button className="btn btn-primary" onClick={saveProfile} disabled={saving}>{saving?"Saving...":"Save Changes"}</button>
        </div>)}
      </div>

      {/* ── Check-in Messages card ── */}
      <div className="profile-card">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
          <h3 style={{fontSize:16,fontWeight:700,margin:0}}>Check-in Messages</h3>
          <button className="btn btn-primary" style={{fontSize:11,padding:"5px 12px"}} onClick={()=>{
            const newMsg={id:Date.now().toString(),label:"New Message",base:"Hi po Ms. Tina, magpapacheck lang po",fillType:"caseNum"};
            setForm(f=>({...f,greetingMessages:[...(f.greetingMessages||[]),newMsg]}));
          }}>＋ Add Message</button>
        </div>
        <p style={{fontSize:12,color:"var(--muted)",marginBottom:14}}>Write your message base text. The radio button automatically appends what type to include when copying.</p>
        {(form.greetingMessages||[]).length===0&&(
          <div style={{fontSize:13,color:"var(--muted)",padding:"12px 0"}}>No messages yet. Click <b>＋ Add Message</b> to create one.</div>
        )}
        {(form.greetingMessages||[]).map((m,mi)=>{
          // Auto-build preview from base + fillType
          const buildPreview=(base,ft)=>{
            const b=base||"Hi po Ms. Tina, magpapacheck lang po";
            if(ft==="siteComment") return `${b} Site Comment #12345`;
            if(ft==="caseNum")     return `${b} Case #12345`;
            if(ft==="inbound")     return `${b} Inbound #67890`;
            return b;
          };
          const updateMsg=(patch)=>{
            const arr=[...(form.greetingMessages||[])];arr[mi]={...arr[mi],...patch};
            setForm(f=>({...f,greetingMessages:arr}));
          };
          return (
          <div key={m.id} style={{background:"var(--entry-bg)",border:"1.5px solid var(--border)",padding:"14px",marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <input className="inp" style={{flex:1,fontWeight:700,fontSize:13}} value={m.label||""} onChange={e=>updateMsg({label:e.target.value})} placeholder="Label (e.g. Site Comment)"/>
              <button className="entry-del" onClick={()=>{
                const arr=(form.greetingMessages||[]).filter((_,i)=>i!==mi);setForm(f=>({...f,greetingMessages:arr}));
              }}><Icon name="trash" size={13} color="var(--red)"/></button>
            </div>
            <div className="field" style={{marginBottom:10}}>
              <label>Message</label>
              <input className="inp" value={m.base||""} onChange={e=>updateMsg({base:e.target.value})} placeholder="Hi po Ms. Tina, magpapacheck lang po"/>
            </div>
            <div className="field" style={{marginBottom:8}}>
              <label style={{marginBottom:6,display:"block"}}>Which number to use</label>
              <div className="radio-group">
                {[
                  {v:"siteComment", l:"Site Comment #", cls:"selected-complete"},
                  {v:"caseNum",     l:"Case #",          cls:"selected-clarif"},
                  {v:"inbound",     l:"Inbound #",        cls:"selected-complete"},
                ].map(({v,l,cls:sc})=>(
                  <label key={v} className={cls("radio-label",m.fillType===v&&sc)}>
                    <input type="radio" name={`fillType-${m.id}`} checked={m.fillType===v} onChange={()=>updateMsg({fillType:v})} style={{display:"none"}}/>
                    {l}
                  </label>
                ))}
              </div>
            </div>
            <div style={{fontSize:11,color:"var(--muted)",marginTop:8,padding:"7px 10px",background:"var(--card)",border:"1px solid var(--border)"}}>
              <span style={{opacity:.6}}>Preview: </span>
              <span style={{color:"var(--accent)",fontWeight:600}}>{buildPreview(m.base,m.fillType)}</span>
            </div>
          </div>
          );
        })}
        <button className="btn btn-primary" style={{marginTop:4}} onClick={saveProfile} disabled={saving}>{saving?"Saving...":"💾 Save Messages"}</button>
      </div>

      {/* ── Special Requestors card ── */}
      <div className="profile-card">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <h3 style={{fontSize:16,fontWeight:700,margin:0}}>Special Requestors</h3>
          <button className="btn btn-primary" style={{fontSize:11,padding:"5px 12px"}} onClick={()=>setAddingReq(true)}>＋ Add Requestor</button>
        </div>
        <p style={{fontSize:12,color:"var(--muted)",marginBottom:14}}>Names shown in the Live Summary panel as a reminder during active cases.</p>
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
        {addingReq&&(<div className="modal-bg"><div className="modal">
          <div style={{marginBottom:14}}><Icon name="requestors" size={40} color="var(--amber)"/></div>
          <h3>Add Special Requestor</h3>
          <div className="field" style={{textAlign:"left",marginBottom:16}}>
            <label>Full Name</label>
            <input className="inp" placeholder="e.g. John Smith" value={newReq} onChange={e=>setNewReq(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleAddRequestor()} autoFocus/>
          </div>
          <div className="modal-btns">
            <button className="btn btn-ghost" onClick={()=>{setAddingReq(false);setNewReq("");}}>Cancel</button>
            <button className="btn btn-primary" onClick={handleAddRequestor}>Add</button>
          </div>
        </div></div>)}
      </div>

      {/* ── File naming card ── */}
      <div className="profile-card">
        <h3 style={{fontSize:16,fontWeight:700,marginBottom:4}}>Screenshot File Names</h3>
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
        <h3 style={{fontSize:16,fontWeight:700,marginBottom:16}}>Change Password</h3>
        <div className="field"><label>New Password</label><input className="inp" type="password" placeholder="Min. 6 characters" value={pwForm.next} onChange={e=>setPwForm(f=>({...f,next:e.target.value}))}/></div>
        <div className="field"><label>Confirm New Password</label><input className="inp" type="password" placeholder="••••••••" value={pwForm.confirm} onChange={e=>setPwForm(f=>({...f,confirm:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&changePw()}/></div>
        <button className="btn btn-primary" onClick={changePw} disabled={saving}>{saving?"Updating...":"Update Password"}</button>
      </div>

      {/* ── Timer settings card ── */}
      <div className="profile-card">
        <h3 style={{fontSize:16,fontWeight:700,marginBottom:4}}>Case Timer Alert</h3>
        <p style={{fontSize:12,color:"var(--muted)",marginBottom:16}}>Alarm fires after this many minutes on a case. Default is 30 minutes.</p>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <input className="inp" type="number" min="1" max="240" style={{width:90,textAlign:"center",fontWeight:700,fontSize:15}}
            value={timerInput}
            onChange={e=>setTimerInput(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&(saveTimerLimit(timerInput),showToast("Timer updated ✅"))}
          />
          <span style={{fontSize:13,color:"var(--muted)"}}>minutes</span>
          <button className="btn btn-primary" style={{marginLeft:"auto",padding:"8px 18px",fontSize:12}}
            onClick={()=>{saveTimerLimit(timerInput);showToast("Timer alert updated ✅");}}>
            Save
          </button>
        </div>
        <div style={{fontSize:11,color:"var(--muted)",marginTop:8}}>Currently: <strong style={{color:"var(--accent)"}}>{timerLimit} min</strong></div>
      </div>

      {/* ── Danger zone ── */}
      <div className="profile-card" style={{borderColor:"rgba(244,63,94,.3)"}}>
        <h3 style={{fontSize:16,fontWeight:700,marginBottom:8,color:"var(--red)"}}>Danger Zone</h3>
        <p style={{color:"var(--muted)",fontSize:13,marginBottom:14}}>Signing out will end your current session.</p>
        <button className="btn btn-danger" onClick={onLogout}>Sign Out</button>
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
      <div className="auth-logo-icon">
        <svg width="40" height="40" viewBox="0 0 30 30" fill="none">
          <rect x="2" y="2" width="11" height="11" fill="var(--accent)" opacity=".9"/>
          <rect x="17" y="2" width="11" height="11" fill="var(--accent)" opacity=".5"/>
          <rect x="2" y="17" width="11" height="11" fill="var(--accent)" opacity=".5"/>
          <rect x="17" y="17" width="11" height="11" fill="var(--accent)" opacity=".2"/>
        </svg>
      </div>
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
  const [page,setPage]=useState(()=>{
    if(typeof window!=="undefined"){
      const saved=localStorage.getItem("ch_page");
      if(saved&&["dashboard","postlive","history","announcements","links","profile","build","prelive"].includes(saved)) return saved;
    }
    return "dashboard";
  });
  const sidebarDragRef=useRef(null);
  const [pendingPage,setPendingPage]=useState(null);
  const [navConfirm,setNavConfirm]=useState(false);
  const dbStatus = useDbStatus();
  const [allCases,setAllCases]=useState([]);
  const [drafts,setDrafts]=useState([]);
  const [formActive,setFormActive]=useState(false);
  // Persist formActive so pill shows even after page switch
  const setFormActivePersist=(v)=>{
    setFormActive(v);
    if(typeof window!=="undefined"){
      if(v) localStorage.setItem("ch_form_active","1");
      else localStorage.removeItem("ch_form_active");
    }
  };
  useEffect(()=>{
    if(typeof window!=="undefined"&&localStorage.getItem("ch_form_active")==="1") setFormActive(true);
  },[]);
  const [lightMode,setLightMode]=useState(()=>{
    if(typeof window!=="undefined"){return localStorage.getItem("ch_theme")==="light";}
    return false;
  });
  const [specialRequestors,setSpecialRequestors]=useState([]);
  const [timerLimit,setTimerLimit]=useState(()=>{
    if(typeof window!=="undefined"){const v=parseInt(localStorage.getItem("ch_timer_limit"));return isNaN(v)?30:v;}
    return 30;
  });
  const saveTimerLimit=(mins)=>{
    const v=Math.max(1,Math.min(240,parseInt(mins)||30));
    setTimerLimit(v);
    if(typeof window!=="undefined") localStorage.setItem("ch_timer_limit",v);
  };
  const [announcements,setAnnouncements]=useState([]); // always loaded from DB
  const [links,setLinks]=useState([]);
  const [dataLoading,setDataLoading]=useState(false);
  const [breakTimer,setBreakTimer]=useState(null); // {label,endsAt,warnAt,warned,ended}
  // timerLimit (mins) is the single source of truth — also aliased as alarmMins for legacy compat
  const alarmMins = timerLimit;
  const saveAlarmMins = saveTimerLimit;

  useEffect(()=>{document.body.classList.toggle("light",lightMode);if(typeof window!=="undefined") localStorage.setItem("ch_theme",lightMode?"light":"dark");},[lightMode]);

  // ── Alarm state: null | "warn" | "end" | "case" ──
  const [activeAlarm,setActiveAlarm]=useState(null);
  const alarmLoopRef=useRef(null);
  const alarmCtxRef=useRef(null);

  // ── Web Audio looping alarm ──
  function startAlarmLoop(type){
    stopAlarmLoop();
    const loop=()=>{
      try{
        const ctx=new (window.AudioContext||window.webkitAudioContext)();
        alarmCtxRef.current=ctx;
        const isWarn=type==="warn";
        const beeps=isWarn?2:3;
        const freq=isWarn?880:1046;
        const gap=isWarn?0.45:0.35;
        const totalDur=beeps*gap+0.6;
        for(let i=0;i<beeps;i++){
          const o=ctx.createOscillator();
          const g=ctx.createGain();
          o.connect(g); g.connect(ctx.destination);
          o.frequency.value=freq;
          o.type=isWarn?"triangle":"square";
          g.gain.setValueAtTime(0,ctx.currentTime+i*gap);
          g.gain.linearRampToValueAtTime(0.45,ctx.currentTime+i*gap+0.04);
          g.gain.linearRampToValueAtTime(0.45,ctx.currentTime+i*gap+0.22);
          g.gain.linearRampToValueAtTime(0,ctx.currentTime+i*gap+0.28);
          o.start(ctx.currentTime+i*gap);
          o.stop(ctx.currentTime+i*gap+0.3);
        }
        // schedule next loop
        alarmLoopRef.current=setTimeout(()=>{ ctx.close(); loop(); },totalDur*1000);
      }catch(e){console.warn("Audio error",e);}
    };
    loop();
    setActiveAlarm(type);
  }

  function stopAlarmLoop(){
    if(alarmLoopRef.current){clearTimeout(alarmLoopRef.current);alarmLoopRef.current=null;}
    try{alarmCtxRef.current?.close();}catch(e){}
    alarmCtxRef.current=null;
  }

  function dismissAlarm(){ stopAlarmLoop(); setActiveAlarm(null); }
  function snoozeAlarm(){
    stopAlarmLoop(); setActiveAlarm(null);
    // re-trigger in 5 minutes
    setTimeout(()=>startAlarmLoop("end"),5*60*1000);
  }

  // ── Break timer tick ──
  useEffect(()=>{
    if(!breakTimer)return;
    const tick=setInterval(()=>{
      const now=Date.now();
      setBreakTimer(bt=>{
        if(!bt)return null;
        const secsLeft=Math.ceil((bt.endsAt-now)/1000);
        if(!bt.warned && now>=bt.warnAt){
          startAlarmLoop("warn");
          return {...bt,warned:true};
        }
        if(!bt.ended && secsLeft<=0){
          startAlarmLoop("end");
          return {...bt,ended:true,secsLeft:0};
        }
        return {...bt,secsLeft:Math.max(0,secsLeft)};
      });
    },500);
    return()=>clearInterval(tick);
  },[breakTimer]);

  function startBreak(label,mins){
    const now=Date.now();
    const endsAt=now+mins*60*1000;
    // warnAt = 5 min before end, but never in the past
    const warnAt=Math.max(now+1000, endsAt-5*60*1000);
    setBreakTimer({label,mins,endsAt,warnAt,warned:false,ended:false,secsLeft:mins*60});
  }
  function stopBreak(){ setBreakTimer(null); stopAlarmLoop(); setActiveAlarm(null); }

  // ── Case 30-min alarm (passed as prop to PostLiveForm) ──
  const playEndAlarm=useCallback(()=>startAlarmLoop("case"),[]);

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
      setAllCases(Array.isArray(cases)?[...cases].reverse():[]);
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
    const clean=(imgs)=>(imgs||[]).map(({file,url,name,id,path,type})=>({url,name,id,path:path||id||name,type}));
    const cleanData={...draftData,images:clean(draftData.images||[]),backupImages:clean(draftData.backupImages||[])};
    const res=await fetch("/api/drafts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userEmail:user.email,mode,draftData:cleanData})});
    const saved=await res.json();
    if(!res.ok) throw new Error(saved.error||"Failed to save draft");
    setDrafts(ds=>[...ds.filter(d=>d._mode!==mode),saved]);
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
    setAnnouncements(p=>[saved,...p]);
  };
  const updateAnnouncement=async(id,updates)=>{
    const res=await fetch(`/api/announcements/${id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(updates)});
    const saved=await res.json();
    if(!res.ok)throw new Error(saved.error||"Failed to update announcement");
    setAnnouncements(a=>a.map(x=>x.id===id?saved:x));
  };
  const removeAnnouncement=async(id)=>{
    const res=await fetch(`/api/announcements/${id}`,{method:"DELETE"});
    if(!res.ok){const d=await res.json().catch(()=>({}));throw new Error(d.error||"Failed to delete");}
    setAnnouncements(a=>a.filter(x=>x.id!==id));
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
    setPage(id);
    if(typeof window!=="undefined") localStorage.setItem("ch_page",id);
  };

  const logout=()=>{
    localStorage.removeItem("ch_token");
    localStorage.removeItem("ch_refresh");
    localStorage.removeItem("ch_user");
    localStorage.removeItem("ch_form_active");
    localStorage.removeItem("ch_page");
    setUser(null);setAuthPage("login");setPage("dashboard");
    setAllCases([]);setDrafts([]);setLinks([]);setAnnouncements([]);setSpecialRequestors([]);
  };

  // ── Show nothing while checking stored session (prevents login flash) ──
  if(!sessionChecked){
    return (
      <>
        <style>{CSS}</style>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"var(--bg)",flexDirection:"column",gap:16}}>
          <div style={{animation:"float 1.5s ease-in-out infinite"}}><Icon name="loading" size={52} color="var(--accent)"/></div>
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
    {id:"dashboard",label:"Dashboard",icon:"dashboard"},
    {group:"Work"},
    {id:"build",label:"Build",icon:"casebox"},
    {id:"prelive",label:"Pre-Live Amends",icon:"prelive"},
    {id:"postlive",label:"Post-Live Amends",icon:"postlive"},
    {id:"history",label:"Case History",icon:"history"},
    {group:"Tools"},
    {id:"announcements",label:"Announcements",icon:"announce"},
    {id:"links",label:"Quick Links",icon:"links"},
  ];

  const initials=user.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();

  return (
    <>
      <style>{CSS}</style>
      <div className="shell">
        <aside className="sidebar">
          <div className="logo">
            <div className="logo-icon">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <rect width="26" height="26" fill="var(--accent)"/>
                <rect x="5" y="8" width="10" height="2" fill="white"/>
                <rect x="5" y="12" width="16" height="2" fill="white" opacity=".7"/>
                <rect x="5" y="16" width="7" height="2" fill="white" opacity=".45"/>
              </svg>
            </div>
            <div className="logo-text">Case<span>Hub</span></div>
          </div>

          {coreNav.map((n,i)=>
            n.group
              ?<div key={i} className="nav-group">{n.group}</div>
              :<button key={n.id} className={cls("nav-item",page===n.id&&"active")} onClick={()=>handleNav(n.id)}>
                <Icon name={n.icon} size={15} color={page===n.id?"var(--accent)":"var(--muted)"}/>
                {n.label}
                {n.id==="postlive"&&formActive&&page!=="postlive"&&(
                  <span className="nav-inprogress" title="Form in progress">
                    <Icon name="inprogress" size={11} color="var(--accent)"/>
                  </span>
                )}
                {n.id==="history"&&allCases.length>0&&<span className="nav-badge">{allCases.length}</span>}
                {n.id==="announcements"&&announcements.length>0&&<span className="nav-badge">{announcements.length}</span>}
              </button>
          )}

          {links.length>0&&(<>
            <div className="nav-group">Custom Links</div>
            {links.map((l,i)=>{
              const ref=sidebarDragRef;
              return(<div key={l.id} draggable
                onDragStart={()=>{ref.current=i;}}
                onDragOver={e=>e.preventDefault()}
                onDrop={()=>{
                  const from=ref.current;
                  if(from==null||from===i)return;
                  const arr=[...links];const[m]=arr.splice(from,1);arr.splice(i,0,m);
                  setLinks(arr);ref.current=null;
                }}
                onDragEnd={()=>{ref.current=null;}}
                style={{cursor:"grab"}}>
                <a href={l.url} target="_blank" rel="noopener noreferrer" className={cls("nav-custom-link")} onClick={e=>e.stopPropagation()}>{l.icon} {l.title}</a>
              </div>);
            })}
          </>)}

          <div style={{height:1,background:"var(--border)",margin:"12px 0 10px"}}/>
          {/* Break Timers */}
          <div className="nav-group">Breaks</div>
          <div className="break-btns">
            {[{label:"15 min",icon:"coffee",mins:15},{label:"30 min",icon:"meditate",mins:30},{label:"Lunch",icon:"lunch",mins:60}].map(({label,icon,mins})=>(
              <button key={mins} className={cls("break-btn",breakTimer&&breakTimer.mins===mins&&"active")} disabled={breakTimer&&breakTimer.mins!==mins} style={{opacity:breakTimer&&breakTimer.mins!==mins?.35:1,cursor:breakTimer&&breakTimer.mins!==mins?"not-allowed":"pointer"}} onClick={()=>breakTimer?.mins===mins?stopBreak():startBreak(label,mins)}>
                <Icon name={icon} size={14} color={breakTimer?.mins===mins?"var(--accent)":"var(--muted)"}/>
                <span style={{flex:1}}>{label}</span>
                {breakTimer?.mins===mins&&<Icon name="play" size={9} color="var(--accent)"/>}
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
          {dataLoading&&<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"80vh",flexDirection:"column",gap:16}}><div style={{animation:"float 1.5s ease-in-out infinite"}}><Icon name="loading" size={48} color="var(--accent)"/></div><div style={{color:"var(--muted)",fontSize:13,fontFamily:"Poppins,sans-serif"}}>Loading your workspace...</div></div>}

          {!dataLoading&&page==="dashboard"&&<Dashboard savedCases={allCases} setPage={setPage} specialRequestors={specialRequestors} addRequestor={addRequestor} removeRequestor={removeRequestor} user={user}/>}
          {!dataLoading&&page==="build"&&<div className="soon-wrap"><div className="soon-badge"><Icon name="casebox" size={80} color="var(--muted)"/></div><div className="soon-title">Build</div><div className="soon-sub">Coming soon — hang tight!</div></div>}
          {!dataLoading&&page==="prelive"&&<div className="soon-wrap"><div className="soon-badge"><Icon name="prelive" size={80} color="var(--muted)"/></div><div className="soon-title">Pre-Live Amends</div><div className="soon-sub">Coming soon — hang tight!</div></div>}
          {!dataLoading&&<div style={{display:page==="postlive"?"block":"none"}}>
            <PostLivePage onSaveCase={addCase} onFormActive={setFormActivePersist} allSavedCases={allCases} dbDrafts={drafts} onSaveDraft={saveDraft} onDeleteDraft={deleteDraft} user={user} onTimerEnd={playEndAlarm} specialRequestors={specialRequestors} alarmMins={alarmMins}/>
          </div>}
          {!dataLoading&&page==="history"&&<CaseHistory cases={allCases} onUpdate={updateCase} onDelete={deleteCase}/>}
          {!dataLoading&&page==="announcements"&&<AnnouncementsPage announcements={announcements} addAnnouncement={addAnnouncement} updateAnnouncement={updateAnnouncement} removeAnnouncement={removeAnnouncement} user={user}/>}
          {!dataLoading&&page==="links"&&<LinksPage links={links} setLinks={setLinks} addLink={addLink} updateLink={updateLink} removeLink={removeLink}/>}
          {!dataLoading&&page==="profile"&&<ProfilePage user={user} setUser={setUser} onLogout={logout} timerLimit={timerLimit} saveTimerLimit={saveTimerLimit} specialRequestors={specialRequestors} addRequestor={addRequestor} removeRequestor={removeRequestor}/>}
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

      {/* ── Alarm Overlay ── */}
      {activeAlarm&&(
        <div className="alarm-overlay">
          <div className="alarm-modal">
            <span className="alarm-icon">{<Icon name={activeAlarm==="warn"?"timer":activeAlarm==="case"?"timer":"bell"} size={56} color="var(--accent)"/>}</span>
            <div className="alarm-title">
              {activeAlarm==="warn"?"5 Minutes Left!":activeAlarm==="case"?`${timerLimit} Minutes on Case!`:"Break Over!"}
            </div>
            <div className="alarm-sub">
              {activeAlarm==="warn"?"Your break is almost up — wrap it up!"
               :activeAlarm==="case"?`You've been on this case for ${timerLimit} minutes.`
               :"Your break has ended. Time to get back to work!"}
            </div>
            <div className="alarm-btns">
              {activeAlarm!=="warn"&&<button className="alarm-snooze" onClick={snoozeAlarm}><Icon name="snooze" size={14} style={{marginRight:6}}/>Snooze 5 min</button>}
              <button className="alarm-dismiss" onClick={dismissAlarm}>✅ {activeAlarm==="warn"?"Got it!":"I'm Aware"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Nav no longer shows discard warning — form state preserved on page switch */}

      {/* ── Floating in-progress pill (fixed, sitewide, bottom-right) ── */}
      <div className="form-progress-pill"
        onClick={()=>handleNav("postlive")}
        style={{
          opacity:formActive&&page!=="postlive"?1:0,
          pointerEvents:formActive&&page!=="postlive"?"auto":"none",
          transform:formActive&&page!=="postlive"?"translateY(0)":"translateY(16px)",
          transition:"opacity .25s, transform .25s",
        }}>
        <div className="form-progress-pill-dot"/>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:2}}>
          <div style={{fontSize:12,fontWeight:700,lineHeight:1}}>Form In Progress</div>
          <div style={{fontSize:10,opacity:.85,lineHeight:1}}>Click to resume</div>
        </div>
        <Icon name="back" size={14} color="#fff" style={{transform:"rotate(180deg)",marginLeft:2,flexShrink:0}}/>
      </div>
    </>
  );
}

// Disable SSR entirely — prevents all hydration mismatches from dynamic content
function CaseHubPage(){ return <App/>; }
const CaseHubPageNoSSR = dynamic(()=>Promise.resolve(CaseHubPage),{ssr:false});
export default CaseHubPageNoSSR;