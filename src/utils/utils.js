export const request = async (url, { headers, body, method }) => {
  return await fetch(url, {
    headers: headers,
    body: body,
    method: method,
  })
    .then(checkResponse)
    .catch((err) => console.log(err));
};

const checkResponse = (response) => {
  if (response.ok) {
    const res = response.json();
    return res;
  }
  return Promise.reject(`Ошибка: ${response.status}`);
};
