import { useEffect, useState } from 'react';
import LoginPageView from './login-page';
import { useModal } from '../../context/ModalContext';
import { validateEmail, validatePswd } from '../../utils';

const LoginPage = () => {
  const [user, setUser] = useState({
    id: '',
    pswd: '',
  })
  const [isShownPswd, setIsShownPswd] = useState(false);
  const [isLoginActive, setIsLoginActive] = useState(false);
  const { modalOpen } = useModal();

  const REST_API_KEY = import.meta.env.VITE_KAKAO_KEY;
  const REDIRECT_URI = `${import.meta.env.VITE_HOST}/auth/kakao/callback`;
  // oauth 요청 URL
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const onChangeUser = (event) => {
    const { name, value } = event.target
    setUser((curr) => ({ ...curr, [name]: value }))

    if (value !== '' && (name != 'pswd' && user.pswd != '') && (name != 'id' && user.id != '')) {
      setIsLoginActive(true);
    } else {
      setIsLoginActive(false);
    }
  }


  const handleLogin = () => {
    validateInfo();
  };
  const toggleShowPswd = () => {
    setIsShownPswd(!isShownPswd);
  };

  const validateInfo = () => {
    if (!validateEmail(user.id) || !validatePswd(user.pswd)) {
      modalOpen({
        content: <div>등록된 아이디가 아니에요.<br />이메일 또는 비밀번호를확인 해주세요.</div>,
      });
    } else {
      modalOpen({
        content: <div>로그인처리</div>,
      });
    }
  }

  return (
    <LoginPageView
      user={user}
      onChangeUser={onChangeUser}
      handleLogin={handleLogin}
      handleKakaoLogin={handleKakaoLogin}
      isShownPswd={isShownPswd}
      toggleShowPswd={toggleShowPswd}
      isLoginActive={isLoginActive}
    />
  );
};

export default LoginPage;
