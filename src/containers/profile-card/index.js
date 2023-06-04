import { memo } from "react";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Flex from "../../components/flex";

function ProfileCard() {
  const select = useSelector((state) => ({
    profile: state.profile.profile,
  }));

  const { t } = useTranslate();

  return (
    <Flex direction="column" gap={8}>
      <>
        <h2>{t("profile")}</h2>
        <span>
        {t("name")}: <b>{select.profile?.profile?.name}</b>
        </span>
        <span>
        {t("phone")}: <b>{select.profile?.profile?.phone}</b>
        </span>
        <span>
        email: <b>{select.profile?.email}</b>
        </span>
      </>
    </Flex>
  );
}

export default memo(ProfileCard);
