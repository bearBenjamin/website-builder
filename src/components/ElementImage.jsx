import { useState, useRef, useEffect } from "react";

function ElementImage({ id, className, onDelete }) {
  const [isPopup, setIsPopup] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  const elementRef = useRef(null);
  useEffect(() => {
    if (!isPopup) {
      return;
    }

    const handleOutsideClick = (evt) => {
      // Проверяем: существует ли наш блок и не находится ли цель клика (evt.target) внутри него
      if (elementRef.current && !elementRef.current.contains(evt.target)) {
        setIsPopup(false);
      }
    };

    // Вешаем слушатель на весь документ
    document.addEventListener("click", handleOutsideClick);

    // Функция очистки (cleanup): сработает при закрытии попапа или удалении элемента
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isPopup]); // Эффект перезапускается только при изменении isPopup

  const handlerUploadClick = () => {
    // проверка на пустое поле
    if (!inputUrl.trim()) {
      return;
    }

    setImageSrc(inputUrl);
    setIsPopup(false);
  };

  return (
    <div
      ref={elementRef}
      id={id}
      className={`element element--${className} ${isPopup ? "element--uploading" : ""} ${imageSrc ? "element--uploaded" : ""} ${className}`}
      tabIndex="0"
    >
      <button type="button" className="delete-btn" onClick={() => onDelete(id)}>
        <span className="visually-hidden">Удалить элемент</span>
      </button>

      <button
        type="button"
        className="add-img-btn"
        onClick={() => setIsPopup((prev) => !prev)}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 2V8H0V12H6V18H10V12H16V8H10V2H6ZM12 14V20H6V40C6 42.2 7.8 44 10 44H42C44.2 44 46 42.2 46 40V16C46 13.8 44.2 12 42 12H35.66L32 8H18V14H12ZM26 38C31.52 38 36 33.52 36 28C36 22.48 31.52 18 26 18C20.48 18 16 22.48 16 28C16 33.52 20.48 38 26 38ZM26 34C22.68 34 20 31.32 20 28C20 24.68 22.68 22 26 22C29.32 22 32 24.68 32 28C32 31.32 29.32 34 26 34Z"
          />
        </svg>
      </button>
      {isPopup && (
        <div className="img-upload">
          <p>Загрузите изображение</p>
          <input
            type="url"
            placeholder="Вставьте ссылку на изображение"
            value={inputUrl}
            onChange={(evt) => setInputUrl(evt.target.value)}
          />
          <button
            className="img-upload__label"
            type="button"
            onClick={() => handlerUploadClick()}
          >
            Загрузить
          </button>
        </div>
      )}

      {imageSrc && <img src={imageSrc}></img>}
    </div>
  );
}

export { ElementImage };
