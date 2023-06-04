import {memo} from 'react';
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import ProfileCard from '../../components/profile-card';
import AuthMenu from '../../containers/auth-menu';
import useSelector from "../../hooks/use-selector";

const authRoute = {
  login: '/login',
  profile: '/profile'
}

function Profile() {
  const {t} = useTranslate();

  const select = useSelector((state) => ({
    profile: state.profile.profile,
  }));

  return (
    <PageLayout>
      <AuthMenu route={authRoute}/>
      <Head title={t('title')}>
        <LocaleSelect t={t} profile={select.profile}/>
      </Head>
      <Navigation />
      <ProfileCard/>
    </PageLayout>
  );
}

export default memo(Profile);
