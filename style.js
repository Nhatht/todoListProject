// sự kiến chính xảy ra khi mình đã điền thông tin vào input có id là name
// và mình bấm nút add (khi cái form được submit)
document.querySelector("form").addEventListener("submit", event =>{
    event.preventDefault();//chặn sự kiện reset trang khi submit của form
    let name = document.querySelector("#name").value;
    //khi có giá trị trên ô input có id là name
    //ta sẽ tạo 1 đối tượng tên là iteam gồm 2 prop
    //id:        và name
    let item = {
        id: new Date().toISOString(),
        name: name.trim(),
    }

    //1.render item lên ui(giao diện người dùng)
    addItemToUI(item)
    //2.lưu item vào local Storage
    addItemToLS(item)
})

//viết 1 cái hàm: nhận vào (item) và hiển thị nó lên màn hình
const addItemToUI = (item) =>{
    let newCard = document.createElement("div")
    newCard.className = "card d-flex flex-row justify-content-between align-items-center p-2 mb-3"
    newCard.innerHTML = `
        <span>${item.name}</span>
        <button type="button" class="btn btn-danger btn-remove" data-id=${item.id}>Remove</button>
    `
    document.querySelector(".list").appendChild(newCard)
}
//hàm lấy ra danh sách từ localStorage
const getList = () =>{
    return JSON.parse(localStorage.getItem("list")) || []
}
//hàm lưu item vào localStorage
const addItemToLS = (item) => {
    let list = getList();
    list.push(item)
    localStorage.setItem("list", JSON.stringify(list))
}
//hàm render ui cho các item trong danh sách
const init = ()=>{
    let list = getList();
    list.forEach(item =>{
        addItemToUI(item)
    });
}
init();

//hàm nhận vào id của item và xóa item 
const removeItemToLS = (idItem) => {
    //lấy mảng
    let list = getList();
    //từ idItem tìm vị trí của đối tượng trong mảng
    let index = list.findIndex((item) => item.id == idItem);
    list.splice(index, 1);
    localStorage.setItem("list", JSON.stringify(list));//cập nhập lại list lên ls
}
//chức năng xóa 1 item (card)
document.querySelector(".list").addEventListener("click", (event) => {
    if(event.target.classList.contains("btn-remove")){
        // alert("hello");
        let nameItem = event.target.previousElementSibling.innerHTML;
        let isconfirmed = confirm(`bạn có chắc muốn xóa đối tượng : ${nameItem}`);
        if(isconfirmed){
            // xóa item trên ui
            let card = event.target.parentElement
            card.remove();
            // xóa item trên ls
            removeItemToLS(event.target.dataset.id);
        }
    }
});

//xóa tất cả
document.querySelector("#btn-remove-all").addEventListener("click", (event) => {
    let isconfirmed = confirm("Bạn có chắc là muốn xóa hết không ?");
    if(isconfirmed){
        //cập nhật ui
        document.querySelector(".list").innerHTML = "";
        //cập nhật ls
        localStorage.removeItem("list");
    }
});
//
document.querySelector("#filter").addEventListener("keyup", event => {
    const valueInput = event.target.value
    //lấy cái list
    let list = getList();
    let filteredList = list.filter((item) => item.name.includes(valueInput));
    //xóa danh sách cũ
    document.querySelector(".list").innerHTML = "";
    //render lên danh sachs đã lọc
    filteredList.forEach((item) => {
        addItemToUI(item);
    });
});