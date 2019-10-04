import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import './styles.css';
import api from '../../services/api';

export default function New({ history }) {
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(event) {
    event.preventDefault();
    const user_id = localStorage.getItem('user_id');

    const data = new FormData();
    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    await api.post('/spots', data, {
      headers: {
        user_id: user_id
      }
    });

    history.push('/dashboard');
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label style={{ backgroundImage: `url(${preview})` }} className={preview ? 'thumbnail has-thumbnail' : 'thumbnail'}>
          <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
          <img src={camera} alt="Ícone de câmera" />
        </label>
        <label htmlFor="company">Empresa *</label>
        <input type="text" id="company" placeholder="Sua empresa incrível"
          onChange={event => setCompany(event.target.value)} value={company} />

        <label htmlFor="company">Tecnologias <span>(em branco para grátis)</span></label>
        <input type="text" id="techs" placeholder="Quais tecnologias usam?"
          onChange={event => setTechs(event.target.value)} value={techs} />

        <label htmlFor="price">Preço <span>(em branco para grátis)</span></label>
        <input type="number" id="price" placeholder="Valor cobrado por dia"
          onChange={event => setPrice(event.target.value)} value={price} />

        <button className="btn" type="submit">Cadastrar</button>
      </form>
    </>
  );
}