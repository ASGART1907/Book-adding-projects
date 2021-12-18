const books = document.querySelector(".books");
const bookName = document.querySelector("#name");
const author = document.querySelector("#author");
const textarea = document.querySelector("textarea");
const page = document.querySelector("#page");

window.addEventListener("DOMContentLoaded", localStorageSave);
window.addEventListener("keyup",(e) => {
   if(e.key === 'Enter'){
    if(bookName.value !== '' && author.value !== '' && textarea.value !== '' && page.value !== ''){
        getValue(bookName.value,author.value,textarea.value,page.value);
    }
   }
})

const getValue = (bookValue,authorValue,textareaValue,pageValue) => {

    const bookContainer = document.createElement("div");
    bookContainer.classList.add("book-container");

    const nameAuthor = document.createElement("div");
    nameAuthor.classList.add("name-author");

    const h4 = document.createElement("h4");
    h4.innerHTML = bookValue;

    const p = document.createElement("p");
    p.innerHTML = authorValue.toUpperCase();

    const i = document.createElement("i");
    i.classList.add("fas","fa-trash-alt");

    const description = document.createElement("div");
    description.classList.add("description");


    const strong = document.createElement("strong");
    strong.innerHTML = pageValue;

    const span = document.createElement("span");
    span.innerHTML = textareaValue;

    
    localSave(bookValue,authorValue,textareaValue,pageValue);

        nameAuthor.appendChild(h4);
        nameAuthor.appendChild(p);
        nameAuthor.appendChild(strong);
        nameAuthor.appendChild(i);
        bookContainer.appendChild(nameAuthor);
        description.appendChild(span);
        nameAuthor.appendChild(description);
        books.appendChild(bookContainer);
        
    bookName.value =  '';
    author.value = '';
    textarea.value = '';
    page.value = '';
}


const localSave = (bookValue,authorValue,textareaValue,pageValue) => {
    let values;

    if(localStorage.getItem("values") === null){
        values = [];
    }else{
        values = JSON.parse(localStorage.getItem("values"));
    }

    values.push(bookValue,authorValue,textareaValue,pageValue);
    localStorage.setItem("values",JSON.stringify(values));

}

function deleteBook(e){
    const elem = e.target.parentElement.parentElement;


    if(elem.classList[0] === "book-container"){
        elem.classList.add("active");
        elem.addEventListener("transitionend",() => {
            elem.remove();
            deleteLocal(elem);   
        })
    } 
}


function localStorageSave(){
    let values;

    if(localStorage.getItem('values') === null){
        values = [];
    }else{
        values = JSON.parse(localStorage.getItem('values'));
    }


    values.forEach(item => {
        const bookContainer = document.createElement("div");
        bookContainer.classList.add("book-container");
    
        const nameAuthor = document.createElement("div");
        nameAuthor.classList.add("name-author");
    
        const h4 = document.createElement("h4");
        h4.innerHTML = item;
    
        const p = document.createElement("p");
        p.innerHTML = item;

        const i = document.createElement("i");
        i.classList.add("fas","fa-trash-alt");
    
        const description = document.createElement("div");
        description.classList.add("description");
    
    
        const strong = document.createElement("strong");
        strong.innerHTML = item;

        const span = document.createElement("span");
        span.innerHTML = item;

        i.addEventListener("click",deleteBook);
        
        nameAuthor.appendChild(h4);
        nameAuthor.appendChild(p);
        nameAuthor.appendChild(strong);
        nameAuthor.appendChild(i);
        bookContainer.appendChild(nameAuthor);
        description.appendChild(span);
        nameAuthor.appendChild(description);
        books.appendChild(bookContainer);
    });
}


function deleteLocal(elem){
    let values;

    if(localStorage.getItem('values') === null){
        values = [];
    }else{
        values = JSON.parse(localStorage.getItem('values'));
    }
    

    const indexValue = elem.children[0].innerText;
    values.splice(values.indexOf(indexValue),1);
    localStorage.setItem("values",JSON.stringify(values));
}
