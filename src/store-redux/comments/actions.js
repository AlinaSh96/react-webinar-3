export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  loadById: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/load-start" });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type)),count`,
        });
        dispatch({
          type: "comments/load-success",
          payload: { data: res.data.result },
        });
      } catch (e) {
        dispatch({ type: "comments/load-error" });
      }
    };
  },

  
  create: () => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: "comments/create-start" });
      const token = localStorage.getItem("token");
      if (token) {
        try {
          this.services.api.setHeader(this.config.tokenHeader, token);
          const res = await this.services.api.request({
            url: '/api/v1/comments',
            method: 'POST',
            body: JSON.stringify({
              "_id": "string",
              "text": "test",
              "parent":{}
            })
          });
          console.log(res)
          // Товар загружен успешно
          dispatch({
            type: "comments/create-success",
            // payload: { data: res.data.result.items },
          });
        } catch (e) {
          //Ошибка загрузки
          dispatch({ type: "comments/create-error" });
        }
      }
    };
  },
};
