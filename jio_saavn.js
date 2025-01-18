const row = document.querySelectorAll(".row");
const leftButtons = document.querySelectorAll(".fa-less-than");
const rightButtons = document.querySelectorAll(".fa-greater-than");


for (let button of leftButtons) {
    button.addEventListener("click", function () {

        if(this.nextElementSibling.scrollLeft > 0 ){
            this.nextElementSibling.scrollTo({ left: 0, behavior: 'smooth' }) 
        }
    });
}

for (let button of rightButtons) {
    button.addEventListener("click", function () {
        if(Math.floor(this.previousElementSibling.scrollLeft) !==  ((this.previousElementSibling.scrollWidth - row.clientWidth)- 1)){
            this.previousElementSibling.scrollTo({ left: this.previousElementSibling.scrollWidth, behavior: 'smooth' }) 
        }
    });    
}