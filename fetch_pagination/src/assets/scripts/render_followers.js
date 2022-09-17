const renderFollowers = followers => {
  const newFollowers = followers
    .map(
      ({ login, avatar_url: avatarUrl, html_url: htmlUrl }) =>
        `<article class="card">
      <img class="card__image" src="${avatarUrl}" alt="avatar of the user ${login}">
      <h2 class="card__title">${login}</h2>
      <a class="btn" href="${htmlUrl}">View profile</a>
    </article>`
    )
    .join('');

  return newFollowers;
};

export default renderFollowers;
