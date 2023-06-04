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
      error: "",
    };
  }

  // setUser(data) {
  //   this.store.actions.profile.setState({ ...this.getState(), 
  //     profile: data,
  //     waiting: false,
  //   },
  //   "Загружен профиль"
  //   );
  // }

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
      this.store.actions.profile.setUser(json.result.user)
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
