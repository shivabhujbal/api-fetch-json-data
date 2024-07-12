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


    }catch(err){
        console.error("Error with fetching Api",err);
    }
}

function displayProducts(categories){
    const productList = document.getElementById('product-list');
    productList.innerHTML='';
    categories.forEach(
        category => {
            // const categoryTitle = document.createElement('h2');
            // categoryTitle.textContent = category.category_name;
            // productList.appendChild(categoryTitle)


            category.category_products.forEach(
                product =>{
                    const productItem = document.createElement('div');
                    productItem.innerHTML = `
                    <div class="product-details">
                    <h3>${product.title}</h3>
                        <div class="product-images">
                            <img src="${product.image}" alt="${product.title}" width="100">
                            <img src="${product.second_image}" alt="${product.title}" width="100">
                        </div>
                    <p>Price: ${product.price}</p>
                    <p>Compare at price: ${product.compare_at_price}</p>
                    <p>Vendor: ${product.vendor}</p>
                    <p>${product.badge_text}</p>
                    <button class="btn btn-outline-danger"><b>Buy Now<b/></button>
                </div>
                <div>
                    
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


fetchData();