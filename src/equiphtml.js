
const addRel=(rel,href)=>{
    const lnk=document.createElement('link');
    lnk.rel=rel;
    lnk.href=href;
    document.head.appendChild(lnk);
}

const getRelativePath=()=>{
    const whref=window.location.href;
    const scriptfolder=document.querySelector('script').src.replace(/[^/]+?$/,'');
    let depth=0;
    whref.substr(scriptfolder.length).replace(/\//g,m=>depth++);
    //repeat until reaching the same path of script tag
    return '../'.repeat(depth);
}
window.jsonp=data=>{
    if (data && data.init) {
        data.init();
    }
}
const loadDatabaseJs=()=>{ //each database has a js with same name
    const whref=window.location.href;
    const scriptfolder=document.querySelector('script').src.replace(/[^/]+?$/,'');
    let depth=0;
    whref.substr(scriptfolder.length).replace(/\//g,m=>depth++);
    const paths=whref.split('/');
    while (depth) {paths.pop();depth--}
    const dbname=paths[paths.length-1];
    
    const scripttag=document.querySelector('script#'+dbname);
    if (!scripttag) {
        const ele=document.createElement('script');
        ele.id=dbname;
        ele.src=paths.join('/')+'/'+dbname+'.js';
        document.head.appendChild(ele);
    }
}
export const equipHTML=def_onclick=>{
    const rootrelpath=getRelativePath();
    addRel('stylesheet',rootrelpath+'global.css');
    addRel('stylesheet',rootrelpath+'pryt.css');
    addRel('icon',rootrelpath+'favicon.svg');
    loadDatabaseJs();
    const rootnode=document.getElementsByTagName('xml')[0];
    if (typeof rootnode!=='undefined')rootnode.onclick=def_onclick;
}
