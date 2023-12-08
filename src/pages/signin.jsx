import React, { useEffect } from "react";
import { useMutation, useApolloClient, gql } from "@apollo/client";

import UserForm from "../components/UserForm";

const SIGNIN_USER = gql`
  mutation signIn($email: String, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

const SignIn = props => {
  useEffect(() => {
    // 문서 제목 업데이트
    document.title = 'Sign In - Notedly';
  });

  const client = useApolloClient();
  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      // 토큰 저장
      localStorage.setItem('token', data.signIn);
      // 로컬 캐시 업뎃
      client.writeData({ data: { isLoggedIn: true } });
      // 사용자를 홈페이지로 리디렉션
      props.history.push('/');
    }
  });

  return (
    <React.Fragment>
      <UserForm action={signIn} formType="signin" />
      {loading && <p>Loading...</p>}
      {error && <p>Error signing in!</p>}
    </React.Fragment>
  );
};

export default SignIn;