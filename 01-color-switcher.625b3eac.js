!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=null;function a(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16));document.body.style.backgroundColor="".concat(t)}t.addEventListener("click",(function(){t.disabled=!0,e.disabled=!1,n=setInterval(a,1e3)})),e.addEventListener("click",(function(){t.disabled=!1,e.disabled=!0,clearInterval(n)}))}();
//# sourceMappingURL=01-color-switcher.625b3eac.js.map