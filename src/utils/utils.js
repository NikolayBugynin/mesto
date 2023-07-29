export const request = async (url, { headers, body, method }) => {
  return await fetch(url, {
    headers: headers,
    body: body,
    method: method,
  })
    .then(checkResponse)
    .catch((err) => console.log(err));
};

const checkResponse = (result) => {
  if (result.ok) {
    return result.json();
  }
  return Promise.reject(`Ошибка: ${result.status}`);
};
