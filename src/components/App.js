import React from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { api } from "../utils/api.js";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";

export default function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [unnessesaryCard, setUnnessesaryCard] = React.useState(undefined);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [loadingText, setLoadingText] = React.useState("");

  // Запрашиваем данные пользователя и карточек
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([info, initialCards]) => {
        setCurrentUser(info);
        setCards(initialCards);
      })
      .catch(console.error);
  }, []);

  // Сабмиты

  function handleUpdateUser(userData) {
    setLoadingText("Подождите...");

    api
      .editUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoadingText("");
      });
  }

  function handleUpdateAvatar(data) {
    setLoadingText("Подождите...");

    api
      .editUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoadingText("");
      });
  }

  function handleAddPlace(cardData) {
    setLoadingText("Подождите...");

    api
      .postCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoadingText("");
      });
  }

  function handleDeleteSubmit() {
    const newCards = cards.filter((item) => item._id !== unnessesaryCard._id);

    setLoadingText("Подождите...");

    api
      .deleteCard(unnessesaryCard._id)
      .then(() => {
        setCards(newCards);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setLoadingText("");
      });
  }

  // Обработчики
  function closeAllPopups() {
    unnessesaryCard && setUnnessesaryCard(undefined);
    isAddPlacePopupOpen && setIsAddPlacePopupOpen(false);
    isEditAvatarPopupOpen && setIsEditAvatarPopupOpen(false);
    isEditProfilePopupOpen && setIsEditProfilePopupOpen(false);
    selectedCard.link && setSelectedCard({});
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteClick(card) {
    setUnnessesaryCard(card);
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        cards={cards}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onDeleteClick={handleDeleteClick}
      />
      <Footer />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleUpdateAvatar}
        loadingText={loadingText}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleUpdateUser}
        loadingText={loadingText}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleAddPlace}
        loadingText={loadingText}
      />
      <PopupWithForm
        name="deleteCard"
        title="Вы уверены?"
        textSubmit="Да"
        isOpen={unnessesaryCard}
        onClose={closeAllPopups}
        onSubmit={handleDeleteSubmit}
        loadingText={loadingText}
        validity={true}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}
