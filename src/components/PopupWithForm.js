export default function PopupWithForm({
  isOpen,
  onClose,
  name,
  title,
  textSubmit,
  children,
  onSubmit,
  loadingText,
  validity,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <div className={`popup popup_funct_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          type="button"
          className="button popup__btn-close hover-opacity"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <h2 className="popup__header">{title}</h2>
        <form
          className="form"
          name={`form-${name}`}
          onSubmit={handleSubmit}
          noValidate
        >
          {children /* {add labels} */}
          <button
            type="submit"
            className={`button button_type_submit ${
              !validity && "button_disabled"
            } button_style_fill-m`}
            disabled={!validity}
          >
            {loadingText === "" ? textSubmit : loadingText}
          </button>
        </form>
      </div>
    </div>
  );
}
