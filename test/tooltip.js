window.onmouseup = function (event) {
    let sel = window.getSelection(), range, rect;
    if (sel.rangeCount>0){
        range = sel.getRangeAt(0);
        rect = range.getBoundingClientRect()
    };
        
    if (event.path.includes(document.querySelector('.tabcontent.active>.textarea'))) {
        if (document.querySelector('div#tooltip')) document.querySelector('div#tooltip').remove();
        if (rect.width > 0 && range.toString().length > 0) {
            let base = document.createElement('div');
            base.id = "tooltip";
            base.innerHTML = html;
            base.style.position = 'fixed'
            base.style.top = rect.top + 30 + 'px'; // set coordinates
            base.style.left = rect.left - 30 + 'px';
            document.getElementById('editor').appendChild(base);
        }
    }
    if (document.querySelector('div#tooltip>#closeTooltip')) {
        document.querySelector('div#tooltip>#closeTooltip').onclick = () => {
            document.querySelector('div#tooltip').remove();
        }
    }
}

const html = `<span class="toolElem" id="format" data-action="bold"><i class="fas fa-bold"></i></span>
<span class="toolElem" id="format" data-action="italic"><i class="fas fa-italic"></i></span>
<span class="toolElem" id="format" data-action="underline"><i class="fas fa-underline"></i></span>
<span class="toolElem" id="format" data-action="strikeThrough"><i class="fas fa-strikethrough"></i></span>
<span class="toolElem" id="formatWithArg" data-action="createLink" data-value="href"><i class="fas fa-link"></i></span>
<input type="text" id="link_addr" placeholder="link here" hidden>
             <span class="toolElem" id="closeTooltip"><i class="fas fa-times"></i></span>`;