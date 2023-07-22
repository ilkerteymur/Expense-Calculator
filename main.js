//! HTML'den çağırdıklarımız
const nameInput = document.getElementById("name-input");
const priceInput = document.getElementById("price-input");
const addBtn = document.querySelector("#add-btn");
const listArea = document.getElementById("list");
const statusCheckbox = document.getElementById("status-check");
const sumInfo = document.getElementById("sum-info");
const deleteBtn = document.getElementById("delete");
const userInput = document.getElementById("user-input");
const select = document.querySelector("select");




//! İzlenecek olaylar
addBtn.addEventListener("click", addExpense);
listArea.addEventListener("click", handleUpdate);
userInput.addEventListener("input", saveUser);
document.addEventListener("DOMContentLoaded", getUser);
select.addEventListener("change", handleFilter);


// Toplamın değerinin tutulduğu yer
let sum = 0;
function updateSum(price){
    // js'deki toplam değerini günceller.
    sum += Number(price);

    // HTML'deki toplam bilgi alanını güncelleme
    sumInfo.innerText = sum;
}


//! eventListenır ile çalıştırılan fonsiyonlara,
// olay hakkında bilgileri içeren bir parametre girilir.
function addExpense (event){
    // sayfa yenilemesini engelleme
    event.preventDefault();


    //! 1- inputların birinin değeri boş ise alert ver ve fonksiyonu durdur.
    if(!nameInput.value || !priceInput.value){
        Toastify({
            text: "Please fill in the form!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "red",
              borderRadius: "6px",
              color: "white"
            },
          }).showToast();
        return;
    }


    //! 2- inputlar doluysa bir kart oluşytur ve HTML'e gönder.
    //? 2-a - div oluşturma
    const expenseDiv = document.createElement("div");

    //? 2-b - div'e class ekleme
    expenseDiv.classList.add("expense");

    //eğer ödendi checkbox'ına tıklandıysa "paid" class'ını ekle.
    if(statusCheckbox.checked === true){
        expenseDiv.classList.add("paid");
    };

    //? 2-c - içerisindeki HTML'i belirleme.
    expenseDiv.innerHTML = `
            <h2 class="name">${nameInput.value}</h2>
            <h2 class="price">${priceInput.value}</h2>
            <div class="btns">
            <img id="edit" src="IMG/card.png" alt="">
            <img id="delete" src="IMG/trash.png" alt="">
            </div>
    `;



    //? 2-d - oluşan elemanı HTML'e gönderme.
    listArea.appendChild(expenseDiv);

    //toplam alanını güncelleme
    updateSum(priceInput.value);


    // formu temizleme
    nameInput.value = "";
    priceInput.value = "";
    statusCheckbox.checked = false;

    // toastify notification codes(alert when mail sent)
  Toastify({
    text: "Successfully added!",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "rgb(193,193,0)",
      borderRadius: "6px",
      color: "white",
    },
  }).showToast();

};

//! listedeki bir elemana tıklayınca çalışır.
function handleUpdate(event){
    // tıklanılam elemana erişme.
    const ele = event.target;

    // silme butonunun kapsayıcısına erişme.
    const parent = ele.parentElement.parentElement;

    // yalnızca silme iconuna tıklanınca çalışacak kod.

    if(ele.id === "delete"){
        
        // 1- toplam bilgisini güncelleme
        // const cikarEl = parent.querySelector(".price");
        // const price = Number(cikarEl.innerText);
        // updateSum(-price);


        // elementi silme
        parent.remove();



        // 2- toplam bilgisini güncelleme
       const price =  parent.querySelector(".price").innerText;
       updateSum(-Number(price));
       // 3-  updateSum(-Number(price) * -1);
        
    };

    // elemanın id'si "edit" ise onun paid class'ını varsa ekle yoksa çıkar
    if(ele.id === "edit"){
        parent.classList.toggle("paid")
    }
};

//! Kullanıcıyı local'a kaydetme
function saveUser(event){
   localStorage.setItem("username", event.target.value);
}

//! Kullanıcı local'de var ise onu alma.
function getUser(){
    // local'den username'i al ,
    // isim daha önce kaydedilmemiş ise null yerine "" olsun..
    const username = localStorage.getItem("username") || "";

    // kullanıcı ismini imput'a aktarma.
    userInput.value = username;
}


//!Filtreleme kısmı

function handleFilter(event){
    const selected = event.target.value;
    const items = list.childNodes;
console.log(items);
// bütün elemanları dönme
    items.forEach(item => {
        
        //selected'ın alabileceği değerleri izleme
        switch(selected){
            case "all":
            // hepsi seçilirse
            item.style.display = "flex";
            break;
    
            case "paid":
            // eleman paid classına sahipse onu göster değilse gizle
            if(item.classList.contains("paid")){
                item.style.display = "flex";
            }else{
                item.style.display = "none";
            }
                break;
    
            case "not-paid":
            // eleman paid classına sahip değilse onu göster değilse gizle
            if(!item.classList.contains("paid")){
                item.style.display = "flex";
            }else{
                item.style.display = "none";
            }
                break;
        }
    });
}
