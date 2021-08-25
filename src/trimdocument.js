const rootnode=document.getElementsByTagName('xml')[0];

const deleteFromDocument=(from,to)=>{
    if (!from) from=rootnode.firstElementChild;
    let removelast=false;
    if (!to) {
        to=rootnode.lastElementChild;
        removelast=true;
    }
    const sel=getSelection();
    const range=document.createRange();
    range.setStart(from,0);
    range.setEnd(to,0);
    sel.removeAllRanges();
    sel.addRange(range);
    sel.deleteFromDocument();

    if (removelast){//stupid
        const sel=getSelection();
        const range=document.createRange();
        range.selectNode(to);
        sel.removeAllRanges();
        sel.addRange(range);
        sel.deleteFromDocument();
    }
}
export const trimDocument=aname=>{
    const anchors=document.getElementsByName(aname);
    if (!anchors || !anchors.length)return;

    let removefrom=anchors[0].nextSibling;
    while (removefrom && removefrom.tagName!=='A' && !removefrom.name ) {
        removefrom=removefrom.nextElementSibling;
    }
    if (removefrom.tagName=='A') removefrom=removefrom.previousSibling;
    deleteFromDocument( 0, anchors[0]);
    if (removefrom) deleteFromDocument(removefrom)
}


export const highlightSelectedWord=(offset,t)=>{
    const sel=getSelection()
    const range=document.createRange()
    range.setStart(sel.anchorNode,offset);
    range.setEnd(sel.anchorNode,offset+t.length);
    sel.removeAllRanges()
    sel.addRange(range);
}