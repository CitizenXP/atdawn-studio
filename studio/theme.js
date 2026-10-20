/* Control Room theme loader.
   Runs in <head> immediately after config.js so the theme stylesheet is in
   place before first paint. The neutral look is built into studio.css, so a
   missing or empty theme simply means "use the default" rather than an error. */
(function () {
	"use strict";
	var cfg = window.STUDIO_CONFIG || {};
	var name = String(cfg.theme || "").trim();
	if (!name || name === "default") return;
	if (!/^[a-zA-Z0-9_-]+$/.test(name)) return; // a theme is a filename, keep it boring
	var link = document.createElement("link");
	link.rel = "stylesheet";
	link.href = "themes/" + name + ".css";
	document.head.appendChild(link);
})();
