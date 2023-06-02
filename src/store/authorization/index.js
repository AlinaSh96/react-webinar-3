import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра исписок товара
 */
class AuthState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      waiting: false,
      isAuth: false,
      error: "",
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

  async logOut() {
   // const token = localStorage.getItem('token')
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
      this.setUser(json.result.profile);
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

  async loginByUsername(data) {
    const authData = {
      login: data.login,
      password: data.password,
      remember: true,
    };

    const response = await fetch("/api/v1/users/sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(authData),
    });
    const json = await response.json();
    if (response.ok) {
      this.setUser(json.result.user.profile);
      localStorage.setItem("token", json.result.token);
    } else {
      if (json?.error?.message) {
        this.setState(
          {
            ...this.getState(),
            error:
              json.error.message + ": " + json.error?.data?.issues[0]?.message,
          },
          "Загружена ошибка"
        );
      }
    }
  }
}

export default AuthState;
