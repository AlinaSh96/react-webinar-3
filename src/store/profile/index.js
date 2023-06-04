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
      isAuth: false,
    };
  }

  setUser(data) {
    this.setState(
      {
        ...this.getState(),
        profile: data,
        waiting: false,
        isAuth: true,
      },
      "Загружен профиль"
    );
  }

  async loginByToken() {
    const token = window.localStorage.getItem("token");
    this.setState(
      {
        ...this.getState(),
        profile: null,
        waiting: true,
      },
      "Грузим данные"
    );
    if (token) {
      const response = await fetch("/api/v1/users/self", {
        headers: { "X-Token": token, "content-type": "application/json" },
      });
      if (response.ok) {
        const json = await response.json();
        this.setUser(json.result);
        return;
      } else {
        this.setState(
          {
            ...this.getState(),
            waiting: false,
            isAuth: false,
          },
          "Загрузили данные"
        );
      }
    }
    this.setState(
      {
        ...this.getState(),
        waiting: false,
        isAuth: false,
      },
      "Загрузили данные"
    );
  }

  async logOut() {
    const token = localStorage.getItem("token");
    await fetch("/api/v1/users/sign", {
      method: "DELETE",
      headers: { "X-Token": token },
    });

    window.localStorage.removeItem("token");
    this.setState(
      {
        ...this.getState(),
        isAuth: false,
        profile: null,
        waiting: false,
      },
      "Пользователь вышел из системы"
    );
  }
}

export default ProfileState;
