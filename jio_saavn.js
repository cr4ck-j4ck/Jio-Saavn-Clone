const row = document.querySelectorAll(".row");
const leftButtons = document.querySelectorAll(".fa-less-than");
const rightButtons = document.querySelectorAll(".fa-greater-than");
const containers = document.querySelectorAll(".container");


for (let button of leftButtons) {
    button.addEventListener("click", function () {
        if (this.nextElementSibling.scrollLeft > 0) {
            this.nextElementSibling.scrollTo({ left: 0, behavior: 'smooth' })
        }
    });
}

for (let button of rightButtons) {
    button.addEventListener("click", function () {
        const row = this.previousElementSibling; {
            row.scrollTo({ left: row.scrollWidth, behavior: 'smooth' })
        }
    });
}

containers.forEach(container => {
    const row = container.querySelector(".row");
    const leftButton = container.querySelector(".fa-less-than");
    const rightButton = container.querySelector(".fa-greater-than");

    container.addEventListener("mouseenter", function () {
        if (row.scrollLeft > 0) {
            leftButton.style.opacity = 1;
        } else {
            leftButton.style.opacity = 0.3;            
        }
        
        if (Math.floor(row.scrollLeft) > (row.scrollWidth - row.clientWidth) - 1) {
            rightButton.style.opacity = 0.2;
        } else {
            rightButton.style.opacity = 1;
        }
    });

    container.addEventListener("mouseleave", function () {
        leftButton.style.opacity = 0;
        rightButton.style.opacity = 0;
    });
})