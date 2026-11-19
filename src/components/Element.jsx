import { useState, useRef, useEffect } from 'react';

function Element({id, className, typeElement, label, content, onDelete}) {
  const [text, setText] = useState(content);
  const tagRef = useRef(null);

  useEffect(() => {
    if (tagRef.current) {
      tagRef.current.textContent = content;
    }
  }, []);

  const saveText = (evt) => {
    const currentText = evt.currentTarget.textContent;
    // Удаляем невидимый <br>, который браузер оставляет после стирания текста
    if (!currentText.trim()) {
      evt.currentTarget.innerHTML = '';
    }
    setText(currentText);
  }

  const keyEnter = (evt) => {
    if (evt.key === 'Enter') {
      evt.preventDefault()
      evt.currentTarget.blur();
    }
  }

  const handleWrapperClick = (evt) => {
    if (!evt.target.closest('.delete-btn') && tagRef.current) {
      tagRef.current.focus();
    }
  };

  const Tag = typeElement;
  return (
    <div id={id} className={`element ${className}`} tabIndex={0} onClick={handleWrapperClick}>
                  <Tag
                    ref={tagRef}
                    contentEditable="true"
                    data-placeholder={label}
                    suppressContentEditableWarning={true}
                    onBlur={saveText}
                    onKeyDown={keyEnter}>

                    {text}

                  </Tag>
                  <button type="button" className="delete-btn" onClick={() => onDelete(id)}>
                    <span className="visually-hidden">Удалить элемент</span>
                  </button>
                </div>
  )
}

export { Element };
