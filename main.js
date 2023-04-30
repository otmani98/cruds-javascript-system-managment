//get elements
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let totaldiv = document.querySelector(".total");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let searchBy = document.getElementById("searchby");
let searchByTitle = document.getElementById("searchbytitle");
let searchByCategory = document.getElementById("searchbycategory");
let deleteBSR = document.getElementById("deleteBSR");
let deleteAll = document.getElementById("deleteAll");
let tbody = document.querySelector("tbody");
//elements of update in popup block
let shadow = document.querySelector(".shadow");
let popup = document.querySelector(".popup");
let Utitle = document.getElementById("Utitle");
let Uprice = document.getElementById("Uprice");
let Utaxes = document.getElementById("Utaxes");
let Uads = document.getElementById("Uads");
let Udiscount = document.getElementById("Udiscount");
let Ucount = document.getElementById("Ucount");
let Ucategory = document.getElementById("Ucategory");
let Utotal = document.getElementById("Utotal");
let Utotaldiv = document.querySelector(".Utotal");
let exit = document.getElementById("exit");
let update = document.getElementById("doUpdate");

// to know the index of product we want to update
let index_Update;
//for search filter
let result = [];

//create object data in localstorage if it doesn't exist
if (!localStorage["CrudsData"]) {
  localStorage.setItem("CrudsData", JSON.stringify([]));
}

//total price
document.addEventListener("input", function () {
  if (price.value && taxes.value) {
    totaldiv.className = "totalTrue";
    total.textContent =
      +price.value + +taxes.value + +ads.value - +discount.value;
  } else {
    totaldiv.className = "total";
    total.textContent = "";
  }
  //for total price in popup update
  if (Uprice.value && Utaxes.value) {
    Utotaldiv.className = "UtotalTrue";
    Utotal.textContent =
      +Uprice.value + +Utaxes.value + +Uads.value - +Udiscount.value;
  } else {
    Utotaldiv.className = "Utotal";
    Utotal.textContent = "";
  }
});

//create operation
create.onclick = async function () {
  let data = JSON.parse(localStorage.getItem("CrudsData"));
  let product = {};
  if (!!title.value && !!total.textContent && !!category.value) {
    if (data.length > 0) {
      product["id"] = data[data.length - 1]["id"] + 1;
    } else {
      product["id"] = 0;
    }
    product["title"] = title.value[0].toUpperCase() + title.value.slice(1);
    product["price"] = +price.value;
    product["taxes"] = +taxes.value;
    product["ads"] = +ads.value;
    product["discount"] = +discount.value;
    product["total"] = +total.textContent;
    product["category"] =
      category.value[0].toUpperCase() + category.value.slice(1);

    data.push(product);
    //this block of code bellow to repeat the product (count value)
    check = +count.value;
    check--;
    let x = 1;
    if (check > 1) {
      while (x <= check) {
        let newproduct = Object.assign({}, product);
        newproduct["id"] = data[data.length - 1]["id"] + 1;
        data.push(newproduct);
        x++;
      }
    }
    //to save data into localStorage
    localStorage.setItem("CrudsData", JSON.stringify(data));
    //empty values
    emptyValue();
    //to update data in web page
    read();
  }
};

//read operation
function read(data = JSON.parse(localStorage.getItem("CrudsData"))) {
  tbody.innerHTML = ``;
  for (let i = 0; i < data.length; i++) {
    //the row of table
    let tr = document.createElement("tr");

    //loop to get data from object
    for (const key in data[i]) {
      let td = document.createElement("td");
      let tdText = document.createTextNode(data[i][key]);
      td.appendChild(tdText);
      tr.appendChild(td);
    }

    //create update button
    let tdupdate = document.createElement("td");
    let updateE = document.createElement("button");
    let updateEText = document.createTextNode("Update");
    updateE.className = "update";
    updateE.setAttribute("dataSet", data[i]["id"]);
    updateE.appendChild(updateEText);
    tdupdate.appendChild(updateE);
    tr.appendChild(tdupdate);
    //create delete button
    let tddelete = document.createElement("td");
    let deleteE = document.createElement("button");
    let deleteEText = document.createTextNode("Delete");
    deleteE.className = "delete";
    deleteE.setAttribute("dataSet", data[i]["id"]);
    deleteE.appendChild(deleteEText);
    tddelete.appendChild(deleteE);
    tr.appendChild(tddelete);

    //add everything to tbody
    tbody.appendChild(tr);
    //counter of products
    counterProducts();
  }
}

