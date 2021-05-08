const style = document.createElement('link');
style.setAttribute("rel", "stylesheet");
style.setAttribute("href", 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
head.insertBefore(style, head.lastChild);

window.onload = () => {
  const elements = document.querySelectorAll("body,body *");
  const uniqueID = () => Math.random().toString(36).slice(-4);
  var hash = [];
  function checkDuplicate(id) {
    if (hash.includes(id)) checkDuplicate(uniqueID());
    return id;
  }
  
  for (const key in elements) {
    const element = elements[key];
    if (key < elements.length) {
      let id = checkDuplicate(uniqueID());
      element.uniqueId = `element_${id}`;
      hash.push(id);
    }
  }
}



// async function getNotes(elem) {
//   let uniqueId = document.querySelector(".editActive").uniqueId;
//   var value = [];
//   var returnNode = document.createElement('ul');
//   await new Promise((resolve, reject) => {
//     chrome.storage.local.get([`${uniqueId}`], (result) => {
//       if (result[`${uniqueId}`].length) value = result[`${uniqueId}`]
//       resolve();
//     });
//   })
//   for (const key in value) {
//     returnNode.innerHTML += `<li>${value[key]}</li>`;
//   }
//   elem.innerHTML = returnNode.outerHTML;
// }