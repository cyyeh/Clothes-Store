// NOTE: The variable "shirts" is defined in the shirts.js file as the full list of shirt offerings
//       You can access this variable here, and should use this variable here to build your webpages

let initProducts = () => {
    const QuickViewButtonsClassName = 'quick-view-btn'
    const DetailPageButtonsClassName = 'detail-page-btn'

    function renderProducts(products) {
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
                        <p>${getProductAvailableColorsText(product.colors)}</p>
                        <div>
                            <button 
                                type="button"
                                data-index=${idx}
                                class=${QuickViewButtonsClassName}
                            >
                                Quick View
                            </button>
                            <button 
                                type="button"
                                data-index=${idx}
                                class=${DetailPageButtonsClassName}
                            >
                                See Page
                            </button>
                        </div>
                    </section>
                </article>
            `
        }

        const $ProductsContainer = document.getElementById('products-container')
        for (let [idx, shirt] of products.entries()) {
            $ProductsContainer.insertAdjacentHTML(
                'beforeend',
                getProductCardHTML(shirt, idx)
            )
        }
    }

    function registerOnClickEvent(className, event) {
        const elements = document.getElementsByClassName(className)
        for (let button of elements) {
            button.addEventListener('click', event)
        }
    }

    function removeOnClickEvent(className, event) {
        const elements = document.getElementsByClassName(className)
        for (let button of elements) {
            button.removeEventListener('click', event)
        }
    }

    function clickProductQuickView(event) {
        console.log(event.target.dataset.index)
    }

    function clickProductDetailPage(event) {
        const urlElements = window.location.href.split('/')
        urlElements[urlElements.length - 1] = 'details.html'
        window.location = `${urlElements.join('/')}?id=${event.target.dataset.index}`
    }

    renderProducts(window.shirts)

    // register onClick event listeners
    registerOnClickEvent(QuickViewButtonsClassName, clickProductQuickView)
    registerOnClickEvent(DetailPageButtonsClassName, clickProductDetailPage)

    window.onunload = () => {
        console.log('unloading...')
        // remove all onClick event listeners before changing page link
        removeOnClickEvent(QuickViewButtonsClassName, clickProductQuickView)
        removeOnClickEvent(DetailPageButtonsClassName, clickProductDetailPage)
    }
};

let initDetails = () => {
    // To see the shirts object, run:
    // console.log(shirts);

    // Your Code Here
};