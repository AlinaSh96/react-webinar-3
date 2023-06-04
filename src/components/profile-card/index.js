import { memo } from "react";
import Flex from "../flex";
import './style.css';

function ProfileCard(props) {
  return (
    <Flex direction="column" gap={16}>
      <>
        <h2>{props.t("profile")}</h2>
        <span>
        {props.t("name")}: <b>{props.profile?.profile?.name}</b>
        </span>
        <span>
        {props.t("phone")}: <b>{props.profile?.profile?.phone}</b>
        </span>
        <span>
        email: <b>{props.profile?.email}</b>
        </span>
      </>
    </Flex>
  );
}

export default memo(ProfileCard);
