const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const languageTranslator = new LanguageTranslatorV3({
  version: '2019-01-10',
  authenticator: new IamAuthenticator({
    apikey: 'qix5eHOzo8-ZNW7nDTj512k337m7xUFMCtL_QWr_Ylp8',
  }),
  url: 'https://api.eu-gb.language-translator.watson.cloud.ibm.com/instances/d00dc851-fbfa-4888-8e15-21a851d6d7de',
});

async function translateWord(text) {
  try {
    const getTranslation = await languageTranslator.translate({
      text: text,
      source: 'fr',
      target: 'en',
    })
    return getTranslation.result.translations
  } catch (e) {
    return e
  }
}

module.exports = translateWord