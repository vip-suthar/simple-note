window.onclick = (e) => {
    let thiisId = e.target.id || e.target.parentElement.id,
        thiisClass = e.target.className || e.target.parentElement.className,
        action = e.target.getAttribute('data-action') || e.target.parentElement.getAttribute('data-action'),
        valueArg = e.target.getAttribute('data-value') || e.target.parentElement.getAttribute('data-value'),
        value='';
    if (!e.path.includes(document.querySelector('.dropdown'))) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
    thiisClass = thiisClass.split(' ');
    for (const key in thiisClass) {
        if (json_domFunctions[thiisClass[key]]) json_domFunctions[thiisClass[key]](e);
    }
    if (json_value[valueArg]) value = json_value[valueArg]();
    if (valueArg=='insertBlock') value = `<${e.target.value.toUpperCase()}>`;
    if (json_domFunctions[thiisId]) json_domFunctions[thiisId](action, value);
}
const json_value = {
    'href': function () {
        let href = document.getElementById('link_addr');
        return new Promise((res, rej) => {
            if (href.value !== "") res(href.value);
            else {
                href.focus();
                href.onkeydown = (e) => {
                    if (e.keyCode == 13) res(href.value);
                }
            }
        })
    },
    'color': function () {
        let colorPicker = document.getElementById('colorPicker'),
            colorVal = '';
        return new Promise((res, rej) => {
            colorPicker.click();
            colorPicker.onchange = () => {
                colorVal = colorPicker.value;
                //if(colorVal[0]!=='#' && colorVal) colorVal = json_helperFunctions['toHex'](colorVal);
                res(colorVal);
            }
        })
    },
    "image": async function () {
        let input = document.getElementById('filePicker');
        input.click();
        return new Promise((res,rej)=>{
            input.onchange = ()=>{
                var fileReader = new FileReader();
                fileReader.readAsDataURL(input.files[0])
                fileReader.onload = (e)=>{
                   res(e.target.result); 
                }
                
            }
        });
    }
}
const json_domFunctions = {
    'format': function (action) {
        document.execCommand(action, false)
    },
    'formatWithArg': async function (action, value) {
        let result = await value;
        //console.log(action, result)
        //document.execCommand('styleWithCSS', false, true);
        document.execCommand(action, false, result)
    },
    'addNote': function () {
        let editor = document.getElementById('textarea');
        let uniqueID = document.getElementById('addNoteIcon').attachWith;
        // document.getElementsByClassName('').id
        let noteVal = json_helperFunctions['htmlToJson'](editor);
        json_helperFunctions['saveToLocalStorage'](uniqueID, noteVal, 'append');
    },
    'addNoteIcon': function () {
        let addNoteIcon = document.getElementById('addNoteIcon');
        addNoteIcon.innerHTML = main_html;
    },
    'recentFiles':function () {
        json_fs['recent']();
    },
    'newFile': function () {
        json_fs['new']();
    },
    'openFile': function () {
        json_fs['open']();
    },
    'loadFile':function () {
        json_fs['load']();
    },
    'saveFile':function () {
        json_fs['save']();  
    },
    'exportFile':function () {
        json_fs['export']();
    },
    'getFileFromLS':function (e) {
        let activeTextarea = document.querySelector('.tabcontent.active>.textarea');
        console.log(e.target.innerText.trim())
        let data = window.localStorage.getItem(e.target.innerText.trim());
        for (const key in data) {
            console.log(Object.values(data[key]))
            activeTextarea.innerHTML += JSON.stringify(data[key])
        }
        
        
    },
    'tablink':function (e) {
        setActiveTab(e.target);
    },
    'closeTab':function(e) {
        removeTab(e);
    },
    'dropbtn': (e)=>{
        myFunction(e)
    }
}
const json_helperFunctions = {
    'toHex': function (colorVal) {
        let startPos = colorVal.indexOf('(');
        let values = colorVal.split(',', 3);
        if (colorVal[0].toUpperCase() == 'R') {
            let [r, g, b] = values;
            r = r.trim().toString(16);
            g = g.trim().toString(16);
            b = b.trim().toString(16);

            if (r.length == 1)
                r = "0" + r;
            if (g.length == 1)
                g = "0" + g;
            if (b.length == 1)
                b = "0" + b;

            return "#" + r + g + b;
        }
    },
    'htmlToJson': function (html) {

        var tag = {}
        if (html.tagName) tag['tagName'] = html.tagName;
        if (html.uniqueId) tag['uniqueId'] = html.uniqueId;
        tag['children'] = [];
        tag["#text"] = [];
        for (var i = 0; i < html.childNodes.length; i++) {
            if (html.childNodes[i].nodeName === "#text") {
                if (html.childNodes[i].data.trim() !== "" && html.childNodes[i].data.trim() !== "\n") {
                    tag["#text"].push(html.childNodes[i].data.trim());
                }
            } else {
                tag['children'].push(json_helperFunctions['htmlToJson'](html.childNodes[i]));
            }
        }
        for (var i = 0; i < html.attributes.length; i++) {
            var attr = html.attributes[i];
            tag[`@${attr.name}`] = attr.value;
        }
        return tag;


    },
    'saveToLocalStorage': function (id, value, type) {
        let val;
        // else if(type == 'override') {

        // }
        if (JSON.stringify(value) != '{}') {
            if (type == 'append') {
                val = [window.localStorage.getItem([`${id}`])]
                if (val[0] == null) val = [];
                val.push(value);
                console.log(val)
            } else val = value;
            // console.log(val);
            window.localStorage.setItem(`${id}`, val)
            // console.log(window.localStorage.getItem([`${id}`]));
        }
    },
    'uniqueId': function (length, chkUnqIn) {
        let uniqueID = '';
        length = Math.min(12,length);
        do {
            let rand = Math.random()*Number.MAX_SAFE_INTEGER;
            uniqueID = rand.toString(36).slice(- length).padStart(length, '0');
        } while (json_static[chkUnqIn].includes(uniqueID));
        json_static[chkUnqIn].push(uniqueID);
        return uniqueID;
    },
    'exportFile': async function (contents, options){
        const fileHandle = await window.showSaveFilePicker(options);
            // Create a FileSystemWritableFileStream to write to.
            const writable = await fileHandle.createWritable();
            // Write the contents of the file to the stream.
            await writable.write(contents);
            // Close the file and write the contents to disk.
            await writable.close();
    }
}
const json_static = {
    'tabId': ["00"],
    'fileId':[],
    'recent':[]
}

