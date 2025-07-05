import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [pagamento, setPagamento] = useState(null);
  const [totalCash, settotalCash] = useState(null);
  const [totalPagamento, settotalPagamento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch(`https://www.cltro.com/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.pagamentos)
        setUser(data.user);
        setPagamento(data.pagamentos);      
        settotalCash(data.totalCash);   
        settotalPagamento(data.totalPagamentos); 
      } else {
        logout();
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (login, password) => {
    console.log(login, password)
    const response = await fetch(`https://www.cltro.com/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ login, password })
    });
    console.log(response)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    setUser(data.user);
    setPagamento(data.pagamentos); 
    settotalCash(data.totalCash);   
    settotalPagamento(data.totalPagamentos);  
    return data;
  };

  const register = async (userData) => {
    const response = await fetch(`https://www.cltro.com/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    setUser(data.user);
    setPagamento(data.pagamentos);
    settotalCash(data.totalCash);   
    settotalPagamento(data.totalPagamentos);  
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };


  const computaVoto = async (btnvoto) => {
    try {
      const response = await fetch('https://www.cltro.com/api/auth/computaVoto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ btnvoto })
      });

      // Verifica se a resposta tem conteúdo antes de parsear JSON
      const responseText = await response.text();
      const data = responseText ? JSON.parse(responseText) : {};

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao computar voto');
      }

      // Atualiza token se existir
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      // Atualiza dados do usuário
      if (data.user) {
        setUser(data.user);
      }
      
      return data;
    } catch (error) {
      console.error('Erro ao computar voto:', error);
      throw error;
    }
  };

  const gerarLinkPagamentoMP = async (btnPagamento) => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/pagamento-direto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ btnPagamento })
      });

      // Verifica se a resposta tem conteúdo antes de parsear JSON
      const responseText = await response.text();
      const data = responseText ? JSON.parse(responseText) : {};

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao gerar o link de pagamento');
      }

      // Atualiza token se existir
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      // Atualiza dados do usuário
      if (data.user) {
        setUser(data.user);
      }
      
      return data;
    } catch (error) {
      console.error('Erro ao computar voto:', error);
      throw error;
    }
  };

    const processarCash = async () => {
    try {
      const response = await fetch('https://www.cltro.com/api/auth/processarCash', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Verifica se a resposta tem conteúdo antes de parsear JSON
      const responseText = await response.text();
      const data = responseText ? JSON.parse(responseText) : {};

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao processar o cash');
      }

      // Atualiza token se existir
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      // Atualiza dados do usuário
      if (data.user) {
        setUser(data.user);
      }
      
      setPagamento(data.pagamentos);
      settotalCash(data.totalCash);   
      settotalPagamento(data.totalPagamentos);  
      return data;
    } catch (error) {
      console.error('Erro ao computar voto:', error);
      throw error;
    }
  };

  const value = {
    user,
    pagamento,
    totalCash,
    totalPagamento,
    loading, 
    login,
    register,
    logout,
    computaVoto,
    gerarLinkPagamentoMP,
    processarCash
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);