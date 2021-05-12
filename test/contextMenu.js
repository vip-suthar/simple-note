// if (document.addEventListener) {
//     document.addEventListener('contextmenu', function(e) {
//       e.preventDefault();
//       var ctxMenu = document.getElementById("ctxMenu");
//     ctxMenu.style.display = "block";
//     ctxMenu.style.left = (e.pageX - 10)+"px";
//     ctxMenu.style.top = (e.pageY - 10)+"px";
//     }, false);
//   } else {
//     document.attachEvent('oncontextmenu', function(e) {
//       window.event.returnValue = false;
//       var ctxMenu = document.getElementById("ctxMenu");
//       ctxMenu.style.display = "block";
//       ctxMenu.style.left = (e.pageX - 10)+"px";
//       ctxMenu.style.top = (e.pageY - 10)+"px";
//     });
//   }

// document.addEventListener("click",function(event){
//     var ctxMenu = document.getElementById("ctxMenu");
//     ctxMenu.style.display = "";
//     ctxMenu.style.left = "";
//     ctxMenu.style.top = "";
// },false);