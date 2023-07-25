// ==UserScript==
// @name         哔哩优化
// @version      1.0
// @description  Bring the origin back to bilibili and make the B great again.
// @author       Paris
// @homepageURL  https://github.com/peiong/NiceBilibili
// @supportURL   https://github.com/peiong/NiceBilibili
// @match        *://*.bilibili.com/?*
// @match        *://*.bilibili.com/**
// @match        *://*.bilibili.com/video/*
// @match        *://*.bilibili.com/cheese/*
// @match        *://*.bilibili.com/list/*
// @match        https://space.bilibili.com/283719634/**
// @icon         https://icons.duckduckgo.com/ip2/tampermonkey.net.ico
// ==/UserScript==

(function () {
	"use strict";

	document.cookie = "buvid3=-1; Domain=.bilibili.com; Expires=08/02/2030, 01:32:32 AM; Path=/;";
	document.cookie = "buvid4=-1; Domain=.bilibili.com; Expires=08/02/2030, 01:32:32 AM; Path=/;";
	document.cookie = "buvid_fp=-1; Domain=.bilibili.com; Expires=08/02/2030, 01:32:32 AM; Path=/;";
	document.cookie = "go_old_video=1; Domain=.bilibili.com; Expires=08/02/2030, 01:32:32 AM; Path=/";
	document.cookie =
		"i-wanna-go-back=1; Domain=.bilibili.com; Expires=08/02/2030, 01:32:32 AM; Path=/;";
	document.cookie =
		"i-wanna-go-feeds=1; Domain=.bilibili.com; Expires=08/02/2030, 01:32:32 AM; Path=/;";

	//按下“L”键播放器宽屏
	document.onkeydown = function (event) {
		var e = event || window.event || arguments.callee.caller.arguments[0];
		// 如果当前焦点在输入框内，则不执行全屏操作
		if (
			document.activeElement.tagName.toLowerCase() === "input" ||
			document.activeElement.tagName.toLowerCase() === "textarea"
		) {
			return;
		}
		if (e && e.keyCode === 76) {
			if ($(".bpx-player-ctrl-btn.bpx-player-ctrl-web").length) {
				if ($(".bpx-player-ctrl-btn.bpx-player-ctrl-web.bpx-state-entered").length) {
					$(".bpx-player-ctrl-btn.bpx-player-ctrl-web.bpx-state-entered").click();
				} else {
					$(".bpx-player-ctrl-btn.bpx-player-ctrl-web:not(.bpx-state-entered)").click();
				}
			}
		}
	};

	//修改主页和个人空间banner
	setTimeout(function () {
		var v = document.querySelector("div.bili-banner");
		v.setAttribute(
			"style",
			"background-image : url('https://f005.backblazeb2.com/file/img-forWeb/uPic/198baa642414cb79b6338faf2c6bfd6f1c5f5b72.png')",
		);
	}, 0);

	setTimeout(function () {
		var bannerImg = document.getElementById("bili-header-banner-img");
		var sourceTag = bannerImg.getElementsByTagName("source")[0];
		sourceTag.srcset =
			"https://f005.backblazeb2.com/file/img-forWeb/uPic/198baa642414cb79b6338faf2c6bfd6f1c5f5b72.png";
	}, 0);

	setTimeout(function () {
		var o = document.getElementsByClassName("logo-img");
		o[0].remove();

		var space = document.querySelector("div.h-inner");
		space.setAttribute(
			"style",
			"background-image : url('//i0.hdslb.com/bfs/new_dyn/0d006018038c5b93c92d7954d2f9e5bd6823116.jpg')",
		);
	}, 0);

	setTimeout(function () {
		var space = document.querySelector("div.h-inner");
		space.setAttribute(
			"style",
			"background-image : url('//i0.hdslb.com/bfs/new_dyn/0d006018038c5b93c92d7954d2f9e5bd6823116.jpg')",
		);
	}, 0);

	function isURL(url, base) {
		try {
			if (typeof url === "string" && /^[\W\w]+\.[\W\w]+/.test(url) && !/^[a-z]+:/.test(url)) {
				const str = url.startsWith("//") ? "" : "//";
				url = location.protocol + str + url;
			}
			return new URL(url, base);
		} catch (e) {
			return false;
		}
	}
	const paramsSet = new Set([
		"spm_id_from",
		"from_source",
		"msource",
		"bsource",
		"seid",
		"source",
		"session_id",
		"visit_id",
		"sourceFrom",
		"from_spmid",
		"share_source",
		"share_medium",
		"share_plat",
		"share_session_id",
		"share_tag",
		"unique_k",
		"csource",
		"vd_source",
		"tab",
		"is_story_h5",
		"share_from",
		"plat_id",
		"-Arouter",
	]);
	const nodelist = [];
	function clean(str) {
		if (/.*:\/\/.*.bilibili.com\/.*/.test(str) && !str.includes("passport.bilibili.com")) {
			const url = isURL(str);
			if (url) {
				paramsSet.forEach((d) => {
					url.searchParams.delete(d);
				});
				return url.toJSON();
			}
		}
		return str;
	}
	let locationBackup;
	function cleanLocation() {
		const { href } = location;
		if (href === locationBackup) return;
		replaceUrl((locationBackup = clean(href)));
	}
	function anchor(list) {
		list.forEach((d) => {
			if (!d.href) return;
			d.href.includes("bilibili.tv") && (d.href = d.href.replace("bilibili.tv", "bilibili.com"));
			d.href = clean(d.href);
		});
	}
	function click(e) {
		var f = e.target;
		for (; f && "A" !== f.tagName; ) {
			f = f.parentNode;
		}
		if ("A" !== (null == f ? void 0 : f.tagName)) {
			return;
		}
		anchor([f]);
	}
	function replaceUrl(url) {
		window.history.replaceState(window.history.state, "", url);
	}
	cleanLocation();
	let timer = 0;
	observerAddedNodes((node) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			cleanLocation();
			anchor(document.querySelectorAll("a"));
		});
	});
	window.addEventListener("click", click, !1);
	window.addEventListener("contextmenu", click, !1);
	document.addEventListener("load", () => anchor(document.querySelectorAll("a")), !1);
	function observerAddedNodes(callback) {
		try {
			if (typeof callback === "function") nodelist.push(callback);
			return nodelist.length - 1;
		} catch (e) {
			console.error(e);
		}
	}
	const observe = new MutationObserver((d) =>
		d.forEach((d) => {
			d.addedNodes[0] &&
				nodelist.forEach(async (f) => {
					try {
						f(d.addedNodes[0]);
					} catch (e) {
						console.error(d);
					}
				});
		}),
	);
	observe.observe(document, { childList: true, subtree: true });
	window.open = ((__open__) => {
		return (url, name, params) => {
			return __open__(clean(url), name, params);
		};
	})(window.open);
	window.navigation &&
		window.navigation.addEventListener("navigate", (e) => {
			const newURL = clean(e.destination.url);
			if (e.destination.url != newURL) {
				e.preventDefault();
				if (newURL == window.location.href) return;
				window.history.replaceState(window.history.state, "", newURL);
				return;
			}
		});

	setTimeout(() => {
		const content = document.querySelector("body");
		content.addEventListener(
			"copy",
			(event) => {
				event.stopImmediatePropagation();
				event.preventDefault();
				const selection = window.getSelection();
				const textToCopy = selection.toString();
				event.clipboardData.setData("text/plain", textToCopy);
			},
			true,
		);
	}, 0);
})();
