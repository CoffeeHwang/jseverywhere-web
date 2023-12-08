import React, { useEffect } from "react";
import { useMutation, useApolloClient, gql } from "@apollo/client";

import UserForm from "../components/UserForm";

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

const SignUp = props => {
  useEffect(() => {
    // 문서 제목 업데이트
    document.title = 'Sign Up - Notedly';
  });

  // 아폴로 클라이언트
  const client = useApolloClient();

  // 뮤테이션 훅
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem('token', data.signUp);
      // 로컬 캐시 업데이트
      client.writeData({data: {isLoggedIn: true }})
      // 사용자를 홈페이지로 리디렉션
      props.history.push('/');
    }
  });

  return (
    <React.Fragment>
      <UserForm action={signUp} formType="signup" />
      {loading && <p>Loading...</p>}
      {error && <p>Error creating an account!</p>}
    </React.Fragment>
  );
};

export default SignUp;