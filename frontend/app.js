console.log("hello world");
const content = document.querySelector(".content");

class PageSate {
    constructor() {
        let currentState = new DefaultState(this);

        this.init = function() {
            this.change(new DefaultState());
        };

        this.change = (state) => {
            if (currentState !== state) currentState = state;
        };
    }
}

const DefaultState = function(page) {};

const ProductState = function(page) {
    ProductsHandler.productFetcher();
};

const CarState = function(page) {
    CarsHandler.carFetcher();
};

const ProductsHandler = (function() {
    const fetchProducts = async() => {
        const PRODUCTS_API = "http://localhost:4001/rtx/api/products";
        const data = await fetch(PRODUCTS_API, { method: "GET", mode: "cors" });
        const json = await data.json();
        // console.log(json);
        polluteProducts(json);
    };

    const polluteProducts = (products) => {
        content.innerHTML = "";
        for (let product of products) {
            const course_container = document.createElement("div");
            course_container.classList.add("card");
            course_container.classList.add("col-md-4");
            course_container.classList.add("mb-3");
            // course_container.classList.add("me-2");

            const img = document.createElement("img");
            img.classList.add("card-img-top");
            img.style.height = "400px";
            img.style.weight = "200px";
            img.src = product.img;

            const title = document.createElement("h4");
            // title.classList.add("ps-4");
            title.classList.add("card-title");
            title.classList.add("mt-2");
            title.innerText = product.name;

            const body = document.createElement("card-body");
            body.classList.add("ms-1");
            body.classList.add("mb-3");
            body.classList.add("ps-2");
            body.classList.add("mt-3");

            const desc = document.createElement("display-4");
            desc.classList.add("card-text");
            desc.classList.add("text-muted");
            desc.innerText = product.description;

            const section = document.createElement("display-6");
            section.classList.add("card-header");
            section.classList.add("text-muted");
            section.innerText = product.section;

            const price = document.createElement("div");
            price.classList.add("card-footer");
            price.innerText = "Price: SEK " + product.price;

            body.appendChild(title);
            body.appendChild(desc);
            course_container.appendChild(section);
            course_container.appendChild(body);
            course_container.appendChild(img);

            course_container.appendChild(price);

            content.appendChild(course_container);
        }
    };

    return {
        productFetcher: fetchProducts,
    };
})();

const CarsHandler = (function() {
    const fetchCars = async() => {
        const CARS_API = "http://localhost:4002/rtx/api/cars";
        const data = await fetch(CARS_API, { method: "GET", mode: "cors" });
        const json = await data.json();
        polluteCars(json);
    };

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const polluteCars = async(cars) => {
        content.innerHTML = "";
        for (let car of cars) {
            const card = document.createElement("div");
            card.classList.add("card");
            card.classList.add("col-md-3");
            card.classList.add("bg-light");
            // card.classList.add("m-1");
            card.classList.add("mb-3");

            const body = document.createElement("div");
            body.classList.add("card-body");

            const name = document.createElement("display-4");
            name.classList.add("card-title");
            name.classList.add("mt-2");
            name.classList.add("text-primary");
            name.classList.add("text-center");
            name.innerText = capitalize(car.name);

            const displacement = document.createElement("span");
            displacement.classList.add("badge");
            displacement.classList.add("m-1");
            displacement.classList.add("bg-info");
            displacement.innerText = car.Displacement;

            const origin = document.createElement("span");
            origin.classList.add("badge");
            origin.classList.add("m-1");
            origin.classList.add("bg-dark");
            origin.innerText = car.Origin;

            const acc = document.createElement("span");
            acc.classList.add("badge");
            acc.classList.add("m-1");
            acc.classList.add("bg-success");
            acc.innerText = `${car.Acceleration} Km/H`;

            const mpg = document.createElement("span");
            mpg.classList.add("badge");
            mpg.classList.add("m-1");
            mpg.classList.add("bg-secondary");
            mpg.innerText = `${car.Miles_per_Gallon} M/G`;

            const weight = document.createElement("span");
            weight.classList.add("badge");
            weight.classList.add("m-1");
            weight.classList.add("bg-secondary");
            weight.innerText = `${car.Weight_in_lbs} lbs`;

            const cylinders = document.createElement("span");
            cylinders.classList.add("badge");
            cylinders.classList.add("m-1");
            cylinders.classList.add("bg-primary");
            cylinders.innerText = `${car.Cylinders} cylinders`;

            const horsePower = document.createElement("h6");
            horsePower.classList.add("badge");
            horsePower.classList.add("m-1");
            horsePower.classList.add("bg-danger");
            horsePower.innerText = `${car.Horsepower} Km/H`;

            const year = document.createElement("span");
            year.classList.add("badge");
            year.classList.add("m-1");
            year.classList.add("bg-warning");
            year.innerText = car.Year;

            card.appendChild(name);

            body.appendChild(displacement);
            body.appendChild(horsePower);
            body.appendChild(origin);
            body.appendChild(acc);
            body.appendChild(year);
            body.appendChild(mpg);
            body.appendChild(weight);
            body.appendChild(cylinders);

            card.appendChild(body);
            content.appendChild(card);
        }
    };

    return {
        carFetcher: fetchCars,
    };
})();

const state = new PageSate();
state.init();

const products_lst = document.getElementById("products-action");
products_lst.addEventListener("click", () => {
    // document.location.reload();
    state.change(new ProductState());
});

const cars_lst = document.getElementById("cars-action");
cars_lst.addEventListener("click", () => {
    // document.location.reload();
    state.change(new CarState());
});