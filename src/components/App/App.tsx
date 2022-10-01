import React from 'react';
import styles from './App.module.css';
import data from '../../utils/data';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function App() {
  return (
    <div className={styles.App}>
      <AppHeader/>
        <main className={styles.main}>
            <BurgerConstructor data={data}/>
        </main>
    </div>
  );
}

export default App;


//TODO в компоненте бургер конструкто можно вынести в отдельный компонент UL
//TODO проверить весь нейминг