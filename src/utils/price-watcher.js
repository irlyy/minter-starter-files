const axios = require('axios');
export const getCoinPrice = async (coinId) => {
  return axios
    .get('https://api.coingecko.com/api/v3/coins/' + coinId)
    .then(function (response) {
      return {
        success: true,
        price: response.data.market_data.current_price.usd
      };
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
    });
}