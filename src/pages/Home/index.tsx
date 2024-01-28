import useLocalStorageCrud from '../../hooks/useLocalStorageCrud';

type TTeste = {
  id: string;
  name: string;
  administrator: boolean;
}

export default function Home() {
    const crud = useLocalStorageCrud<TTeste>();

    const retornandoAdmins = () => {
      console.log(crud.filter(item => item.administrator === true));
    };

    const retornando1 = () => {
      console.log(crud.get('1234'));
    }

    const criando1 = () => {
      console.log(crud.save('1234', { id: '1234', name: 'Victor', administrator: true }));
    }

    const criando2 = () => {
      const id = (Math.floor(Math.random() * 1000)).toString();
      console.log(crud.save(id, { id, name: `Teste#${id}`, administrator: (Math.random() < 0.5) }));
    }

    const deletando1 = () => {
      console.log(crud.remove('1234'));
    }

  return (
    <>
    <button onClick={retornandoAdmins}>retornandoAdmins</button>
    <button onClick={retornando1}>retornando1</button>
    <button onClick={criando1}>criando1</button>
    <button onClick={criando2}>criando2</button>
    <button onClick={deletando1}>deletando1</button>
    </>
  )
}
