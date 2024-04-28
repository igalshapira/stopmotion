class Dom {
    element;

    constructor(tag, text, attributes) {
        this.element = document.createElement(tag);
        if (attributes) {
            Object.keys(attributes).forEach((attr) => {
                this.element.setAttribute(attr, attributes[attr].toString());
            });
        }
        this.element.innerText = text;
    }

    static byId(id) {
        const dom = new Dom();
        dom.element = document.getElementById(id);
        return dom;
    }

    static Span(text, attributes) {
        return new Dom("span", text, attributes);
    }

    static Img(src, attributes) {
        return new Dom("img", "", {
            src,
            ...attributes
        });
    }

    mouseenter(func) {
        this.element.addEventListener("mouseenter", func);
        return this;
    }

    mouseleave(func) {
        this.element.addEventListener("mouseleave", func);
        return this;
    }

    /** Append to either an Dom, element or Id */
    appendTo(parent) {
        if (typeof parent === "string") {
            document.getElementById(parent).append(this.element);
            return this;
        }
        return parent.append(this.element);
    }

    append(element) {
        this.element.append(element);
        return this;
    }

    empty() {
        this.element.innerHTML = null;
    }

    static createElement(tag, text, attributes) {
        const element = document.createElement(tag);
        if (attributes) {
            Object.keys(attributes).forEach((attr) => {
                element.setAttribute(attr, attributes[attr].toString());
            });
        }
        element.innerText = text;

        return element;
    }
}

window.Dom = Dom;