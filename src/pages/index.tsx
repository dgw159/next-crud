import { useState } from "react";
import ColecaoCliente from "../backend/bd/ColecaoCliente";
import Botao from "../components/Botao";
import Formulario from "../components/Formulario";
import Layout from "../components/Layout";
import Tabela from "../components/Tabela";
import Cliente from "../core/Cliente";
import ClienteRepositorio from "../core/ClienteRepositorio";

export default function Home() {

  const repo: ClienteRepositorio = new ColecaoCliente()

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
  
  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')
  
  const clientes = [
    new Cliente('Ana', 34, '1'),
    new Cliente('Bob', 12, '2'),
    new Cliente('Carlos', 59, '3'),
    new Cliente('David', 23, '4'),
  ]

  function clienteSelecionado(cliente: Cliente){
    setCliente(cliente)
    setVisivel('form')
  }

  function clienteExcluido(cliente: Cliente){
    console.log(`Excluir ${cliente.nome}!!!`)
  }

  function novoCliente(){
    setCliente(Cliente.vazio())
    setVisivel('form')
  }

  function salvarCliente(cliente: Cliente){
    console.log(cliente)
    setVisivel('tabela')
  }

  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}>
      <Layout titulo="Cadastro de usuarios">
        {visivel === 'tabela' ? (
          <>
            <div className="flex justify-end">
              <Botao cor="green" className="mb-4" 
                onClick={novoCliente}>
                Cadastro de cliente
              </Botao>
            </div>
            <Tabela clientes={clientes} 
              clienteSelecionado={clienteSelecionado} 
              clienteExcluido={clienteExcluido}
            />
          </>
        ): (
          <Formulario 
            cliente={cliente}
            clienteMudou={salvarCliente}
            cancelado={() => setVisivel('tabela')}          
          />
        )}
       
        
      </Layout>
    </div>
  )
}
