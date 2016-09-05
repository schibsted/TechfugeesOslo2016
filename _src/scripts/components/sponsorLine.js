export default {
    init (root, refs) {

        for (let i = refs.logos.children.length; i >= 0; i--) {
            refs.logos.appendChild(refs.logos.children[Math.random() * i | 0]);
        }

    }
};
