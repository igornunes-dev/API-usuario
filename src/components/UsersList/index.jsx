import React from 'react';
import './index.scss'

export const UsersList = ({ users }) => {
  return (
    <div className="users-list">
      {users.length > 0 && (
        users.map(({ login, picture, name, gender, dob}) => (
          <div key={login.uuid} className="user-item">
            <img src={picture.medium} alt={name.first} />
            <p><span>Nome:</span> {name.first} {name.last}</p>
            <p><span>Gênero:</span> {gender === 'female' ? 'Feminino' : 'Masculino'}</p>
            <p><span>Idade:</span> {dob.age} anos</p>
          </div>
        ))
      )}
    </div>
  );
};