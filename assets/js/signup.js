document.getElementById("button1").addEventListener("click", ()=>{
    document.querySelector(".popup_signup").style.display = "flex";
});

document.querySelector("#close").addEventListener("click", ()=>{
    document.querySelector(".popup_signup").style.display = "none";
})