const main_html = `<div id="editor">
<div id="tools">
    <span id="format" data-action="bold"><i class="fas fa-bold"></i></span>
    <span id="format" data-action="italic"><i class="fas fa-italic"></i></span>
    <span id="format" data-action="underline"><i class="fas fa-underline"></i></span>
    <span id="format" data-action="strikeThrough"><i class="fas fa-strikethrough"></i></span>
    <span id="format" data-action="insertUnorderedList"><i class="fas fa-list-ul"></i></span>
    <span id="format" data-action="insertOrderedList"><i class="fas fa-list-ol"></i></span>
    <span id="format" data-action="subscript"><i class="fas fa-subscript"></i></span>
    <span id="format" data-action="superscript"><i class="fas fa-superscript"></i></span>
    <span id="formatWithArg" data-action="createLink" data-value="href"><i class="fas fa-link"></i></span>
    <input type="text" id="link_addr" placeholder="Type or Paste your link here">
    <span id="formatWithArg" data-action="foreColor" data-value="color">A</span>
    <span id="formatWithArg"  data-action="hiliteColor" data-value="color">A</span>
    <input id="colorPicker" type="color" hidden>
    <span id="formatWithArg" data-action="formatBlock" data-value="codeBlock"><i class="fas fa-code"></i></span>
    <span id="addImg" data-action="insertImage"><i class="far fa-image"></i></span>
    <input type="file" accept="image/*">
  </div>
  <div id="textarea" contenteditable="true" >Put your Note Here</div>
  <button id="addNote">Add</button>
</div>`;