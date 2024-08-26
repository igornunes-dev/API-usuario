import { useCallback, useState } from 'react';
import './index.scss';

export const Input = ({ pesquisa, onSearch }) => {
  const [value, setValue] = useState('');  

  const handleSearch = useCallback(() => {
    if (value.trim() !== '') { // Verifica se o campo não está vazio
      onSearch(value); // Chama a função de onSearch com o valor atual
    }
    setValue('');
  }, [value, onSearch]);
  console.log('renderizou');

  return (
    <div className="container">
      <input 
        type="text" 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
        placeholder="Digite um nome de Usuário" 
        className="search"
      />
      <div className="buttons">
      <button 
        onClick={handleSearch} 
        className="button"
        >
        Filtrar
      </button>
      <button onClick={pesquisa} className="button carregar">Carregar Usuários</button>
        </div>
    </div>
  );
};