// general methods for both pages
function getProductCardImage(colorsImages, defaultImages, side='front', color='default') {
    console.assert(defaultImages, "There should be default images found!")
    console.assert(defaultImages.front, "There should be at least a default front image!")

    if (!colorsImages) {
        return defaultImages[side]
    }
    if (!Object.keys(colorsImages).length) {
        return defaultImages[side]
    } else {
        if (color === 'default') {
            return colorsImages[Object.keys(colorsImages)[0]][side]
        } else {
            return colorsImages[color][side]
        }
        
    }
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

let initProducts = () => {
    const $Header = document.getElementsByTagName('header')[0]
    const $Nav = document.getElementsByTagName('nav')[0]
    const $Main = document.getElementsByTagName('main')[0]
    const $Footer = document.getElementsByTagName('footer')[0]
    const QuickViewButtonsClassName = 'quick-view-btn'
    const DetailPageButtonsClassName = 'detail-page-btn'

    // Start of Used-More-Than-Once Helper Methods
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
            function renderFrontBackImages(colorsImages, defaultImages, productName) {
                return `
                    <div>
                        <img
                            src=${getProductCardImage(colorsImages, defaultImages)}
                            alt=${productName}
                        />
                        <img
                            src=${getProductCardImage(colorsImages, defaultImages, side='back')}
                            alt=${productName}
                        />
                    </div>
                `
            }

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
                            ${renderFrontBackImages(product.colors, product.default, product.name)}
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
    const id = parseInt(
        new URLSearchParams(window.location.search).get('id')
    )
    const shirt = window.shirts[id]
    const detailState = {
        'side': 'front',
        'color': (
            Object.keys(shirt.colors).length
            ?
            Object.keys(shirt.colors)[0]
            :
            ''
        )
    }
    const ProductTypeButtonClassName = 'product-type-button'

    function renderProduct(product) {
        function renderColorButtons(colors, defaultColor) {
            function capitalizeFirstLetter(letters) {
                return letters.charAt(0).toUpperCase() + letters.slice(1)
            }

            function getColorButtonsHTML(colors, defaultColor) {
                let colorButtonsHTML = ''

                for (let color of colors) {
                    colorButtonsHTML += `
                        <input
                            id="color-${color}"
                            type="radio"
                            name="color"
                            vlaue=${color}
                            ${defaultColor === color ? "checked" : ""}
                            class=${ProductTypeButtonClassName}
                        />
                        <label for="color-${color}">${capitalizeFirstLetter(color)}</label>
                    `
                }

                return colorButtonsHTML
            }

            return `
                <section class="form-section">
                    <span>Color:</span>
                    ${getColorButtonsHTML(colors, defaultColor)}
                </section>
            `
        }

        function getProductDetailHTML(product) {
            return `
                <h2>${product.name}</h2>
                <div id="details-container">
                    <section class="details-image-container">
                        <img
                            src=${getProductCardImage(
                                product.colors,
                                product.default,
                                side=detailState.side,
                                color=detailState.color,
                            )}
                            alt=${product.name}
                            id="details-image"
                        />
                    </section>
                    <section class="details-info-container">
                        <p class="price">${product.price}</p>
                        <p class="description">${product.description}</p>
                        <form>
                            <section class="form-section">
                                <span>Side:</span>
                                <input
                                    id="side-front"
                                    type="radio"
                                    name="side"
                                    vlaue="front"
                                    class=${ProductTypeButtonClassName}
                                    checked
                                />
                                <label for="side-front">Front</label>
                                <input
                                    id="side-back"
                                    type="radio"
                                    name="side"
                                    value="back"
                                    class=${ProductTypeButtonClassName}
                                />
                                <label for="side-back">Back</label>
                            </section>
                            ${
                                detailState.color
                                ?
                                renderColorButtons(Object.keys(product.colors), detailState.color)
                                :
                                ''
                            }
                        </form>
                    </section>
                </div>
            `
        }

        const $DetailsContainer = document.getElementById('details')
        $DetailsContainer.insertAdjacentHTML(
            'beforeend',
            getProductDetailHTML(product)
        )

        // register onClick event listeners
        registerOnClickEvents(
            document.getElementsByClassName(ProductTypeButtonClassName),
            clickProductTypeButton
        )
    }

    function clickProductTypeButton(event) {
        const [productType, typeValue] = event.target.id.split('-')
        detailState[productType] = typeValue
        const $DetailsImage = document.getElementById('details-image')
        $DetailsImage.src = getProductCardImage(
            shirt.colors,
            shirt.default,
            side=detailState.side,
            color=detailState.color,
        )
    }

    renderProduct(shirt)

    window.unload = () => {
        console.log('unloading...')
        removeOnClickEvents(
            document.getElementsByClassName(ProductTypeButtonClassName),
            clickProductTypeButton
        )
    }
};