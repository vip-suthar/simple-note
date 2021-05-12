function myFunction(e) {
   if(e) console.log(e.target.nextElementSibling.classList.toggle("show"));
  
}

 function setActiveTab(elem) {
   var  tabcontent, tablinks,
   attachedTabId = elem.getAttribute('data-attachedTab');
 
   // Get all tabs and hide them
   tablinks = document.getElementsByClassName("tablink");
   tabcontent = document.getElementsByClassName("tabcontent");
   for (const key in tablinks) {
      if (key < tablinks.length) {
         tablinks[key].classList.remove("active");
         tabcontent[key].classList.remove("active");
      }
   }
   document.getElementById(attachedTabId).classList.add("active");
   elem.classList.add("active");
 }
 function removeTab(e) {
      let attachedTabId = e.target.parentElement.getAttribute('data-attachedTab');
      if (document.getElementById(attachedTabId)) document.getElementById(attachedTabId).remove();
      e.target.parentElement.remove();
      setActiveTab(document.getElementsByClassName('tab')[0].lastElementChild)
 }
 