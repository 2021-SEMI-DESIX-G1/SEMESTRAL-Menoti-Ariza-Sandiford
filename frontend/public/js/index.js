(() => {
    const App = {
        variables: {
            BACKEND_URL: 'http://localhost:3000',
            TOKEN: localStorage.getItem('token')
        },
        htmlElements: {
            productsContainer: document.getElementById('container-products')
        },
        init: () => {
            App.bindEvents();
            App.initializeData.products();
        },
        bindEvents: () => {
            App.htmlElements.productsContainer.addEventListener('click', App.events.addToCart)
        },
        initializeData: {
            products: async() => {
                const data = await App.utils.getData(`${App.variables.BACKEND_URL}/api/store/products`);
                const products = data.productos;
                products.forEach(product => {
                    App.events.getProducts(product);
                });
            }
        },
        events: {
            getProducts: ({ description, id, img, productName, status, unitPrice}) => {
                App.htmlElements.productsContainer.innerHTML += 
                    `<div class="card" style="width: 18rem;" id="${id}">
                        <img src="${img}" class="card-img-top" alt="CELL">
                        <button class="btn-cart" type="submit" id="add_cart">
                        <a href="/producto?product=${id}" id="${id}" class="card-link">Agregar al Carrito</a>
                        </button>
                        <div class="card-body" id="${id}">
                            <h5 class="card-title">${productName}</h5>
                            <p class="card-text"><b>Descripción: </b>${description}</p>
                            <p class="card-text"><b>Costo: </b>${unitPrice}</p>
                        </div>
                    </div>`
                    // <a href="#" id="cart-${id}" class="card-link">Agregar al carrito</a>
            },
            addToCart: async (event) => {
                event.preventDefault();
                // ESTO NO VA A FUNCIONAR SIN UN FORMULARIO?
                //btn_click=e.target.parentNode.id
                //var index =e.target.parentNode.parentNode.id;
                const productId = event.target.parentNode.id;
                const index=event.target.parentNode.parentNode.id
                console.log()
               
                if (productId == "add_cart") {
                    // cart.addToCart(productId);
                    console.log(event.target)
                    const body = {item: index}
                    await App.utils.postData(`${App.variables.BACKEND_URL}/api/store/cart?token=${App.variables.TOKEN}`, body)
                }
            }
        },
        utils: {
            getData: async(url) => {
                try {
                    const response = await fetch(url);
                    return response.json();
                } catch (error) {
                    throw new Error(`Error: ${error}`);
                }
            },
            postData: async(url, data={}) => {
                
                try {
                    const response = await fetch(url, { method: "POST", mode: "cors", 
                    cache: "no-cache", credentials: "same-origin", 
                    headers: {
                    "Content-Type": "application/json"
                    }, redirect: "follow", referrerPolicy: "no-referrer", body: JSON.stringify(data)});
                    console.log(JSON.stringify(data))
                    return response.json(); 
                } catch (error) {
                    throw new Error(`Error: ${error}`);
                }
            }   
        }
    }
    App.init();
})();