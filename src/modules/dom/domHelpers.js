export function create(type, className, parent) {
    const element = document.createElement(type);
    element.classList.add(className);
    parent.appendChild(element);
    return element;
}

export function createBtn (callback, text, container, id) {
    const button = create('div', 'box', container);
    button.classList.add('box-button');
    create('span', 'span', button).innerHTML = `${text}`;
    create('i', 'water-button', button);
    button.addEventListener('click', callback);
    if (id) button.setAttribute('id', id);

    return button
}