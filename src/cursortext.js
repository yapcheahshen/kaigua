export const getCursorWord=()=>{
    const sel=getSelection()
    let offset=sel.anchorOffset;
    const psib=sel.anchorNode.previousSibling ;
    if (psib && psib.dataset&& psib.dataset.offset) {
        offset+=parseInt(psib.dataset.offset)+psib.innerText.length;
    }
    const ori=sel.anchorNode.parentElement.dataset.ori
    if (!ori && !sel.anchorNode.data)return;
    let str=(ori||sel.anchorNode.data).replace(/<.+?>/g,'');;
    let dictch=str.substr(offset,50);

    // while (offset&&str[offset-1].match( /[\u3400-\u9fffA-Za-z]/u )) {
        // offset--;
        // dictch=str.substr(offset,50);
    // }
    let tofind=dictch;

    return {tofind,offset,anchor:sel.anchorNode}
}

export const copySelection=(from=0,size=1)=>{
    const sel=getSelection()
    const range=document.createRange()
    range.setStart(sel.anchorNode,from||sel.anchorOffset);
    range.setEnd(sel.anchorNode,from||sel.anchorOffset+size);
    sel.removeAllRanges()
    sel.addRange(range);
    document.execCommand('copy')
}
