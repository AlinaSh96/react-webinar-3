import {memo, useCallback, useMemo} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import ProfileCard from '../../containers/profile-card';
import AuthMenu from '../../containers/auth-menu';

const authRoute = {
  login: '/login',
  profile: '/profile'
}

function Profile() {
  const {t} = useTranslate();

  return (
    <PageLayout>
      <AuthMenu route={authRoute}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <ProfileCard/>
    </PageLayout>
  );
}

export default memo(Profile);
