let arrow = document.querySelectorAll(".arrow");
for (var i = 0; i< arrow.length; i++){
        arrow[i].addEventListener("click", (e)=>{
    let arrowParent = e.target.parentElement.parentElement;
    arrowParent.classList.toggle("showMenu");
    });
}

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
console.log(sidebarBtn);
sidebarBtn.addEventListener("click", ()=>{
    sidebar.classList.toggle("close");
});

let profilemenu = document.querySelector(".profil-menu");
let btn = document.querySelector(".profile-dropdown");
const toggle = ()=> profilemenu.classList.toggle('active');
window.addEventListener("click", function (e){
    if (!btn.contains(e.target)) profilemenu.classList.remove("active");
});

var tbody = document.querySelector("tbody");
var pageUl = document.querySelector(".pagination");
var itemShow = document.querySelector("#itemperpage");
var tr = tbody.querySelectorAll("tr");
var emptyBox = [];
var index = 1;
var itemParPage = 4;

for(let i=0; i<tr.length; i++){
    emptyBox.push(tr[i]);
}

itemShow.onchange = giveTrPerPage;

function giveTrPerPage(){
    itemParPage = Number(this.value);
    displayPage(itemParPage);
    pageGenerator(itemParPage);
    getElement(itemParPage);
}

function displayPage(limit){
    tbody.innerHTML = '';
    for(let i=0; i<limit; i++){
        tbody.appendChild(emptyBox[i]);
    }
    const pageNum = pageUl.querySelectorAll(".list");
    pageNum.forEach(n=>n.remove());
}

displayPage(itemParPage);

function pageGenerator(getem){
    const num_of_tr = emptyBox.length;
    if(num_of_tr <= getem){
        pageUl.style.display = 'none';
    }
    else{
        pageUl.style.display = 'flex';
        const num_of_Page = Math.ceil(num_of_tr/getem);
        for(let i=1; i<=num_of_Page; i++){
            const li = document.createElement('li');
            li.className = 'list';
            const a = document.createElement('a');
            a.href = '#';
            a.innerText = i;
            a.setAttribute('data-page', i);
            li.appendChild(a);
            pageUl.insertBefore(li, pageUl.querySelector(".next"));
        }
    }
}

pageGenerator(itemParPage);

let pageLink = pageUl.querySelectorAll('a');
let lastPage = pageLink.length - 2;

function pageRunner(page, items, lastPage, on) {
    for(button of page){
        button.onclick = e=>{
            const page_num = e.target.getAttribute("data-page");
            const page_mover = e.target.getAttribute("id");
            if(page_num !=null){
                index = page_num;
            }
            else{
                if (page_mover === "next") {
                    index++;
                    if (index >= lastPage) {
                        index = lastPage;
                    }
                }
                else{
                    index--;
                    if (index<= 1) {
                        index = 1;
                    }
                }
            }
            pageMaker(index, items, on);
        }
    }
}

var pageLi = pageUl.querySelectorAll(".list");
pageLi[0].classList.add("on");
pageRunner(pageLink, itemParPage, lastPage, pageLi);

function getElement(val) {
    let pagelink = pageUl.querySelectorAll("a");
    let lastpage = pagelink.length - 2;
    let pageli = pageUl.querySelectorAll(".list");
    pageli[0].classList.add("on");
    pageRunner(pagelink, val, lastpage, pageli);
}

function pageMaker(index, item_per_page, activePage){
    const start = item_per_page * index;
    const end  = start + item_per_page;
    const current_page =  emptyBox.slice((start - item_per_page), (end-item_per_page));
    tbody.innerHTML = "";
    for(let j=0; j<current_page.length; j++){
        let item = current_page[j];					
        tbody.appendChild(item);
    }
    Array.from(activePage).forEach((e)=>{e.classList.remove("on");});
activePage[index-1].classList.add("on");
}


function togglePopup(){
    document.getElementById("popup-1").classList.toggle("active");
}
