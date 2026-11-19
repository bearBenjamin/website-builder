const ELEMENTS_TYPE = [
  { type: 'h1', label: 'Заголовок H1' },
  { type: 'h2', label: 'Заголовок H2' },
  { type: 'h3', label: 'Заголовок H3' },
  { type: 'p', label: 'Абзац текста' },
  { type: 'img', label: 'Изображение' }
]

function AddMenu({isOpen, onBtnClick}) {
  return (
      <div className={`choose-elem ${!isOpen ? 'choose-elem--hide' : ''}`}>
        {ELEMENTS_TYPE.map(({type, label}) => (
          <button
            key={type}
            type="button"
            className="choose-elem__btn"
            onClick={() => onBtnClick(type)}>
              {label}
            </button>
        ))}
      </div>
  )
}

export { AddMenu };
