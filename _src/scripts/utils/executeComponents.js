const domComponents = document.querySelectorAll('[data-component]');

export default function executeComponents (components) {
    for (let componentEle of domComponents) {
        const component = componentEle.dataset.component;

        try {
            const domRefs = componentEle.querySelectorAll('[data-ref]');

            let refs = {};

            Array.from(domRefs, (ele) => {
                const ref = ele.dataset.ref;

                if (ele.closest('[data-component]') === componentEle) {
                    Object.assign(refs, { [ref]: ele });
                }
            });

            components[component].init(componentEle, refs);

        } catch (err) {
            console.error(`Error in "${component}":`, err);
        }
    }
}
