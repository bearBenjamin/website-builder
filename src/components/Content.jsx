import { useState } from "react";
import { AddMenu } from "./AddMenu";
import { Element } from './Element';
import { ElementImage } from "./ElementImage";

const GRID_COLUMNS = {
  landing: 1,
  blog: 2,
  shop: 3,
};

function ListContent({ grid }) {
  const contents = Array.from(
    { length: GRID_COLUMNS[grid] },
    (_, index) => index + 1,
  );
  return contents.map((item) => <Content id={item} key={`${grid}-${item}`} />);
}

function Content({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [elements, setElements] = useState([]);

  let isEmpty = false;

  if (elements.length === 0) {
    isEmpty = true;
  }

  const addElement = (type) => {
    const newElement = {};
    switch (type) {
      case "h1":
        newElement.typeElement = "h1";
        newElement.className = "title";
        newElement.label = "Заголовок H1";
        newElement.content = "";
        break;

      case "h2":
        newElement.typeElement = "h2";
        newElement.className = "title";
        newElement.label = "Заголовок H2";
        newElement.content = "";
        break;

      case "h3":
        newElement.typeElement = "h3";
        newElement.className = "title";
        newElement.label = "Заголовок H3";
        newElement.content = "";
        break;

      case "p":
        newElement.typeElement = "p";
        newElement.className = "text";
        newElement.label = "Абзац текста";
        newElement.content = "";
        break;

      case "img":
        newElement.typeElement = "img";
        newElement.className = "image";
        break;
    }

    newElement.id = crypto.randomUUID();
    setElements((items) => [...items, newElement]);
    console.log(newElement);
    setIsOpen(false);
  };

  const handleDelete = (id) => {
    setElements((items) => items.filter((item) => item.id !== id));
  };

  console.log("element: ", elements);

  return (
    <div className={`content content-${id} ${isEmpty ? 'content--empty' : ''}`}>
      <p className="placeholder">Content</p>
      <button
        type="button"
        className="add-btn"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 20C0 8.96 8.96 0 20 0C31.04 0 40 8.96 40 20C40 31.04 31.04 40 20 40C8.96 40 0 31.04 0 20ZM22 22H30V18H22V9.99999H18V18H10V22H18V30H22V22Z"
            fill="#80CCF0"
          />
        </svg>
      </button>
      <AddMenu isOpen={isOpen} onBtnClick={addElement} />
      {!isEmpty && (
        <div className="content__elements-wrapper">
          {elements.map((item) => {
            if (item.typeElement !== "img") {
              return (
                <Element
                  key={item.id}
                  id={item.id}
                  className={item.className}
                  typeElement={item.typeElement}
                  label={item.label}
                  content={item.content}
                  onDelete={handleDelete}
                />
              );
            } else {
              return (
                <ElementImage
                  key={item.id}
                  id={item.id}
                  className={item.className}
                  onDelete={handleDelete}
                />
              );
            }
          })}
        </div>
      )}
    </div>
  );
}

export { ListContent };
