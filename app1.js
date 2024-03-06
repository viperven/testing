const btnAdd = document.getElementById("add");

addToLS = () => {
  let notesArray = [];
  let notes = document.querySelectorAll("#txtarea");

  notes.forEach((curElm) => {
    notesArray.push(curElm.value);
  });
  localStorage.setItem("notes", JSON.stringify(notesArray));
};
addNewNote = (text) => {
  let notes = document.createElement("div");
  notes.classList.add("note-area");

  let htmlData = `
  <textarea name="" id="txtarea"></textarea>
  <div class="operation flx gap-5">
      <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
      <button class="delete"><i class="fa-solid fa-trash"></i></button>
  </div> `;

  notes.insertAdjacentHTML("afterbegin", htmlData);
  document.body.children[2].appendChild(notes);

  const btnEdit = notes.querySelector(".edit");
  const btnDelete = notes.querySelector(".delete");
  const textArea = notes.querySelector("#txtarea");

  text ? (textArea.value = text) : (textArea.value = "");

  textArea.addEventListener("change", (event) => {
    boxValue = event.target.value;
    textArea.toggleAttribute("disabled");
    addToLS();
  });

  btnEdit.addEventListener("click", () => {
    textArea.toggleAttribute("disabled");
  });

  btnDelete.addEventListener("click", () => {
    console.log(notes);
    notes.remove();
    addToLS();
  });
};

let boxValue = JSON.parse(localStorage.getItem("notes"));
boxValue.forEach((curElm) => {
  if (curElm.length != 0) {
    addNewNote(curElm);
  }
});

btnAdd.addEventListener("click", () => addNewNote());
