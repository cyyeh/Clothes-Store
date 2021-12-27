// NOTE: The variable "shirts" is defined in the shirts.js file as the full list of shirt offerings
//       You can access this variable here, and should use this variable here to build your webpages

let initProducts = () => {
    // function getProductObject(product, idx) {
    //     return {
    //         'idx': idx,
    //         'object': product,
    //         'html': getProductCardHTML(product, idx)
    //     }
    // }


    function getProductCardHTML(product, idx) {
        function getProductCardImage(colorsImages, defaultImages) {
            console.assert(defaultImages, "There should be default images found!")
            console.assert(defaultImages.front, "There should be at least a default front image!")
    
            if (!colorsImages) {
                return defaultImages.front
            }
            if (!Object.keys(colorsImages).length) {
                return defaultImages.front
            } else {
                return colorsImages[Object.keys(colorsImages)[0]].front
            }
        }

        function getProductAvailableColorsText(colors) {
            if (!colors || !Object.keys(colors).length) {
                return 'Available in 0 color'
            } else if (Object.keys(colors).length === 1) {
                return 'Available in 1 color'
            } else {
                return `Available in ${Object.keys(colors).length} colors`
            }
        }

        return `
            <article>
                <section class="product-image-container">
                    <img src=${getProductCardImage(product.colors, product.default)} alt=${product.name} />
                </section>
                <section class="product-info-container">
                    <h3>${product.name}</h3>
                    <p>${getProductAvailableColorsText(product.colors)}</h3>
                    <div>
                        <button type="button">Quick View</button>
                        <button type="button">See Page</button>
                    </div>
                </section>
            </article>
        `
    }

    // To see the shirts object, run:
    // console.log(shirts);
    const $ProductsContainer = document.getElementById('products-container')

    for (let [idx, shirt] of shirts.entries()) {
        $ProductsContainer.insertAdjacentHTML(
            'beforeend',
            getProductCardHTML(shirt, idx)
        )
    }
};

let initDetails = () => {
    // To see the shirts object, run:
    // console.log(shirts);

    // Your Code Here
};