//show products when open the page
window.onload = () => {
  read();
};

//delete all products
deleteAll.onclick = function () {
  localStorage.setItem("CrudsData", JSON.stringify([]));
  read();
};

//function to count number of products
function counterProducts() {
  let length = JSON.parse(localStorage.getItem("CrudsData")).length;
  if (length > 0) {
    deleteAll.innerText = `Delete all (${length})`;
  } else {
    deleteAll.innerText = `Delete all`;
  }
}

//function to empty values
function emptyValue() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  totaldiv.className = "total";
  total.textContent = "";
}

//update delete one product
document.addEventListener("click", function (e) {
  let data = JSON.parse(localStorage.getItem("CrudsData"));
  //delete part
  if (e.target.className === "delete") {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      if (data[i]["id"] === +e.target.getAttribute("dataSet")) {
        data.splice(i, 1);
        localStorage.setItem("CrudsData", JSON.stringify(data));
        read();
      }
    }
  }
  //update part
  if (e.target.className === "update") {
    let product;
    for (let i = 0; i < data.length; i++) {
      if (data[i]["id"] === +e.target.getAttribute("dataSet")) {
        product = data[i];
        Utitle.value = product["title"];
        Uprice.value = product["price"];
        Utaxes.value = product["taxes"];
        Uads.value = product["ads"];
        Udiscount.value = product["discount"];
        Ucategory.value = product["category"];
        Utotal.textContent = product["total"];
        index_Update = i;
        if (Uprice.value && Utaxes.value) {
          Utotaldiv.className = "UtotalTrue";
        }
        shadow.style.height = `${document.body.offsetHeight + 200}px`;
        shadow.style.display = "block";
        popup.style.display = "block";
        break;
      }
    }
  }
});

//exit from popup
exit.onclick = function () {
  shadow.style.display = "none";
  popup.style.display = "none";
};

//update from popup
update.onclick = function () {
  //here

  let product = Object.assign({}, data[index_Update]);
  if (Utitle.value && Utotal.textContent && Ucategory.value) {
    product["title"] = Utitle.value[0].toUpperCase() + Utitle.value.slice(1);
    product["price"] = +Uprice.value;
    product["taxes"] = +Utaxes.value;
    product["ads"] = +Uads.value;
    product["discount"] = +Udiscount.value;
    product["category"] =
      Ucategory.value[0].toUpperCase() + Ucategory.value.slice(1);
    product["total"] = +Utotal.textContent;
  }
  data.splice(index_Update, 1, product);
  localStorage.setItem("CrudsData", JSON.stringify(data));
  shadow.style.display = "none";
  popup.style.display = "none";
  // to show the result of searching again after update or show the result without searching
  if (searchBy.value) {
    search();
  } else {
    read();
  }
};

//search
let search = function () {
  if (searchBy.value) {
    deleteBSR.style.display = "inline";
  } else {
    deleteBSR.style.display = "none";
    read();
  }
  let data = JSON.parse(localStorage.getItem("CrudsData"));
  let re = new RegExp(`${searchBy.value}`, "i");
  if (searchBy.getAttribute("placeholder") === "Search by title") {
    result = data.filter((product) => re.test(product["title"]));
  } else {
    result = data.filter((product) => re.test(product["category"]));
  }
  read(result);
  counterProducts();
};

//Run search
searchBy.addEventListener("input", search);

//searchBy change field and run search
searchByTitle.onclick = function () {
  searchBy.placeholder = "Search by title";
  if (searchBy.value) {
    search();
  }
};
searchByCategory.onclick = function () {
  searchBy.placeholder = "Search by category";
  if (searchBy.value) {
    search();
  }
};

//delete by result of searching
deleteBSR.onclick = function () {
  let data = JSON.parse(localStorage.getItem("CrudsData"));
  let ids = [];
  for (let i = 0; i < result.length; i++) {
    ids.push(result[i]["id"]);
  }
  let newArr = data.filter((product) => !ids.includes(product["id"]));
  localStorage.setItem("CrudsData", JSON.stringify(newArr));
  search();
};
