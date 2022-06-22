import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Profile = () => {

  const params = useParams()
  const state = useSelector((state) => state.users.currentUser[0])
  console.log(state);

  return (
    <div>
      <h1>
        {params.id}
      </h1>
    </div>
  )
}

export default Profile;