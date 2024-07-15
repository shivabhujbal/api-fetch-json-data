const API_URL = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';

const fetchData = async()=>{

    try{
        const res = await fetch(API_URL);
        // console.log(res);
        const data = await res.json();
        // console.log(data.categories);
        displayProducts(data.categories);

        document.getElementById('men-button').addEventListener('click',()=>displayFilteredProducts(data.categories,'Men'));
        document.getElementById('women-button').addEventListener('click',()=>displayFilteredProducts(data.categories,'Women'));
        document.getElementById('kids-button').addEventListener('click',()=>displayFilteredProducts(data.categories,'Kids'));
        document.getElementById('search-input').addEventListener('input',() => searchProducts(data.categories));

    }catch(err){
        console.error("Error with fetching Api",err);
    }
}

function displayProducts(categories){
    const productList = document.getElementById('product-list');
    productList.innerHTML='';
    categories.forEach(
        category => {
            category.category_products.forEach(
                product =>{
                    const productItem = document.createElement('div');
                    productItem.innerHTML = `
                    <div class="product-details">
                    <h3 class="mt-4">${product.title}</h3>
                        <div class="product-images">
                            <img src="${product.image}" alt="${product.title}" width="100">
                            <img src="${product.second_image}" alt="${product.title}" width="100">
                        </div>
                        <p class="price">Price: ${product.price}</p>
                        <p class="compare-price">Compare at price: ${product.compare_at_price}</p>
                        <p class="vendor">Vendor: ${product.vendor}</p>
                        <p class="badge-text">${product.badge_text}</p>
                </div>

                <div class="buy">
                    <button class="btn "><b>Buy Now<b/></button>

                </div>
                
            `;

                productList.appendChild(productItem);
                }
            )


        }
    )
}

function displayFilteredProducts(cate,categoryName){
    // console.log(cate,categoryName);
    const filterdProducts = cate.filter(
        cate => cate.category_name === categoryName
    );
    // console.log(filterdProducts);
    displayProducts(filterdProducts)
}

function searchProducts(categories){

    const query = document.getElementById('search-input').value.toLowerCase();
    const filterdProducts =[];

    categories.forEach(
        category => {
            const machingProducts = category.category_products.filter(
                product =>
                    (product.title?.toLowerCase().includes(query)) ||
                    (product.vendor?.toLowerCase().includes(query)) ||
                    (product.price?.toLowerCase().includes(query)) ||
                    (product.badge_text?.toLowerCase().includes(query))


            );
            if (machingProducts.length) {
                filterdProducts.push({
                    category_name:category.category_name,
                    category_products:machingProducts
                });
                
            }
        });

        displayProducts(filterdProducts)
}


fetchData();