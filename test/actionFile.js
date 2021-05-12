const json_fs = {
    'recent':function () {
        let container = document.getElementById('recentFiles').nextElementSibling;
        container.innerHTML = ''
        for (const key in json_static['recent']) {
            let elem = document.createElement('span');
            elem.classList.add('getFileFromLS');
            console.log(json_static['recent'][key])
            elem.innerHTML = json_static['recent'][key];
            container.appendChild(elem)
            //let value = window.localStorage.getItem(json_static['recent'][key])
        }
    },
    'new':function () {
        let tabId = `tab_${json_helperFunctions['uniqueId'](2, 'tabId')}`
        let tabLink = document.createElement('span');
        tabLink.classList.add('tablink');
        tabLink.setAttribute('data-attachedTab',tabId);
        tabLink.innerHTML = `Untitled${json_static['tabId'].length}.dse &nbsp;<a class="closeTab">&times;</a>`;
        document.querySelector('.tabContainer>.tab').appendChild(tabLink);
        let tabcontent = document.createElement('div');
        tabcontent.id = tabId;
        tabcontent.classList.add('tabcontent');
        tabcontent.innerHTML =`<div class="textarea" contenteditable="true" >Put your Note Here ${tabId}</div>`;
        document.querySelector('.tabContainer').appendChild(tabcontent);
        setActiveTab(tabLink);
        myFunction();
    },
    'open':async function () {
    let [fileHandle] = await window.showOpenFilePicker(),
    file = await fileHandle.getFile(),
    result = await file.text(),
    activeTextarea = document.querySelector('.tabcontent.active>.textarea');
    if (!activeTextarea) console.log('no active text area');
    else activeTextarea.innerHTML = result;
    myFunction()
    },
    'load':function () {
        
    },
    'save':function () {
        let editor = document.querySelector('.tabcontent.active>.textarea');
        let uniqueID = json_helperFunctions['uniqueId'](12, 'fileId');
        let noteVal = json_helperFunctions['htmlToJson'](editor);
        json_helperFunctions['saveToLocalStorage'](uniqueID,noteVal, 'override');
        json_static['fileId'].push(uniqueID);
        json_static['recent'].unshift(uniqueID);
    },
    'export':async function () {
            const options = {
              types: [{
                  description: 'Dot Shunya Ek Files',
                  accept: { 'text/dse': ['.dse'] }
                }]
            };
        let editor = document.querySelector('.tabcontent.active>.textarea');
        let noteVal = json_helperFunctions['htmlToJson'](editor);
        await json_helperFunctions['exportFile'](JSON.stringify(noteVal), options)
        myFunction()
    },
};



// const input = document.getElementById('input');
// const buttonOpen = document.getElementById('openFile');
// var fileHandle;
// buttonOpen.onclick = async ()=>{
//     [fileHandle] = await window.showOpenFilePicker();
//     let file = await fileHandle.getFile();
//     // let contents = await file.text();
//     let result = await file.text()
//     input.value = result;
// }
// const saveBtn = document.getElementById('saveFile');
// saveBtn.onclick = async ()=>{
//     fileHandle = await getNewFileHandler();
//     let writable = await fileHandle.createWritable();
//     const response = await fetch('./indexdb.js');
//     await response.body.pipeTo(writable);
// }

// 
// const dirBtn = document.getElementById('dir');
// dirBtn.onclick = async ()=>{
//     const dirHandle = await window.showDirectoryPicker();
//     console.log(dirHandle);
//     for await (const entry of dirHandle.values()) {
//         console.log(entry.kind, entry.name)
//     }
// }