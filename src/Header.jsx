import React from 'react';

class Header extends React.Component {
  state = {
    astro: true
  }

  render() {
    return (
      <header>
        <div className='title'>ARMAGGEDON V</div>
        <div className='links'>
          <span id='asteroid' className={this.state.astro ? 'active' : 'notActive'}>Астероиды</span>
          <span id='destruction' className={this.state.astro ? 'notActive' : 'active'}>Уничтожение</span>
        </div>
        <div className='description'>
          Сервис мониторинга и уничтожения астреоидов, опасно подлетающих к Земле.
      </div>
      </header>
    )
  }
};

export default Header;
