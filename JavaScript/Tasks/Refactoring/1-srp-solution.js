'use strict';

const API_EXCHANGE = {
  host: 'openexchangerates.org',
  path: 'api/latest.json?app_id=',
  key: '1f43ea96b1e343fe94333dd2b97a109d',
};

const DEFAULT_RETRY = 3;

const httpGet = async ({ url, retry = DEFAULT_RETRY }) => {
  console.log({ url, retry });
  const res = await fetch(url).catch(() => ({ ok: false }));
  if (!res.ok) {
    const attemptsLeft = retry - 1;
    if (attemptsLeft > 0) return httpGet({ url, retry: attemptsLeft });
    throw new Error('Can not get data');
  }
  return res.json();
};

const getRate = async (currency) => {
  console.log({ currency });
  const { host, path, key } = API_EXCHANGE;
  const url = `https://${host}/${path}${key}`;
  const data = await httpGet({ url });
  const rate = data.rates[currency];
  return rate;
};

const main = async () => {
  try {
    const rate = await getRate('UAH');
    console.log({ rate });
  } catch (err) {
    console.error({ err });
  }
};

main();
