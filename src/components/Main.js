import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import avatar from '../images/loader.gif';
import { Card } from './Card';

export function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onDeleteConfirmation,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <a
          className="profile__wrapper"
          onClick={(event) => onEditAvatar(event)}
          href="."
        >
          <img
            className="profile__avatar"
            src={currentUser?.avatar ? currentUser.avatar : avatar}
            alt="Аватар"
          />
        </a>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser?.name}</h1>
          <button
            className="profile__button profile__button_action_edit"
            onClick={onEditProfile}
            type="button"
            title="Редактировать"
          />
          <p className="profile__text">{currentUser?.about}</p>
        </div>
        <button
          className="profile__button profile__button_action_add"
          onClick={onAddPlace}
          type="button"
          title="Добавить"
        />
      </section>
      <section className="photo-grid">
        <ul className="photo-grid__list">
          {cards
            ? cards.map((card) => (
                <Card
                  key={card._id}
                  card={card}
                  onClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              ))
            : 'Загрузка...'}
        </ul>
      </section>
    </main>
  );
}
