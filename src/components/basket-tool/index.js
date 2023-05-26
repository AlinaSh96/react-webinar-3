import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import { Link } from 'react-router-dom';
import useTranslate from '../../hooks/use-translation';
import "./style.css";

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem("BasketTool");
  const { t } = useTranslate();
  return (
    <div className={cn()}>
      <div>
      <Link to={'/'} className={cn('main')}>
         {t('Главная')}
      </Link>
      </div>
      <div>
        <span className={cn("label")}>{t('В корзине')}</span>
        <span className={cn("total")}>
          {amount
            ? `${amount} ${plural(amount, {
                one: `${t('Товар')}`,
                few: `${t('Товара')}`,
                many: `${t('Товаров')}`,
              })} / ${numberFormat(sum)} ₽`
            : `${t('Пусто')}`}
        </span>
        <button onClick={onOpen}>{t('Перейти')}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
