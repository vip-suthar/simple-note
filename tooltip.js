window.onmouseup = function (event) {
        let range = window.getSelection().getRangeAt(0),
          rect = range.getBoundingClientRect(),
          uniqueId = range.startContainer.uniqueId || range.startContainer.parentElement.uniqueId,
          addNoteIcon = document.querySelector('div#addNoteIcon');
        if (addNoteIcon &&  !event.path.includes(addNoteIcon)) addNoteIcon.remove();
        if (rect.width > 0 && range.toString().length > 0 && !event.path.includes(addNoteIcon)) {
          let base = document.createElement('div');
          base.id = "addNoteIcon";
          base.attachWith = uniqueId;
          base.innerHTML = `<i class="far fa-sticky-note"></i>`;
          base.style.position = 'fixed';
          base.style.top = rect.top + 30 + 'px'; // set coordinates
          base.style.left = rect.left - 10 + 'px';
          document.body.appendChild(base);
        }
    if (event.path.includes(document.getElementById('textarea'))) {
        if (document.querySelector('div#tooltip')) document.querySelector('div#tooltip').remove();
        if (rect.width > 0 && range.toString().length > 0) {
            let base = document.createElement('div');
            base.id = "tooltip";
            base.innerHTML = html;
            base.style.position = 'fixed'
            base.style.top = rect.top + 30 + 'px'; // set coordinates
            base.style.left = rect.left - 10 + 'px';
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