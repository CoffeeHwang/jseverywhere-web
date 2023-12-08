import React from "react";
import { useQuery, useMutation } from "@apollo/client";

// import Note from '../components/Note';
import NoteForm from "../components/NoteForm";
import { GET_NOTE, GET_ME } from "../gql/query";
import { EDIT_NOTE } from '../gql/mutation';

const EditNote = props => {
  const id = props.match.params.id;
  const { loading, error, data } = useQuery(GET_NOTE, { variables: {id} });
  const { 
    loading: user_loading, 
    error: user_error,
    data: userdata } = useQuery(GET_ME);

  // 뮤테이션 정리
  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id
    },
    onCompleted: () => {
      props.history.push(`/note/${id}`);
    }
  });

  if (loading || user_loading) return <p>Loading...</p>;
  if (error || user_error) return <p>Erorr! Note not found</p>;

  // console.log('userdata : ', userdata);
  
  if (userdata.me.id !== data.note.author.id) {
    return <p>You don't have access to edit this note !!</p>;
  }

  return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote;