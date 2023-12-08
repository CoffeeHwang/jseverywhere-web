import React from 'react';
import { useMutation, userMutation } from '@apollo/client';
import { withRouter } from 'react-router-dom';

import ButtonAsLink from './ButtonAsLink';
import { DELETE_NOTE } from '../gql/mutation';
// 노트 삭제 이후 다시 가져오도록 할 쿼리 임포트
import { GET_MY_NOTES, GET_NOTES } from '../gql/query';

const DeleteNote = props => {
  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: {
      id: props.noteId
    },
    // 캐시를 업데이트 하도록 노트 리스트 쿼리 다시 불러오기
    refetchQueries: [{ query: GET_MY_NOTES, GET_NOTES }],
    onCompleted: data => {
      // 사용자를 "my notes" 페이지로 리디렉션
      props.history.push('/mynotes');
    }
  });

  return <ButtonAsLink onClick={deleteNote}>Delete Note</ButtonAsLink>;
};

export default withRouter(DeleteNote);