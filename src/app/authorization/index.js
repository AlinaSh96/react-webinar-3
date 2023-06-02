import {memo, useCallback, useMemo} from 'react';
import {useParams} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import AuthorizationForm from '../../components/authorization-form';
import AuthMenu from '../../containers/auth-menu'
function Authorization() {
  const store = useStore();

  const {t} = useTranslate();

  return (
    <PageLayout>
      <AuthMenu/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <AuthorizationForm/>
    </PageLayout>
  );
}

export default memo(Authorization);