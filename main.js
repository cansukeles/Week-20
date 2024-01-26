var elements = JSON.parse(localStorage.getItem("list"));

if (elements && elements.length > 0) {
  var ul = document.getElementById("list");
  ul.innerHTML = "";

  for (let i = 0; i < elements.length; i++) {
    var li = document.createElement("li");
    li.innerHTML = elements[i].innerHTML;
    li.classList = elements[i].class;

    ul.appendChild(li);
  }
}

//Create a close button and append it to each list item
var myNodeList = document.getElementsByTagName("li");
var i;
for (i = 0; i < myNodeList.length; i++) {
  var span = document.createElement("span");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodeList[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.classList.toggle("removed");
    saveOnLocalStorage();
  };
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector("ul");
list.addEventListener(
  "click",
  function (ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
      saveOnLocalStorage();
    }
  },
  false
);

// Create a new list item when clicking on the "add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("task").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    alert("Listeye boş eleman ekleyemezsin!");
  } else {
    document.getElementById("list").appendChild(li);
  }
  document.getElementById("task").value = "";

  var span = document.createElement("span");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  span.onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  };
  li.appendChild(span);

  saveOnLocalStorage();
}

function saveOnLocalStorage() {
  var textArray = [];
  var list = document.querySelector("ul");
  var listElements = list.getElementsByTagName("li");

  for (let i = 0; i < listElements.length; i++) {
    var elementObject = {
      innerHTML: listElements[i].innerHTML,
      class: listElements[i].className,
    };
    textArray.push(elementObject);
  }

  localStorage.setItem("list", JSON.stringify(textArray));
}
