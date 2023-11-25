// ==UserScript==
// @name         bilibili-index
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  个性化首页
// @author       Paris
// @match        https://www.bilibili.com
// @match        *://*.bilibili.com/account/**
// @match        https://t.bilibili.com/**
// @exclude      *://*.bilibili.com/video/**
// @exclude      *://*.bilibili.com/bangumi/**
// @icon         https://www.bilibili.com/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
	"use strict";

	setTimeout(function () {
		var elementsToRemove = [
			"a.head-logo",
			"div.blur-bg",
			"div.search",
			"div.carousel-box",
			"li.nav-item.mobile",
			"li.nav-item.loc-menu",
			"div.bili-header-m",
			"div.home_popularize",
			"div.head-banner.report-wrap-module.report-scroll-module",
			"body",
			"div.app-icon",
			"div.special-recommend-module.report-wrap-module.report-scroll-module.clearfix",
		];

		elementsToRemove.forEach(function (elementSelector) {
			var element = document.querySelector(elementSelector);
			if (element && element instanceof HTMLElement) {
				if (elementSelector === "div.blur-bg") {
					element.setAttribute("style", "background-image : url()");
					element.style.backgroundColor = "rgb(255, 255, 255)";
					element.style.filter = "blur(0px)";
				} else if (elementSelector === "div.search") {
					element.setAttribute("style", "background-color : rgba(0,0,0,0.1)");
					element.style.top = "353px";
					element.style.right = "78px";
				} else if (elementSelector === "div.head-banner.report-wrap-module.report-scroll-module") {
					element.setAttribute(
						"style",
						"background-image : url('https://f005.backblazeb2.com/file/img-forWeb/uPic/198baa642414cb79b6338faf2c6bfd6f1c5f5b72.png')",
					);
				} else if (elementSelector === "div.bili-header-m" || elementSelector === "body") {
					element.style.fontWeight = "520";
					element.style.fontSize = "13px";
				} else {
					element.remove();
				}
			}
		});
	}, 800);
})();
