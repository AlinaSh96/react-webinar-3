import { memo, useMemo } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Flex from "../../components/flex";

function ProfileCard() {
  const store = useStore();

  const select = useSelector((state) => ({
    profile: state.authorization.profile,
  }));

  const { t } = useTranslate();

 console.log(select.profile)
  return (
    <Flex direction="column" gap={8}>
      <>
        <h2>Профиль</h2>
        <span>
          Имя: <b>{select.profile.name}</b>
        </span>
        <span>
          Телефон: <b>{select.profile.name}</b>
        </span>
        <span>
          email: <b>{select.profile.email}</b>
        </span>
      </>
    </Flex>
  );
}

export default memo(ProfileCard);
