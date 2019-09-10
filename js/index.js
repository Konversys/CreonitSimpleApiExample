import API from "./backend.js";

const api = new API("./data/");
const shoppingList = document.querySelector("#shopping-list");
let items;

const displayItem = item => {
  shoppingList.insertAdjacentHTML("beforeend", `<li>${item}</li>`);
};

const addItem = async item => {
  // пример для реального api

  // const data = await api.post("shop.json", { item });
  // if (data.result == 'success') {
  //   console.log(data.message);
  //   displayItem(item);
  // }

  // т.к api в нашем случае - это простой json, который не может обработать post запрос, то будем просто пушить значение в массив.
  if (!item != null && !items.map(x => x.item).includes(item)) {
    items.push({ id: items.lenght, item });
    displayItem(item);
  } else {
    alert(`Элемент "${item}" уже добавлен`);
  }
};

const initShop = async () => {
  const form = document.querySelector("#add-item-form");
  const item = document.querySelector("#item-name");

  items = await api.get("shop.json");
  items.forEach(x => displayItem(x.item));

  form.addEventListener("submit", event => {
    event.preventDefault();
    if (item.value) addItem(item.value);
  });
};

initShop();
