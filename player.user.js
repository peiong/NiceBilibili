// ==UserScript==
// @name         video-player
// @version      1.0
// @description  删除播放页面的banner
// @author       Paris
// @match        https://www.bilibili.com/video/**
// @match        https://www.bilibili.com/bangumi/**
// @match        https://www.bilibili.com/watchlater/**
// @match        https://www.bilibili.com/read/**
// @icon         https://www.bilibili.com/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
	"use strict";

	setTimeout(function () {
		var elementsToRemove = [
			"div.s_tag",
			"div.video-like-m",
			"div.followed",
			"div.followe",
			"div.activity-m",
			"div.sponsor-wrapper",
			"div.bangumi-recom",
			"div.blur-bg",
			"div.number",
			".bi-btn.text-only",
			"div.number.clearfix",
			'a[class="message icon"]',
			"div.head-banner.report-wrap-module.report-scroll-module",
			"div.primary-menu.report-wrap-module.report-scroll-module",
			"li.nav-item.mobile",
			"li.nav-item.loc-menu",
			"div.bili-header-m",
			"body",
			".bili-wrapper .video-info-m h1",
		];

		elementsToRemove.forEach(function (elementSelector) {
			var element = document.querySelector(elementSelector);
			if (element && element instanceof HTMLElement) {
				if (elementSelector === "div.blur-bg") {
					element.setAttribute("style", "background-image : url()");
					element.style.backgroundColor = "rgb(255, 255, 255)";
					element.style.filter = "blur(0px)";
				} else if (elementSelector === ".bi-btn.text-only") {
					element.click();
					element.remove();
				} else if (elementSelector === "div.bili-header-m" || elementSelector === "body") {
					element.style.fontWeight = "520";
					element.style.fontSize = "13px";
				} else if (elementSelector === ".bili-wrapper .video-info-m h1") {
					element.style.fontWeight = "520";
					element.style.fontSize = "19px";
					element.style.color = "black";
				} else {
					element.remove();
				}
			}
		});
		var widescreen = document.querySelector('i[name="widescreen"]');
		widescreen.click();
	}, 5000);

	var activeElement = document.activeElement;
	document.addEventListener("keydown", function (event) {
		var keyCode = event.keyCode || event.which;
		var webFullscreen = document.querySelector("i[name='web_fullscreen']");
		var wideScreen = document.querySelector("i[name='widescreen']");
		if (
			activeElement.tagName.toLowerCase() === "input" ||
			activeElement.tagName.toLowerCase() === "textarea"
		) {
			return;
		}
		if (keyCode === 84 && webFullscreen) {
			webFullscreen.click();
		} else if (keyCode === 87 && wideScreen) {
			wideScreen.click();
		}
	});
})();
