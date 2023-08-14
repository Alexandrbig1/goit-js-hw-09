const t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")};t.startBtn.addEventListener("click",(function(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`})),t.stopBtn.addEventListener("click",(function(){clearInterval(timeId)}));
//# sourceMappingURL=01-color-switcher.4251c003.js.map
