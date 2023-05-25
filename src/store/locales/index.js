import  en  from "./en.locale.json";
import ru from "./ru.locale.json";
import StoreModule from "../module";

class Locales extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      translated: ru,
      language: "ru",
    };
  }

  async changeLang(lang) {
    if (lang === "ru") {
      this.setState(
        {
          ...this.getState(),
          translated: ru,
          language: lang,
        },
        "Смена языка RU"
      );
    } else {
      this.setState(
        {
          ...this.getState(),
          translated: en,
          language: lang,
        },
        "Смена языка EN"
      );
    }
  }
}

export default Locales;
