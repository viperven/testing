const addButton = document.getElementById("add");

//ADDIND DATA IN LOCAL STORAGE;
const updateLsData = () => {
  const textAreaData = document.querySelectorAll("#txtarea");
  const notes = [];
  // console.log(textAreaData);
  textAreaData.forEach((note) => {
    return notes.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
};

const addNewNote = (text = "") => {
  alert("hello");
  //.createElement is used to create element.
  const note = document.createElement("div");
  //.classlist to add multiple class names
  note.classList.add("note-area");
  //paste entire str
  const htmlData = `
    <textarea name="" id="txtarea"></textarea> 
     <div class="operation flx gap-5">
      <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
      <button class="delete"><i class="fa-solid fa-trash"></i></button>
     </div>
 `;

  //add directly all html part with this inside note {AFTER-BEGIN}
  note.insertAdjacentHTML("afterbegin", htmlData);
  //finally add to document body appendChild: append to last child of node
  //used children array bcz i want to put inside grid-3c and position is 2
  document.body.children[2].appendChild(note);

  //getting References
  //notice here we have mention note. bcz now everthing is inside note not document
  const textArea = note.querySelector("#txtarea");
  const operationDiv = note.querySelector(".operation");
  const editButton = note.querySelector(".edit");
  const deleteButton = note.querySelector(".delete");

  //deleting Node

  deleteButton.addEventListener("click", () => {
    note.remove();
    //inbuilt func to remove node
  });

  //IMP LINE
  textArea.value = text;

  //toggle between edit button
  editButton.addEventListener("click", () => {
    //on clikc add diabled attribute clik again remove
    textArea.toggleAttribute("disabled");
  });

  textArea.addEventListener("change", (event) => {
    //change is lot better than input
    //this is gives us value when we click outside or some change happens
    const value = event.target.value;
    textArea.value = value;
    updateLsData();
  });
};

//GETTING DATA BACK FROM LOCAL STORAGE;
const notes = JSON.parse(localStorage.getItem("notes"));
if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}

//on button click
addButton.addEventListener("click", () => addNewNote());
