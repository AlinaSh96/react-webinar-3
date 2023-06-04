import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра исписок товара
 */
class ProfileState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      waiting: false,
      profile: null,
    };
  }

  setUser(data) {
    this.setState(
      {
        ...this.getState(),
        isAuth: true,
        profile: data,
        waiting: false,
      },
      "Загружен профиль"
    );
  }


  async loginByToken() {
    const token = window.localStorage.getItem("token");
    this.setState(
      {
        ...this.getState(),
        isAuth: false,
        profile: null,
        waiting: true,
      },
      "Грузим данные"
    );
    if (token) {
      const response = await fetch("/api/v1/users/self", {
        headers: { "X-Token": token, "content-type": "application/json" },
      });
      const json = await response.json();
      this.setUser(json.result);
      return;
    }
    this.setState(
      {
        ...this.getState(),
        waiting: false,
      },
      "Загрузили данные"
    );
  }
}

export default ProfileState;
