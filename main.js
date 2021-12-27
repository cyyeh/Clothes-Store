// NOTE: The variable "shirts" is defined in the shirts.js file as the full list of shirt offerings
//       You can access this variable here, and should use this variable here to build your webpages

let initProducts = () => {
    const $Header = document.getElementsByTagName('header')[0]
    const $Nav = document.getElementsByTagName('nav')[0]
    const $Main = document.getElementsByTagName('main')[0]
    const $Footer = document.getElementsByTagName('footer')[0]
    const QuickViewButtonsClassName = 'quick-view-btn'
    const DetailPageButtonsClassName = 'detail-page-btn'

    // Start of Used-More-Than-Once Helper Methods
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

    function disableBackgroundStyles() {
        $Header.style.opacity = 0.5
        $Nav.style.opacity = 0.5
        $Main.style.opacity = 0.5
        $Footer.style.opacity = 0.5
        $Header.style.pointerEvents = 'none'
        $Nav.style.pointerEvents = 'none'
        $Main.style.pointerEvents = 'none'
        $Footer.style.pointerEvents = 'none'
    }

    function enableBackgroundStyles() {
        $Header.style.opacity = 1
        $Nav.style.opacity = 1
        $Main.style.opacity = 1
        $Footer.style.opacity = 1
        $Header.style.pointerEvents = 'inherit'
        $Nav.style.pointerEvents = 'inherit'
        $Main.style.pointerEvents = 'inherit'
        $Footer.style.pointerEvents = 'inherit'
    }

    function registerOnClickEvents(elements, event) {
        for (let clement of elements) {
            clement.addEventListener('click', event)
        }
    }

    function removeOnClickEvents(elements, event) {
        for (let element of elements) {
            element.removeEventListener('click', event)
        }
    }

    function removeQuickViewWindow() {
        const $QuickViewWindow = document.getElementById('quick-view-window')
        if ($QuickViewWindow) {
            $QuickViewWindow.remove()
        }
    }
    // End of Used-More-Than-Once Helper Methods

    function renderProducts(products) {
        function getProductAvailableColorsText(colors) {
            if (!colors || !Object.keys(colors).length) {
                return 'Available in 0 color'
            } else if (Object.keys(colors).length === 1) {
                return 'Available in 1 color'
            } else {
                return `Available in ${Object.keys(colors).length} colors`
            }
        }

        function getProductCardHTML(product, idx) {
            return `
                <article>
                    <section class="product-image-container">
                        <img
                            src=${getProductCardImage(product.colors, product.default)}
                            alt=${product.name}
                        />
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

        // register onClick event listeners
        registerOnClickEvents(
            document.getElementsByClassName(QuickViewButtonsClassName),
            clickProductQuickView
        )
        registerOnClickEvents(
            document.getElementsByClassName(DetailPageButtonsClassName),
            clickProductDetailPage
        )
    }

    function clickProductQuickView(event) {
        function renderProductQuickView(product) {
            function getProductQuickViewHTML(product) {
                return `
                    <article id="quick-view-window">
                        <button
                            type="button"
                            id="quick-view-window-close-btn"
                        >
                            &times;
                        </button>
                        <section class="product-image-container">
                            <img
                                src=${getProductCardImage(product.colors, product.default)}
                                alt=${product.name}
                            />
                        </section>
                        <section class="product-info-container">
                            <h3>${product.name}</h3>
                            <p class="price">${product.price}</p>
                            <p>${product.description}</p>
                        </section>
                    </article>
                `
            }

            // remove quick view window if it's now being rendered, just in case
            removeQuickViewWindow()
            disableBackgroundStyles()
            document.body.insertAdjacentHTML(
                'beforeend',
                getProductQuickViewHTML(product)
            )

            // register onClick event listeners
            registerOnClickEvents(
                [document.getElementById('quick-view-window-close-btn')],
                clickCloseProductQuickViewWindow
            )
        }

        renderProductQuickView(window.shirts[event.target.dataset.index])
    }

    function clickProductDetailPage(event) {
        const urlElements = window.location.href.split('/')
        urlElements[urlElements.length - 1] = 'details.html'
        window.location = `${urlElements.join('/')}?id=${event.target.dataset.index}`
    }

    function clickCloseProductQuickViewWindow() {
        enableBackgroundStyles()
        removeQuickViewWindow()
    }

    // render products objects to document and register onClick events
    renderProducts(window.shirts)

    window.onunload = () => {
        console.log('unloading...')
        // remove all onClick event listeners before changing page link
        removeOnClickEvents(
            document.getElementsByClassName(QuickViewButtonsClassName),
            clickProductQuickView
        )
        removeOnClickEvents(
            document.getElementsByClassName(DetailPageButtonsClassName),
            clickProductDetailPage
        )
        const $QuickViewWindowCloseButton = document.getElementById('quick-view-window-close-btn')
        if ($QuickViewWindowCloseButton) {
            removeOnClickEvents(
                [$QuickViewWindowCloseButton],
                clickCloseProductQuickViewWindow
            )
        }
    }
};

let initDetails = () => {
    // Your Code Here
    console.log(window.shirts)
    console.log(window.location.href)
};