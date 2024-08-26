import { useCallback, useEffect, useState } from 'react';
import './App.scss';
import { Input } from './components/Input';
import { UsersList } from './components/UsersList';
import ReactLoading from 'react-loading';
import diacritics from 'diacritics';

function App() {
  const [users, setUsers] = useState([]);
  const [filterUser, setFilterUser] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://randomuser.me/api/?results=9&nat=BR');
      const responseJson = await response.json();

      setUsers(responseJson.results);
      setFilterUser(responseJson.results);
    } catch (e) {
      setError('Erro ao buscar usuário');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser()
  }, [loadUser])


  //Função de filtragem
  const handleSearch = (search) => {
    const searchLowerCase = diacritics.remove(search.toLowerCase());
    const filtered = users.filter(user =>
      diacritics.remove(user.name.first.toLowerCase()).includes(searchLowerCase)
    );
    setFilterUser(filtered);
  };

  return (
    <div className="App">
      <header className="cabecalho">
        <h1>Buscador de Usuário</h1>
      </header>
      <div className="container">
        <Input pesquisa={loadUser} onSearch={handleSearch} />
        <UsersList users={filterUser} />
      </div>
      {error && <p className="error">{error}</p>}
      {loading && 
      <div className="loading-container">
        <ReactLoading type="spin" color="#000" height={'10%'} width={'10%'}/>
      </div>
      }
    </div>
  );
}

export default App;